import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Image1 from './aboutImage1.jpg';
import Image2 from './aboutImage2.jpg';

const App = () => {
  useEffect(() => {
    document.title = 'DentalGuard';
  }, []);
  
  const [classificationData, setClassificationData] = useState(null);
  const [diseaseInfo, setDiseaseInfo] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);

  const [showCamera, setShowCamera] = useState(false);

  const handleTakePhoto = (dataUri) => {
    setCapturedImage(dataUri);
    setShowCamera(false); // Hide camera after capturing an image
  };

  const handleCaptureToggle = () => {
    setShowCamera(!showCamera);
    if (!showCamera) {
      setCapturedImage(null); // Optionally clear the previously captured or uploaded image
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result); // Set uploaded image
        setShowCamera(false); // Ensure camera is closed when an image is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLearnMore = () => {
    const aboutUsSection = document.getElementById('about-us-section');
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCloseCamera = () => {
    setIsCapturing(false); // Explicitly close the camera
  };

  useEffect(() => {
    return () => {
      // Cleanup: Stop the camera stream when the component unmounts
      if (cameraStream) {
        const tracks = cameraStream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [cameraStream]);

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
        <button className="banner-btn" onClick={handleLearnMore}>Learn More</button>
      </div>

      {/* About Us Section */}
      <div className="aboutus-container" id="about-us-section">
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
               oral hygiene status and provide treatment advice when neccessary.
            </p>
          </div>
        </div>
      </div>

      {/* Image Upload Section */}
      
      {/* Image Upload Section */}
      <div className="image-upload-section">
        <input type="file" id="imageUpload" accept="image/*" onChange={handleImageUpload}/>
        <h2>Input Image File or Take Picture</h2>
        <p>Test Our Product Below</p>
        <label htmlFor="imageUpload" className="upload-btn">Upload Image Here</label>
        <button className="capture-btn" onClick={handleCaptureToggle}>
          {showCamera ? 'Close Camera' : capturedImage ? 'Retake Photo' : 'Capture from Camera'}
        </button>
      </div>

      {/* Ensure the Camera Overlay is correctly toggled */}
      {showCamera && (
        <div className="camera-overlay">
          <Camera onTakePhotoAnimationDone={handleTakePhoto} isFullscreen={false} />
        </div>
      )}

      {/* Corrected Image Display Section */}
      <div className="image-display-section">
        {capturedImage && !showCamera && (
          <img src={capturedImage} alt="Captured or Uploaded" />
        )}
      </div>

      
      
      {/* Output Section */}
      {classificationData && (
        <div className="output-section">
          <h2>Classification Result</h2>
          <p>
            Mouth Condition: {classificationData.label} (Confidence: {classificationData.confidence})
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