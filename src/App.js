import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CollectionsPage from './Pages/TemplateCollections/index';
import WorkInProgress from "./Components/workInProgress/workInProgress";
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
        sessionStorage.setItem("splashShown", "true"); 
      }, 3000); 

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
            <Route path="/working" element={<WorkInProgress/>}/>
          </Routes>
        )}
      </div>
    </div>
  </Router>
  );
}  

export default App;
