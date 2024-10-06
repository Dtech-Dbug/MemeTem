import { useState, useEffect, useCallback } from "react";

// Import JSON files
import topRatedMemeTmpl from '../../Data/memeTemplates/top.json';
import TVShowsMemeTmpl from '../../Data/memeTemplates/tvshows.json';
import NSFWMemeTmpl from '../../Data/memeTemplates/nsfw.json';


// Ensure the imported data is in array format
const allMemeData = [
  ...(Array.isArray(topRatedMemeTmpl) ? topRatedMemeTmpl : []),
  ...(Array.isArray(TVShowsMemeTmpl) ? TVShowsMemeTmpl : []),
  ...(Array.isArray(NSFWMemeTmpl) ? NSFWMemeTmpl : [])
];


const useTemplateCollections = () => {
  const [memeTemplates, setMemeTemplates] = useState([]); // Displayed memes
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeme, setSelectedMeme] = useState(null);

  const memesPerPage = 50; // Number of memes to load per page

  // Lazy load images
  const loadImages = useCallback(() => {
    console.log("loadImages running");
    if (loading || !hasMore) return;

    setLoading(true);

    const startIndex = (currentPage - 1) * memesPerPage;
    const endIndex = startIndex + memesPerPage;
    const newMemes = allMemeData.slice(startIndex, endIndex);

    if (newMemes.length === 0) {
      setHasMore(false);
    } else {
      setMemeTemplates((prevMemes) => [...prevMemes, ...newMemes]);
      setCurrentPage((prevPage) => prevPage + 1);
    }

    setLoading(false);
  }, [currentPage, hasMore, loading]);

  // // Search Debounce Logic
  // const debounceSearch = useCallback((callback, delay) => {
  //   let timer;
  //   return (value) => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       callback(value);
  //     }, delay);
  //   };
  // }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setShowSuggestions(true);
  };

  const filteredMemes = allMemeData.filter((meme) =>
    meme.alt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // useEffects

  useEffect(() => {
    if (!searchQuery) {
      // Load first 50 images if search bar is empty
      setMemeTemplates([]); // Clear the current memes
      setCurrentPage(1); // Reset pagination
      setHasMore(true); // Ensure more memes can be loaded
      loadImages();
    }
  }, [loadImages, searchQuery]); // Run whenever the search query changes

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

  const handleMemeClick = (meme) => {
    setSelectedMeme(meme);
    setIsModalOpen(true);
  };

  return {
    memeTemplates,
    currentPage,
    loading,
    hasMore,
    searchQuery,
    suggestions,
    showSuggestions,
    isModalOpen,
    selectedMeme,
    handleSearchChange,
    handleClearSuggestions,
    handleKeyDown,
    handleMemeClick,
    filteredMemes,
    setSearchQuery,
    setIsModalOpen,
    loadImages,
    allMemeData
  };
}

export default useTemplateCollections;