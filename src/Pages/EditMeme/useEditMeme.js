import { useEffect, useRef , useState} from "react";
import { useParams } from "react-router-dom";
import { Canvas, FabricImage, IText } from "fabric";
import useTemplateCollections from "../../Pages/TemplateCollections/useTemplateCollections";
import { deleteControl } from "./utils";

const useEditMeme = () => {
    const { id } = useParams();
    const { memeTemplates } = useTemplateCollections();
    const selectedMeme = memeTemplates.find(meme => meme.id === parseInt(id));

    const [textValue,] = useState("Edit me")

    const canvasRef = useRef(null);
    const canvasInstanceRef = useRef(null);
    const textRef = useRef(null)

    const handleAddText = () => {
        console.log('addTexg')
        if (canvasInstanceRef.current) {
            const canvas = canvasInstanceRef.current;

            const text = new IText(textValue, {
                left: 50,
                top: 50,
                fontSize: 24,
                fill: "white",
                editable: true,
                hasControls: true,
                selectable: true,
                textAlign: 'left',
            });

            text.controls.deleteControl = deleteControl

            canvas.add(text);
            // canvas.setActiveObject(text);;
            console.log('active', canvas)
            canvas.renderAll();

            textRef.current = text; // Store ref to last added text

        }
        console.log('else', { canvasInstanceRef: canvasInstanceRef, canvasRef: canvasRef })
    };

    const handleColorChange = (e) => {
        if (canvasInstanceRef.current){
            const canvas = canvasInstanceRef.current;
            console.log('handleColorChange', e.target.value)
            console.log('textRef', textRef.current)
            textRef.current.set({fill: e.target.value});
            canvas.renderAll();
        }
    }
    
    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const initializeCanvas = async () => {
            if (canvasRef.current) {
                if (canvasInstanceRef.current) {
                    canvasInstanceRef.current.clear();
                    canvasInstanceRef.current.dispose();
                }

                const canvas = new Canvas(canvasRef.current, {
                    width: 500,
                    height: 500,
                });

                canvasInstanceRef.current = canvas;

                try {
                    const img = await FabricImage.fromURL(selectedMeme.src);
                    if (!signal.aborted) {
                        const maxWidth = canvas.getWidth();
                        const maxHeight = canvas.getHeight();
                        const scale = Math.min(maxWidth / img.width, maxHeight / img.height);

                        img.scale(scale);
                        img.set({
                            left: (maxWidth - img.width * scale) / 2,
                            top: (maxHeight - img.height * scale) / 2,
                            selectable: false,
                        });

                        canvas.add(img);
                        canvas.renderAll();
                    }
                } catch (error) {
                    if (error.name !== "AbortError") {
                        console.error("Failed to load image:", error);
                    }
                }
            }
        };

        initializeCanvas();
    }, [selectedMeme]);


    return {
        canvasRef,
        textValue,
        handleAddText,
        handleColorChange,
    };
}

export default useEditMeme;