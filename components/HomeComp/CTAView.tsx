'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
// import { Product1Edit } from './Product1Edit'
import useSBSectionStore, { SBDataInterface } from '@/store/supabaseStore'
import EditHeroComp from './HeroEditComp'
import { usePathname } from 'next/navigation'

export default function CTAView() {
  const pathname = usePathname();
  const { SBgetData, loading } = useSBSectionStore();
  const [ctaData, setProductData] = useState<SBDataInterface>({
    title: "",
    desc: "",
    btn_text: "",
    img_url: "",
  });
  const [modalState, setModalState] = useState<boolean>(false);
  const [bgImg, setBgImg] = useState<string>("");

  // Fetch hero data on mount and when modal state changes
  useEffect(() => {
    const fetchHeroData = async () => {
      useSBSectionStore.setState({
        SBData: null
      })
      const data = await SBgetData("cta_section",);
      console.log("cta_section", data)
      setProductData(data ?? {
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
      <div
        className="h-screen w-screen bg-cover bg-no-repeat bg-center flex items-center justify-center text-white px-4 relative"
        style={{ backgroundImage: `url(${bgImg ? bgImg : '/assets/home-assets/SME-group.png'})` }}
      >
        <div className="flex items-center justify-between flex-col lg:flex-row h-screen w-screen ">
          <div className="w-[90%] mx-auto lg:w-[40%]"></div>
          <div className="w-[90%] mx-auto lg:w-[50%]  flex flex-col  gap-4 lg:gap-10 items-center justify-center px-4 lg:px-10 text-center">
            <h4 className="text-xl lg:text-3xl font-bold leading-6 lg:leading-10">{ctaData?.title ? ctaData?.title : "Join the ever-growing community of SMEs, businesses, and organizations enhancing productivity and efficiency through Dorcas!"}</h4>

            <p className="text-sm lg:text-xl font-semibold">{
              ctaData?.desc ? ctaData?.desc :
                "Enjoy your fully-owned, fully-branded, fully-supported suite of            applications."
            }
            </p>

            <Link href={"/get-started"} className="mx-5 text-sm font-normal bg-sky-blue hover:bg-purple-shade px-10 py-4 rounded-full duration-200 bg-white text-blue-600 lg:text-base hover:bg-blue-600 hover:text-white">
              {ctaData?.btn_text ? ctaData?.btn_text : "Contact Us"}
            </Link>
          </div>
        </div>

        {pathname === '/edit' && <div className="absolute top-4 right-4 bg-blue-500 py-2 px-5 rounded-lg">
          <EditHeroComp modalState={modalState} initValue={ctaData}
            setModalState={setModalState} imgTag='cta_img' sectionTag='cta_section' title='Call To Action Section' />
        </div>}
      </div>
      :
      <div className="min-h-screen w-screen flex items-center justify-center">loading...</div>
    }</>
  )
}