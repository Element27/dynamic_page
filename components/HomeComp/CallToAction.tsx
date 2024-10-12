import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Form, FormControl, FormItem, FormMessage } from '../ui/form'
import FormInput from '../FormComponents/FormInput'
import useSectionStore, { heroData } from '@/store/store'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// import { z } from "zod";
import Image from 'next/image'
import { heroSchema } from '@/utils/schema'

export default function CallToActionComp() {

  const { getHeroData } = useSectionStore();


  const [modalState, setModalState] = useState<boolean>(false)

  const [ctaData, setCTAData] = useState<heroData>({
    title: "",
    description: "",
    btn_text: "",
    imageUrl: "",
  })
  useEffect(() => {
    const data = getHeroData("ctaData");

    setCTAData(data)
  }, [modalState, getHeroData])


  return (
    <div
      className="h-screen w-screen bg-cover bg-no-repeat bg-center flex items-center justify-center text-white px-4 relative"
      style={{ backgroundImage: `url(${ctaData?.imageUrl ?? '/assets/home-assets/SME-group.png'})` }}
    >
      <div className="flex items-center justify-between flex-col lg:flex-row ">
        <div className="w-[90%] mx-auto lg:w-[40%]"></div>
        <div className="w-[90%] mx-auto lg:w-[40%]  flex flex-col  gap-4 lg:gap-10 items-center justify-center px-4 lg:px-10 text-center">
          <h4 className="text-xl lg:text-3xl font-bold leading-6 lg:leading-10">{ctaData?.title ? ctaData?.title : "Join the ever-growing community of SMEs, businesses, and organizations enhancing productivity and efficiency through Dorcas!"}</h4>

          <p className="text-sm lg:text-xl font-semibold">{
            ctaData?.description ? ctaData?.description :
              "Enjoy your fully-owned, fully-branded, fully-supported suite of            applications."
          }
          </p>

          <Link href={"/get-started"} className="mx-5 text-sm font-normal bg-sky-blue hover:bg-purple-shade px-10 py-4 rounded-full duration-200 bg-white text-blue-600 lg:text-base hover:bg-blue-600 hover:text-white">
            {ctaData?.btn_text ? ctaData?.btn_text : "Contact Us"}
          </Link>
        </div>
      </div>

      <div className="absolute top-4 right-4 bg-blue-500 py-2 px-5 rounded-lg">
        <CTACompEdit modalState={modalState}
          setModalState={setModalState} />
      </div>
    </div>
  )
}


const CTACompEdit = ({ modalState, setModalState }: { modalState: boolean, setModalState: React.Dispatch<React.SetStateAction<boolean>> }) => {

  const { setHeroData, getHeroData } = useSectionStore()

  const [ctaData, setData] = useState<heroData>({
    title: "",
    description: "",
    btn_text: "",
    imageUrl: "",
  })

  useEffect(() => {
    const data = getHeroData("ctaData");

    setData(data)
  }, [modalState, getHeroData])

  // const [heroData, setFormData] = useState<FormData>({ title: "", description: "" });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<heroData>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      title: ctaData?.title ? ctaData?.title : "Join the ever-growing community of SMEs, businesses, and organizations enhancing productivity and efficiency through Dorcas!",
      description: ctaData?.description ? ctaData?.description : "Enjoy your fully-owned, fully-branded, fully-supported suite of applications.",
      btn_text: ctaData?.btn_text ? ctaData?.btn_text : "Contact Us",
      imageUrl: ctaData?.imageUrl ? ctaData?.imageUrl : "/assets/home-assets/SME-group.png",
    },
  });

  // Handle form submission
  const onSubmit = (data: heroData) => {
    console.log("this")
    data = { ...data, imageUrl: previewImage };
    console.log("Form Submitted:", data);
    setHeroData("ctaData", data);
    setModalState(false);
    getHeroData("ctaData");
  };

  // Handle Image Change and Preview
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


  return (

    <Dialog open={modalState} onOpenChange={setModalState}>
      <DialogTrigger>Edit</DialogTrigger>
      <DialogContent>

        <DialogHeader>
          <DialogTitle><h2 className="text-2xl font-bold mb-5">Edit Call-To-Action Section</h2></DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 ">
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
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
            >
              Submit
            </button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}