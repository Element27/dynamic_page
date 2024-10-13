'use client'
import CTAView from '@/components/HomeComp/CTAView'
import FooterComp from '@/components/HomeComp/FooterComp'
import HeroMainComp from '@/components/HomeComp/HeroViewComp'
import Product1View from '@/components/HomeComp/Product1View'
import Product2View from '@/components/HomeComp/Product2View'
import React from 'react'

export default function EditPage() {
  return (
    <div className='min-h-screen max-w-screen overflow-x-hidden'>
      <HeroMainComp />
      <Product1View />
      <Product2View />
      <CTAView />
      <FooterComp />
    </div>
  )
}
