// MemeModal.js
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { saveAs } from "file-saver";
import { Canvas, FabricImage, IText } from "fabric"
import { useNavigate } from "react-router-dom";
import { canvas } from "framer-motion/client";

const MemeModal = ({ isOpen, onClose, meme }) => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen || !meme) return null;

  const handleDownload = () => {
    saveAs(meme.src, `${meme.alt || "meme"}.jpg`);
  };

  const handleEdit = () => {
    navigate(`/edit/${meme.id}`); // Navigate to edit page
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70"
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6"
      >
        <button
          onClick={() => {
            setIsEditing(false);  // Reset editing state on close
            onClose();
          }}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition duration-200 z-10"
        >
          <AiOutlineClose size={24} />
        </button>


        <img
          src={meme.src}
          alt={meme.alt}
          className="max-w-full max-h-[60vh] object-contain rounded-lg mb-4"
        />


        <h2 className="text-xl font-semibold mb-2 text-center">{meme.alt}</h2>
        <div className="flex flex-col gap-3">
          <div className="flex gap-4">
            <button onClick={handleDownload} className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
              {isEditing ? "Download Edited Meme" : "Download Meme"}
            </button>
            <button onClick={handleEdit} className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
              {isEditing ? "Cancel Editing" : "Edit Meme"}
            </button>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default MemeModal;


