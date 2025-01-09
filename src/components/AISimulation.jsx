import React, { useState } from "react";
import useStore from "../store/useStore";
import { FaSpinner } from "react-icons/fa";

const AISimulation = () => {
  const setImage = useStore((state) => state.setImage);

  const [request, setRequest] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const modifiedImages = [
    "/sky.jpg",
    "/sky2.jpg",
    "/dog.jpg",
    "/cat.jpg",
    "/cat2.jpg",
    "/dog2.jpg",
  ];

  const handleAIEdit = () => {
    if (!request) return;

    setIsLoading(true);

    setTimeout(() => {
      const randomImage =
        modifiedImages[Math.floor(Math.random() * modifiedImages.length)];

      console.log(randomImage);
      setImage(randomImage);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="p-4 space-y-3">
      <h1 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-white via-blue-500 to-white bg-clip-text animate-shine bg-[length:400%_100%]">
        AI Gen Image Editor
      </h1>
      <div className="mb-4 flex items-center space-x-3">
        <input
          id="ai-request"
          type="text"
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          className={`border-dashed border-2 p-5 w-full h-10 text-white rounded bg-[#030e10]`}
          placeholder="e.g., 'Make the sky more vibrant'"
          autoComplete="off"
        />
        <button
          onClick={handleAIEdit}
          disabled={isLoading}
          className={`${
            request
              ? "bg-[#6e99f3] hover:bg-[#030e10]"
              : "bg-gray-500 cursor-not-allowed"
          } text-white p-2 border-dashed border-2 rounded w-1/3 duration-300 ease-in-out`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <FaSpinner className="animate-spin" />
              <span>Processing</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <span
                className="text-transparent 
                   bg-gradient-to-r from-white via-blue-500 to-white 
                   bg-clip-text animate-shine 
                   bg-[length:400%_100%]"
              >
                AI Touch
              </span>
            </div>
          )}
        </button>
      </div>

      <div>
        {isLoading && (
          <div className="mt-4 text-center text-gray-500">
            AI is processing your request...
          </div>
        )}
      </div>
    </div>
  );
};

export default AISimulation;
