'use client'
import CallToActionComp from '@/components/HomeComp/CallToAction'
import FooterComp from '@/components/HomeComp/FooterComp'
// import HeroComp from '@/components/HomeComp/Hero'
import HeroMainComp from '@/components/HomeComp/HeroViewComp'
import Product1Comp from '@/components/HomeComp/Product1Comp'
import Product2Comp from '@/components/HomeComp/Product2Comp'
import React from 'react'

export default function EditPage() {
  return (
    <div className='min-h-screen max-w-screen overflow-x-hidden'>
      <HeroMainComp />
      <Product1Comp />
      <Product2Comp />
      <CallToActionComp />
      <FooterComp />
    </div>
  )
}
