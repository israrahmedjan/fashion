'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Import Next.js router
import Cookies from 'js-cookie'; // Import js-cookie library
import TopMenu from './topMenu';
import PrimaryMenu from './primaryMenu';
import SecondaryMenu from './secondaryMenu';

export default function Mainheader() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Remove the auth token from cookies
    Cookies.remove('auth_token'); // Key name of the cookie to be removed

    // Optionally, clear other related cookies if needed
    // Cookies.remove('another_cookie');

    // Redirect the user to the login page or home page
    router.push('/login'); // Replace '/login' with your desired route
  };

  return (
    <>
    <TopMenu />
    <PrimaryMenu />
    <SecondaryMenu />
    </>
    // <header className="bg-gray-800 text-white">
    //   <div className="container mx-auto flex justify-between items-center p-4">
    //     {/* Logo */}
    //     <div className="text-xl font-bold">
    //       <Link href="/">MyWebsite</Link>
    //     </div>

    //     {/* Hamburger Menu for Mobile */}
    //     <button
    //       className="md:hidden"
    //       onClick={() => setIsOpen(!isOpen)}
    //       aria-label="Toggle Menu"
    //     >
    //       {isOpen ? <X size={24} /> : <Menu size={24} />}
    //     </button>

    //     {/* Navigation Links */}
    //     <nav
    //       className={`${
    //         isOpen ? 'block' : 'hidden'
    //       } md:flex md:items-center space-y-4 md:space-y-0 md:space-x-6 absolute md:static bg-gray-800 md:bg-transparent w-full md:w-auto top-16 md:top-auto left-0 md:left-auto p-4 md:p-0`}
    //     >
    //       <Link href="/" className="hover:text-gray-400">
    //         Home
    //       </Link>
    //       <Link href="/dashboard" className="hover:text-gray-400">
    //         Dashboard
    //       </Link>
    //       <Link href="/signup" className="hover:text-gray-400">
    //         Sign Up
    //       </Link>
    //       <Link href="/login" className="hover:text-gray-400">
    //         Login 
    //       </Link>
    //       <h1 onClick={handleLogout} className='cursor-pointer hover:text-gray-400'>Logout</h1>
    //     </nav>
    //   </div>
    // </header>
  );
}
