import React, { useState } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import { FiTrendingUp } from 'react-icons/fi';
import { MdExplore } from "react-icons/md";
import { HiMiniHome } from "react-icons/hi2";
import { BsCollectionFill } from "react-icons/bs";

import { motion } from 'framer-motion';
import { GiCardJoker } from "react-icons/gi";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-indigo-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Branding */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={()=>{window.location.assign("/")}}
          >
            <GiCardJoker className="text-3xl" />
            <span className="ml-2 font-bold text-2xl tracking-wide">
              MEMETEM
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.a
              whileHover={{ scale: 1.1 }}
              onClick={()=>{window.location.assign("/")}}
              className="px-3 gap-1 py-2 flex items-center rounded-md text-lg font-medium transition-all duration-300 hover:bg-blue-700 cursor-pointer"          >
              <HiMiniHome/>Home
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              onClick={()=>{window.location.assign("/working")}}
              className="px-3 gap-1 py-2 flex items-center rounded-md text-lg font-medium transition-all duration-300 hover:bg-blue-700 cursor-pointer" 
            >
              <FiTrendingUp/>Trending
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              onClick={()=>{window.location.assign("/collections")}}
              className="px-3 gap-1 py-2 flex items-center rounded-md text-lg font-medium transition-all duration-300 hover:bg-blue-700 cursor-pointer" 
            >
              <BsCollectionFill/>Collections
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              onClick={()=>{window.location.assign("/working")}}
              className="px-3 gap-1 py-2 flex items-center rounded-md text-lg font-medium transition-all duration-300 hover:bg-blue-700 cursor-pointer"            >
              <MdExplore />Explore 
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={handleToggle}
              className="text-2xl focus:outline-none"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="md:hidden mt-4 space-y-2"
          >
            <a
              href="/"
              className="block px-4 py-2 rounded-md text-lg font-medium transition-all duration-300 hover:bg-blue-700"
            >
              Home
            </a>
            <a
              href="/trending"
              className="block px-4 py-2 rounded-md text-lg font-medium transition-all duration-300 hover:bg-blue-700"
            >
              Trending
            </a>
            <a
              href="/collections"
              className="block px-4 py-2 rounded-md text-lg font-medium transition-all duration-300 hover:bg-blue-700"
            >
              Collections
            </a>
            <a
              href="/collections"
              className="block px-4 py-2 rounded-md text-lg font-medium transition-all duration-300 hover:bg-blue-700"
            >
              Explore
            </a>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
