'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, User, ShoppingCart,Menu, X, Trash2 ,ChevronDown, Eye  } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import useCart from '@/store/cart'
import { motion ,AnimatePresence} from 'framer-motion';
import { searchProducts } from '@/app/_components/produccts/operationsAPI'
 
const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN
export default function Header() {
 
  

  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [client,setclient] = useState(false);
  


  useEffect(() => {
    // Show header with delay
    setclient(true)
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);





  if(!client) return null
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
        <Icons  />
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

  const [isShopOpen, setIsShopOpen] = useState(false);
  //const navItems = ["Home", "Shop", "Services", "About", "Blogs", "Contact"];
  const navItems = [
  { name: 'Home', slug: '' },
  { name: 'Shop', slug: '' },
  { name: 'Services', slug: 'services' },
  { name: 'About', slug: 'about' },
  { name: 'Blogs', slug: 'blogs' },
  { name: 'Contact', slug: 'contact' },
];
  return (
<nav className="hidden md:flex items-center gap-6 text-[#111111] uppercase text-[15px] font-medium relative">
      {navItems.map((item) =>
        item.name === "Shop" ? (
          <div
            key={item}
            className="relative"
            onMouseEnter={() => setIsShopOpen(true)}
            onMouseLeave={() => setIsShopOpen(false)}
          >
            {/* Shop Link with Icon */}
            <div className="flex items-center gap-1 cursor-pointer">
              <span className="hover:text-[#ca1515] transition-colors duration-200">
                {item.name}
              </span>
              <ChevronDown size={16} />
            </div>

            {/* Dropdown Menu (No margin-top to avoid hover gap) */}
            <div
              className={`absolute left-0 text-[14px] font-[400] top-7 bg-white border rounded shadow-lg min-w-[250px] z-50 transition-all duration-200 ${
                isShopOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              <Link href={`${domain}category/mens_fashion`} className="block px-4 py-2 border-gray-100 border-b-[1px] hover:bg-gray-100 text-black">
                Men's Fashion
              </Link>
              <Link href={`${domain}category/women_fashion`} className="block px-4 py-2 border-gray-100 border-b-[1px] hover:bg-gray-100 text-black">
                Women's Fashion
              </Link>
              <Link href={`${domain}category/kidz_fashion`} className="block px-4 py-2 border-gray-100 border-b-[1px] hover:bg-gray-100 text-black">
                Kidz's Fashion
              </Link>
              <Link href={`${domain}category/cosmetics`} className="block px-4 py-2 border-gray-100 border-b-[1px] hover:bg-gray-100 text-black">
                Cosmitics
              </Link>
              <Link href={`${domain}category/accessories`} className="block px-4 py-2 border-gray-100 border-b-[1px] hover:bg-gray-100 text-black">
                Accessories
              </Link>
            </div>
          </div>
        ) : (
          <Link
            key={item.name}
            href={`${domain}${item.slug}`}
            className="hover:text-[#ca1515] transition-colors duration-200"
          >
            {item.name}
          </Link>
        )
      )}
    </nav>
  )
}

// Reusable Icons
function Icons() {
const {item,RemoveItem} = useCart();
const cartItems = item;
const dropdownRef = useRef(null);
const [query, setquery] = useState("");
const [isOpen, setIsOpen] = useState(false);
const [isOpensarchBox,setisOpensarchBox] = useState();
const [selectedCategory, setSelectedCategory] = useState('');
const [searchResult,setsearchResult] = useState()
     useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch= async (name,category)=>{

//console.log("hell", name,category)
 const data = await searchProducts(name,category);
 setsearchResult(data);
 console.log("Serch products fuund here", data);

}
  return (
    <div className="flex items-center gap-4 text-[#111111] font-medium ">
      <span className='text-[12px] font-[400]'>Login / Register</span>
      {/* {JSON.stringify(item,null,2)} */}
      <Search className="w-5 h-5 cursor-pointer hover:text-[#ca1515] transition-colors duration-200" onClick={()=>setisOpensarchBox(!isOpensarchBox)} />
      <User className="w-5 h-5 cursor-pointer hover:text-[#ca1515] transition-colors duration-200" />
  <div className="relative" ref={dropdownRef}>
    <div className='flex gap-2 relative'>
       {(item && item.length>0) && (<span className='absolute -top-2 left-4 bg-black text-[10px] text-white w-4 h-4 text-center rounded-full'>{item.length}</span>)}
  <ShoppingCart
    className="w-5 h-5 cursor-pointer hover:text-[#ca1515] transition-colors duration-200"
    onClick={() => setIsOpen(!isOpen)}
  />
 
  </div>
{isOpensarchBox && (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 h-screen  z-50 flex items-start justify-center pt-24"
    >
      {/* Close icon */}
      <button
        className="absolute top-5 right-5 text-white hover:text-gray-300 z-50"
        onClick={() => setisOpensarchBox(false)}
      >
        <X size={28} />
      </button>

      {/* Search Box */}
      <motion.div
        initial={{ y: -30, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -20, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-[60%] text-center space-y-4 relative z-50"
      >
        <h2 className="text-xl font-semibold text-gray-800">Search Products</h2>
        <p className="text-sm text-gray-500">Type a keyword and press enter</p>

        {/* Category + Search + Button in one tight row */}
        <div className="flex w-full">
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-1/3 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
            <option value="toys">Toys</option>
          </select>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setquery(e.target.value)}
            value={query}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(query, selectedCategory);
              }
            }}
            className="w-1/2 px-4 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Search Button */}
          <button
            onClick={() => handleSearch(query, selectedCategory)}
            className="w-1/6 bg-[#ca1515] text-white font-medium rounded-r-md px-4 py-2 hover:bg-gray-600 transition"
          >
            Search
          </button>
        </div>
          {(searchResult && searchResult.length>0 && (
   <div className="flex flex-col gap-4 p-4 max-h-[300px] overflow-auto">
  {searchResult.map((product) => (
    <div
      key={product._id}
      className="flex items-center gap-4 bg-white p-4 rounded-lg shadow hover:shadow-md transition"
    >
      {/* Thumbnail */}
      <img
        src={product.imageThumb}
        alt={product.name}
        className="w-20 h-28 object-cover rounded-md border"
      />

      {/* Details */}
      <div className="flex-1">
        <h3 className="text-base font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <p className="text-sm text-blue-600 font-medium mt-1">${product.price}</p>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded inline-block mt-1">
          {product?.Category?.name}
        </span>
      </div>

      {/* View Icon */}
      <button className="text-blue-600 hover:text-blue-800 transition">
        <Eye size={20} />
      </button>
    </div>
  ))}
</div>

      ))}
      </motion.div>

    
    </motion.div>
  </AnimatePresence>
)}



  {isOpen && (
    <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50">
      <div className="p-4">
        <h4 className="font-[500] text-lg mb-3 border-gray-200 border-b pb-2"> Your Cart</h4>

        {cartItems.length === 0 ? (
          <p className="text-sm text-[#111111]">No items in cart</p>
        ) : (
          <>
            <ul className="space-y-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
              {cartItems.map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between items-start text-sm border-gray-100 border-b-[1px] pb-2"
                >
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    {item?.color && (<p className="text-xs text-[#444]">Color: {item.color}</p>)}
                    <p className="text-xs text-[#444]">Qty: {item.qty}</p>

                  </div>
                  <div className="text-right">
                    <p className="font-[500]">$ {item.price*item.qty}</p>
                    <button
                      className="text-[#ca1515] text-xs mt-1 hover:text-red-700"
                      onClick={() => RemoveItem(item._id)}
                    >
                      <Trash2 className="w-4 h-4 inline-block mr-1" />
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Total and Checkout */}
            <div className="mt-4 pt-3">
              <div className="flex justify-between font-[500] mb-2">
                <span>Total:</span>
                <span>
                 
                  {cartItems.reduce(
                    (total, item) => total + item.price * item.qty,
                    0
                  )}
                </span>
              </div>
              <div className='flex justify-between gap-3 items-center'>
              <Link href={`${domain}cart`} className="w-full text-center bg-[#ca1515] hover:bg-[#111111] text-white text-sm font-[500] py-2 rounded transition">
                View Cart
              </Link>
              <button className="w-full bg-[#ca1515] hover:bg-[#111111] text-white text-sm font-[500] py-2 rounded transition">
                Checkout
              </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )}
</div>

    </div>
  )
}
