import { create } from "zustand";
import { setItemInDB, getIndexedDB } from "../utils/indexdb"; // Import the IndexedDB utility functions

export interface heroData {
  title: string;
  description: string;
  btn_text: string;
  imageUrl: File | string | null;
}

interface sectionStore {
  heroData: heroData;
  setIndexData: (key: string, data: heroData) => Promise<void>;
  getIndexData: (key: string) => Promise<heroData | null>;
}

// Create Zustand store
const useIDBSectionStore = create<sectionStore>((set) => ({
  heroData: {
    title: "",
    description: "",
    btn_text: "",
    imageUrl: null,
  },
  setIndexData: async (key, data) => {
    set({ heroData: data });
    if (typeof window !== "undefined") {
      console.log("setting hero data in IndexedDB");
      await setItemInDB(key, data); // Save data to IndexedDB
    }
  },
  getIndexData: async (key) => {
    if (typeof window !== "undefined") {
      const storedData = await getIndexedDB(key); // Get data from IndexedDB
      return storedData ? storedData : null;
    }
    return null;
  },
}));

// Load initial data from IndexedDB
const loadInitialData = async () => {
  if (typeof window !== "undefined") {
    const storedData = await getIndexedDB("heroData");
    return storedData ? storedData : null;
  }
  return null;
};

// Load initial data and set Zustand state
loadInitialData().then((data) => {
  useIDBSectionStore.setState({
    heroData: data || {
      title: "",
      description: "",
      btn_text: "",
      imageUrl: null,
    },
  });
});

export default useIDBSectionStore;
