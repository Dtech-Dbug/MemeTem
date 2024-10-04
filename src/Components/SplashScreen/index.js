import React, { useEffect } from "react";
import { motion } from "framer-motion";
import JSConfetti from "js-confetti";

const letters = "MEMETEM".split(""); // Split the heading into an array of letters

const letterAnimation = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const container = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const SplashScreen = () => {
  useEffect(() => {
    // Initialize JSConfetti instance
    const jsConfetti = new JSConfetti();

    // Launch confetti with emojis
    jsConfetti.addConfetti({
      emojis: ["😂", "🤣", "😆", "😹"],
      emojiSize: 50,
      confettiNumber: 50,
    });
  }, []);

  return (
    <div className="splash-screen h-screen flex flex-col justify-center items-center bg-custom-purple text-[#CF5EC8] text-opacity-40">
      {/* Letter animation with text glass effect */}
      <motion.div
        className="flex space-x-2 text-7xl font-bold tracking-widest"
        variants={container}
        initial="initial"
        animate="animate"
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={letterAnimation}
            className="relative"
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      {/* Subtitle animation */}
      <motion.p
        className="splash-subtitle text-xl font-light mt-4 text-gray-300 animate-pulse"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
      >
        Loading your experience...
      </motion.p>
    </div>
  );
};

export default SplashScreen;
