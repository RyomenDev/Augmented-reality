import { useEffect, useRef, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

const ObjectDetection = () => {
  const [predictions, setPredictions] = useState([]);
  const videoRef = useRef(null);
  const [isWebcamStarted, setIsWebcamStarted] = useState(false);
  const [model, setModel] = useState(null);

  useEffect(() => {
    // Load the model when the component mounts
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

  const predictObject = async () => {
    if (model && videoRef.current) {
      model
        .detect(videoRef.current)
        .then((predictions) => {
          setPredictions(predictions);
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
        {predictions.length > 0 &&
          predictions.map((prediction, index) => (
            <div key={index}>
              <p
                style={{
                  position: "absolute",
                  left: `${prediction.bbox[0]}px`,
                  top: `${prediction.bbox[1]}px`,
                  width: `${prediction.bbox[2] - 100}px`,
                  background: "rgba(255, 255, 255, 0.7)",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                {prediction.class +
                  " - " +
                  Math.round(prediction.score * 100) +
                  "% confidence"}
              </p>
              <div
                className="marker"
                style={{
                  position: "absolute",
                  left: `${prediction.bbox[0]}px`,
                  top: `${prediction.bbox[1]}px`,
                  width: `${prediction.bbox[2]}px`,
                  height: `${prediction.bbox[3]}px`,
                  border: "2px solid red",
                }}
              />
            </div>
          ))}
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
