import { motion } from 'framer-motion';
import { MdExplore } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa';
import React from 'react'
const HomePage = () => {
  return (
    <div>
 
      <div className="min-h-screen bg-black flex flex-col justify-between items-center text-white overflow-hidden relative">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="bg-gradient-to-t from-purple-900 via-black to-purple-900 opacity-80 w-full h-full absolute" />
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-1/2 bg-purple-500 rounded-full filter blur-3xl opacity-40"
          animate={{ x: [-200, 200], y: [-100, 100] }}
          transition={{
            repeat: Infinity,
            duration: 10,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-blue-500 rounded-full filter blur-3xl opacity-40"
          animate={{ x: [200, -200], y: [100, -100] }}
          transition={{
            repeat: Infinity,
            duration: 10,
            repeatType: 'reverse',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-20 space-y-8">
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          MEMETEM
        </motion.h1>
        <motion.p
          className="text-xl md:text-3xl text-gray-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Dive into the world of memes like never before.
        </motion.p>
        <motion.div
          className="relative flex items-center space-x-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
          onClick={()=>{window.location.assign("/collections")}}
            className="bg-purple-700 hover:bg-purple-800 px-8 py-4 text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Explore Memes
            <MdExplore className="inline-block ml-2" size={24} />
          </button>
          <motion.a
            href="/collections"
            className="flex items-center justify-center text-lg font-medium hover:text-purple-400"
            whileHover={{ x: 10 }}
            transition={{ duration: 0.3 }}
          >
            Collections <FaArrowRight className="ml-2" />
          </motion.a>
        </motion.div>
      </div>

      {/* Meme Cards Section */}
      <motion.div
        className="relative mb-8 z-10 grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 px-4 md:px-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Card 1 */}
        <motion.div
          className="bg-gray-900 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src="https://images7.memedroid.com/images/UPLOADED472/66fce2af7583e.webp"
            alt="Funny Meme 1"
            className="w-full h-auto object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold text-purple-500">Meme #1</h2>
            <p className="text-gray-400 mt-2">
              Let the Tech Rest.
            </p>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="bg-gray-900 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src="https://images7.memedroid.com/images/UPLOADED383/65234adf8227b.webp"
            alt="Funny Meme 2"
            className="w-full h-auto object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold text-purple-500">Meme #2</h2>
            <p className="text-gray-400 mt-2">
              True.🤣🤣🤣🤣
            </p>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className="bg-gray-900 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src="https://images3.memedroid.com/images/UPLOADED47/66e86b2cc5cfc.webp"
            alt="Funny Meme 3"
            className="w-full h-auto object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold text-purple-500">Meme #3</h2>
            <p className="text-gray-400 mt-2">
              New Superman Movie.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Parallax Image Section */}
      <motion.section
        className="relative w-full h-screen flex flex-col items-center justify-center bg-cover bg-fixed bg-center"
        style={{
          opacity:"10%",
          backgroundImage: 'url(https://plus.unsplash.com/premium_vector-1725628766863-9326cf816fe0?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center px-8">
          <motion.h2
            className="text-5xl font-bold text-white mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Explore the Best Memes
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join the world's largest meme collection, laugh hard and share the fun.
          </motion.p>
          <motion.button
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            onClick={()=>{window.location.assign("/collections")}}
          >
            Join Now
          </motion.button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-black text-gray-500 py-8">
        <div className="container mx-auto text-center">
          <p>© 2024 MEMETEM. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
    </div>
  );
}



export default HomePage;