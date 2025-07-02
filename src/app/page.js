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
import { getHomedata } from "@/lib/apiHelpers.js";
// import SearchBox from "./_components/produccts/SearchBox";

export default async function Home() {
  const data = await getHomedata(1);

  return (
    <>
      <main className="w-full overflow-hidden">
        {/* Uncomment when ready */}
        {/* <SearchBox /> */}
        {/* <h1>Counter file</h1>
        <Counter /> */}

        {data && (
          <div className="space-y-8 md:space-y-12">
            <HeroSlider data={data.data} />
            <ProductGallery data={data.productData} />
          </div>
        )}

        {/* Responsive full-width sections */}
        <section className="w-full">
          <FullWidthSlider />
        </section>

        <section className="px-4 md:px-8 lg:px-16 space-y-8">
          <Featured />
          <Discount />
          <ShippingInfo />
        </section>

        <footer className="bg-white py-0 px-0">
          <Socials />
        </footer>

        {/* Optional: Products Section */}
        {/* <Products /> */}
      </main>
    </>
  );
}
