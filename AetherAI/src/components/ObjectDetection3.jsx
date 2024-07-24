import "../css/card.css";
import { useEffect, useRef, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

// const UNSPLASH_API_KEY = "YOUR_UNSPLASH_API_KEY"; // Replace with your Unsplash API key
const UNSPLASH_API_KEY = "tBM14o9tfvarzQBIaM-NVHHDLG6c_v1jPQL51DM1Euo";
const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";

const ObjectDetection = () => {
  const [predictions, setPredictions] = useState([]);
  const [images, setImages] = useState({});
  const videoRef = useRef(null);
  const [isWebcamStarted, setIsWebcamStarted] = useState(false);
  const [model, setModel] = useState(null);

  useEffect(() => {
    cocoSsd.load().then((loadedModel) => {
      setModel(loadedModel);
    });
  }, []);

  useEffect(() => {
    let detectionInterval;

    if (isWebcamStarted) {
      detectionInterval = setInterval(predictObject, 500);
    } else if (detectionInterval) {
      clearInterval(detectionInterval);
    }

    return () => {
      if (detectionInterval) {
        clearInterval(detectionInterval);
      }
    };
  }, [isWebcamStarted]);

  const fetchUnsplashImages = async (query) => {
    try {
      const response = await fetch(
        `${UNSPLASH_API_URL}?query=${query}&client_id=${UNSPLASH_API_KEY}`
      );
      const data = await response.json();
      return data.results.map((result) => result.urls.small);
    } catch (error) {
      console.error("Error fetching images from Unsplash:", error);
      return [];
    }
  };

  const predictObject = async () => {
    if (model && videoRef.current) {
      model
        .detect(videoRef.current)
        .then(async (predictions) => {
          setPredictions(predictions);
          const updatedImages = {};
          for (const prediction of predictions) {
            const images = await fetchUnsplashImages(prediction.class);
            updatedImages[prediction.class] = images[0] || ""; // Use the first image URL for each detected object
          }
          setImages(updatedImages);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setIsWebcamStarted(true);
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const stopWebcam = () => {
    const video = videoRef.current;

    if (video) {
      const stream = video.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      video.srcObject = null;
      setPredictions([]);
      setImages({});
      setIsWebcamStarted(false);
    }
  };

  return (
    <div className="object-detection">
      <div className="buttons">
        <button onClick={isWebcamStarted ? stopWebcam : startWebcam}>
          {isWebcamStarted ? "Stop" : "Start"} Webcam
        </button>
      </div>
      <div className="feed">
        {isWebcamStarted ? <video ref={videoRef} autoPlay muted /> : <div />}
        {predictions.length > 0 && (
          <div className="image-cards">
            {Object.keys(images).map((key) => (
              <div className="card" key={key}>
                <h4>{key}</h4>
                <img src={images[key]} alt={key} />
              </div>
            ))}
          </div>
        )}
      </div>
      {predictions.length > 0 && (
        <div>
          <h3>Predictions:</h3>
          <ul>
            {predictions.map((prediction, index) => (
              <li key={index}>
                {`${prediction.class} (${(prediction.score * 100).toFixed(
                  2
                )}%)`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ObjectDetection;
