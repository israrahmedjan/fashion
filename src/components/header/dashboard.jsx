"use client";
import { useState } from "react";
import { LogOut, User } from "lucide-react";
import { addUserInfo } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state)=>state.user.user);
      const handleLogout = async () => {
          fetch("/api/logout", { method: "POST" }).then(() => {
              window.location.href = "/";
              //      router.push("/login"); // Redirect to login page
          });
      }

  return (
    <>
    {/* large devices */}
    <div className="hidden md:block relative">
        {/* {JSON.stringify(user,null,2)} */}
      {/* User Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
      >
        
        <User size={22} />
        <span className="md:inline text-sm font-medium">Hi {user?.name}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
          <div className="px-4 py-2 text-sm text-gray-900">
            {user?.name} <br />

            <span className="text-gray-500 text-xs">{user?.email}</span>
          </div>
          <hr />
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            <LogOut size={20} className="mr-2" />
            Log Out
          </button>
        </div>
      )}
    </div>
     {/* small devices */}
     <div className="md:hidden relative">
        {/* {JSON.stringify(user,null,2)} */}
     

      <span className="flex flex-col items-center text-gray-600 hover:text-black" onClick={() => setIsOpen(!isOpen)}>
<User className="w-6 h-6"  />
<span className="text-xs">Hi {user?.name}</span>
</span>


      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 bottom-12 bg-gray-200 w-48 border rounded-lg shadow-lg">
          <div className="px-4 py-2 text-sm text-gray-900">
            {user?.name} <br />

            <span className="text-gray-500 text-xs">{user?.email}</span>
          </div>
          <hr />
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            <LogOut size={20} className="mr-2" />
            Log Out
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default UserDropdown;
