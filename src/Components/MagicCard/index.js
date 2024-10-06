import "./index.css";
import { MdExpandMore } from "react-icons/md";

export const MagiCCard = ({ imageUrl, altText }) => {

  return (
    <div className="relative group card">
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-auto rounded-lg shadow-md"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <MdExpandMore className="absolute top-3 right-3 text-2xl" /><h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 via-cyan-500 to-cyan-900 mb-2">
          MEMETEM
        </h3>
        <span className="p-2 text-lg font-light">{altText}</span>
      </div>

    </div>
  );
};
