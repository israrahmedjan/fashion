"use client";

import { useState } from "react";

export default function TopMenu() {
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");

  return (
    // lg device menu
    <div className="hidden lg:block bg-primary fixed top-0 left-0 w-full text-white text-sm py-2 px-4 z-[9999] !important">

      <div className="max-w-7xl mx-6 flex justify-between items-center">
        {/* Left: Promotion Message */}
        <div className="text-yellow-400 font-semibold">
          Flat 50% Off On Grocery Shop.
        </div>

        {/* Right: Menu Items */}
        <div className="flex space-x-6 items-center">
          <button className="hover:text-gray-300">Help</button>
          <button className="hover:text-gray-300">Track Order</button>

          {/* Language Dropdown */}
          <div className="relative group">
            <button className="hover:text-gray-300">{language} ▼</button>
            <div className="absolute hidden group-hover:block bg-white text-black shadow-md mt-1 py-2 w-28 rounded">
              <p
                className="px-4 py-1 hover:bg-gray-200 cursor-pointer"
                onClick={() => setLanguage("English")}
              >
                English
              </p>
              <p
                className="px-4 py-1 hover:bg-gray-200 cursor-pointer"
                onClick={() => setLanguage("Spanish")}
              >
                Spanish
              </p>
            </div>
          </div>

          {/* Currency Dropdown */}
          <div className="relative group">
            <button className="hover:text-gray-300">{currency} ▼</button>
            <div className="absolute hidden group-hover:block bg-white text-black shadow-md mt-1 py-2 w-28 rounded">
              <p
                className="px-4 py-1 hover:bg-gray-200 cursor-pointer"
                onClick={() => setCurrency("USD")}
              >
                USD
              </p>
              <p
                className="px-4 py-1 hover:bg-gray-200 cursor-pointer"
                onClick={() => setCurrency("EUR")}
              >
                EUR
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  // Mobile device menu
  );
}
