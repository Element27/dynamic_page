'use client'
// import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import Link from 'next/link'
import EditHeroComp from './HeroEditComp'
import useSBSectionStore, { SBDataInterface } from '@/store/supabaseStore'
import { usePathname } from 'next/navigation'



export default function NavMenu() {

  const { SBgetData, loading } = useSBSectionStore();
  const [navData, setNavData] = useState<SBDataInterface>({
    title: "",
    desc: "",
    btn_text: "",
    img_url: "",
  });
  const [modalState, setModalState] = useState<boolean>(false);
  // const [previewState, setPreviewState] = useState<boolean>(false)
  const [bgImg, setBgImg] = useState<string>("");


  const pathname = usePathname();

  console.log(pathname)
  // Fetch hero data on mount and when modal state changes
  useEffect(() => {
    const fetchHeroData = async () => {
      useSBSectionStore.setState({
        SBData: null
      })
      const data = await SBgetData("nav_section");
      console.log("data", data)
      setNavData(data ?? {
        title: "",
        desc: "",
        btn_text: "",
        img_url: "",
      });
      if (typeof data?.img_url === "string") {
        setBgImg(data.img_url);
      } else {
        // Handle case where img_url is a File (if applicable)
        console.warn("img_url is a File, not a string. Cannot set bgImg.");
      }
      // setBgImg(data?.img_url ?? "")
    };

    fetchHeroData();
  }, [SBgetData, modalState]);


  return (
    <>{loading ?

      <section className='relative'>

        <div className='py-4 px-24 justify-between items-center hidden lg:flex'>
          <div
            className='relative h-28 w-auto min-w-28 bg-contain bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${bgImg ? bgImg : "/assets/dorcas-logo.png"})` }}
          />

          <ul className="flex gap-10 items-center justify-between text-sm">
            <Link href="#product1">{navData?.title ? navData.title : "Product One"}</Link>
            <Link href="#product2">{navData.desc ? navData.desc : "Product Two"}</Link>
            <li><Button className="border border-blue-600 bg-white text-sky-blue text-sm lg:text-base hover:bg-blue-600 hover:text-white rounded-full px-10 py-3 w-fit">{navData.btn_text ? navData.btn_text : "Contact Us"}</Button></li>
          </ul>
        </div>

        <div className='p-4 lg:hidden flex items-center justify-between'>
          <div
            className='relative h-14 w-auto min-w-14 bg-contain bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${bgImg ? bgImg : "/assets/dorcas-logo.png"})` }}
          />

          <Sheet>
            <SheetTrigger><Menu /></SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                </SheetDescription>
              </SheetHeader>

              <div className='flex flex-col gap-3 items-center justify-center my-4'>
                <Link href="#product1">{navData?.title ? navData.title : "Product One"}</Link>
                <Link href="#product2">{navData.desc ? navData.desc : "Product Two"}</Link>
                <Button className="border border-blue-600 bg-white text-blue-600 text-sm lg:text-base hover:bg-blue-600 hover:text-white rounded-full px-10 py-3 w-fit">{navData.btn_text ? navData.btn_text : "Contact Us"}</Button>
              </div>

            </SheetContent>
          </Sheet>
        </div>

        {pathname === "/edit" && <div className="absolute top-1/2 right-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 py-2 px-5 rounded-lg">
          <EditHeroComp modalState={modalState} setModalState={setModalState} initValue={navData} imgTag="nav_img" sectionTag="nav_section" title="Edit Nav Section" formType='nav' />
        </div>}
      </section>
      : <div className="min-h-screen w-screen flex items-center justify-center">loading...</div>
    }
    </>
  )
}
