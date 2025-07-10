'use client'
import {motion, AnimatePresence } from 'framer-motion'
import { Eye, Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProductCard from '../produccts/ProductCard'

function Products({items}) {
    const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN;
  return (
    <div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {items.map((product,i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className=" bg-white hover:shadow-lg transition duration-300 overflow-hidden"
              >
           <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
           
        </div>
   
  )
}

export default Products