import React from 'react'
import { ShoppingCart, Heart, Shuffle } from "lucide-react";

function ProductCard({product}) {
  return (
    <>

<div className="max-w-xs bg-white shadow-lg rounded-2xl p-4 relative">
      <div className="relative w-full h-48">
        <img
          src="images/product.jpg"
          alt="Product"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold">Product Name</h3>
        <p className="text-gray-500">$99.99</p>
      </div>
      
      <div className="flex justify-center gap-3 mt-4">
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
          <Shuffle className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
    </div>
    {/* <div>{JSON.stringify(product,null,2)}</div> */}

    </>
      )
}

export default ProductCard