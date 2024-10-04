import { useEffect } from "react";
import JSConfetti from "js-confetti";

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

const useSplashScreen = () => {
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

  return { letterAnimation, container };
};

export default useSplashScreen;
