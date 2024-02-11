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
