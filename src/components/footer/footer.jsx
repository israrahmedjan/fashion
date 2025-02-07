import { Home, LogIn, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
export default function Mainfooter() {
    return (
      <>
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


      <footer className="fixed lg:hidden bottom-0 left-0 w-full bg-white shadow-md border-t border-gray-200">
      <div className="flex justify-around py-3">
        <Link href="/" className="flex flex-col items-center text-gray-600 hover:text-black">
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </Link>

        <Link href="/login" className="flex flex-col items-center text-gray-600 hover:text-black">
          <LogIn className="w-6 h-6" />
          <span className="text-xs">Login</span>
        </Link>

        <Link href="/wishlist" className="flex flex-col items-center text-gray-600 hover:text-black">
          <Heart className="w-6 h-6" />
          <span className="text-xs">Wishlist</span>
        </Link>

        <Link href="/cart" className="flex flex-col items-center text-gray-600 hover:text-black">
          <ShoppingCart className="w-6 h-6" />
          <span className="text-xs">Cart</span>
        </Link>
      </div>
    </footer>


      {/* Mobile footer */}
      </>
    );
  }
  