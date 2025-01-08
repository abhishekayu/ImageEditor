import React, { useState, useEffect, useRef } from "react";
import useStore from "../store/useStore";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
import { FaCrop, FaTimes } from "react-icons/fa";

const CropModal = ({ isOpen, onClose }) => {
  const image = useStore((state) => state.image);
  const setCroppedImage = useStore((state) => state.setCroppedImage);
  const setImage = useStore((state) => state.setImage);

  const [cropper, setCropper] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (isOpen && image && imageRef.current && !cropper) {
      const newCropper = new Cropper(imageRef.current, {
        aspectRatio: 1,
        zoomable: true,
        scalable: true,
        rotatable: true,
        cropBoxResizable: true,
        cropBoxMovable: true,
      });
      setCropper(newCropper);
    }

    return () => {
      if (cropper) {
        cropper.destroy();
        setCropper(null);
      }
    };
  }, [isOpen, image]);

  const handleCropApply = () => {
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      const croppedImg = croppedCanvas.toDataURL();
      // setCroppedImage(croppedImg);
      setImage(croppedImg);
      onClose();
      setCropper(null);
    }
  };

  const handleCropCancel = () => {
    setCroppedImage(null);
    onClose();
    setCropper(null);
  };

  if (!isOpen || !image) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
      onClick={() => {
        onClose && onClose();
        handleCropCancel();
      }}
    >
      <div
        className="bg-[#111b1c] border-dashed border-2 text-white w-full max-w-lg p-6 relative rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <FaCrop className="" />
            <h2 className="text-xl">Crop Image</h2>
          </div>
          <button
            onClick={() => {
              onClose && onClose(); // Calls onClose if it exists
              handleCropCancel(); // Always calls handleCropCancel
            }}
            className="text-gray-500 hover:text-black text-xl"
          >
            &times;
          </button>
        </div>

        <div className="relative w-full">
          <img
            ref={imageRef}
            src={image}
            alt="Upload"
            className="w-full max-h-[calc(100vh-300px)] object-contain  rounded-lg shadow-lg"
          />
        </div>

        <div className="flex items-center justify-center gap-6 mt-4 ">
          <button
            onClick={handleCropCancel}
            className="bg-gray-500 text-white p-2 rounded w-1/3  border-dashed border-2 hover:bg-gray-600  duration-300 ease-in-out"
          >
            <FaTimes className="inline-block mr-1" />
            Cancel
          </button>
          <button
            onClick={handleCropApply}
            className=" bg-[#6e99f3] text-white p-2  border-dashed border-2 rounded w-1/3 hover:bg-[#030e10]  duration-300 ease-in-out"
          >
            <FaCrop className="inline-block mr-1" />
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropModal;
