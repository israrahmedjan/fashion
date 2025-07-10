'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, LogOut, User, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { userLogout } from './userOperations';
import useMessageStore from '@/store/useMessageStore';

export default function Dashboard({ userData, setUserData }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { setMessage } = useMessageStore();

  const logOutHandle = async () => {
    const data = await userLogout();
    if (data.success) {
      setMessage('User LogOut successfully.', 'success');
      setUserData(null);
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 font-medium text-[#111] hover:text-[#ca1515] transition"
      >
        <h2 className="text-sm md:text-base font-semibold uppercase">
          Welcome, {userData?.name}
        </h2>
        <ChevronDown size={18} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 md:w-48 bg-white border rounded-md shadow-lg z-50 transition-transform animate-fadeIn">
          <ul className="py-1 text-sm text-[#444] space-y-1">
            <li>
              <Link
                href="/profile"
                className="flex items-center px-4 py-2 hover:bg-gray-100 transition rounded-sm"
              >
                <User className="mr-2 h-4 w-4" /> Profile
              </Link>
            </li>
            <li>
              <Link
                href="/orders"
                className="flex items-center px-4 py-2 hover:bg-gray-100 transition rounded-sm"
              >
                <ShoppingBag className="mr-2 h-4 w-4" /> Orders
              </Link>
            </li>
            <li>
              <button
                onClick={logOutHandle}
                className="flex w-full items-center px-4 py-2 hover:bg-gray-100 transition rounded-sm text-left"
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
