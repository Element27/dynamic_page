import CTAView from "@/components/HomeComp/CTAView";
import FooterComp from "@/components/HomeComp/FooterComp";
import HeroMainComp from "@/components/HomeComp/HeroViewComp";
import NavMenu from "@/components/HomeComp/NavMenu";
import Product1View from "@/components/HomeComp/Product1View";
import Product2View from "@/components/HomeComp/Product2View";

export default function Home() {
  return (
    <div className='min-h-screen max-w-screen overflow-x-hidden'>
      <NavMenu />
      <HeroMainComp />
      <Product1View />
      <Product2View />
      <CTAView />
      <FooterComp />
    </div>
  );
}
