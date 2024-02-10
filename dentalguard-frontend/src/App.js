import logo from './logo.svg';
import React, { useEffect } from 'react';
import './App.css';

const App = () => {
  useEffect(() => {
    document.title = 'DentalGuard';
  }, []);
  return (
    <div className="app-container">
      {/* Banner Section */}
      <div className="banner-container">
        <h1>Dental Guard</h1>
        <p width="20%">AI Oral Hygiene Detector for low-income areas without connection to healthcare facilities.</p>
        <button>Demo Now</button>
      </div>

      {/* Paragraph with Two Images */}
      <div className="image-paragraph-container">
        <h1>About Us</h1>
        <br></br>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel
          purus eget justo egestas eleifend vel id neque.
        </p>
        <div className="image-wrapper">
          <img src="aboutImage1.jpg" alt="Image 1" />
          <img src="aboutImage2.jpg" alt="Image 2" />
        </div>
      </div>

      {/* Section with Image Upload Button */}
      <div className="image-upload-section">
        <h2>Upload Dental Image</h2>
        <div className="upload-container">
          <input type="file" id="imageUpload" />
          <label htmlFor="imageUpload">Upload Image</label>
        </div>
      </div>
    </div>
  );
};

export default App;