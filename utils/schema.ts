import { z } from "zod";

export const heroSchema = z.object({
  title: z.string().min(1, "Title is required"),
  btn_text: z.string().min(1, "Button text is required"),
  desc: z.string().min(1, "Description is required"),
  img_url: z.optional(
    z.any().refine((file) => file instanceof File || typeof file === "string", {
      message: "An image file is required",
    })
  ),
});
