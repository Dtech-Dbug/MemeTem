import React, { useState } from "react";
import "./index.css";

export const MagiCCard = ({ imageUrl, altText }) => {
  const [showDownload, setShowDownload] = useState(false);

  const handleCardClick = () => {
    setShowDownload(!showDownload);
  };

  const handleDownload = (event) => {
    event.stopPropagation();
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "magic-card.jpg"; 
    link.click();
  };

  return (
    <div className="relative group card">
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-auto rounded-lg shadow-md"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="p-2">{altText}</span> 
      </div>
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          showDownload ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          className="download-button bg-blue-500 text-white p-2 rounded"
          onClick={handleDownload}
        >
          <i className="fas fa-download"></i>
        </button>
      </div>
    </div>
  );
};