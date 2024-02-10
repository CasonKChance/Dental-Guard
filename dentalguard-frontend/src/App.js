import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import Image1 from './aboutImage1.jpg';
import Image2 from './aboutImage2.jpg';

const App = () => {
  useEffect(() => {
    document.title = 'DentalGuard';
  }, []);
  
  const [classificationData, setClassificationData] = useState(null);
  const [diseaseInfo, setDiseaseInfo] = useState(null);

  useEffect(() => {
    // Fetch or set classificationData and diseaseInfo based on your logic
    // For now, let's simulate results after a delay
    const timer = setTimeout(() => {
      setClassificationData({
        label: 'Gingivitis',
        confidence: 0.85,
      });

      // Simulate disease information based on the classification
      setDiseaseInfo({
        description: 'Gingivitis is an inflammation of the gums...',
        treatment: 'Common treatments include improved oral hygiene practices...',
      });
    }, 2000); // Simulating a delay of 2 seconds, replace with actual logic

    // Clean up the timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container">
      {/* Banner Section */}
      <div className="banner-container">
        <h1>DentalGuard</h1>
        <p width="20%">AI Oral Hygiene Detector</p>
        <button className="banner-btn">Learn More</button>
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
            <h4>DentalGuard is the first AI Oral Hygiene Detection Software</h4>
            <p>
               DentalGuard is a fully-functionial AI oral hygiene detection software built for low income communities with minimal or
               reduced access to healthcare facilities. DentalGuard can be used to identify over 20 mouth diseases and give real-time data informing
               users on the condition of their oral health. Snap a picture and DentalGuard AI will provide description of
               oral status and provide treatment advice when neccessary.
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
      
      {/* Output Section */}
      {classificationData && (
        <div className="output-section">
          <h2>Classification Result</h2>
          <p>
            Mouth Disease: {classificationData.label} (Confidence: {classificationData.confidence})
          </p>
        </div>
      )}

      {/* Description and Treatment Recommendations Section */}
      {diseaseInfo && (
        <div className="disease-info-section">
          <h2>{classificationData.label} Information</h2>
          <p>{diseaseInfo.description}</p>
          <h3>Treatment Recommendations</h3>
          <p>{diseaseInfo.treatment}</p>
        </div>
      )}
      {/* Footer Section */}
      <footer className="footer-section">
        <div className="left-content">
          <p>Hacklytics DentalGuard 2024</p>
        </div>
        <div className="right-content">
          <p>Contributors: Brandon, Max, Cason, Robbie</p>
        </div>
      </footer>
    </div>
  );
};

export default App;