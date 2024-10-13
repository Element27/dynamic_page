// import { supabase } from "@/utils/supabaseClient";
import { create } from "zustand";

export interface SBDataInterface {
  title: string;
  desc: string;
  btn_text: string;
  img_url?: string | File;
}

interface SBsectionStore {
  SBData?: SBDataInterface | null;
  SBsetData: (key: string, data: SBDataInterface) => Promise<void>;
  SBgetData: (key: string) => Promise<SBDataInterface | null>;
  loading: boolean;
}

// Create Zustand store
const useSBSectionStore = create<SBsectionStore>((set) => ({
  SBData: {
    title: "",
    desc: "",
    btn_text: "",
    img_url: "",
  },
  loading: false,

  SBsetData: async (key, data) => {
    set({ loading: true });
    if (window.localStorage !== undefined) {
      localStorage.setItem(key, JSON.stringify(data));
    }
    set({ loading: false });
  },

  SBgetData: async (key) => {
    set({ loading: true });
    if (window.localStorage !== undefined) {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
      set({ loading: false });
    }
  },
}));

export default useSBSectionStore;

// https://zxvoxkivesiwqzxmarbr.supabase.co/rest/v1/hero_section?select=*
// https://zxvoxkivesiwqzxmarbr.supabase.co/rest/v1/hero_section?select=*
