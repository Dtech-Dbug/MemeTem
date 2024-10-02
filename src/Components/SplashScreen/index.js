import React from 'react';
import { motion } from 'framer-motion';

const letters = "MEMETEM".split(""); // Split the heading into an array of letters

const letterAnimation = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5, ease: 'easeOut' }
};

const container = {
    animate: {
        transition: {
            staggerChildren: 0.15
        }
    }
};

const SplashScreen = () => {
    return (
        <div className="splash-screen h-screen flex flex-col justify-center items-center bg-blue-500 text-white">
            {/* Letter animation */}
            <motion.div
                className="flex space-x-2 text-6xl font-bold tracking-widest"
                variants={container}
                initial="initial"
                animate="animate"
            >
                {letters.map((letter, index) => (
                    <motion.span key={index} variants={letterAnimation}>
                        {letter}
                    </motion.span>
                ))}
            </motion.div>

            {/* Subtitle animation */}
            <motion.p
                className="splash-subtitle text-xl font-light mt-4 text-gray-300 animate-pulse"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1.5, ease: 'easeOut' }}
            >
                Loading your experience...
            </motion.p>
        </div>
    );
};

export default SplashScreen;
