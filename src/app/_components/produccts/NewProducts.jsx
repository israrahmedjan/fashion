'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { filter } from 'lodash';
import Link from 'next/link';

const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN;

function formatCategory(cat) {
  return cat
    .split('_') // ['mens', 'fashion']
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // ['Mens', 'Fashion']
    .join(' '); // 'Mens Fashion'
}

export default function ProductGallery({data}) {
  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentCategory1, setCurrentCategory1] = useState('all');
  const [client,setclient] = useState(false);
console.log("products",data);
const products = data;
// const products1 = [
//   { id: 1, name: 'Red Dress', category: 'women', price: '$49.99', image: `${domain}images/product/product-111.jpg` },
//   { id: 2, name: 'Men Shirt', category: 'men', price: '$39.99', image: `${domain}images/product/product-2.jpg` },
//   { id: 3, name: 'Kids Jacket', category: 'kids', price: '$29.99', image: `${domain}images/product/product-3.jpg` },
//   { id: 4, name: 'Blue Skirt', category: 'women', price: '$35.00', image: `${domain}images/product/product-4.jpg` },
//   { id: 5, name: 'Men Jeans', category: 'men', price: '$59.99', image: `${domain}images/product/product-5.jpg` },
//   { id: 6, name: 'Kid Shoes', category: 'kids', price: '$25.00', image: `${domain}images/product/product-6.jpg` },
//   { id: 7, name: 'Kid Shoes', category: 'kids', price: '$24.00', image: `${domain}images/product/product-2.jpg` },
//   { id: 8, name: 'Kid Shoes', category: 'kids', price: '$27.00', image: `${domain}images/product/product-3.jpg` },
// ];
const categories = [
  "all",
  ...[...new Set(products.map(item => item.category))]
];

console.log("New array is", categories);
//const categories = ['all', 'cosmetics', 'accessories', 'kidz_fashion','mens_fashion','women_fashion'];


 const filteredProducts =
    currentCategory === 'all'
      ? products
      : products.filter((p) => p.category === currentCategory); 

  



      useEffect(()=>
    {
      setclient(true);
    },[])

    if(!client) return null;
  return (
    <section className="w-full">
      <div className="w-full md:w-[1167px] px-4 md:px-0 mx-auto mt-32">
        {/* Filter Buttons */}
        <div className="flex justify-between items-center flex-wrap mb-6">
          <div>
            <h1 className="text-base md:text-[24px] font-[600] text-[#111111]">New Products</h1>
            <div className="w-[60px] h-[2px] bg-[#ca1515] mt-1"></div>
          </div>
          <div>
            <ul className="flex gap-4 mt-4 md:mt-0">
              {categories.map((cat) => (
                <li
                  key={cat}
                  className={`cursor-pointer text-base md:text-[14px] font-[400]  hover:text-black  capitalize ${
                    currentCategory === cat ? 'text-black font-bold border-[#ca1515] border-b-2' : ''
                  }`}
                  onClick={() => setCurrentCategory(cat)}
                >
                 {formatCategory(cat)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProducts.map((product,i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className=" bg-white hover:shadow-lg transition duration-300 overflow-hidden"
              >
                {/* Image with icons on hover */}
                <div className="relative">
                 <Link href={`${domain}product/${product.productSlug}`} className="block cursor-pointer"> 
                 <Image
                    src={product.image}
                    alt={product.name}
                    width={260}
                    height={361}
                    className="w-full h-auto object-cover"
                  />
                  </Link>

                  {/* Animated Icons on Hover */}
                 <div className="absolute inset-0 bg-[#11111] bg-opacity-10 md:bg-opacity-0 md:group-hover:bg-opacity-10 transition-all duration-300 pointer-events-none">
   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                      {[ShoppingCart, Heart, Eye].map((Icon, index) => (
                        <motion.button
                          key={index}
                          initial={{ y: 40, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          whileHover={{ scale: 1.1 }}
                          transition={{
                            delay: 0.1 * index,
                            duration: 0.4,
                            ease: 'easeOut',
                          }}
                          className="bg-white p-2 text-[10px] rounded-full  font-normal shadow hover:bg-[#ca1515] hover:text-white"
                        >
                          <Icon className="text-[#111111] w-5 h-5 font-thin  hover:text-white" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3 text-center md:text-[14px]">
                 <Link href={`${domain}product/${product.productSlug}`}> <h2 className="text-base  font-[400] ">{product.name}</h2></Link>
                  <div className="flex justify-center text-yellow-400 mt-1 mb-1">
                    {'★★★★★'.split('').map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-[#111111] text-[16px] font-[600]">{product.price}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
