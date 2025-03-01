import React, { useState } from 'react'
import { Menu, ChevronDown, Group, Grip, LayoutGrid, Component } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';

function LightBoxCategory() {
    const [openLightBox, setopenLightBox] = useState(false);

  return (
    <div>

 {/* Category Icon */}
 <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              onClick={() => setopenLightBox(true)}>
              {/* <Menu size={24} /> */}
              <Component size={35} />
              {/* <span className="font-medium"><LayoutGrid size={35} /></span> */}
            </button>

         
            {openLightBox && (
              <div className="fixed inset-0 flex mt-[50px] items-center justify-center bg-black bg-opacity-80 z-50">
                <div className="bg-white  p-6 rounded-lg shadow-lg max-w-md text-center">
                  <h2 className="text-xl font-semibold text-primary mb-3 thin-border-bottom pb-5">Select Category</h2>
                  <div className="mt-5 text-gray-600">
  <div className="grid grid-cols-4 gap-5 items-center thin-border-bottom pb-3">
    {/* Category Links */}
    {[
      { name: "T-Shirts", link: "t-shirts", img: "https://cdn-icons-png.freepik.com/256/586/586559.png" },
      { name: "Jeans", link: "jeans", img: "https://cdn-icons-png.freepik.com/256/3345/3345525.png" },
      { name: "Jackets", link: "jackets", img: "https://cdn-icons-png.freepik.com/256/16220/16220037.png" },
      { name: "Dresses", link: "dresses", img: "https://cdn-icons-png.freepik.com/256/1683/1683829.png" },
      { name: "Sweaters", link: "sweaters", img: "https://cdn-icons-png.freepik.com/256/3617/3617663.png" },
      { name: "Shoes", link: "shoes", img: "https://cdn-icons-png.freepik.com/256/18195/18195336.png" },
    ].map((item) => (
      <Link
        key={item.name}
        href={`${process.env.NEXT_PUBLIC_FRONT_DOMAIN}/category/${item.link}`}
        className="text-gray-700 hover:text-blue-600 font-medium flex flex-col items-center"
      >
        <Image src={item.img} width={75} height={75} alt={item.name} />
        <span className="text-[18px] font-semibold">{item.name}</span>
      </Link>
    ))}
  </div>

  {/* Close Button */}
  <button
    onClick={() => setopenLightBox(false)}
    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
  >
    Close
  </button>
</div>

                </div>
              </div>
            )}


    </div>
  )
}

export default LightBoxCategory