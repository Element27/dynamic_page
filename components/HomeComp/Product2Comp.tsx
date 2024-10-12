'use client'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Form, FormControl, FormItem, FormMessage } from '../ui/form'
import FormInput from '../FormComponents/FormInput'
import useSectionStore, { heroData } from '@/store/store'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// import { z } from "zod";
import { Button } from '../ui/button'
import { heroSchema } from '@/utils/schema'

export default function Product2Comp() {

  const { getHeroData } = useSectionStore();

  const [modalState, setModalState] = useState<boolean>(false)

  const [productData, setProductData] = useState<heroData>({
    title: "",
    description: "",
    btn_text: "",
    imageUrl: "",
  })


  useEffect(() => {
    const data = getHeroData("productTwo");

    setProductData(data)
  }, [modalState, getHeroData])

  return (
    <div
      id="product-marketplace"
      className="flex flex-col lg:flex-row gap-8 justify-evenly mx-auto items-center my-40 relative"
    >
      <div className='w-full max-w-[510px] h-[464px] bg-contain bg-no-repeat bg-center' style={{ backgroundImage: `url(${productData?.imageUrl ?? '/assets/home-assets/suite-slide-2.jpg'})` }} />
      {/*  */}
      {/* <div className="w-full lg:w-fit">
        <Image
          src={"/assets/home-assets/suite-slide-1.jpg"}
          width={510} height={464}
          alt='product-suite'

        />
      </div> */}
      {/*  */}
      <div className="w-full lg:w-1/3 flex flex-col gap-10">
        <h3 className="text-3xl text-purple-shade font-bold">{
          productData?.title ? productData?.title : "For Partners"}
        </h3>
        <p className="text-base font-medium text-[#5e709d]">{
          productData?.description ? productData?.description : "          Single tenant or Multi-tenant and white labelled installation for   large businesses, Banks and Business Development Service Professionals featuring e-Commerce or Job Creation infrastructurein a Central Marketplace."}
        </p>
        <Link
          href="/marketplace"
          className="flex gap-4 items-center w-fit cursor-pointer"
        >
          <ArrowRight className="text-sky-blue" />{" "}
          <span className="text-[#54595F] text-base">{
            productData?.btn_text ? productData?.btn_text : "e-Commerce Marketplace"}

          </span>
        </Link>
      </div>
      <div className="absolute top-4 right-4 bg-blue-500 py-2 px-5 rounded-lg">
        <Product2CompEdit modalState={modalState}
          setModalState={setModalState} />
      </div>
    </div>
  )
}


const Product2CompEdit = ({ modalState, setModalState }: { modalState: boolean, setModalState: React.Dispatch<React.SetStateAction<boolean>> }) => {

  const { setHeroData, getHeroData } = useSectionStore()

  const [productData, setProductData] = useState<heroData>({
    title: "",
    description: "",
    btn_text: "",
    imageUrl: "",
  })


  useEffect(() => {
    const data = getHeroData("productTwo");

    setProductData(data)
  }, [modalState, getHeroData])

  // const [heroData, setFormData] = useState<FormData>({ title: "", description: "" });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<heroData>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      title: productData?.title ? productData?.title : "For Partners",
      description: productData?.description ? productData?.description : "Single tenant or Multi-tenant and white labelled installation for         large businesses, Banks and Business Development Service Professionals featuring e-Commerce or Job Creation infrastructure in a Central Marketplace.",
      btn_text: productData?.btn_text ? productData?.btn_text : "e-Commerce Marketplace",
      imageUrl: productData?.imageUrl ? productData?.imageUrl : "/assets/home-assets/suite-slide-2.jpg",
    },
  });

  const onSubmit = (data: heroData) => {
    console.log("this")
    console.log("Form Submitted:", data);
    data = { ...data, imageUrl: previewImage };
    setHeroData("productTwo", data);
    getHeroData("productTwo");
    setModalState(false);
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

    <Dialog open={modalState} onOpenChange={setModalState} >
      <DialogTrigger>Edit</DialogTrigger>
      <DialogContent>

        <DialogHeader>
          <DialogTitle><span className="text-2xl font-bold mb-5">Edit Second Product Section</span></DialogTitle>
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