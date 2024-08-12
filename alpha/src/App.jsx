// src/App.jsx
import React, { useState } from "react";
import LiveTextRecognition from "./LiveTextRecognition";
import ARScene from "./ARscene"; // Ensure the path is correct

const App = () => {
  const [recognizedText, setRecognizedText] = useState("");

  return (
    <div>
      <h1>Live Text Recognition and AR</h1>
      <LiveTextRecognition onTextRecognized={setRecognizedText} />
      <ARScene recognizedText={recognizedText} />
    </div>
  );
};

export default App;
