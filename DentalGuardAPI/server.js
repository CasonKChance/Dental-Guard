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

/* Mongoose DB Setup */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const dbURI = 'mongodb+srv://admin:hack1234@dentalimagedb.mjrkmk2.mongodb.net/';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);

const items = require('./routes/api/items'); // You need to create this file

// Use Routes
app.use('/api/items', items);

const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get All Items
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items));
});

// @route POST api/items
// @desc Create An Item
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

module.exports = router;

app.post("/classify", async (req, res) => {
  try {
    // Extract the Base64-encoded image data from the request body
    const { image } = req.body; // Assuming the JSON structure is { "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/..." }

    // If necessary, convert the Base64 string to a binary format for further processing
    // For example, if you're sending the image to an external API that requires binary data

    // Simulate an analysis process or database operation
    // For this example, let's assume you're directly saving the image data to MongoDB
    // Adjust according to your actual application logic

    const newItem = new Item({
      name: "Analyzed Image", // Placeholder, adjust based on your actual data model and requirements
      // Include other fields as necessary, e.g., analysis results, image data, etc.
    });

    const savedItem = await newItem.save();

    // Respond with success and the saved item
    res.json({ message: 'Image data received and processed', item: savedItem });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error processing your request");
  }
});

// Mongoose End Setup

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
