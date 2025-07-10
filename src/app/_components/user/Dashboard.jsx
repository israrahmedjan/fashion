'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, LogOut, Settings, User, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { userLogout } from './userOperations'
import useMessageStore from '@/store/useMessageStore'

export default function Dashboard({ userData ,setUserData}) {
  const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN || "";  
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { setMessage } = useMessageStore();

  const logOutHandle = async ()=>
  {
       
        const data = await userLogout();
        if(data.success)
        {
            setMessage(`User LogOut successfully .`, "success");
             setUserData(null)
        console.log("User lo ",data);
        }
       
  }
  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 font-[500] text-[#111111] hover:text-[#ca1515] transition"
      >
        Welcome, {userData.name}
        <ChevronDown size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50 font-[500]">
          <ul className="py-1 text-sm text-[#444]">
            <li>
              <Link
                href="/profile"
                className="flex items-center px-4 py-2 hover:bg-gray-500 transition"
              >
                <User className="mr-2 h-4 w-4" /> Profile
              </Link>
            </li>
            <li>
              <Link
                href="/orders"
                className="flex items-center px-4 py-2 hover:bg-gray-100 transition"
              >
                <ShoppingBag className="mr-2 h-4 w-4" /> Orders
              </Link>
            </li>
            {/* <li>
              <Link
                href="/settings"
                className="flex items-center px-4 py-2 hover:bg-gray-100 transition"
              >
                <Settings className="mr-2 h-4 w-4" /> Settings
              </Link>
            </li> */}
            <li>
              <button
                onClick={()=>logOutHandle()}
                className="flex w-full items-center px-4 py-2 hover:bg-gray-100 transition text-left"
              >
                <LogOut className="mr-2 h-4 w-4"  /> Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
