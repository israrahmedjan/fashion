'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';

import ProductCard from './ProductCard';

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
    
       <div className="w-full md:w-[1167px] px-4 md:px-0 mx-auto mt-3 md:mt-32">
     {(filterProducts && filterProducts.length>0) && (

      <div className="flex flex-col md:flex-row justify-between items-start flex-wrap mb-6">
          <div>
           
            <h1 className="text-base md:text-[24px] font-[600] text-[#111111]">New Products</h1>
            <div className="w-[60px] h-[2px] bg-[#ca1515] mt-1"></div>
          </div>

            <div>
            <ul className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
              {category.map((cat) => (
                <li
                  key={cat.slug}
                  className={`cursor-pointer text-base md:text-[14px] font-[400]  hover:text-black  capitalize ${
                    currentCategory === cat.slug ? 'text-black font-bold md:border-[#ca1515] md:border-b-2' : ''
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
               
                  className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-10">

            {filterProducts.map((product,i) => (
           <div className='w-full ' key={i}>  
 <ProductCard product={product}  />
      </div>       
            ))}
        
        </motion.div>

          </div>
     )}
    
    </div>
 
  )
}

export default ProductGallery