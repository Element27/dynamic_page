import { create } from "zustand";

export interface heroData {
  title: string;
  description: string;
  btn_text: string;
  imageUrl: File | string | null;
}

interface sectionStore {
  heroData: heroData;
  setHeroData: (key: string, data: heroData) => void;
  getHeroData: (key: string) => heroData;
  // resetFormData: () => void;
}

// Create Zustand store
const useSectionStore = create<sectionStore>((set) => ({
  heroData: {
    title: "",
    description: "",
    btn_text: "",
    imageUrl: null,
  },
  setHeroData: (key, data) => {
    set({ heroData: data });
    if (typeof window !== "undefined") {
      console.log("setting hero data");
      localStorage.setItem(key, JSON.stringify(data));
    }
  },
  getHeroData: (key) => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  },
}));

// Load initial data from local storage
const loadInitialData = () => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem("heroData");
    return storedData ? JSON.parse(storedData) : null;
  }
  return null;
};

useSectionStore.setState({
  heroData: loadInitialData() || {
    title: "",
    description: "",
    btn_text: "",
    imageUrl: null,
  },
});

export default useSectionStore;
