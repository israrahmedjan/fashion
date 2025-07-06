'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, User, ShoppingCart,  Menu, X, Trash2, ChevronDown, Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import useCart from '@/store/cart'
import { motion, AnimatePresence } from 'framer-motion';
import { searchProducts } from '@/app/_components/produccts/operationsAPI'
import { usePathname } from 'next/navigation';


const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN
export default function Header() {



  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [client, setclient] = useState(false);



  useEffect(() => {
    // Show header with delay
    setclient(true)
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);





  if (!client) return null
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
          <Icons />
        </div>
      </header>


      {/* Small devices */}

      <header className="block md:hidden fixed inset-x-0 top-0 z-30 bg-white shadow-md h-[64px]">
        <div className="flex items-center justify-between px-4 h-full">
          <Logo domain={domain} />
            <Icons />
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
        key={item.name}
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

        {/* Advanced Dropdown */}
        <div
          className={`absolute left-0 top-7 bg-white border border-gray-200 rounded-l-lg shadow-xl z-50 transition-all duration-300 ease-in-out
            ${isShopOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}
            before:content-[''] before:absolute before:top-[-10px] before:left-0
            before:border-l-[15px] before:border-b-[10px] before:border-l-white before:border-b-transparent
          `}
        >
          <div className="w-[750px] p-6 flex flex-wrap gap-2">
            {/* Category Items */}
            {[
              {
                title: "Men's Fashion",
                desc: "T-Shirts, Shirts, Jeans",
                slug: 'mens_fashion',
                img: '/images/categories/category-1.jpg'
              },
              {
                title: "Women's Fashion",
                desc: "Dresses, Tops, Skirts",
                slug: 'women_fashion',
                img: '/images/categories/category-2.jpg'
              },
              {
                title: "Kids' Fashion",
                desc: "Clothes for kids",
                slug: 'kidz_fashion',
                img: '/images/categories/category-3.jpg'
              },
              {
                title: "Cosmetics",
                desc: "Makeup & Beauty Kits",
                slug: 'cosmetics',
                img: '/images/categories/category-4.jpg'
              },
              {
                title: "Accessories",
                desc: "Watches, Bags, Jewelry",
                slug: 'accessories',
                img: '/images/categories/category-5.jpg'
              }
            ].map((cat) => (
              <Link
                href={`${domain}category/${cat.slug}`}
                key={cat.slug}
                className="w-[30%] min-w-[220px] group flex items-start gap-4 text-left hover:shadow-md p-3 rounded-lg transition"
              >
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-16 h-16 object-cover border border-gray-200"
                />
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 group-hover:text-[#ca1515]">
                    {cat.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
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
  const { item, RemoveItem } = useCart();
  const cartItems = item;
  const dropdownRef = useRef(null);
  const [query, setquery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpensarchBox, setisOpensarchBox] = useState();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchResult, setsearchResult] = useState();
  const [loading, setloading] = useState(false);
  
 const pathname = usePathname();
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
    //  setisOpensarchBox(false)

  
  }, []);

  const handleSearch = async (name, category) => {

    //console.log("hell", name,category)
    setloading(true);
    const data = await searchProducts(name, category);
    setsearchResult(data);
    console.log("Serch products fuund here", data);
    setloading(false);

  }

useEffect(()=>
{
  
setisOpensarchBox(false);
},[pathname])
  return (
    <div className="flex items-center gap-4 text-[#111111] font-medium ">
      <span className='text-[12px] font-[400]'>Login / Register</span>
      {/* {JSON.stringify(item,null,2)} */}
      <Search className="w-5 h-5 cursor-pointer hover:text-[#ca1515] transition-colors duration-200" onClick={() => setisOpensarchBox(!isOpensarchBox)} />
      <User className="w-5 h-5 cursor-pointer hover:text-[#ca1515] transition-colors duration-200" />
      <div className="relative" ref={dropdownRef}>
        <div className='flex gap-2 relative'>
          {(item && item.length > 0) && (<span className='absolute -top-2 left-4 bg-black text-[10px] text-white w-4 h-4 text-center rounded-full'>{item.length}</span>)}
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
      className="fixed inset-0 bg-black bg-opacity-50 h-screen z-50 flex items-start justify-center pt-24 px-4"
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
        className="bg-white p-4 md:p-8 rounded-xl shadow-2xl w-full max-w-full md:max-w-[60%] text-center space-y-4 relative z-50"
      >
        <h2 className="text-xl font-semibold text-gray-800">Search Products</h2>
        <p className="text-sm text-gray-500">Type a keyword like "Men" or "Shirt"</p>

        {/* Responsive Input Row */}
        <div className="flex flex-col md:flex-row w-full gap-2 md:gap-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border-r-0 border border-gray-200 rounded-md md:rounded-l-md md:rounded-r-none focus:outline-none"
          >
            <option value="">All</option>
            <option value="women_fashion">Women’s fashion</option>
            <option value="mens_fashion">Men’s fashion</option>
            <option value="kidz_fashion">Kid’s fashion</option>
            <option value="cosmetics">Cosmetics</option>
             <option value="accessories">Accessories</option>
          </select>

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
            className="w-full md:w-1/2 px-4 py-2 border border-gray-200 focus:outline-none"
          />

         <button
  onClick={() => handleSearch(query, selectedCategory)}
  className="w-full md:w-1/6 bg-[#ca1515] text-white font-medium rounded-md md:rounded-r-md md:rounded-l-none px-4 py-2 hover:bg-gray-600 transition"
>
  Search
</button>

        </div>

        {loading && <div>Loading...</div>}

        {searchResult?.length > 0 && (
          <div className="flex flex-col gap-4 p-2 max-h-[300px] overflow-y-auto">
            {searchResult.map((product) => (
              <div
                key={product._id}
                className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <img
                  src={product.imageThumb}
                  alt={product.name}
                  className="w-20 h-28 object-cover rounded-md border"
                />
                <div className="flex-1 text-left">
                  <h3 className="text-base font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="text-sm text-[#ca1515] font-medium mt-1">${product.price}</p>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded inline-block mt-1">
                    {product?.Category?.name}
                  </span>
                </div>
                <Link href={`${domain}product/${product.slug}`}>
                  <button className="text-[#ca1515] hover:text-gray-500 transition">
                    <Eye size={20} />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  </AnimatePresence>
)}



{isOpen && (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 80 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="absolute -right-3 top-9 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl z-50"
    >
      {/* Arrow on top */}
      <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45 z-40"></div>

      <div className="p-4 bg-gradient-to-br from-white via-gray-50 to-white rounded-xl relative z-50">
        <div className="flex items-center gap-2 mb-3 border-b border-gray-200 pb-2">
          <ShoppingCart size={20} className="text-[#ca1515]" />
          <h4 className="text-lg font-semibold text-[#111111]">Your Cart</h4>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-6">🛒 Cart is empty</p>
        ) : (
          <>
            <ul className="space-y-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
              {cartItems.map((item) => (
                <motion.li
                  key={item._id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.2 }}
                  className="flex justify-between items-start text-sm border-b border-gray-100 pb-2"
                >
                  <div>
                    <p className="font-medium text-[#111111]">{item.productName}</p>
                    {item?.color && (
                      <p className="text-xs text-gray-500">Color: {item.color}</p>
                    )}
                    <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#111111]">${item.price * item.qty}</p>
                    <button
                      className="text-red-500 text-xs mt-1 hover:text-red-700"
                      onClick={() => RemoveItem(item._id)}
                    >
                      <Trash2 className="w-4 h-4 inline-block mr-1" />
                      Delete
                    </button>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* Total & Checkout */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex justify-between text-sm font-semibold text-[#111111] mb-2">
                <span>Total:</span>
                <span>
                  $
                  {cartItems.reduce(
                    (total, item) => total + item.price * item.qty,
                    0
                  )}
                </span>
              </div>
              <div className="flex justify-between gap-3 items-center">
                <Link
                  href={`${domain}cart`}
                  className="w-full text-center bg-[#ca1515] hover:bg-[#111111] text-white text-sm font-medium py-2 rounded-md transition"
                >
                  View Cart
                </Link>
                <button className="w-full bg-[#ca1515] hover:bg-[#111111] text-white text-sm font-medium py-2 rounded-md transition">
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  </AnimatePresence>
)}


      </div>

    </div>
  )
}
