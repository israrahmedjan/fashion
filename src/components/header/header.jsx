'use client'

import { useEffect, useState } from 'react'
import { Search, User, ShoppingCart,Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
 
  const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN

  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  useEffect(() => {
    // Show header with delay
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Initial Big Header (visible on load only) */}
{/* Medium and large devices */}
 <header
      className={`hidden md:block fixed inset-x-0 top-0 z-30  bg-white transition-all shadow-md duration-700 ease-out
        ${visible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}
      `}
    >
      <div className='flex justify-between mx-12 h-[84px] items-center'>
      <Link href={`${domain}`}  > <Logo domain={domain} /></Link>
        <Nav />
        <Icons />
      </div>
    </header>


{/* Small devices */}

<header className="block md:hidden fixed inset-x-0 top-0 z-30 bg-white shadow-md h-[64px]">
        <div className="flex items-center justify-between px-4 h-full">
          <Logo domain={domain} />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-black focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* ✅ Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md transition-all duration-300">
            <nav className="flex flex-col p-4 space-y-2">
              <a href="#" className="text-sm font-semibold text-gray-700">Home</a>
              <a href="#" className="text-sm font-semibold text-gray-700">Shop</a>
              <a href="#" className="text-sm font-semibold text-gray-700">Contact</a>
              <a href="#" className="text-sm font-semibold text-gray-700">About</a>
            </nav>
          </div>
        )}
      </header>

 
    </>
  )
}

// Reusable Logo
function Logo({ domain }) {
  return (
    <div className="flex-shrink-0">
      <Image 
        src={`${domain}/images/logo.png`} 
        width={98} 
        height={38} 
        alt="Logo Image"
        className="object-contain"
      />
    </div>
  )
}

// Reusable Nav
function Nav() {
  return (
    <nav className="hidden md:flex items-center gap-6 text-[#111111] uppercase text-[15px] font-medium">
      {["Home", "Shop","Services","About","Blogs","Contact"].map((item) => (
        <a key={item} href="#" className="hover:text-blue-600 transition-colors duration-200">
          {item}
        </a>
      ))}
    </nav>
  )
}

// Reusable Icons
function Icons() {
  return (
    <div className="flex items-center gap-4 text-[#111111] font-medium ">
      <span className='text-[12px] font-[400]'>Login / Register</span>
      <Search className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors duration-200" />
      <User className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors duration-200" />
      <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors duration-200" />
    
    </div>
  )
}
