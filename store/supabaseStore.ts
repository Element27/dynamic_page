import { supabase } from "@/utils/supabaseClient";
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
}

// Create Zustand store
const useSBSectionStore = create<SBsectionStore>(() => ({
  SBData: {
    title: "",
    desc: "",
    btn_text: "",
    img_url: "",
  },

  SBsetData: async (key, data) => {
    const { error } = await supabase.from(key).update(data).eq("id", 1);
    if (error) {
      console.error("Error fetching SBData:", error);
      // return null;
    }
    // return null;
    // try {
    //   const { data: supabaseData, status } = await supabase.post(
    //     `/rest/v1/${key}`,
    //     data,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Prefer: "return=representation",
    //       },
    //     }
    //   );

    //   if (status === 201) {
    //     set({ SBData: data });
    //     console.log("Data successfully updated in Supabase", supabaseData);
    //   }
    // } catch (error) {
    //   console.error("Error updating SBData:", error);
    // }
  },

  SBgetData: async (key) => {
    // try {
    //   const { data, status } = await supabase.get(`/rest/v1/${key}`, {
    //     params: {
    //       select: "*",
    //     },
    //   });

    //   if (status === 200 && data.length > 0) {
    //     return data[0] as SBData;
    //   }
    // } catch (error) {
    //   console.error("Error fetching SBData:", error);
    // }
    // return null;
    const { data, error } = await supabase.from(key).select("*");
    if (error) {
      console.error("Error fetching SBData:", error);
      return null;
    }
    console.log(data);
    return data[0] as SBDataInterface;
  },
}));

export default useSBSectionStore;

// https://zxvoxkivesiwqzxmarbr.supabase.co/rest/v1/hero_section?select=*
// https://zxvoxkivesiwqzxmarbr.supabase.co/rest/v1/hero_section?select=*
