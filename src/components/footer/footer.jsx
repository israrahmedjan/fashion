'use client'
import { handleLoginFunc } from "@/helper/helper";
import { Home, LogIn, Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import UserDropdown from "../header/dashboard";
import Wishlist from "../header/Wishlist";
import { useState } from "react";
import Cart from "../header/Cart";

export default function Mainfooter() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isUserLogin);
  const [isOpenWishlist, setIsOpenWishlist] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const wishlistItems = useSelector((state)=>state.user.wishlistItems);
  const cartItems = useSelector((state)=>state.cart.cartItems);
  return (
    <>
      {/* md and lg devices */}
      <footer className="bg-gray-800 text-white py-6 mt-10 hidden lg:block">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Left Section: Logo or Brand Name */}
          <div className="text-lg font-semibold">
            <p>&copy; 2025 MyWebsite. All Rights Reserved.</p>
          </div>

          {/* Center Section: Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/" className="hover:text-gray-400">
              Home
            </a>
            <a href="/about" className="hover:text-gray-400">
              About
            </a>
            <a href="/services" className="hover:text-gray-400">
              Services
            </a>
            <a href="/contact" className="hover:text-gray-400">
              Contact
            </a>
          </div>

          {/* Right Section: Social Media */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              Twitter
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              Facebook
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      {/* Small devices */}
      <footer className="fixed lg:hidden bottom-0 left-0 w-full bg-white shadow-md border-t border-gray-200">
        <div className="flex justify-around py-3">
          <Link href="/" className="flex flex-col items-center text-gray-600 hover:text-black">
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </Link>



          <button  className=" relative flex flex-col items-center text-gray-600 hover:text-black">
          {wishlistItems?.length > 0 && (
  <span className="absolute bg-secondary top-0 left-1 z-20 text-[12px] text-black border border-red-500 rounded-full min-w-[15px] h-[15px] flex items-center justify-center">
    {wishlistItems.length}
  </span>
)}    
          
            <Heart className="w-6 h-6" onClick={()=>setIsOpenWishlist(!isOpenWishlist)} />
            <span className="text-xs">Wishlist</span>
            {isOpenWishlist && (
    <Wishlist wishlistItems={wishlistItems}
    isOpenWishlist={isOpenWishlist}
    setIsOpenWishlist={setIsOpenWishlist}
    />
            )}
          </button>

          <button onClick={()=>setIsOpenCart(!isOpenCart)}  className=" relative flex flex-col items-center text-gray-600 hover:text-black">
          {cartItems?.length > 0 && (
  <span className="absolute bg-secondary top-0 left-1 z-20 text-[12px] text-black border border-red-500 rounded-full min-w-[15px] h-[15px] flex items-center justify-center">
    {cartItems.length}
  </span>
)}    
          
            <ShoppingCart className="w-6 h-6"  />
            <span className="text-xs">Cart</span>
            {isOpenCart && (
   
    <Cart cartItems={cartItems} 
    isOpenCart={isOpenCart}
    setIsOpenCart={setIsOpenCart}
    className="relative"
    />
)}

                
          </button>

          {/* <Link href="/login" className="flex flex-col items-center text-gray-600 hover:text-black">
            <LogIn className="w-6 h-6" onClick={() => handleLoginFunc(dispatch)} />
            <span className="text-xs">Login</span>
          </Link> */}
          {!isLogin ?

<span className="flex flex-col items-center text-gray-600 hover:text-black" onClick={() => handleLoginFunc(dispatch)} >
<LogIn className="w-6 h-6" />
<span className="text-xs">Login</span>
</span>
            :
            <UserDropdown />
          }


        </div>
      </footer>


      {/* Mobile footer */}
    </>
  );
}
