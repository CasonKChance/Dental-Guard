import React, { useState, useEffect } from "react";
import "./App.css";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import Image1 from "./bannerBG.jpg";
import Image2 from "./aboutImage2.jpg";

const App = () => {
  useEffect(() => {
    document.title = "DentalGuard";
  }, []);

  const [classificationData, setClassificationData] = useState({
    disease: "",
    description: "",
    treatment: "",
    links: [],
    confidence_level: null,
  });

  const [cameraStream, setCameraStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Correctly define the imageFile state and its setter

  const [showCamera, setShowCamera] = useState(false);

  const handleTakePhoto = (dataUri) => {
    setCapturedImage(dataUri);
    // Convert dataUri to a file object
    const blob = dataURItoBlob(dataUri);
    const file = new File([blob], "captured-image.jpg", { type: "image/jpeg" });
    setImageFile(file); // Store the file object for later submission
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the capturedImage for display
        setCapturedImage(reader.result);
        // Set the imageFile for submission
        setImageFile(file); // Ensure this line correctly sets the file
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to convert dataURI to Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const handleSubmit = () => {
    if (!imageFile) {
      // Make sure there's an image file to send
      alert("Please select or capture an image first.");
      return;
    }

    // Create FormData and append the file
    const formData = new FormData();
    formData.append("file", imageFile);

    // Define the URL of the backend endpoint
    const url = "http://localhost:8000/classify";

    // Submit the FormData
    fetch(url, {
      method: "POST",
      body: formData, // No need to set Content-Type header when using FormData
    })
      .then((response) => response.json())
      .then((data) => {
        setClassificationData(data);
      })
      .catch((error) => {
        console.error("Error submitting image:", error);
      });
  };

  const handleCaptureToggle = () => {
    setShowCamera(!showCamera);
    if (!showCamera) {
      setCapturedImage(null);
    }
  };

  const handleTryNow = () => {
    const demoSection = document.getElementById("demoNow");
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" });
    }
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

  return (
    <div className="app-container">
      {/* Banner Section */}
      <div className="banner-container">
        <h1 className="title">DentalGuard</h1>
        <p className="title">AI Oral Hygiene Detector</p>
        <button className="banner-btn" onClick={handleTryNow}>
          Try Now
        </button>
      </div>

      {/* About Us Section */}
      <div className="aboutus-container">
        <div className="aboutus-content">
          {/* Images on the Left */}
          <div className="image-stack">
            <img src={Image1} alt="About Us 1" />
            <img src={Image2} alt="About Us 2" />
          </div>

          {/* Text on the Right */}
          <div className="text-content">
            <h2>
              About <span className="inlineStyle">Us</span>
            </h2>
            <h4>
              <span className="inlineStyle">DentalGuard</span> is the first AI
              Oral Hygiene Detection Software
            </h4>
            <p>
              DentalGuard is a fully-functionial AI oral hygiene detection
              software built for low income communities with minimal or reduced
              access to healthcare facilities. DentalGuard can be used to
              identify over 20 mouth diseases and give real-time data informing
              users on the condition of their oral health. Snap a picture and
              DentalGuard AI will provide oral hygiene analysis and provide both
              treatment advice and hygiene descriptions based on user input.
            </p>
          </div>
        </div>
      </div>

      <div className="instructions-section">
        <h2>
          <span className="inlineStyle">Wondering</span> how to take a good
          picture?
        </h2>
        <ul>
          <li>Ensure the area is well-lit, using natural light if possible.</li>
          <li>
            Open your mouth wide enough to clearly show the area of interest.
          </li>
          <li>
            Consider having a friend take the picture to ensure steady and clear
            shots.
          </li>
          <li>
            Avoid blurry images by holding the camera still and using the
            auto-focus feature.
          </li>
        </ul>
      </div>

      {/* Image Upload Section */}
      <div className="image-upload-section" id="demoNow">
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <h2>
          Input Image <span className="inlineStyle">File</span> or Take Picture
        </h2>
        <p>Test Our Product Below</p>
        <button
          htmlFor="imageUpload"
          className="upload-btn"
          onClick={() => document.querySelector('input[type="file"]').click()}
        >
          Select Image
        </button>
        <button
          htmlFor="imageUpload"
          className="submit-btn"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button className="capture-btn" onClick={handleCaptureToggle}>
          {showCamera
            ? "Close Camera"
            : capturedImage
            ? "Retake Photo"
            : "Capture from Camera"}
        </button>
      </div>

      {/* Ensure the Camera Overlay is correctly toggled */}
      {showCamera && (
        <div className="camera-overlay">
          <Camera
            onTakePhotoAnimationDone={handleTakePhoto}
            isFullscreen={false}
          />
        </div>
      )}

      {/* Corrected Image Display Section */}
      <div className="image-display-section">
        {capturedImage && !showCamera && (
          <img src={capturedImage} alt="Captured or Uploaded" />
        )}
      </div>

      {/* Output Section */}
      {classificationData.disease && (
        <div className="output-section">
          <h2>Classification Result</h2>
          <p>
            Mouth Condition: {classificationData.disease} (Confidence:{" "}
            {classificationData.confidence_level && (
              <span className="inlineStyle">
                {classificationData.confidence_level}%
              </span>
            )}
            )
          </p>
        </div>
      )}

      {/* Description and Treatment Recommendations Section */}
      {classificationData.description &&
        classificationData.treatment &&
        classificationData.links && (
          <div className="disease-info-section">
            <h2>{classificationData.disease} Information</h2>
            <p>{classificationData.description}</p>
            <h3>Treatment Recommendations</h3>
            <p>{classificationData.treatment}</p>
            {classificationData.links &&
              classificationData.links.length > 0 && (
                <div className="disease-info-links">
                  <h3>Helpful Links</h3>
                  {classificationData.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.title}
                    </a>
                  ))}
                </div>
              )}
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
