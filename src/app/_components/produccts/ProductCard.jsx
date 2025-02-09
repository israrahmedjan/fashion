import React from 'react'
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Scale ,RefreshCw,Eye } from "lucide-react";

function ProductCard({product}) {
  return (
    <>




    <div className='group relative  p-2 thin-border  '>
    <img
          src="images/product.jpg"
          alt={product.productName}
          className="w-full h-[250px] object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
        />
        <div className='absolute top-3  right-3 flex flex-col gap-2'>
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
        <h3 className="font-semibold text-primary">{product.productName}</h3>
        <div className='flex justify-between items-center'>
        <p className="flex px-3 py-1 thin-border rounded-lg text-secondary"><span>Add To Cart</span><ShoppingCart /></p>
        <p className="text-gray-600">${product.price}</p>
       
        </div>
      </div>

    </div>
            </>
      )
}

export default ProductCard