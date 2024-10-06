import { useEffect, useState } from "react";
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
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const confettiShown = sessionStorage.getItem("confettiShown");
    if (!confettiShown) {
      setShowConfetti(true);
      sessionStorage.setItem("confettiShown", "true");
    }
  }, []);

  useEffect(() => {
    if (showConfetti) {
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti({
        emojis: ["😂", "🤣", "😆", "😹"],
        emojiSize: 50,
        confettiNumber: 50,
      });
    }
  }, [showConfetti]);

  return { letterAnimation, container, showConfetti };
};

export default useSplashScreen;