// import { render } from "preact";
// import App from "./app.jsx";
// import "./index.css";

// render(<App />, document.getElementById("app"));

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./index.css"; // Make sure you have your global styles

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
