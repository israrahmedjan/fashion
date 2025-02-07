import React from 'react'
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Scale } from "lucide-react";

function ProductCard({product}) {
  return (
    <>


<motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="relative p-4 bg-white shadow-lg rounded-lg overflow-hidden group"
    >
      <img
        src="images/product.jpg"
        alt={product.productName}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="mt-4">
        <h2 className="text-lg font-semibold">{product.productName}</h2>
        <p className="text-gray-500">${product.price}</p>
      </div>
      <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <motion.button
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="p-2 bg-blue-500 text-white rounded-full"
        >
          <ShoppingCart size={20} />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="p-2 bg-red-500 text-white rounded-full"
        >
          <Heart size={20} />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="p-2 bg-gray-700 text-white rounded-full"
        >
          <Scale size={20} />
        </motion.button>
      </div>
    </motion.div>

    {/* <div>{JSON.stringify(product,null,2)}</div> */}

    </>
      )
}

export default ProductCard