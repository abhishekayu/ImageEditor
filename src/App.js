import React, { useEffect } from "react";
import ImageUpload from "./components/ImageUpload";
import ShowPreview from "./components/ShowPreview";
import AISimulation from "./components/AISimulation";
import useStore from "./store/useStore";

const App = () => {
  const { undo, redo } = useStore();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === "z") {
          event.preventDefault();
          undo();
        } else if (event.key === "y") {
          event.preventDefault();
          redo();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [undo, redo]);

  return (
    <div className="max-w-lg mx-auto mt-10">
      <AISimulation />
      <ImageUpload />
      <ShowPreview />
    </div>
  );
};

export default App;
