import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "../ui/button";
import { Form, FormControl, FormItem, FormMessage } from "../ui/form";
import FormInput from "../FormComponents/FormInput";
import { heroSchema } from "@/utils/schema";
import useSBSectionStore, { SBDataInterface } from "@/store/supabaseStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { supabase } from "@/utils/supabaseClient";
import { storeImg } from "@/utils/utils";
// import useSectionStore from "@/store/store";

const EditHeroComp = ({
  modalState,
  setModalState,
  initValue, imgTag, sectionTag, title
}: {
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  initValue: SBDataInterface; imgTag: string, sectionTag: string; title: string
}) => {
  const { SBsetData } = useSBSectionStore();

  const [previewImage, setPreviewImage] = useState<string | undefined>();

  const form = useForm<SBDataInterface>({
    resolver: zodResolver(heroSchema),
    defaultValues: { ...initValue },
  });

  useEffect(() => {
    if (initValue) {
      form.reset({ ...initValue });
    }
  }, [initValue, form]);

  const onSubmit = async (data: SBDataInterface) => {
    console.log(data?.img_url)

    const imgData = data.img_url;

    // const imgUrl = await storeImg(imgData, "hero_img")
    const imgUrl = await storeImg(imgData, imgTag)

    // if (imgUrl) {

    const updatedData = { ...data, img_url: imgUrl };

    // await SBsetData("hero_section", updatedData);
    await SBsetData(sectionTag, updatedData);
    // useSBSectionStore.setState({
    //   SBData: updatedData
    // })
    window.location.reload();
    // await SBgetData("hero_section");
    // setModalState(false);
    // }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("img_url", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log("initValue", initValue)

  return (
    <Dialog open={modalState} onOpenChange={setModalState}>
      <DialogTrigger>Edit</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className="text-2xl font-bold mb-5">{title}</span>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            {/* Title Input */}
            <FormItem>
              <FormControl>
                <FormInput
                  label="Title"
                  type="text"
                  name="title"
                  placeholder="Enter the title"
                  value={form.watch("title")}
                  onChange={(e) => form.setValue("title", e.target.value)}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.title?.message}</FormMessage>
            </FormItem>

            {/* Description Input */}
            <FormItem>
              <FormControl>
                <FormInput
                  label="Description"
                  type="text"
                  name="desc"
                  placeholder="Enter a brief description"
                  value={form.watch("desc")}
                  onChange={(e) => form.setValue("desc", e.target.value)}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.desc?.message}</FormMessage>
            </FormItem>

            {/* Button Text */}
            <FormItem>
              <FormControl>
                <FormInput
                  label="Button Text"
                  type="text"
                  name="btn_text"
                  placeholder="Get Started"
                  value={form.watch("btn_text")}
                  onChange={(e) => form.setValue("btn_text", e.target.value)}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.btn_text?.message}</FormMessage>
            </FormItem>

            {/* Image Upload */}
            <FormItem>
              <FormControl>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border border-gray-300 p-2 rounded-md"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.img_url?.message}</FormMessage>
              {previewImage && (
                <div className="mt-4">
                  <Image
                    src={previewImage}
                    alt="Preview"
                    width={200}
                    height={200}
                    className="max-h-40 object-cover border border-gray-300 rounded-md"
                  />
                </div>
              )}
            </FormItem>

            {/* Submit Button */}
            <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditHeroComp;
