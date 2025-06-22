import Image from "next/image";
import Products from "./_components/produccts/Products";
import Counter from "@/components/Counter";
import HeroSlider from "./_components/hero/HeroSlider";
import ProductGallery from "./_components/produccts/NewProducts";

import FullWidthSlider from "./_components/hero/Slider";
import Featured from "./_components/produccts/Featured";
import Discount from "./_components/hero/Discount";
import ShippingInfo from "./_components/general/Shipping";
import Socials from "./_components/general/Socials";
// import SearchBox from "./_components/produccts/SearchBox";

export default function Home() {
  return (
    <>
    <div className="">
       {/* <SearchBox /> */}
       {/* <h1>Counter file</h1>
       <Counter /> */}
       <HeroSlider />
       <ProductGallery />
       <FullWidthSlider /> 
       <Featured />
       <Discount />
       <ShippingInfo />
       <Socials />
    {/* <Products /> */}
    </div>
    
     
    

   

    
    </>
  );
}
