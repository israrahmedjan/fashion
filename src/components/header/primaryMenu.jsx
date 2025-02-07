"use client";

import { useState } from "react";
import { Search, User, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function PrimaryMenu() {
    const [category, setCategory] = useState("All Categories");
    const [cartCount, setCartCount] = useState(2); // Example cart count

    return (
        <>
        {/* Lg Devices */}

        <nav className="hidden lg:block fixed top-0 left-0 w-full bg-white shadow-md z-50">
                <div className="flex px-8 h-20 items-center justify-between">
                    <div className=" flex gap-10 items-center w-1/2 justify-between">
                        <div>
                            <Image
                                src="/images/logo.png" // Ensure the image is inside the 'public' folder
                                alt="Logo"
                                width={125}
                                height={23}
                            />
                        </div>
                        {/* category and search box */}
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm w-full max-w-md bg-white">
                            {/* Category Select Dropdown */}
                            <select className="h-10 px-4 bg-gray-100 text-gray-700 border-r outline-none">
                                <option>All Categories</option>
                                <option>Electronics</option>
                                <option>Clothing</option>
                                <option>Home & Kitchen</option>
                            </select>

                            {/* Search Input */}
                            <input
                                type="text"
                                placeholder="Search Products"
                                className="h-8 px-4 flex-1 outline-none"
                            />

                            {/* Search Icon */}
                            <button className="h-8 px-4 text-blue-900 hover:text-black flex items-center justify-center">
                                <Search size={25} />
                            </button>
                        </div>

                        {/* category and search box */}
                    </div>
                    {/* add to cart whislist and use menu */}
                    <div className="flex items-center gap-6">
      {/* User Login */}
      <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition">
        <User size={22} />
        <span className="hidden md:inline text-sm font-medium">Login</span>
      </button>

      {/* Wishlist */}
      <button className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition">
        <Heart size={22} />
        <span className="hidden md:inline text-sm font-medium">Wishlist</span>
      </button>

      {/* Add to Cart */}
      <button className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition relative">
        <ShoppingCart size={22} />
        <span className="hidden md:inline text-sm font-medium">Cart</span>
        {/* Cart Item Badge */}
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          3
        </span>
      </button>
    </div>
    {/* End whishlist add to cart , user  */}
                </div>
            </nav>

            {/* Mobile Device */}
            <nav className="lg:hidden fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="flex px-8 h-20 items-center justify-between">
                    <div className=" flex gap-10 items-center justify-between">
                        <div className="basis-15%" >
                            <Image
                                src="/images/logo.png" // Ensure the image is inside the 'public' folder
                                alt="Logo"
                                width={125}
                                height={23}
                            />
                        </div>
                        {/* category and search box */}
                        
                        <div className="basis-75%" >  
                             <select className=" bg-gray-100 text-gray-700 border-r outline-none">
                                <option>All Categories</option>
                                <option>Electronics</option>
                                <option>Clothing</option>
                                <option>Home & Kitchen</option>
                            </select>

                            {/* Search Input */}
                            <input
                                type="text"
                                placeholder="Search Products"
                                className=" flex-1 outline-none"
                            />

                            {/* Search Icon */}
                            <button className=" text-blue-900 hover:text-black flex items-center justify-center">
                                <Search size={15} />
                            </button></div>
                        <div className="basis-10%" > Doted Sign</div>

                        {/* category and search box */}
                    </div>
                    {/* add to cart whislist and use menu */}
                    {/* <div className="flex items-center gap-6">
    
      <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition">
        <User size={22} />
        <span className="hidden md:inline text-sm font-medium">Login</span>
      </button>

      
      <button className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition">
        <Heart size={22} />
        <span className="hidden md:inline text-sm font-medium">Wishlist</span>
      </button>

      
      <button className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition relative">
        <ShoppingCart size={22} />
        <span className="hidden md:inline text-sm font-medium">Cart</span>
       
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          3
        </span>
      </button>
    </div> */}
    {/* End whishlist add to cart , user  */}
                </div>
            </nav>
            
        </>
    );
}
