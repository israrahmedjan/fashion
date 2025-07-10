'use client'
import { AnimatePresence,motion } from 'framer-motion'
import { ShoppingCart, Trash2 } from 'lucide-react'
import React from 'react'
import useWish from '@/store/useWishStore'
import Link from 'next/link'
function WishCart() {
    const {itemwish,Removeitemwish} = useWish();
    const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN;
  return (
  
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 80 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="absolute -right-3 top-9 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl z-50"
    >
      {/* Arrow on top */}
      <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45 z-40"></div>

      <div className="p-4 bg-gradient-to-br from-white via-gray-50 to-white rounded-xl relative z-50">
        <div className="flex items-center gap-2 mb-3 border-b border-gray-200 pb-2">
          <ShoppingCart size={20} className="text-[#ca1515]" />
          <h4 className="text-lg font-semibold text-[#111111]">Wish Items</h4>
        </div>

        {itemwish.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-6">🛒 Cart is empty</p>
        ) : (
          <>
            <ul className="space-y-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
              {itemwish.map((item) => (
                <motion.li
                  key={item._id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.2 }}
                  className="flex justify-between items-start text-sm border-b border-gray-100 pb-2"
                >
                  <div>
                    <p className="font-medium text-[#111111]">{item.productName}</p>
                    {item?.color && (
                      <p className="text-xs text-gray-500">Color: {item.color}</p>
                    )}
                    <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#111111]">${item.price * item.qty}</p>
                    <button
                      className="text-red-500 text-xs mt-1 hover:text-red-700"
                      onClick={() => Removeitemwish(item._id)}
                    >
                      <Trash2 className="w-4 h-4 inline-block mr-1" />
                      Delete
                    </button>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* Total & Checkout */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex justify-between text-sm font-semibold text-[#111111] mb-2">
                <span>Total:</span>
                <span>
                  $
                  {itemwish.reduce(
                    (total, item) => total + item.price * item.qty,
                    0
                  )}
                </span>
              </div>
              <div className="flex justify-between gap-3 items-center">
                <Link
                  href={`${domain}cart`}
                  className="w-full text-center bg-[#ca1515] hover:bg-[#111111] text-white text-sm font-medium py-2 rounded-md transition"
                >
                  View Cart
                </Link>
                <button className="w-full bg-[#ca1515] hover:bg-[#111111] text-white text-sm font-medium py-2 rounded-md transition">
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  </AnimatePresence>

  )
}

export default WishCart