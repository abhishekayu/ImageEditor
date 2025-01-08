import React, { useRef, useState, useEffect } from "react";
import useStore from "../store/useStore";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { PiRectangleDashedDuotone } from "react-icons/pi";
import { FaRegCircle } from "react-icons/fa6";
import { RxReset } from "react-icons/rx";

const MaskingImageModal = ({ isOpen, onClose }) => {
  const imageFromStore = useStore((state) => state.image);
  const setImage = useStore((state) => state.setImage);

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const imageRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState("freehand");
  const [maskStart, setMaskStart] = useState(null);
  const [maskOpacity, setMaskOpacity] = useState(0.5);
  const [maskColor, setMaskColor] = useState("0, 0, 0");

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctxRef.current = ctx;

      canvas.width = 400;
      canvas.height = 400;

      const img = new Image();
      img.src = imageFromStore;
      img.onload = () => {
        imageRef.current = img;
        renderImage();
      };
    }
  }, [imageFromStore, isOpen]);

  const renderImage = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    if (!imageRef.current) return;

    const img = imageRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scale = Math.min(
      canvas.width / img.width,
      canvas.height / img.height
    );
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;

    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  const getMousePos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    return { x, y };
  };

  const startDrawing = (e) => {
    const { x, y } = getMousePos(e);

    setIsDrawing(true);

    if (drawMode === "freehand") {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(x, y);
    } else {
      setMaskStart({ x, y });
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const { x, y } = getMousePos(e);

    const getRGBAColor = () => `rgba(${maskColor}, ${maskOpacity})`;

    if (drawMode === "freehand") {
      ctxRef.current.strokeStyle = getRGBAColor();
      ctxRef.current.lineTo(x, y);
      ctxRef.current.stroke();
    } else if (drawMode === "Rectangle" && maskStart) {
      renderImage(); // Re-render the base image before drawing the shape mask

      const width = x - maskStart.x;
      const height = y - maskStart.y;
      ctxRef.current.fillStyle = getRGBAColor();
      ctxRef.current.fillRect(maskStart.x, maskStart.y, width, height);
    } else if (drawMode === "circle") {
      // Draw Circle
      const dx = x - maskStart.x;
      const dy = y - maskStart.y;
      const radius = Math.sqrt(dx * dx + dy * dy);

      ctxRef.current.fillStyle = getRGBAColor();
      ctxRef.current.beginPath();
      ctxRef.current.arc(maskStart.x, maskStart.y, radius, 0, Math.PI * 2);
      ctxRef.current.fill();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setMaskStart(null);
  };

  const toggleDrawMode = (mode) => {
    setDrawMode(mode);
    setMaskStart(null);
  };

  const saveMaskedImage = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const maskedImageDataURL = canvas.toDataURL("image/png");
      setImage(maskedImageDataURL);
      onClose();
    }
  };

  const resetImage = () => {
    renderImage();
  };

  const colors = [
    "255, 0, 0", // Red
    "0, 255, 0", // Green
    "0, 0, 255", // Blue
    "255, 255, 0", // Yellow
    "0, 255, 255", // Cyan
    "0, 0, 0", // Black
    "255, 255, 255", // White
  ];

  return (
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-50">
        <div className="bg-[#111b1c] border-dashed border-2 text-white p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <FaPencilAlt className="" />
              <h3 className="text-xl font-medium">Masking Image</h3>
            </div>
            <button onClick={onClose} className="text-gray-500">
              X
            </button>
          </div>

          <div className="mb-4 flex gap-4">
            <button
              onClick={() => toggleDrawMode("freehand")}
              className={`p-1 ${
                drawMode === "freehand" ? "bg-blue-500" : "bg-gray-500"
              } text-white w-1/3 rounded border-dashed border-2 hover:bg-[#030e10] duration-300 ease-in-out`}
            >
              <FaPencilAlt className="inline-block mr-1" />
              Freehand
            </button>
            <button
              onClick={() => toggleDrawMode("Rectangle")}
              className={`p-1 ${
                drawMode === "Rectangle" ? "bg-[#6e99f3]" : "bg-gray-500"
              } text-white w-1/3  rounded border-dashed border-2 hover:bg-[#030e10] duration-300 ease-in-out`}
            >
              <PiRectangleDashedDuotone className="inline-block mr-1" />
              Rectangle
            </button>

            <button
              onClick={() => toggleDrawMode("circle")}
              className={`p-1 ${
                drawMode === "circle" ? "bg-[#6e99f3]" : "bg-gray-500"
              } text-white w-1/3 rounded border-dashed border-2 hover:bg-[#030e10] duration-300 ease-in-out`}
            >
              <FaRegCircle className="inline-block mr-1 text-sm" />
              Circle
            </button>
          </div>

          <div className="mb-4">
            <label className="text-white">Mask Opacity: {maskOpacity}</label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={maskOpacity}
              onChange={(e) => setMaskOpacity(e.target.value)}
              className="w-full h-1"
            />
          </div>

          <div className="mb-4 flex gap-4">
            {colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setMaskColor(color)}
                className="w-5 h-5 rounded-full"
                style={{
                  backgroundColor: `rgb(${color})`,
                  border: "2px solid #111b1c",
                }}
              ></button>
            ))}
          </div>

          <div className="relative overflow-hidden">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseOut={stopDrawing}
              className="border rounded-lg"
              style={{ width: "400px", height: "400px" }}
            ></canvas>
          </div>

          <div className="flex items-center justify-center gap-6 mt-4">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white p-2 rounded w-1/3 border-dashed border-2 hover:bg-gray-600 duration-300 ease-in-out"
            >
              <FaTimes className="inline-block mr-1" />
              Cancel
            </button>
            <button
              onClick={resetImage}
              className="bg-[#6e99f3] text-white p-2 border-dashed border-2 rounded w-1/3 hover:bg-[#030e10] duration-300 ease-in-out"
            >
              <RxReset className="inline-block mr-1" />
              Reset
            </button>
            <button
              onClick={saveMaskedImage}
              className="bg-[#6e99f3] text-white p-2 border-dashed border-2 rounded w-1/3 hover:bg-[#030e10] duration-300 ease-in-out"
            >
              <FaPencilAlt className="inline-block mr-1" />
              Apply
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default MaskingImageModal;
