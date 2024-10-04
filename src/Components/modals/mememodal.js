// MemeModal.js
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import {saveAs} from "file-saver"
const MemeModal = ({ isOpen, onClose, meme }) => {
  useEffect(() => {
    // Prevent scrolling of the body when the modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen || !meme) return null;

  const handleDownload = () => {
    saveAs(meme.src, `${meme.alt || 'meme'}.jpg`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-end p-4 justify-center z-50 bg-black bg-opacity-70"
    >
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6"
      >
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition duration-200 z-10"
        >
          <AiOutlineClose size={24} />
        </button>
        <img src={meme.src} alt={meme.alt} className="max-w-full max-h-[60vh] object-contain rounded-lg mb-4" />
        <h2 className="text-xl font-semibold mb-2 text-center">{meme.alt}</h2>
        <button
          onClick={handleDownload}
          className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Download Meme
        </button>
      </motion.div>
    </motion.div>
  );
};

export default MemeModal;
