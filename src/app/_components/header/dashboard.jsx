"use client";
import { useState } from "react";
import { LogOut, User, List } from "lucide-react";
import { useSelector } from "react-redux";
import Link from "next/link";

const Dashboard = ({ userData, setUserData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user.user);

  const handleLogout = async () => {
    fetch("/api/logout", { method: "POST" }).then(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("isUserLogin");
      window.location.href = "/";
    });
  };

  return (
    <>
      {/* large devices */}
      <div className="hidden md:block relative z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
        >
          <User size={22} />
          <span className="md:inline text-sm font-medium">
            Hi {userData?.name}
          </span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
            <div className="px-4 py-2 text-sm text-gray-900">
              {user?.name}
              <div className="text-gray-500 text-xs">{userData?.email}</div>
            </div>
            <hr />
            <Link
              href="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              <User size={20} className="mr-2" />
              Profile
            </Link>
            <Link
              href="/orders"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              <List size={20} className="mr-2" />
              Orders
            </Link>
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
      <div className="md:hidden relative z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col items-center text-gray-600 hover:text-black"
        >
          <User className="w-6 h-6" />
          <span className="text-xs">Hi {userData?.name}</span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 bg-gray-50 w-48 border rounded-lg shadow-lg z-50">
            <div className="px-4 py-2 text-sm text-gray-900">
              {userData?.name}
              <div className="text-gray-500 text-xs">{userData?.email}</div>
            </div>
            <hr />
            <Link
              href="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 transition"
            >
              <User size={20} className="mr-2" />
              Profile
            </Link>
            <Link
              href="/orders"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 transition"
            >
              <List size={20} className="mr-2" />
              Orders
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 transition"
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

export default Dashboard;
