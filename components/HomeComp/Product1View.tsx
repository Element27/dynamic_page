'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
// import { Product1Edit } from './Product1Edit'
import useSBSectionStore, { SBDataInterface } from '@/store/supabaseStore'
import EditHeroComp from './HeroEditComp'
import { usePathname } from 'next/navigation'

export default function Product1View() {

  const pathname = usePathname();

  const { SBgetData, loading } = useSBSectionStore();
  const [productData, setProductData] = useState<SBDataInterface>({
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
      const data = await SBgetData("product_one_section",);
      console.log("product_one_section", data)
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

  // console.log(productData?.img_url)
  return (
    <>{loading ?
      <div
        id="product-suite"
        className="flex flex-col lg:flex-row gap-8 justify-evenly items-center relative py-20"
        style={{ backgroundColor: "#e2e2e2" }}
      >
        <div className="w-full lg:w-1/3 flex flex-col gap-10">
          <h3 className="text-3xl text-purple-shade font-bold">{
            productData?.title ? productData?.title : "For Business"}
          </h3>
          <p className="text-base font-medium text-[#5e709d]">{productData?.desc ? productData?.desc : "Single-business setup comes with an all-in-one e-Commerce suite for automating your business processes with options to add additional applications and functionality."}</p>
          <Link
            href="/business"
            className="flex gap-4 items-center w-fit cursor-pointer"
          >
            <ArrowRight className="text-sky-blue" />{" "}
            <span className="text-[#54595F] text-base">
              {productData?.btn_text ? productData?.btn_text : "e-Commerce Suite"}
            </span>
          </Link>
        </div>
        <div className="w-full lg:w-1/3">
          <div className='w-full max-w-[510px] h-[464px] bg-contain bg-no-repeat bg-center' style={{ backgroundImage: `url(${bgImg ? bgImg : '/assets/home-assets/suite-slide-1.jpg'})` }} />

        </div>
        {pathname === '/edit' && <div className="absolute top-4 right-4 bg-blue-500 py-2 px-5 rounded-lg">
          <EditHeroComp modalState={modalState} initValue={productData}
            setModalState={setModalState} imgTag='product_one_img' sectionTag='product_one_section' title='Edit Product One Section' />
        </div>}
      </div> :
      <div className="min-h-screen w-screen flex items-center justify-center">loading...</div>
    }</>
  )
}
