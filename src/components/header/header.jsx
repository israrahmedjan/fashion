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
      );
}
