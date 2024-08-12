import React, { useEffect, useState } from "react";
import Tesseract from "tesseract.js";

const TextRecognition = ({ selectedImage }) => {
  const [recognizedText, setRecognizedText] = useState("");

  useEffect(() => {
    const recognizeText = async () => {
      if (selectedImage) {
        try {
          const result = await Tesseract.recognize(selectedImage, "eng", {
            logger: (info) => console.log(info), // Optional: logs progress
          });
          setRecognizedText(result.data.text);
        } catch (error) {
          console.error("OCR error: ", error);
          setRecognizedText("Error recognizing text.");
        }
      }
    };
    recognizeText();
  }, [selectedImage]);

  return (
    <div>
      <h2>Recognized Text:</h2>
      <p>{recognizedText}</p>
    </div>
  );
};

export default TextRecognition;
