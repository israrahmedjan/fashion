import React, { useState } from 'react'
import { Menu, ChevronDown, Group, Grip, LayoutGrid, List } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import LightBoxCategory from './LightBoxCategory';

function SecondaryMenu() {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <>
      {/* lg device menu */}
      <nav className="hidden lg:block fixed top-[113px] left-0 w-full bg-white shadow-sm z-20">
        <div className="flex px-6 h-12 items-center justify-between">
          {/* Left - Menu Links (80%) */}
          <div className="flex-1 basis-[80%] flex items-center gap-6 relative">
           
<LightBoxCategory />
            {/* Home Link */}
            <a href={`${process.env.NEXT_PUBLIC_FRONT_DOMAIN}`} className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </a>

            {/* Categories Dropdown */}
            <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium">
              Categories <ChevronDown size={16} />
            </a>

            {/* Jeans */}
            <Link href={`${process.env.NEXT_PUBLIC_FRONT_DOMAIN}/category/jeans`} className="text-gray-700 hover:text-blue-600 font-medium">
              Jeans
            </Link>
            {/* t-shirts */}
            <Link href={`${process.env.NEXT_PUBLIC_FRONT_DOMAIN}/category/t-shirts`} className="text-gray-700 hover:text-blue-600 font-medium">
              T Shirts
            </Link>

            {/* Shop Dropdown */}
            <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium">
              Shop <ChevronDown size={16} />
            </a>

            {/* Pages Dropdown */}
            <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium">
              Pages <ChevronDown size={16} />
            </a>
          </div>

          {/* Right - Dropdown Links (15%) */}
          <div className="basis-[15%] text-right">
          
            <div className='flex justify-end gap-2'>
            <List size={25} />
            <LayoutGrid size={25} />
            </div>
          </div>
        </div>
        {/* End whishlist add to cart , user  */}
      </nav>

      {/* Mobile Device */}
    </>
  )
}

export default SecondaryMenu