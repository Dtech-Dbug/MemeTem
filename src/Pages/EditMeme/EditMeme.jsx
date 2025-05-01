import useEditMeme from "./useEditMeme";
import './EditMeme.css'; // Assuming you have a CSS file for styles

const EditMeme = () => {
    const { canvasRef, handleAddText, handleColorChange, handleDownload } = useEditMeme();
    return (
        <div className="flex flex-row w-full h-screen p-4 box-border gap-4">
            {/* Canvas Area */}
            <div className="flex-1 flex justify-center items-center bg-gray-100 rounded-lg">
                <canvas ref={canvasRef} className="rounded-lg shadow-md border border-gray-300" />
            </div>

            {/* Edit Options */}
            <div className="w-80 p-4 bg-white shadow-md border rounded-lg flex flex-col gap-4">
                <h2 className="text-lg font-bold">Edit Options</h2>
                <hr />
                <button onClick={handleAddText} className="px-4 py-2 text-white rounded primary-color">
                    + Add Text
                </button>
                <hr/>
                {/* font changes */}
                <label className="text-sm font-medium custom-label-container">
                    Change Text Color:
                    <input type="color" className="custom-color-picker" onChange={handleColorChange} />
                </label>
                {/*  more controls like font size, position, etc. */}

                {/* footer for dload button  */}
                <button onClick={handleDownload} className="px-4 py-2 text-white rounded secondary-color mt-auto">
                    Download
                </button>
            
            </div>
        </div>
    );
};

export default EditMeme;
