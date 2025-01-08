import React, { useState } from "react";
import { FaUpload } from "react-icons/fa"; // Import the upload icon
import useStore from "../store/useStore";

const ImageUpload = () => {
  const setImage = useStore((state) => state.setImage);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="items-center">
      <div
        className={`border-dashed border-2 p-5 text-center transition-colors text-white rounded bg-[#6e99f3] duration-300 ease-in-out hover:bg-[#030e10] hover:text-white`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <div className="flex items-center gap-2">
            <FaUpload className="text" />
            <span>Drag & Drop an Image or Click to Upload</span>
          </div>
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
