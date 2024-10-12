import React from 'react'
import Image from "next/image";
import Link from "next/link";
// import {
//   FaSolidPhone,
//   FluentMail32Filled,
//   IconParkSolidTime,
//   MdiLocation,
//   MdiTwitter,
//   RiFacebookFill,
//   RiInstagramLine,
//   RiLinkedinFill,
// } from "../GeneralComp/IconSet";
import { Clock5, Copyright, MapPin, Phone, Mail, Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';

export default function FooterComp() {
  return (
    <section className="bg-[#121332] w-full min-h-[50vh] flex flex-col justify-between px-4">
      <div className="w-full h-full flex items-center justify-center ">
        <div className="w-[90%] lg:w-[75%] mx-auto flex flex-col lg:flex-row justify-between gap-6">
          <div className="w-full my-8 ">
            <div className="flex flex-col gap-6 ">
              <Image
                src="/assets/Dorcas-Logo-modified-300x70.png"
                alt="logo"
                width={250}
                height={50}
              />

              <p className="text-[#cacaca] text-base font-medium">
                The Dorcas Platform digitizes everyday businesses and their
                operations allowing them the time and chance to be more
                productive and profitable.
              </p>

              {/* social icons */}
              <div className="flex gap-3 text-[#aeaeae] text-lg">
                <Facebook />
                <Twitter />
                <Linkedin />
                <Instagram />
              </div>
            </div>
          </div>

          <div className="w-full my-8 lg:ms-4">
            <h4 className="text-base font-bold leading-10 text-white mb-5">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3 font-medium">
              <Link
                className="relative text-[#8998c2] hover:text-white text-base w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-sky-blue after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
                href="#"
              >
                Get App
              </Link>
              <Link
                className="relative text-[#8998c2] hover:text-white text-base w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-sky-blue after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
                href="/business"
              >
                e-Commerce Suite
              </Link>
              <Link
                className="relative text-[#8998c2] hover:text-white text-base w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-sky-blue after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
                href="/marketplace"
              >
                e-Commerce Marketplace
              </Link>
              <Link
                className="relative text-[#8998c2] hover:text-white text-base w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-sky-blue after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
                href="mailto:suppport@Dorcas.io"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="w-full my-8">
            <h4 className="text-base font-bold leading-10 text-white">
              {" "}
              We are here to help
            </h4>
            <div className="flex gap-4 text-[#8998c2] items-center my-4">
              <Clock5 className="text-[20px]" />
              <p>Mon-Fri: 9:00 am 6:00 pm</p>
            </div>
            <div className="text-[#8998c2]   my-4">
              <div className="flex gap-4 text-[#8998c2] items-center">
                <MapPin className="text-[20px]" />
                <p>The Philippi Centre, Oluwalogbon House,</p>
              </div>
              <p>Plot A Obafemi Awolowo Way, Alausa, Ikeja.</p>
            </div>
            <div className="flex gap-4 text-[#8998c2] items-center  my-4">
              <Phone className="text-[20px]" />
              <p>08138801469</p>
            </div>
            <div className="flex gap-4 text-[#8998c2] items-center  my-4">
              <Mail className="text-[20px]" />
              <p>support@dorcas.io</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* <Separator className="w-full bg-[#aeaeae]" /> */}
        <hr />
        <p className="w-fit mx-auto p-8 text-[#aeaeae] flex">
          <Copyright />
          Hostville Nigeria | All Rights Reserved.
        </p>
      </div>
    </section >
  )
}
