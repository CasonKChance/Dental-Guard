if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const ATAI_API_KEY = process.env.ATAI_API_KEY;
const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const responses = require("./responses.json");
// Setup multer for handling file uploads
const upload = multer({ dest: path.join(__dirname, "uploads/") });

const app = express();
const port = 8000;

app.use(express.json());

// Endpoint to handle file upload and classification
app.post("/classify", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // Path to the uploaded image
  const imagePath = req.file.path;

  // Spawn the Python process to run the model inference
  const pythonProcess = spawn("python", ["model_inference.py", imagePath]);

  // Variable to capture output from the Python script
  let pythonData = "";

  pythonProcess.stdout.on("data", (data) => {
    pythonData += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Child process exited with code ${code}`);

    // After the Python script has executed, delete the temporary file
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Failed to delete the temporary file:", err);
        return res.status(500).send("Internal Server Error");
      }
      console.log("Temporarily uploaded file deleted successfully.");

      // Assuming your Python script outputs JSON with classification result
      try {
        const result = JSON.parse(pythonData);
        const classification = result.classification;
        const confidence_level = result.confidence_level;

        // Fetch response from responses.json
        const response = responses[classification];
        if (response) {
          // Append confidence level to the response
          response.confidence_level = confidence_level;
          res.json(response); // Send the classification result back to the client
        } else {
          res.status(500).send("Error processing the classification");
        }
      } catch (parseError) {
        console.error("Error parsing Python script output:", parseError);
        res.status(500).send("Error processing the classification");
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
