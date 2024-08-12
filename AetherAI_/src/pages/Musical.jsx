import React from "react";
import { useNavigate } from "react-router-dom";
import Music from "../components/Music";
import "../css/Musical.css";

const Musical = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="musical-container">
      <div className="musical-box">
        <button className="close-button" onClick={handleClose}>
          X
        </button>
        <h1>Musical</h1>
        <Music />
      </div>
    </div>
  );
};

export default Musical;
