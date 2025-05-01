import useEditMeme from "./useEditMeme";
import "./EditMeme.css"; // Assuming you have a CSS file for styles

const EditMeme = () => {
  const {
    canvasRef,
    handleAddText,
    handleColorChange,
    handleDownload,
    handleAddShape,
    disableFreeDrawing,
    enableFreeDrawing,
    setBrushSize,
    brushSize,
    isDrawingMode,
  } = useEditMeme();
  return (
    <div className="flex flex-row w-full h-screen p-4 box-border gap-4">
      {/* Canvas Area */}
      <div className="flex-1 flex justify-center items-center bg-gray-100 rounded-lg">
        <canvas
          ref={canvasRef}
          className="rounded-lg shadow-md border border-gray-300"
        />
      </div>

      {/* Edit Options */}
      <div className="w-80 p-4 bg-white shadow-md border rounded-lg flex flex-col gap-4">
        <h2 className="text-lg font-bold">Edit Options</h2>
        <button
          onClick={handleAddText}
          className="px-4 py-2 text-white rounded primary-color"
        >
          + Add Text
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 text-white rounded secondary-color"
        >
          Download
        </button>
        <label className="text-sm font-medium custom-label-container">
          Change Text Color:
          <input
            type="color"
            className="custom-color-picker"
            onChange={handleColorChange}
          />
        </label>
        <label className="text-sm font-medium custom-label-container">
          Add Shape:
          <select
            className="custom-shape"
            onChange={(e) => handleAddShape(e.target.value)}
          >
            <option value="">-- Select Shape --</option>
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
            <option value="cloud">Cloud</option>
          </select>
        </label>
        {/* <h3 className="text-md font-semibold">Draw any shape</h3> */}

        <label className="text-sm font-medium custom-label-container">
          Brush Size:
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-full"
          />
        </label>

        <div className="flex gap-2">
          {!isDrawingMode ? (
            <button
              onClick={enableFreeDrawing}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Start Drawing
            </button>
          ) : (
            <button
              onClick={disableFreeDrawing}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Stop Drawing
            </button>
          )}
        </div>
        {/*  more controls like font size, position, etc. */}
      </div>
    </div>
  );
};

export default EditMeme;
