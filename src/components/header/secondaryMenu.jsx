import React,{ useState }  from 'react'
import { Menu, ChevronDown } from "lucide-react";
import Image from "next/image";

function SecondaryMenu() {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    {/* lg device menu */}
    <nav className="hidden lg:block fixed top-[82px] left-0 w-full bg-white shadow-md z-50">
             <div className="flex px-8 h-12 items-center justify-between">
  {/* Left - Menu Links (80%) */}
  <div className="flex-1 basis-[80%] flex items-center gap-6">
      {/* Category Icon */}
      <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
        <Menu size={24} />
        <span className="font-medium">Categories</span>
      </button>

      {/* Home Link */}
      <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
        Home
      </a>

      {/* Categories Dropdown */}
      <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium">
        Categories <ChevronDown size={16} />
      </a>

      {/* About Us */}
      <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
        About Us
      </a>

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
    Dashboard Icons
  </div>
</div>
    {/* End whishlist add to cart , user  */}
                           </nav>

                            {/* Mobile Device */}
    </>
  )
}

export default SecondaryMenu