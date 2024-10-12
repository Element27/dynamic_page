import { supabase } from "./supabaseClient";

export const storeImg = async (
  imgData:
    | string
    | File
    | Blob
    | ArrayBuffer
    | ArrayBufferView
    | Buffer
    | FormData
    | NodeJS.ReadableStream
    | ReadableStream<Uint8Array>
    | URLSearchParams,
  imgName: string
) => {
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

  const { data: img_url_data } = supabase.storage
    .from("dynamic_content")
    .getPublicUrl(`hero_data/${imgName}.png`);
  if (!img_url_data) throw "No URL Error";
  console.log("img_url_data", img_url_data);

  return img_url_data.publicUrl;
};
