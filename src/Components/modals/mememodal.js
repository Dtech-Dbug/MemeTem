// MemeModal.js
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { saveAs } from "file-saver";
import { StaticCanvas, FabricImage } from "fabric";

const MemeModal = ({ isOpen, onClose, meme }) => {
  const canvasRef = useRef(null);
  const canvasInstanceRef = useRef(null);  // Store canvas instance reference
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const controller = new AbortController();
    const { signal } = controller;

    const initializeCanvas = async () => {
      if (isOpen && isEditing && canvasRef.current) {
        // Cleanup previous canvas
        if (canvasInstanceRef.current) {
          canvasInstanceRef.current.clear();
          canvasInstanceRef.current.dispose();
        }

        const canvas = new StaticCanvas(canvasRef.current, {
          width: 500,
          height: 500,
        });

        canvasInstanceRef.current = canvas;  // Store reference

        try {
          const img = await FabricImage.fromURL(meme.src);
          if (!signal.aborted) {  // Only add image if not aborted
            img.scaleToWidth(500);
            img.scaleToHeight(500);
            canvas.add(img);
            canvas.renderAll();
          }
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error("Failed to load image:", error);
          }
        }
      }
    };

    initializeCanvas();

    // Cleanup
    return () => {
      controller.abort();  // Abort async operations
      if (canvasInstanceRef.current) {
        canvasInstanceRef.current.clear();
        canvasInstanceRef.current.dispose();
        canvasInstanceRef.current = null;  // Reset reference
      }
    };
  }, [isOpen, isEditing, meme]);

  if (!isOpen || !meme) return null;

  const handleDownload = () => {
    if (isEditing && canvasInstanceRef.current) {
      const editedMeme = canvasInstanceRef.current.toDataURL({
        format: "jpeg",
        quality: 0.9,
      });
      saveAs(editedMeme, `${meme.alt || "meme"}.jpg`);
    } else {
      saveAs(meme.src, `${meme.alt || "meme"}.jpg`);
    }
  };

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
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
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition duration-200 z-10"
        >
          <AiOutlineClose size={24} />
        </button>

        {isEditing ? (
          <canvas ref={canvasRef} className="w-full h-96 border rounded-lg" />
        ) : (
          <img
            src={meme.src}
            alt={meme.alt}
            className="max-w-full max-h-[60vh] object-contain rounded-lg mb-4"
          />
        )}

        <h2 className="text-xl font-semibold mb-2 text-center">{meme.alt}</h2>

        <div className="flex gap-4">
          <button
            onClick={handleDownload}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            {isEditing ? "Download Edited Meme" : "Download Meme"}
          </button>

          <button
            onClick={handleEdit}
            className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
          >
            {isEditing ? "Cancel Editing" : "Edit Meme"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MemeModal;


