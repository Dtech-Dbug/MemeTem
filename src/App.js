import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CollectionsPage from './Pages/CollectionsPage';
import HomePage from './Pages/HomePage';
import SplashScreen from "./Components/SplashScreen";
import Navbar from './Components/navs/navbar'
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
    <Router>
    <div className="App">
      <Navbar />
      <div className="container mx-auto">
        {loading ? (
          <SplashScreen />
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections" element={<CollectionsPage />} />
          </Routes>
        )}
      </div>
    </div>
  </Router>
  );
}  

export default App;
