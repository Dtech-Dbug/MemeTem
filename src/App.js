import "./App.css";
import { useEffect, useState } from "react";
import HomePage from "./Pages/HomePage";
import SplashScreen from "./Components/SplashScreen";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the splash screen has already been shown during this session
    const splashShown = sessionStorage.getItem("splashShown");

    if (splashShown) {
      setLoading(false); // If splash screen was shown, don't show it again
    } else {
      // Show splash screen for the first time during this session
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("splashShown", "true"); // Set flag so it doesn't show again in this session
      }, 3000); // Adjust your splash screen duration

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="App">
      {loading ? <SplashScreen /> : <HomePage />}
    </div>
  );
}

export default App;
