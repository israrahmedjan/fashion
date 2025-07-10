'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import useMessageStore from '@/store/useMessageStore'

export default function MessageComponent() {
  const { message, type, clearMessage } = useMessageStore()

  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.div
          key="message-box"
          initial={{ opacity: 0, scale: 0.95, y: 250 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 250 }}
          transition={{ duration: 0.4 }}
          className="fixed top-6 md:top-14 left-0 md:left-[50%] transform md:-translate-x-1/2 z-50 
             bg-[#111111] text-white py-3 md:py-4 px-4 md:px-6 rounded-lg 
             shadow-lg flex items-center justify-between gap-3 
             w-full md:w-auto max-w-full md:max-w-fit mx-4 md:mx-0"
        >
          <div className="flex items-center gap-2">
            <div className='w-5 h-5 md:w-7 md:h-7 border-white border rounded-full text-white text-center flex justify-center items-center'>
              <Check size={15} />
            </div> 
            <div className="font-[400] text-sm md:text-[14px]">
              <p className='text-start'>{message}!</p>
            </div>
          </div>
          <button onClick={clearMessage} className="hover:text-gray-200">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
