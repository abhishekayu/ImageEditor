import React from "react";
import ImageUpload from "./components/ImageUpload";
import ShowPreview from "./components/ShowPreview";
import "./App.css";
import AISimulation from "./components/AISimulation";

const App = () => {
  return (
    <div className="max-w-lg mx-auto mt-10">
      <AISimulation />
      <ImageUpload />
      <ShowPreview />
    </div>
  );
};

export default App;
