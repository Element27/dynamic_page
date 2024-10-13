import { supabase } from "./supabaseClient";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const storeImg = async (imgData: any, imgName: string) => {
  console.log(imgData);
  const { data: img_data, error } = await supabase.storage
    .from("dynamic_content")
    .upload(`hero_data/${imgName}.png`, imgData, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    throw error;
    return;
  }
  console.log(img_data);

  // return `https://zxvoxkivesiwqzxmarbr.supabase.co/storage/v1/object/public/${img_data.fullPath}`;
  const { data: img_url_data } = supabase.storage
    .from("dynamic_content")
    .getPublicUrl(`hero_data/${imgName}.png`);
  if (!img_url_data) throw "No URL Error";
  console.log("img_url_data", img_url_data);

  return img_url_data.publicUrl;
};
