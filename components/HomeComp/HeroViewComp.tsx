"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
// import useSectionStore, { heroData } from "@/store/store"; // Import the store
import EditHeroComp from "./HeroEditComp";
import useSBSectionStore, { SBDataInterface } from "@/store/supabaseStore";
// import Image from "next/image";
// import Image from "next/image";

export default function HeroMainComp() {
  // const { getHeroData } = useSectionStore();
  const { SBgetData } = useSBSectionStore();
  const [heroData, setHeroData] = useState<SBDataInterface>({
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

  console.log(heroData?.img_url)
  return (
    <>
      {/* Hero Section */}
      <section className="flex min-h-screen w-screen flex-col items-center justify-between overflow-x-hidden relative">
        <div>
          <div
            className="h-screen w-screen bg-cover bg-no-repeat bg-center flex items-center justify-center relative"
            style={{ backgroundImage: `url(${bgImg})` }}
          // style={{ backgroundImage: `url(${heroData?.imageUrl ?? '/assets/home-assets/hero1.webp'})` }}
          >

            {/* <Image
              src={bgImg ?? ""}
              alt=""
              width={714}
              height={450}
              className=""
            /> */}
            {/* <div className="w-full h-full bg-black/50 absolute top-0 left-0" /> */}

            <div className="w-[90%] mx-auto lg:w-[50%] flex flex-col gap-10 items-center justify-center text-center px-4 relative z-10">
              <h1 className="text-3xl lg:text-7xl text-white font-bold lg:font-extrabold">
                {heroData?.title}
              </h1>
              <p className="text-based lg:text-xl text-white font-medium">
                {heroData?.desc}
              </p>
              <Link
                href={"/get-started"}
                className="bg-white text-sky-blue text-sm lg:text-base hover:bg-blue-600 hover:text-white rounded-full px-10 py-3 w-fit"
              >
                {heroData?.btn_text}
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 bg-blue-500 py-2 px-5 rounded-lg">
          <EditHeroComp modalState={modalState} setModalState={setModalState} initValue={heroData} />
        </div>
      </section>
    </>
  );
}
