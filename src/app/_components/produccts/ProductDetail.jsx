'use client';

import { Check, CheckIcon, ChevronRight, GitCompare, Heart, HomeIcon, Minus, Plus, ShoppingBag, Star, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { motion ,AnimatePresence} from 'framer-motion';
import useCart from '@/store/cart';

function ProductDetail({ product }) {
  const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN || "";
  const [client, setclient] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product?.Variations[0]?.color);
  const [selectedSize, setSelectedSize] = useState(product?.Variations[0]?.size);
  const [activeTab, setActiveTab] = useState('description');
  const [fileterProduct, setfilterProduct] = useState(product?.Variations[0]);

  const { add,item,clear,success,setMessage } = useCart();

       
  const handleAddTocart = (item) => {
    add({productId:product._id,productName:product.name,qty:1,...item}); // product = { id: 1, name: "Product A", price: 100 }

  setTimeout(() => {
    setMessage(false)
  }, 5000);
  }




  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: 'Reviews' },
  ];

  const VariationsColorHandle = (color, size) => {
    setSelectedColor(color);
    const data = product.Variations.filter((item) => item.color === color);
    setfilterProduct(data[0]);
  };

  const VariationsSizeHandle = (color, size) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    setclient(true);
  }, []);

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
            <span className="font-semibold">Item successfully added to cart!</span>
            <button onClick={() => setMessage(false)}>
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

   
    </div>


 
      {product && (
        <div className="flex items-center text-sm md:text-base space-x-1 h-auto md:h-[55px] mt-4">
          <HomeIcon size={18} />
          <ChevronRight size={15} />
          <span className='font-medium'>Home</span>
          <ChevronRight size={15} />
          <Link href={`${domain}category/${product?.Category[0]?.slug}`}><span className='font-medium'>{product?.Category[0]?.name}</span></Link>
          <ChevronRight size={15} />
          <span>{product?.name}</span>
        </div>
      )}

      {fileterProduct && (
        <div className="w-full flex flex-col md:flex-row mt-4 md:mt-10 gap-4 md:gap-8 ">
         
          
          <div className="w-full md:w-1/2  ">
<div className='flex justify-start items-center gap-2'>
            <div>{product.Variations?.length > 0 && (
              <div>
                {product.Variations.map((item, i) => (
                  <div key={i} className='md:w-[120px] md:h-[150px] mt-3 border border-gray-300'>
                    <Image
                      src={item.imageThumb}
                      alt='thumb image'
                      width={120}
                      height={150}
                      onClick={() => VariationsColorHandle(item.color, item.size)}
                      className='object-center w-full h-full'
                    />
                  </div>
                ))}
              </div>
            )}</div>

            <div className='w-full'> <motion.div
              key={fileterProduct.image}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={fileterProduct.image}
                alt="product image"
                width={500}
                height={500}
                className="w-full object-cover"
              />
            </motion.div></div>
            </div>
          
           
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 flex flex-col"
          >
            <h1 className='text-lg font-semibold md:text-2xl text-[#111111]'>{product?.name}</h1>
            <span className='text-sm text-[#444]'>Brand: SKMEI</span>
            <div className='flex mt-1'>
              {Array.from({ length: 6 }).map((_, i) => (
                <Star key={i} size={14} className='text-yellow-500' />
              ))}
              <span className='text-xs text-[#444]'>( 138 reviews )</span>
            </div>
            <div className='text-xl text-[#ca1515] pt-2 font-semibold'>${fileterProduct?.price}</div>
            <p className='text-sm text-[#444] mt-2'>{product?.description}</p>

            <div className='flex flex-wrap items-center mt-4 gap-2'>
              <span className='text-sm font-semibold'>Quantity:</span>
              <div className='relative w-28 md:w-36'>
                <span className='absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer'>
                  <Minus size={14} />
                </span>
                <input
                  type="text"
                  value="1"
                  onChange={()=>console.log('on change handler')}
                  className='w-full border border-gray-200 rounded-full text-center h-10 outline-none px-7'
                />
                <span className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'>
                  <Plus size={14} />
                </span>
              </div>
              <div className='bg-[#ca1515] text-white px-4 py-2 rounded-3xl flex items-center gap-2'
              onClick={()=>handleAddTocart(fileterProduct)}>
                <ShoppingBag size={16} />
                <span className='text-sm uppercase cursor-pointer'>Add to Cart</span>
              </div>
              <div className='border border-gray-200 rounded-full p-2'><Heart size={18} /></div>
              <div className='border border-gray-200 rounded-full p-2'><GitCompare size={18} /></div>
            </div>

            <div className='border-t border-gray-200 mt-6 mb-4'></div>

            <div className='text-sm'>
              <div className='flex gap-3 leading-8'>
                <span className='w-1/3 font-semibold'>Availability:</span>
                <span className='w-2/3 flex items-center gap-2'>
                  <input type="checkbox" className='h-4 w-4 accent-[#ca1515]' /> In Stock: {fileterProduct.stock}
                </span>
              </div>
              <div className='flex gap-3 leading-8'>
                <span className='w-1/3 font-semibold'>Available color:</span>
                <div className='w-2/3 flex flex-wrap gap-2'>
                  {product?.Variations.map((color, i) => (
                    <div key={i} className='relative w-6 h-6 rounded-full border border-gray-300 cursor-pointer'>
                      <input
                        type="radio"
                        name="color"
                        value={color.color}
                        checked={selectedColor === color.color}
                        onChange={() => VariationsColorHandle(color.color, color.size)}
                        className='absolute inset-0 opacity-0 cursor-pointer'
                      />
                      <span className='block w-full h-full rounded-full' style={{ backgroundColor: color.color }}></span>
                      {selectedColor === color.color && (
                        <Check size={14} className='absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex gap-3 leading-8'>
                <span className='w-1/3 font-semibold'>Size:</span>
                <div className='w-2/3 flex gap-2'>
                  {product?.Variations.map((item, i) => (
                    <label
                      key={i}
                      className={`cursor-pointer ${item.size === selectedSize ? 'text-[#ca1515] font-semibold' : ''}`}
                      onClick={() => VariationsSizeHandle(item.color, item.size)}
                    >
                      {item.size}
                    </label>
                  ))}
                </div>
              </div>
              <div className='flex gap-3 leading-8'>
                <span className='w-1/3 font-semibold'>Shipping:</span>
                <span className='w-2/3'>Free Shipping</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Tabs */}
      <div className="w-full mt-[150px]">
        <div className="flex flex-wrap gap-4 border-b border-gray-300 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-3 text-sm font-medium ${activeTab === tab.id
                ? 'border-b-2 border-red-600 text-red-600'
                : 'text-gray-600 hover:text-red-600'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-700">
          {activeTab === 'description' && (
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut loret fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt loret. Nulla consequat massa quis enim.
            </p>
          )}
          {activeTab === 'specifications' && (
            <ul className="list-disc pl-5">
              <li>Size: Medium</li>
              <li>Material: Cotton</li>
              <li>Color: Black</li>
            </ul>
          )}
          {activeTab === 'reviews' && (
            <div>
              <p>⭐⭐⭐⭐☆</p>
              <p>Great product! I’m happy with the quality.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
