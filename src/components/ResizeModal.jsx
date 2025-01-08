import React, { useState, useEffect } from "react";
import useStore from "../store/useStore";
import { debounce } from "lodash";
import { FaArrowsAlt, FaTimes } from "react-icons/fa";

export default function ResizeModal({ isOpen, onClose }) {
  const imageFromStore = useStore((state) => state.image);
  const setImage = useStore((state) => state.setImage);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [originalImage, setOriginalImage] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(null);

  useEffect(() => {
    if (imageFromStore) {
      setOriginalImage(imageFromStore);
      const img = new Image();
      img.src = imageFromStore;
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
      };
    }
  }, [imageFromStore, isOpen]);

  const resize = function (canvas, image, width, height) {
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(image, 0, 0, width, height);
    return canvasToBlob(canvas, "image/jpeg", 1);
  };

  const canvasToBlob = (canvas, type, quality) =>
    new Promise((resolve) =>
      canvas.toBlob((blob) => resolve(blob), type, quality)
    );

  const resizeImage = (base64Image, width, height) => {
    const image = new Image();
    const canvas = document.createElement("canvas");

    return new Promise(function (resolve, reject) {
      image.onload = function () {
        resolve(resize(canvas, image, width, height));
      };
      image.src = base64Image;
    });
  };

  const handleApplyResize = async () => {
    if (!originalImage) {
      console.error("No image available.");
      return;
    }

    try {
      const resizedImage = await resizeImage(originalImage, width, height);
      setImage(URL.createObjectURL(resizedImage));
      onClose();
    } catch (error) {
      console.error("Error resizing the image:", error);
    }
  };

  const handleCancel = () => {
    onClose();
    setImage(originalImage);
  };

  const debouncedHandleResizeChange = debounce(async () => {
    if (!originalImage) return;

    try {
      const resizedImage = await resizeImage(originalImage, width, height);
      setResizedImage(URL.createObjectURL(resizedImage));
    } catch (error) {
      console.error("Error resizing the image:", error);
    }
  }, 400);

  useEffect(() => {
    debouncedHandleResizeChange();
    return () => {
      debouncedHandleResizeChange.cancel();
    };
  }, [width, height]);

  const aspectRatios = [
    { label: "1:1", value: "1:1" },
    { label: "3:4", value: "3:4" },
    { label: "16:9", value: "16:9" },
  ];

  const handleAspectRatioChange = (ratio) => {
    setAspectRatio(ratio);
    if (ratio === "1:1") {
      setHeight(width);
    } else if (ratio === "3:4") {
      setHeight((width * 4) / 3);
    } else if (ratio === "16:9") {
      setHeight((width * 9) / 16);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-50">
        <div className="bg-[#111b1c] border-dashed border-2 text-white p-6 rounded-lg w-96">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <FaArrowsAlt className="" />
              <h2 className="text-xl">Resize Image</h2>
            </div>
            <button onClick={handleCancel} className="text-gray-500">
              X
            </button>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Width</label>
            <input
              type="number"
              value={width || ""}
              onChange={(e) => setWidth(Number(e.target.value))}
              className=" bg-[#6e99f3] w-full px-3 py-2 border rounded-md text-white"
              disabled={!originalImage}
            />

            <label className="block text-sm font-medium mt-2">Height</label>
            <input
              type="number"
              value={height || ""}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full bg-[#6e99f3] px-3 py-2 border rounded-md text-white"
              disabled={!originalImage}
            />
          </div>

          {/* Aspect Ratio Selection */}
          <div className="mt-3">
            <div className="flex gap-4 mt-2">
              {aspectRatios.map((ratio) => (
                <button
                  key={ratio.value}
                  onClick={() => handleAspectRatioChange(ratio.value)}
                  className={`p-1 w-1/6 text-white border rounded-md ${
                    aspectRatio === ratio.value ? "bg-[#6e99f3]" : "bg-gray-500"
                  }`}
                >
                  {ratio.label}
                </button>
              ))}
            </div>
          </div>

          {resizedImage && (
            <div className="mt-4">
              <h4 className="text-sm font-medium">Live Preview</h4>
              <img
                src={resizedImage}
                alt="Resized"
                className="mt-2 max-h-[calc(100vh-500px)] object-contain rounded-lg shadow-lg w-full "
              />
            </div>
          )}

          <div className="flex items-center justify-center gap-6 mt-4 ">
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white p-2 rounded w-1/3  border-dashed border-2 hover:bg-gray-600  duration-300 ease-in-out"
            >
              <FaTimes className="inline-block mr-1" />
              Cancel
            </button>
            <button
              onClick={handleApplyResize}
              className=" bg-[#6e99f3] text-white p-2  border-dashed border-2 rounded w-1/3 hover:bg-[#030e10]  duration-300 ease-in-out"
              disabled={!originalImage || !width || !height}
            >
              <FaArrowsAlt className="inline-block mr-1" />
              Apply
            </button>
          </div>
        </div>
      </div>
    )
  );
}
