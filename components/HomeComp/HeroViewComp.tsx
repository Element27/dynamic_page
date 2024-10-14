"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
// import useSectionStore, { heroData } from "@/store/store"; // Import the store
import EditHeroComp from "./HeroEditComp";
import useSBSectionStore, { SBDataInterface } from "@/store/supabaseStore";
import { usePathname } from 'next/navigation';
// import { useRouter } from 'next/router'

export default function HeroMainComp() {
  // const { getHeroData } = useSectionStore();
  const { SBgetData, loading } = useSBSectionStore();
  const [heroData, setHeroData] = useState<SBDataInterface>({
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
      const data = await SBgetData("hero_section",);
      console.log("data", data)
      setHeroData(data ?? {
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
      <section className="flex min-h-screen w-screen flex-col items-center justify-between overflow-x-hidden relative">
        <div>
          <div
            className="h-screen w-screen bg-cover bg-no-repeat bg-center flex items-center justify-center relative"
            // style={{ backgroundImage: `url(${bgImg}) '/assets/home-assets/hero1.webp'` }}
            style={{ backgroundImage: `url(${bgImg ? bgImg : '/assets/home-assets/hero1.webp'})` }}
          >


            <div className="w-[90%] mx-auto lg:w-[50%] flex flex-col gap-10 items-center justify-center text-center px-4 relative z-10">
              <h1 className="text-3xl lg:text-7xl text-white font-bold lg:font-extrabold">
                {heroData?.title ? heroData?.title : "Business Digitization for Productivity"}
              </h1>
              <p className="text-based lg:text-xl text-white font-medium">
                {heroData?.desc ? heroData?.desc : "Dorcas is Transforming Everyday Businesses into Efficient and Profitable Ventures by Digitizing Operations and Processes."}
              </p>
              <Link
                href={"/get-started"}
                className="bg-white text-sky-blue text-sm lg:text-base hover:bg-blue-600 hover:text-white rounded-full px-10 py-3 w-fit"
              >
                {heroData?.btn_text ? heroData?.btn_text : "Get Started"}
              </Link>
            </div>
          </div>
        </div>
        {pathname === "/edit" && <div className="absolute top-4 right-4 bg-blue-500 py-2 px-5 rounded-lg">
          <EditHeroComp modalState={modalState} setModalState={setModalState} initValue={heroData} imgTag="hero_img" sectionTag="hero_section" title="Edit Hero Section" />
        </div>}
      </section>
      : <div className="min-h-screen w-screen flex items-center justify-center">loading...</div>
    }
    </>
  );
}
