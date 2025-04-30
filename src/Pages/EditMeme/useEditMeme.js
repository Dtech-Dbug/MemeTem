import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Canvas, FabricImage, IText, Group } from "fabric";
import { Rect, Circle, Triangle, Line } from "fabric";
import useTemplateCollections from "../../Pages/TemplateCollections/useTemplateCollections";
import { deleteControl } from "./utils";

const useEditMeme = () => {
  const { id } = useParams();
  const colorRef = useRef("#ffffff");
  const [selectedShape, setSelectedShape] = useState(null);
  const { memeTemplates } = useTemplateCollections();
  const selectedMeme = memeTemplates.find((meme) => meme.id === parseInt(id));

  const [textValue] = useState("Edit me");

  const canvasRef = useRef(null);
  const canvasInstanceRef = useRef(null);
  const textRef = useRef(null);

  const handleAddText = () => {
    console.log("addTexg");
    if (canvasInstanceRef.current) {
      const canvas = canvasInstanceRef.current;

      const text = new IText(textValue, {
        left: 50,
        top: 50,
        fontSize: 24,
        // fill: "white",
        fill: colorRef.current,
        editable: true,
        hasControls: true,
        selectable: true,
        textAlign: "left",
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
    // if (canvasInstanceRef.current){
    //     const canvas = canvasInstanceRef.current;
    //     console.log('handleColorChange', e.target.value)
    //     console.log('textRef', textRef.current)
    //     textRef.current.set({fill: e.target.value});
    //     canvas.renderAll();
    // }
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
      case "triangle":
        shape = new Triangle({ ...commonProps, width: 100, height: 100 });
        break;
      case "line":
        shape = new Line([50, 100, 200, 100], { stroke: colorRef.current });
        break;
      default:
        return;
    }

    const shapeText = new IText("Edit Me", {
      fontSize: 16,
      fill: colorRef.current,
      editable: true,
      // left: shape.left + 0,
      // top: shape.top + 10,
    });

    const shapeCenterX = shape.left + (shape.width ?? 0) / 2;
    const shapeCenterY = shape.top + (shape.height ?? 0) / 2;

    shapeText.left = shapeCenterX - shapeText.width / 2;
    shapeText.top = shapeCenterY - shapeText.height / 2;

    canvas.remove(shapeText);

    const group = new Group([shape, shapeText], {
      left: shape.left,
      top: shape.top,
      selectable: true,
    });

    group.controls.deleteControl = deleteControl;
    canvas.add(group);
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        const canvas = canvasInstanceRef.current;
        const activeObject = canvas?.getActiveObject();
        if (activeObject) {
          canvas.remove(activeObject);
          canvas.renderAll();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return {
    canvasRef,
    textValue,
    handleAddText,
    handleColorChange,
    handleDownload,
    handleAddShape,
    selectedShape,
    setSelectedShape,
  };
};

export default useEditMeme;
