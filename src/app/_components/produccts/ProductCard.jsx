import React from 'react'
import Link from 'next/link';
import { ShoppingCart, Heart, Scale ,RefreshCw,Eye,Star  } from "lucide-react";

function ProductCard({product}) {
  const home_url = process.env.NEXT_PUBLIC_FRONT_DOMAIN;
  return (
    <>
    <div className='group relative rounded-lg mt-2 mx-1  p-2 thin-border text-[12px] lg:text-[14px] shadow-lg'>
    <img
          src="images/product.jpg"
          alt={product.productName}
          className="w-full h-[250px] object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
        />
        <div className='absolute top-3  right-3 flex flex-col gap-2 '>
       <button className="p-2 bg-white shadow-md rounded-full hover:bg-gray-100 transition">
            <Heart className="h-5 w-5 text-secondary" />
          </button>
          <button className="p-2 bg-white shadow-md rounded-full hover:bg-gray-100 transition">
            <RefreshCw className="h-5 w-5 text-secondary" />
          </button> 
          <button className="p-2 bg-white shadow-md rounded-full hover:bg-gray-100 transition">
            <Eye className="h-5 w-5 text-secondary" />
          </button> 
            
          </div>
          {/* Product Details */}
      <div className="mt-4 text-center p-2 ">
        <div className='flex justify-between items-center lg:text-[14px] mb-2 italic'>
         <span className=''>{product.categoryName}</span>
      <span className=" flex flex-row items-center  text-primary">
      {Array.from({ length: 6 }).map((_, i) => (
  <div className='text-secondary' key={i}><Star size={15} /></div>
))}
        </span>
      </div>
     <div className='flex pb-3 thin-border-bottom '> <Link href={`${home_url}product/${product.productSlug}`}><h3 className="font-semibold text-left text-primary cursor-pointer">{product.productName}</h3></Link></div>
       
        <div className='flex justify-between items-center '>
        <p className="flex px-3 py-1 thin-border items-center gap-1 mt-3 rounded-lg text-secondary hover:bg-gray-100 cursor-pointer"><ShoppingCart /><span className='text-primary'>Add To Cart</span></p>
        <p className="text-gray-600">${product.price}</p>
       
        </div>
      </div>

    </div>
            </>
      )
}

export default ProductCard