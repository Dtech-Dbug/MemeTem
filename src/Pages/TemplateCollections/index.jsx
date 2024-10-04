import { MagiCCard } from "../../Components";
import { FiSearch } from "react-icons/fi";
import { MdOutlineAutoFixHigh } from "react-icons/md";
import MemeModal from "../../Components/modals/mememodal";
import useTemplateCollections from "./useTemplateCollections";

const CollectionPage = () => {
  const {
    memeTemplates,
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
  } = useTemplateCollections();


  return (
    <div className="App">
      <div className="z-50 flex justify-center my-6 relative">
        <div className="relative w-full max-w-lg">
          <FiSearch className="absolute left-3 top-3 text-gray-400" size={24} />
          <input
            type="text"
            placeholder="Search for your favorite memes..."
            className="border-2 border-gray-300 rounded-full pl-10 pr-10 py-3 w-full bg-white bg-opacity-30 backdrop-blur-md text-gray-800 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 ease-in-out shadow-lg placeholder-gray-500"
            onChange={(e) => handleSearchChange(e.target.value)} // Using debounce for search
            onKeyDown={handleKeyDown}
          />
          <MdOutlineAutoFixHigh
            className="absolute right-3 mr-5 top-3 text-green-400 cursor-pointer"
            size={24}
            onClick={handleClearSuggestions}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute top-full mt-2 w-full bg-white bg-opacity-80 backdrop-blur-lg shadow-lg rounded-lg py-2 z-10">
              {suggestions?.map((suggestion, index) => (
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
        {searchQuery ? (
          filteredMemes.length > 0 ? (
            filteredMemes?.map((meme, index) => (
              <div key={index} onClick={() => handleMemeClick(meme)}>
                <MagiCCard imageUrl={meme.src} altText={meme.alt} />
              </div>
            ))
          ) : (
            <p>No memes found.</p>
          )
        ) : (
          memeTemplates?.map((meme, index) => (
            <div key={index} onClick={() => handleMemeClick(meme)}>
              <MagiCCard imageUrl={meme.src} altText={meme.alt} />
            </div>
          ))
        )}
      </div>

      {loading && <p>Loading...</p>}
      {hasMore && (
        <button
          onClick={loadImages}
          disabled={loading}
          className="m-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Load More
        </button>
      )}

      {/* Meme Modal */}
      <MemeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        meme={selectedMeme}
      />
    </div>
  );
};

export default CollectionPage;
