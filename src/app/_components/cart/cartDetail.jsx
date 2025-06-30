'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronRight, HomeIcon, Star, StarIcon, X } from 'lucide-react';
import useCart from '@/store/cart';
import { AnimatePresence, motion } from 'framer-motion';


export default function CartDetail() {


    const { item, RemoveItem, UpdateItem, success, setMessage } = useCart();
    const [client, setclient] = useState(false);
    const [count, setcount] = useState(0)





    const RemoveItemHandle = (id) => {

        RemoveItem(id)
        setMessage(true);
        setTimeout(() => {
            setMessage(false)
        }, 5000);


    };

    const subtotal = item.reduce((acc, item) => acc + item.price * item.qty, 0);

    useEffect(() => {
        setclient(true)
        //setCartItems(item);
        console.log("Use effect is called!", item);
    }
        , [])
    if (!client) return null;
    return (
        <div className="max-w-screen-xl w-full px-4 mx-auto flex flex-col">
            <div className="relative">
                <AnimatePresence>
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: +250 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: +250 }}
                            transition={{ duration: 0.4 }}
                            className="fixed top-14 left-[70%] -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3"
                        >
                            <span className="font-semibold">Item remove from cart!</span>
                            <button onClick={() => setMessage(false)}>
                                <X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>


            </div>

            {/* {JSON.stringify(item,null,2)} */}
            {item && (
                <div className="flex items-center text-sm md:text-base space-x-1 h-auto md:h-[55px] mt-4">
                    <HomeIcon size={18} />
                    <ChevronRight size={15} />
                    <span className='font-medium'>Home</span>

                    <ChevronRight size={15} />
                    <span>Shopping Cart</span>
                </div>
            )}

            <div className="mt-10">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b font-[600] text-base md:text-[18px] uppercase">
                                <th className="text-left py-6">Product</th>
                                <th className="text-left py-6">Price</th>
                                <th className="text-left py-6">Quantity</th>
                                <th className="text-left py-6">Total</th>
                                <th className="p-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.map((item) => (
                                <tr key={item._id} className="border-b">
                                    <td className="py-5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-[90px] h-[90px] overflow-hidden">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={90}
                                                    height={90}
                                                    className="w-full h-full object-cover"
                                                    unoptimized
                                                />
                                            </div>
                                            <div>
                                                <span className='font-[600] text-base md:text-[16px]'>{item.productName}</span>
                                                {item?.color && <span className="text-sm text-gray-500"> ({item.color})</span>}
                                               <span className='flex gap-0'>  {Array.from({ length: 6 }).map((_, i) => (
              <StarIcon key={i} size={14} className='text-yellow-500' />
              ))}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-5'>
                                        <div className="text-[#ca1515] font-[600]">$ {item.price.toFixed(1)}</div>
                                    </td>

                                    <td className='py-5'>
                                        <div className="flex items-center gap-6">
                                            <button
                                                onClick={() => UpdateItem(0, item._id)}
                                                className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-300"
                                            >
                                                -
                                            </button>
                                            <span>{item.qty}</span>
                                            <button
                                                onClick={() => UpdateItem(1, item._id)}
                                                className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-300"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>

                                    <td className="p-2">
                                        <div>$ {(item.price * item.qty).toFixed(1)}</div>
                                    </td>

                                    <td className="p-2">
                                        <div>
                                            <button
                                                onClick={() => RemoveItemHandle(item._id)}
                                                className="text-[#ca1515] hover:text-[#ca1515] border-[#ca1515] border rounded-full p-1"
                                            >
                                                <X size={15} className='' />
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col md:flex-col justify-between mt-6 ">
                    <div className="flex gap-4 mb-4 md:mb-0 justify-between font-[600]">
                        <button className="bg-gray-100 px-4 py-2">Continue Shopping</button>
                        <button className="bg-gray-100 px-4 py-2">Update Cart</button>
                    </div>

                    <div className="p-y 4 w-full mt-4 flex justify-between items-start">
                        <div className="mt-6">
                            <label className="block mb-2 font-[600]">Discount Codes</label>
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder="Enter your coupon code"
                                    className="border px-4 py-2 flex-grow rounded-l-md"
                                />
                                <button className="bg-[#ca1515] text-white px-4 rounded-r-md">Apply</button>
                            </div>
                        </div>
                        <div className='bg-gray-100 w-[30%] p-5'>
                            <h3 className="text-lg font-semibold mb-2">Cart Total</h3>
                            <p className="flex justify-between"><span>Subtotal:</span><span className="text-red-500">$ {subtotal.toFixed(1)}</span></p>
                            <p className="flex justify-between"><span>Total:</span><span className="text-red-500">$ {subtotal.toFixed(1)}</span></p>
                            <button className="bg-[#ca1515] text-white mt-4 w-full py-2">Proceed to Checkout</button>
                        </div>
                    </div>
                </div>

                {/* <div className="mt-6">
        <label className="block mb-2">Discount Codes</label>
        <div className="flex">
          <input
            type="text"
            placeholder="Enter your coupon code"
            className="border px-4 py-2 flex-grow rounded-l-md"
          />
          <button className="bg-[#ca1515] text-white px-4 rounded-r-md">Apply</button>
        </div>
      </div> */}
            </div>
        </div>
    );
}
