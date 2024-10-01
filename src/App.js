import React, { useState, useEffect } from "react";
import axios from "axios";
import { MagiCCard } from "./Components/MagicCard/index";
import { FiSearch } from "react-icons/fi";
import { MdOutlineAutoFixHigh } from "react-icons/md";
import REACT_BASE_URL from './config';
import "./App.css";

function App() {
 
  const BASE_URL = "https://imgflip.com/memetemplates?sort=top-all-time";
  const [memeTemplates, setMemeTemplates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]); 
  const [showSuggestions, setShowSuggestions] = useState(true); 

  const scrapeImagesFromPage = async (page) => {
    try {
      const response = await axios.get(
        
        `${REACT_BASE_URL}/scrape?url=${encodeURIComponent(`${BASE_URL}&page=${page}`)}`
      );
      
      return response.data;
    } catch (error) {
      console.error(`Error scraping page ${page}:`, error);
      return [];
    }
  };

  const loadImages = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const memes = await scrapeImagesFromPage(currentPage);

    if (memes.length === 0) {
      setHasMore(false); 
    } else {
      setMemeTemplates((prevMemes) => [...prevMemes, ...memes]);
      setCurrentPage((prevPage) => prevPage + 1);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const loadMoreImages = () => {
    loadImages(); 
  };

  const filteredMemes = memeTemplates.filter((meme) =>
    meme.alt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (searchQuery && showSuggestions) {
      setSuggestions(filteredMemes.slice(0, 5)); 
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, filteredMemes, showSuggestions]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setShowSuggestions(false); 
    }
  };

  const handleClearSuggestions = () => {
    setShowSuggestions(false); 
    setSuggestions([]); 
  };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true); 
  };

  return (
    <div className="App">
      <header className="App-header">APP HEADER</header>

      <div className="z-50 flex justify-center my-6 relative">
        <div className="relative w-full max-w-lg">
          <FiSearch className="absolute left-3 top-3 text-gray-400" size={24} />
          <input
            type="text"
            placeholder="Search for your favorite memes..."
            className="border-2 border-gray-300 rounded-full pl-10 pr-10 py-3 w-full bg-white bg-opacity-30 backdrop-blur-md text-gray-800 focus:outline-none focus:ring-4 focus:ring-green-200 transition-all duration-300 ease-in-out shadow-lg placeholder-gray-500"
            value={searchQuery}
            onChange={handleSearchChange} 
            onKeyDown={handleKeyDown} 
          />
            <MdOutlineAutoFixHigh
              className="absolute right-3 mr-5 top-3 text-green-400 cursor-pointer"
              size={24}
              onClick={handleClearSuggestions} 
            />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="z-2 absolute top-full mt-2 w-full bg-white bg-opacity-80 backdrop-blur-lg shadow-lg rounded-lg py-2 z-10">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSearchQuery(suggestion.alt)} 
                >
                  {suggestion.alt}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Meme Templates Display */}
      <div className="Meme-template-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredMemes.length > 0 ? (
          filteredMemes.map((meme, index) => (
            <MagiCCard key={index} imageUrl={meme.src} altText={meme.alt} />
          ))
        ) : (
          <p>No memes found.</p>
        )}
      </div>

      {loading && <p>Loading...</p>}
      {hasMore && (
        <button
          onClick={loadMoreImages}
          disabled={loading}
          className="m-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default App;
