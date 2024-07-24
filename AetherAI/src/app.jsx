import { useState } from "preact/hooks";
import ObjectDetection from "./components/ObjectDetection";
import "./app.css";

export function App() {
  //   const [count, setCount] = useState(0);

  return (
    <>
      <div className="app">
        <h1>Image Object Detection</h1>
        <ObjectDetection />
      </div>
    </>
  );
}
