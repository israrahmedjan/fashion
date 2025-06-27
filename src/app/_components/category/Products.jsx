'use client'
import {motion, AnimatePresence } from 'framer-motion'
import { Eye, Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

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
                {/* Image with icons on hover */}
              
                <div className="relative">
      <Image
                    src={product.image}
                    alt={product.name}
                    width={260}
                    height={361}
                    className="w-full h-auto object-cover"
                  /> 
                 
                  {/* Animated Icons on Hover */}
                  <div className="absolute inset-0 bg-[#11111]  bg-opacity-10 md:bg-opacity-0 md:group-hover:bg-opacity-10 transition-all duration-300">
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
                      <Link href={`${domain}/product/${product.slug}`} className='cursor-pointer'>  <h2 className="text-base  font-[400] ">{product.name}</h2></Link>
                  <div className="flex justify-center text-yellow-400 mt-1 mb-1">
                    {'★★★★★'.split('').map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-[#111111] text-[16px] font-[600]">{product.Price}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
           
        </div>
   
  )
}

export default Products