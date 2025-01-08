import React, { useState } from "react";
import {
  FaCrop,
  FaRedo,
  FaArrowsAlt,
  FaPencilAlt,
  FaFilter,
} from "react-icons/fa";
import useStore from "../store/useStore";
import CropModal from "./CropImageModal";
import ResizeModal from "./ResizeModal";
import MaskingImageModal from "./MaskingImageModal";
import FilterModal from "./FilterModal";
import { MdImageNotSupported } from "react-icons/md";

const ShowPreview = () => {
  const image = useStore((state) => state.image);
  const croppedImage = useStore((state) => state.croppedImage);
  const rotation = useStore((state) => state.rotation);
  const setRotation = useStore((state) => state.setRotation);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [isResizeModalOpen, setResizeModalOpen] = useState(false);
  const [isMaskingImageModalOpen, setIsMaskingImageModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleRotate = () => {
    setRotation(rotation + 90);
  };

  return (
    <div className="flex justify-center items-center flex-col space-y-4 p-5">
      {image ? (
        <div
          className="relative"
          style={{
            width: "400px",
            height: "400px",
            overflow: "hidden",
            transform: `rotate(${rotation}deg)`,
          }}
        >
          <img
            src={croppedImage || image}
            alt="Uploaded"
            className="w-full h-full border-dashed border-2 object-contain rounded-lg shadow-lg"
          />
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center gap-2">
          <MdImageNotSupported className="text-white" />
          <p className="text-white">No image uploaded or generated</p>
        </div>
      )}

      {image && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setIsCropModalOpen(true)}
            className="bg-[#6e99f3] text-white p-2 rounded w-[100px] border-dashed border-2 hover:bg-[#030e10] duration-300 ease-in-out sm:w-[48%] lg:w-[100px]"
          >
            <FaCrop className="inline-block mr-2" />
            Crop
          </button>
          <button
            onClick={handleRotate}
            className="bg-[#6e99f3] text-white p-2 rounded w-[100px] border-dashed border-2 hover:bg-[#030e10] duration-300 ease-in-out sm:w-[48%] lg:w-[100px]"
          >
            <FaRedo className="inline-block mr-2" />
            Rotate
          </button>
          <button
            onClick={() => setResizeModalOpen(true)}
            className="bg-[#6e99f3] text-white p-2 rounded w-[100px] border-dashed border-2 hover:bg-[#030e10] duration-300 ease-in-out sm:w-[48%] lg:w-[100px]"
          >
            <FaArrowsAlt className="inline-block mr-2" />
            Resize
          </button>
          <button
            onClick={() => setIsMaskingImageModalOpen(true)}
            className="bg-[#6e99f3] text-white p-2 rounded w-[100px] border-dashed border-2 hover:bg-[#030e10] duration-300 ease-in-out sm:w-[48%] lg:w-[100px]"
          >
            <FaPencilAlt className="inline-block mr-2" />
            Mask
          </button>
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="bg-[#6e99f3] text-white p-2 rounded w-[100px] border-dashed border-2 hover:bg-[#030e10] duration-300 ease-in-out sm:w-[48%] lg:w-[100px]"
          >
            <FaFilter className="inline-block mr-2" />
            Filter
          </button>
        </div>
      )}

      <CropModal
        isOpen={isCropModalOpen}
        onClose={() => setIsCropModalOpen(false)}
      />
      <ResizeModal
        isOpen={isResizeModalOpen}
        onClose={() => setResizeModalOpen(false)}
      />
      <MaskingImageModal
        isOpen={isMaskingImageModalOpen}
        onClose={() => setIsMaskingImageModalOpen(false)}
      />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      />
    </div>
  );
};

export default ShowPreview;
