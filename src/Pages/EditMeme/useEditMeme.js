import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Canvas,
  Path,
  FabricImage,
  Textbox,
  Rect,
  Circle,
  PencilBrush,
} from "fabric";
import useTemplateCollections from "../../Pages/TemplateCollections/useTemplateCollections";
import { deleteControl } from "./utils";

const useEditMeme = () => {
  const { id } = useParams();
  const colorRef = useRef("#ffffff");
  const { memeTemplates } = useTemplateCollections();
  const selectedMeme = memeTemplates.find((meme) => meme.id === parseInt(id));
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [brushSize, setBrushSize] = useState(2);

  const [textValue] = useState("Edit me");

  const canvasRef = useRef(null);
  const canvasInstanceRef = useRef(null);
  const textRef = useRef(null);

  const enableFreeDrawing = () => {
    const canvas = canvasInstanceRef.current;
    if (!canvas) return;

    if (!canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush = new PencilBrush(canvas);
    }
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.color = colorRef.current;
    canvas.freeDrawingBrush.width = brushSize;

    setIsDrawingMode(true);
  };

  const disableFreeDrawing = () => {
    const canvas = canvasInstanceRef.current;
    if (!canvas) return;

    canvas.isDrawingMode = false;
    setIsDrawingMode(false);
  };

  const handleAddText = () => {
    console.log("addTexg");
    if (canvasInstanceRef.current) {
      const canvas = canvasInstanceRef.current;

      const text = new Textbox(textValue, {
        left: 50,
        top: 50,
        fontSize: 24,
        // fill: "white",
        fill: colorRef.current,
        editable: true,
        hasControls: true,
        selectable: true,
        splitByGrapheme: true,
        width: 100,
      });

      text.controls.deleteControl = deleteControl;

      canvas.add(text);
      // canvas.setActiveObject(text);;
      console.log("active", canvas);
      canvas.renderAll();

      textRef.current = text; // Store ref to last added text
    }
    console.log("else", {
      canvasInstanceRef: canvasInstanceRef,
      canvasRef: canvasRef,
    });
  };

  const handleDownload = () => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const fabricCanvas = canvasInstanceRef.current;
    if (!fabricCanvas) return;

    const memeName = selectedMeme?.alt || "meme";

    fabricCanvas.getElement().toBlob((blob) => {
      if (!blob) return;

      const link = document.createElement("a");
      link.download = `${memeName
        .replace(/\s+/g, "-")
        .toLowerCase()}-edited.png`;
      link.href = URL.createObjectURL(blob);
      link.click();

      setTimeout(() => URL.revokeObjectURL(link.href), 100);
    }, "image/png");
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    colorRef.current = newColor;

    if (textRef.current) {
      textRef.current.set({ fill: newColor });
      canvasInstanceRef.current.renderAll();
    }
    if (canvasInstanceRef.current?.isDrawingMode) {
      canvasInstanceRef.current.freeDrawingBrush.color = newColor;
    }
  };

  const handleAddShape = (shapeType) => {
    if (!canvasInstanceRef.current) return;
    const canvas = canvasInstanceRef.current;

    let shape;
    const commonProps = {
      left: 100,
      top: 100,
      fill: "transparent",
      stroke: colorRef.current,
      strokeWidth: 2,
      selectable: true,
    };

    switch (shapeType) {
      case "rectangle":
        shape = new Rect({ ...commonProps, width: 120, height: 80 });
        break;
      case "circle":
        shape = new Circle({ ...commonProps, radius: 50 });
        break;
      case "cloud":
        shape = new Path(
          "M37.6,-5.5c-2.1-7.2-9-12.2-16.9-12.2-6.5,0-12.2,3.6-15.1,9-1.3-0.4-2.6-0.6-4-0.6-6.6,0-12,5.4-12,12s5.4,12,12,12h32c6.1,0,11-4.9,11-11C44.6,0.6,41.7,-3.6,37.6,-5.5z",
          {
            left: 100,
            top: 100,
            fill: "transparent",
            stroke: colorRef.current,
            strokeWidth: 2,
            scaleX: 3,
            scaleY: 3,
            selectable: true,
          }
        );
        break;

      default:
        return;
    }
    shape.controls.deleteControl = deleteControl;
    canvas.add(shape);
    canvas.renderAll();
  };

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

        // Initializing brush here
        canvas.freeDrawingBrush = new PencilBrush(canvas);
        canvas.freeDrawingBrush.color = colorRef.current;
        canvas.freeDrawingBrush.width = brushSize;

        canvasInstanceRef.current = canvas;

        try {
          const img = await FabricImage.fromURL(selectedMeme.src, {
            crossOrigin: "anonymous",
          });
          if (!signal.aborted) {
            const maxWidth = canvas.getWidth();
            const maxHeight = canvas.getHeight();
            const scale = Math.min(
              maxWidth / img.width,
              maxHeight / img.height
            );

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
    handleAddShape,
    handleDownload,
    enableFreeDrawing,
    disableFreeDrawing,
    isDrawingMode,
    brushSize,
    setBrushSize,
  };
};

export default useEditMeme;
