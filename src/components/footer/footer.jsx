'use client'
import { Facebook, Instagram, PointerIcon, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MainFooter() {
  const [client,setclient] = useState(false);
  const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN;
  useEffect(()=>{
setclient(true);
  },[])
  if(!client) return null;
  return (
    <footer className="bg-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold font-cursive"><Image src={`${domain}images/logo.png`} width={100} height={100} alt="no image" /></h2>
          <p className="text-gray-600 mt-4 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
          </p>
          <div className="flex gap-3 mt-4">
            {["payment-1", "payment-2", "payment-3", "payment-4", "payment-5"].map((card) => (
              <Image
                key={card}
                src={`${domain}images/payment/${card}.PNG`} // You must save these images in public/cards/
                alt={card}
                width={40}
                height={24}
              />
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><a href="#">About</a></li>
            <li><a href="#">Blogs</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Account</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><a href="#">My Account</a></li>
            <li><a href="#">Orders Tracking</a></li>
            <li><a href="#">Checkout</a></li>
            <li><a href="#">Wishlist</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border rounded-l focus:outline-none"
            />
            <button className="bg-red-600 text-white px-4 py-2 rounded-r hover:bg-red-700">
              SUBSCRIBE
            </button>
          </div>

          <div className="flex gap-3 mt-5">
            <FooterIcon icon={<Facebook size={18} />} />
            <FooterIcon icon={<Twitter size={18} />} />
            <FooterIcon icon={<Youtube size={18} />} />
            <FooterIcon icon={<Instagram size={18} />} />
            <FooterIcon icon={<PointerIcon size={18} />} />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t text-center text-sm text-gray-500 py-5">
        Copyright © 2025 All rights reserved |
        This template is made with <span className="text-red-500">♥</span> by Personal Use
      </div>
    </footer>
  );
}

function FooterIcon({ icon }) {
  return (
    <div className="bg-gray-200 p-2 rounded-full text-gray-700 hover:bg-gray-300 cursor-pointer">
      {icon}
    </div>
  );
}
