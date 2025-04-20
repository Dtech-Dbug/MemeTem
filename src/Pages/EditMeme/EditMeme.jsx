import useEditMeme from "./useEditMeme";

const EditMeme = () => {
    const { canvasRef, handleAddText } = useEditMeme();
    return (
        <div className="flex flex-row w-full h-screen p-4 box-border gap-4">
            {/* Canvas Area */}
            <div className="flex-1 flex justify-center items-center bg-gray-100 rounded-lg">
                <canvas ref={canvasRef} className="rounded-lg shadow-md border border-gray-300" />
            </div>

            {/* Edit Options */}
            <div className="w-80 p-4 bg-white shadow-md border rounded-lg flex flex-col gap-4">
                <h2 className="text-lg font-bold">Edit Options</h2>
                <button onClick={handleAddText} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    + Add Text
                </button>
                <label className="text-sm font-medium">
                    Change Text Color:
                    <input type="color" className="ml-2" />
                </label>
                {/*  more controls like font size, position, etc. */}
            </div>
        </div>
    );
};

export default EditMeme;
