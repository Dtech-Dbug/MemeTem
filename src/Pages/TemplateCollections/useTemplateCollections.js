import { useState, useEffect, useCallback, useContext } from "react";
import {AppCtxProvider} from '../../provider';

// Import JSON files
import topRatedMemeTmpl from '../../Data/memeTemplates/top.json';
import TVShowsMemeTmpl from '../../Data/memeTemplates/tvshows.json';
import NSFWMemeTmpl from '../../Data/memeTemplates/nsfw.json';


// Ensure the imported data is in array format 
// add an id = needed in edit by index page
const allMemeData = [
  ...(Array.isArray(topRatedMemeTmpl) ? topRatedMemeTmpl : []),
  ...(Array.isArray(TVShowsMemeTmpl) ? TVShowsMemeTmpl : []),
  ...(Array.isArray(NSFWMemeTmpl) ? NSFWMemeTmpl : [])
].map((meme, index) => ({ ...meme, id: index + 1 }));



const useTemplateCollections = () => {
  const [memeTemplates, setMemeTemplates] = useState([]); // Displayed memes
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeme, setSelectedMeme] = useState(null);

  const { currentPage } = useContext(AppCtxProvider); 

  const memesPerPage = 50;

  // Lazy load images
  const loadImages = useCallback(() => {
    console.log("loadImages running", {currentPage});
    if (loading || !hasMore) return;

    setLoading(true);

    const startIndex = (currentPage - 1) * memesPerPage;
    const endIndex = startIndex + memesPerPage;
    console.log({startIndex, endIndex, currentPage})
    const newMemes = allMemeData.slice(startIndex, endIndex);

    if (newMemes.length === 0) {
      setHasMore(false);
    } else {
      setMemeTemplates((prevMemes) => [...prevMemes, ...newMemes]);
    }
    setLoading(false);
  }, [hasMore, currentPage]);

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
      loadImages();
    }
  }, [searchQuery, loadImages]);

  useEffect(() => {
    if (searchQuery && showSuggestions) {
      setSuggestions(filteredMemes.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, showSuggestions]);

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
    console.log('meme clicked--->', meme)
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