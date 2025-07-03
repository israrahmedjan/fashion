'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Heart, Eye } from 'lucide-react';

function ProductGallery({ data }) {
  const [category, setCategory] = useState();
  const [filterProducts, setfilterProducts] = useState([]);
  const [currentCategory,setCurrentCategory] = useState("all");
  const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN;


  const filterProductHandle = (category) => {

    const filter = data.filter((prod) => {
      return category === 'all' || prod.category === category;
    });
    setfilterProducts(filter);
    setCurrentCategory(category)
  }


  useEffect(() => {

    const categories = data.map((item) => ({ name: item.categoryName, slug: item.category }));
    const uniqueCategories = [
      { name: "All", slug: "all" },
      ...Array.from(
        new Map(categories.map(cat => [cat.slug, cat])).values()
      )
    ];

    setCategory(uniqueCategories);

    setfilterProducts(data)

  }, [])

  return (
    <section className="w-full">
       <div className="w-full md:w-[1167px] px-4 md:px-0 mx-auto mt-32">
     {(filterProducts && filterProducts.length>0) && (

      <div className="flex justify-between items-center flex-wrap mb-6">
          <div>
           
            <h1 className="text-base md:text-[24px] font-[600] text-[#111111]">New Products</h1>
            <div className="w-[60px] h-[2px] bg-[#ca1515] mt-1"></div>
          </div>

            <div>
            <ul className="flex gap-4 mt-4 md:mt-0">
              {category.map((cat) => (
                <li
                  key={cat.slug}
                  className={`cursor-pointer text-base md:text-[14px] font-[400]  hover:text-black  capitalize ${
                    currentCategory === cat.slug ? 'text-black font-bold border-[#ca1515] border-b-2' : ''
                  }`}
                  onClick={() => filterProductHandle(cat.slug)}
                >
                {cat.name}
                </li>
              ))}
            </ul>
          </div>

  {/* Product Grid */}
        <motion.div
                    key={currentCategory}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
               
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-7">

            {filterProducts.map((product,i) => (
             
    <div key={i}
        className="bg-white hover:shadow-lg transition duration-300 overflow-hidden"
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
              </div>
             
            ))}
        
        </motion.div>

          </div>
     )}
    
    </div>
    </section>
  )
}

export default ProductGallery