import { create } from "zustand";

const useStore = create((set) => ({
  image: null,
  croppedImage: null,
  setImage: (image) => set({ image }),
  setCroppedImage: (croppedImage) => set({ croppedImage }),
  rotation: 0,
  setRotation: (angle) => set({ rotation: angle }),
  resizeModalOpen: false,
  setResizeModalOpen: (isOpen) => set({ resizeModalOpen: isOpen }),
}));

export default useStore;
