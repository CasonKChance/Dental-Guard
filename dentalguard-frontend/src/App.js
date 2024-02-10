import logo from './logo.svg';
import React, { useEffect } from 'react';
import './App.css';
import Image1 from './aboutImage1.jpg';
import Image2 from './aboutImage2.jpg';

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

      {/* About Us Section */}
      <div className="aboutus-container">
        <div className="aboutus-content">
          {/* Images on the Left */}
          <div className="image-stack">
            <img src={Image1} alt="About Us Image 1" />
            <img src={Image2} alt="About Us Image 2" />
          </div>

          {/* Text on the Right */}
          <div className="text-content">
            <h2>About Us</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel
              purus eget justo egestas eleifend vel id neque.
            </p>
          </div>
        </div>
      </div>

      {/* Section with Image Upload Button */}
      <div className="image-upload-section">
        <h2>Upload Dental Image</h2>
        <h3>Test The Dental Guard AI Oral Disease Detection</h3>
        <div className="upload-container">
          <input type="file" id="imageUpload" />
          <label htmlFor="imageUpload">Upload Image Here</label>
        </div>
        <br></br>
      </div>
      <div className="output-section">
        <h2>Output</h2>
      </div>
    </div>
  );
};

export default App;