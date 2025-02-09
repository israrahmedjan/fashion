import React from 'react'
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Scale ,RefreshCw} from "lucide-react";

function ProductCard({product}) {
  return (
    <>

<div className="group relative bg-white rounded-xl shadow-md text-sm overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300 w-full max-w-[280px]">
      {/* Product Image */}
      <div className="relative overflow-hidde">
        {/* Default Image */}
        <img
          src="images/product.jpg"
          alt={product.productName}
          className="w-full h-[250px] object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
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
      <div className="mt-4 text-center p-2">
        <h3 className="font-semibold text-primary">{product.productName}</h3>
        <p className="text-gray-600">${product.price}</p>
      </div>
    </div>
            </>
      )
}

export default ProductCard