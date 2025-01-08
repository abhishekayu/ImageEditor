import React, { useState, useEffect } from "react";
import useStore from "../store/useStore";
import { FaFilter, FaTimes } from "react-icons/fa";

export default function FilterModal({ isOpen, onClose }) {
  const imageFromStore = useStore((state) => state.image);
  const setImage = useStore((state) => state.setImage);

  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [filter, setFilter] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    setImagePreview(imageFromStore);
  }, [imageFromStore, isOpen]);

  const applyFilterStyles = () => {
    return {
      filter: `
        brightness(${brightness}%) 
        contrast(${contrast}%) 
        saturate(${saturation}%) 
        ${filter}`,
    };
  };

  const handleBrightnessChange = (e) => {
    setBrightness(e.target.value);
  };

  const handleContrastChange = (e) => {
    setContrast(e.target.value);
  };

  const handleSaturationChange = (e) => {
    setSaturation(e.target.value);
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleApplyFilters = () => {
    console.log("Applying filters", imagePreview);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imagePreview;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.filter = `
        brightness(${brightness}%) 
        contrast(${contrast}%) 
        saturate(${saturation}%) 
        ${filter}`;

      ctx.drawImage(img, 0, 0);
      const filteredImage = canvas.toDataURL();
      setImage(filteredImage);
      onClose();
    };
  };

  const handleCancel = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setFilter("");
    setImage(imageFromStore);
    onClose();
  };

  const backToNormal = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setFilter("");
    setImagePreview(imageFromStore);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-50">
        <div className="bg-[#111b1c] border-dashed border-2 text-white p-6 rounded-lg w-96">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <FaFilter className="inline-block mr-2" />
              <h3 className="text-xl font-medium">Filter Image</h3>
            </div>
            <button onClick={handleCancel} className="text-gray-500">
              X
            </button>
          </div>

          <div className="mt-2">
            <label className="block text-sm font-medium">Brightness</label>
            <input
              type="range"
              min="0"
              max="200"
              value={brightness}
              onChange={handleBrightnessChange}
              className="w-full h-1"
            />
            <p className="text-sm text-center">{brightness}%</p>
          </div>

          <div className="mt-2">
            <label className="block text-sm font-medium">Contrast</label>
            <input
              type="range"
              min="0"
              max="200"
              value={contrast}
              onChange={handleContrastChange}
              className="w-full h-1"
            />
            <p className="text-sm text-center">{contrast}%</p>
          </div>

          <div className="mt-2">
            <label className="block text-sm font-medium">Saturation</label>
            <input
              type="range"
              min="0"
              max="200"
              value={saturation}
              onChange={handleSaturationChange}
              className="w-full h-1"
            />
            <p className="text-sm text-center">{saturation}%</p>
          </div>

          <div className="mt-2">
            <label className="block text-sm font-medium">Filters</label>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => handleFilterChange("grayscale(100%)")}
                className={`w-1/3 text-white border rounded-md ${
                  filter === "grayscale(100%)" ? "bg-[#6e99f3]" : "bg-gray-500"
                }`}
              >
                Grayscale
              </button>
              <button
                onClick={() => handleFilterChange("sepia(100%)")}
                className={`w-1/3 text-white border rounded-md ${
                  filter === "sepia(100%)" ? "bg-[#6e99f3]" : "bg-gray-500"
                }`}
              >
                Sepia
              </button>

              <button
                onClick={() => backToNormal()}
                className={`w-1/3 text-white border rounded-md ${
                  filter === "" ? "bg-[#6e99f3]" : "bg-gray-500"
                }`}
              >
                Original
              </button>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium">Live Preview</h4>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 max-h-[calc(100vh-500px)] object-contain rounded-lg shadow-lg w-full"
                style={applyFilterStyles()}
              />
            )}
          </div>

          <div className="flex items-center justify-center gap-6 mt-4 ">
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white p-2 rounded w-1/3  border-dashed border-2 hover:bg-gray-600  duration-300 ease-in-out"
            >
              <FaTimes className="inline-block mr-1" />
              Cancel
            </button>
            <button
              onClick={handleApplyFilters}
              className=" bg-[#6e99f3] text-white p-2  border-dashed border-2 rounded w-1/3 hover:bg-[#030e10]  duration-300 ease-in-out"
              disabled={!imagePreview}
            >
              <FaFilter className="inline-block mr-1" />
              Apply
            </button>
          </div>
        </div>
      </div>
    )
  );
}
