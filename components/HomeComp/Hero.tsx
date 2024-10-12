"use client";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function HeroComp() {
  // State for hero section content

  const { getHeroData } = useSectionStore();

  const [modalState, setModalState] = useState<boolean>(false)

  const [heroData, setHeroData] = useState<heroData>({
    title: "",
    description: "",
    btn_text: "",
    imageUrl: "",
  })
  useEffect(() => {
    const data = getHeroData("heroData");

    setHeroData(data)
  }, [modalState, getHeroData])

  return (
    <>
      {/* Hero Section */}
      <section className="flex min-h-screen w-screen flex-col items-center justify-between overflow-x-hidden relative">
        <div>
          <div
            className="h-screen w-screen bg-cover bg-no-repeat bg-center flex items-center justify-center"

            style={{ backgroundImage: `url(${heroData?.imageUrl ?? '/assets/home-assets/hero1.webp'})` }}
          >
            <div className="w-[90%] mx-auto lg:w-[50%] flex flex-col gap-10 items-center justify-center text-center px-4">
              <h1 className="text-3xl lg:text-7xl text-white font-bold lg:font-extrabold">
                {heroData?.title ? heroData?.title : "Business Digitization for Productivity"}
              </h1>
              <p className="text-based lg:text-xl text-white font-medium">
                {heroData?.description ? heroData?.description : "Dorcas is Transforming Everyday Businesses into Efficient and Profitable Ventures by Digitizing Operations and Processes."}
              </p>
              <Link
                href={"/get-started"}
                className="bg-white text-sky-blue text-sm lg:text-base hover:bg-blue-600 hover:text-white rounded-full px-10 py-4 w-fit"
              >
                {heroData?.btn_text ? heroData?.btn_text : "Get Started"}
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 bg-blue-500 py-2 px-5 rounded-lg">
          <EditHeroComp modalState={modalState}
            setModalState={setModalState} />
        </div>
      </section>
    </>
  );
}

import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormMessage } from "../ui/form";
import FormInput from "../FormComponents/FormInput";
import Image from "next/image";
import useSectionStore, { heroData } from "@/store/store";
import { Button } from "../ui/button";
import { heroSchema } from "@/utils/schema";
import useIDBSectionStore from "@/store/indexdbstore";




const EditHeroComp = ({ modalState, setModalState }: { modalState: boolean, setModalState: React.Dispatch<React.SetStateAction<boolean>> }) => {


  const { setHeroData, heroData, getHeroData } = useSectionStore();

  const { getIndexData } = useIDBSectionStore()


  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<heroData>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      title: heroData?.title ? heroData?.title : "Business Digitization for Productivity",
      description: heroData?.description ? heroData?.description : "Dorcas is Transforming Everyday Businesses into Efficient and Profitable Ventures by Digitizing Operations and Processes.",
      btn_text: heroData?.btn_text ? heroData?.btn_text : "Get Started",
      imageUrl: heroData?.imageUrl ? heroData?.imageUrl : "/assets/home-assets/hero1.webp",
    },
  });

  const onSubmit = (data: heroData) => {
    console.log("this")
    console.log("Form Submitted:", data);
    data = { ...data, imageUrl: previewImage };
    // setHeroData("heroData", data);
    setIndexData("heroData", data);
    setModalState(false);
    // getHeroData("heroData");
    getIndexData("heroData");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("imageUrl", file); // Set image file to form state
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string); // Preview image after upload
      };
      reader.readAsDataURL(file); // Read the file for preview
    }
  };

  console.log(previewImage);

  return (

    <Dialog open={modalState} onOpenChange={setModalState}>
      <DialogTrigger>Edit</DialogTrigger>
      <DialogContent>

        <DialogHeader>
          <DialogTitle><span className="text-2xl font-bold mb-5">Edit Hero Section</span></DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))} className="flex flex-col gap-6 ">
            {/* Title Input */}
            <FormItem>
              {/* <FormLabel>Title</FormLabel> */}
              <FormControl>
                <FormInput
                  label="Title"
                  type="text"
                  name="title"
                  placeholder="Enter the post title"
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
                  name="description"
                  placeholder="Enter a brief description"
                  value={form.watch("description")}
                  onChange={(e) => form.setValue("description", e.target.value)}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.description?.message}</FormMessage>
            </FormItem>

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

            <FormItem>
              <FormControl>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border border-gray-300 p-2 rounded-md"
                />
              </FormControl>
              <FormMessage>{form.formState.errors.imageUrl?.message}</FormMessage>
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
            <Button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}



