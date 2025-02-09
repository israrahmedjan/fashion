import React from 'react'
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Scale ,RefreshCw} from "lucide-react";

function ProductCard({product}) {
  return (
    <>
<div className="group relative bg-white rounded-xl shadow-md lg:text-[14px] overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300 w-72">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        {/* Default Image */}
        <img
          src="images/product.jpg"
          alt="Product"
          className="w-full h-64 object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay Icons (Wishlist & Compare) */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition duration-300">
          <button className="p-2 bg-white shadow-md rounded-full hover:bg-gray-100 transition">
            <Heart className="h-5 w-5 text-secondary" />
          </button>
          <button className="p-2 bg-white shadow-md rounded-full hover:bg-gray-100 transition">
            <RefreshCw className="h-5 w-5 text-secondary" />
          </button>
        </div>

        {/* Add to Cart Button (Appears on Hover) */}
        <button className="absolute bottom-0 left-0 right-0 mx-auto w-full bg-secondary text-white py-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition duration-300">
          <ShoppingCart className="h-5 w-5 inline-block mr-2" />
          Add to Cart
        </button>
      </div>

      {/* Product Details */}
      <div className="mt-4 text-center">
        <h3 className="font-semibold text-primary">{product.productName}</h3>
        <p className="text-gray-600">${product.price}</p>
      </div>
    </div>
            </>
      )
}

export default ProductCard