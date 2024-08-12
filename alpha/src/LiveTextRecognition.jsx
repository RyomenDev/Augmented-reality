import React, { useRef, useState, useEffect } from "react";
import Tesseract from "tesseract.js";

// Function to check if text is a single letter A-Z
const isSingleLetter = (text) => {
  const regex = /^[A-Za-z]$/;
  return regex.test(text);
};

const LiveTextRecognition = ({ onLetterRecognized }) => {
  const [recognizedLetter, setRecognizedLetter] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null); // To hold the video stream

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          streamRef.current = stream; // Store stream reference for cleanup
        }
      } catch (error) {
        console.error("Error accessing the camera: ", error);
      }
    };

    startVideo();

    return () => {
      // Cleanup the video stream on component unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const processFrame = async () => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          console.error("Cannot get canvas context");
          return;
        }

        const width = video.videoWidth;
        const height = video.videoHeight;

        if (width === 0 || height === 0) {
          console.error("Video dimensions are not available");
          return;
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(video, 0, 0, width, height);

        try {
          const result = await Tesseract.recognize(canvas, "eng", {
            // logger: (info) => console.log(info), // Optional: logs progress
          });

          const { text, words } = result.data;

          console.log("Recognized Words:", words); // Log all recognized words

          // Extract letters from recognized text
          const filteredLetters = words.filter((word) => {
            const bbox = word.bbox;
            console.log("Word Bounding Box:", bbox); // Log bounding box for each word
            return isSingleLetter(word.text);
          });

          if (filteredLetters.length > 0) {
            // Only take the first valid letter found
            const firstLetter = filteredLetters[0].text;
            setRecognizedLetter(firstLetter);
            console.log("Filtered Recognized Letter:", firstLetter); // Log filtered letter
            onLetterRecognized(firstLetter); // Pass letter to AR component
          } else {
            console.log("No valid letter found");
          }
        } catch (error) {
          console.error("OCR error: ", error);
        }
      }
    };

    const interval = setInterval(processFrame, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [onLetterRecognized]);

  return (
    <div>
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default LiveTextRecognition;
