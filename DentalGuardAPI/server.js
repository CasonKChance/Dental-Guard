if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const ATAI_API_KEY = process.env.ATAI_API_KEY;
const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const upload = multer(); // Configures multer for file uploads
const app = express();
const port = 8000;

app.use(express.json());

// Endpoint to handle file upload from the frontend
app.post("/classify", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const formData = new FormData();
    // When appending the buffer, include the filename and content type
    formData.append("file", file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const response = await axios.post(
      "https://api.archetypeai.dev/v0.3/files",
      formData,
      {
        headers: {
          Authorization: `Bearer ${ATAI_API_KEY}`,
        },
      }
    );

    // The file_id from ArchetypeAI is in the response
    const file_id = response.data.file_id;

    // Now make a request to the Summarize API
    const summarizeResponse = await axios.post(
      "https://api.archetypeai.dev/v0.3/summarize",
      {
        query: "Describe what oral disease this person may have.",
        file_ids: [file_id],
      },
      {
        headers: {
          Authorization: `Bearer ${ATAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Send the summarize response back to the frontend
    res.json(summarizeResponse.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error processing your request");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
