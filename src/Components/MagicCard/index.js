import React, { useState } from "react";
import "./index.css";

export const MagiCCard = ({ imageUrl }) => {
  const [showDownload, setShowDownload] = useState(false);

  const handleCardClick = () => {
    setShowDownload(!showDownload);
  };

  const handleDownload = (event) => {
    event.stopPropagation(); // Prevent the card click event from firing
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "magic-card.jpg"; // Set the filename
    link.click();
  };

  return (
    <div
      className={`card ${showDownload ? 'card-blurred' : ''}`}
      onClick={handleCardClick}
    >
      <img src={imageUrl} alt="Magic Card" />
      <div className={`card-info ${showDownload ? 'show' : ''}`}>
        <button className="download-button" onClick={handleDownload}>
          <i className="fas fa-download"></i>
        </button>
      </div>
    </div>
  );
};
