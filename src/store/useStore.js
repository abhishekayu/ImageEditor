import { create } from "zustand";

const useStore = create((set) => ({
  image: null,
  croppedImage: null,
  rotation: 0,
  resizeModalOpen: false,

  // History tracking
  history: [],
  historyIndex: -1,

  // Set Image
  setImage: (image) =>
    set((state) => {
      // Update the state and add to history
      const newHistory = state.history.slice(0, state.historyIndex + 1); // Remove any future states
      newHistory.push({
        image,
        croppedImage: state.croppedImage,
        rotation: state.rotation,
      });
      return {
        image,
        history: newHistory,
        historyIndex: newHistory.length - 1, // Set the current position to the new state
      };
    }),

  // Set Cropped Image
  setCroppedImage: (croppedImage) =>
    set((state) => {
      const newHistory = state.history.slice(0, state.historyIndex + 1); // Remove any future states
      newHistory.push({
        image: state.image,
        croppedImage,
        rotation: state.rotation,
      });
      return {
        croppedImage,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    }),

  // Set Rotation
  setRotation: (angle) =>
    set((state) => {
      const newHistory = state.history.slice(0, state.historyIndex + 1); // Remove any future states
      newHistory.push({
        image: state.image,
        croppedImage: state.croppedImage,
        rotation: angle,
      });
      return {
        rotation: angle,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    }),

  // Set Resize Modal State
  setResizeModalOpen: (isOpen) => set({ resizeModalOpen: isOpen }),

  // Undo
  undo: () =>
    set((state) => {
      if (state.historyIndex > 0) {
        const prevState = state.history[state.historyIndex - 1];
        return {
          image: prevState.image,
          croppedImage: prevState.croppedImage,
          rotation: prevState.rotation,
          historyIndex: state.historyIndex - 1,
        };
      }
      return state; // No change if at the start of history
    }),

  // Redo
  redo: () =>
    set((state) => {
      if (state.historyIndex < state.history.length - 1) {
        const nextState = state.history[state.historyIndex + 1];
        return {
          image: nextState.image,
          croppedImage: nextState.croppedImage,
          rotation: nextState.rotation,
          historyIndex: state.historyIndex + 1,
        };
      }
      return state; // No change if at the end of history
    }),
}));

export default useStore;
