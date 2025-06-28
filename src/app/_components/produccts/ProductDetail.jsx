'use client'

import { Check, CheckIcon, ChevronRight, GitCompare, Heart, HomeIcon, Minus, Plus, ShoppingBag, Star } from 'lucide-react'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'


const colors = [
  { name: 'Red', value: '#ca1515' },
  { name: 'Black', value: '#000000' },
  { name: 'Skin', value: '#dfb196' },
];


function ProductDetail({ slug }) {
  const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN || "";
  const [client, setclient] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#000000');



  useEffect(() => {
    setclient(true);
  }, [])
  if (!client) return null;
  return (
    <div>
      <div className='w-[1167px] mx-auto flex flex-col' >
        {/* Breadcrums */}
        <div>
          <div className="flex items-center text-base md:text-[15px] space-x-1 h-[17px] md:h-[55px]">
            <HomeIcon size={18} />
            <ChevronRight size={15} />
            <span className='font-[500]'>Home</span>
            <ChevronRight size={15} />
            <span className='font-[500]'>Women</span>
            <ChevronRight size={15} />
            <span>Essential structured blazer</span>
          </div>
        </div>
        {/* Product Image and descriptions */}
        <div className='flex flex-col md:flex-row mt-2 md:mt-[50px] gap-x-8'>
          <div className='w-full md:w-[50%]'>
            <div className=''>
              <Image
                src={`${domain}/images/product/details/product-1.JPG`}
                alt={`hello `}
                width={260}
                height={361}
                className="md:w-full md:h-auto md:object-cover"
              />
            </div>



          </div>
          <div className='w-[50%] flex-col'>
            <h1 className='text-base font-[600] md:text-[30px] text-[#111111]'>Essential structured blazer</h1>
            <span className='text-base text-[#444444] md:text-[14px] font-[400] leading-8'>Brand: SKMEIMore Men Watches from SKMEI</span>
            <div className='flex mt-1 md:mt-2'>
              {Array.from({ length: 6 }).map((_, i) => (
                <Star key={i} size={14} className='text-yellow-500' />
              ))

              }
              <span className='text-[12px] text-[#444444]'>( 138 reviews )</span>
            </div>
            <div className='text-base md:text-[30px] text-[#ca1515] pt-2 md:pt-8 font-[600]'>$75</div>
            <p className='text-base text-[#444444] md:text-[14px] font-[400] mt-2 md:mt-9'>
              Nemo enim ipsam voluptatem quia aspernatur aut odit aut loret fugit, sed quia
              consequuntur magni lores eos qui ratione voluptatem sequi nesciunt.

            </p>
            <div className='flex space-x-2 justify-start items-center mt-4'>
              <span className='text-base md:text-[14px] font-[600] text-[#111111]'>Quantity : </span>
              <div className='flex flex-row justify-center items-center gap-x-3 '>

                <div className="relative w-[150px]">
                  {/* Minus icon on the left */}
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer">
                    <Minus size={12} onChange={(e) => console.log("Value is change")} />
                  </span>

                  {/* Input field */}
                  <input
                    type="text"
                    value="1"
                    onChange={(e) => console.log("value change")}
                    className="w-full border border-gray-200 rounded-full text-center h-[40px] md:h-[52px] outline-none px-8"
                  />

                  {/* Plus icon on the right */}
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
                    <Plus size={12} onChange={(e) => console.log("Value is change")} />
                  </span>
                </div>
                <div className='flex justify-center items-center'>
                  <div className='w-[172px] flex justify-center items-center gap-x-1 h-[52px] rounded-3xl font-[600] text-white bg-[#ca1515]'>
                    <span className=''><ShoppingBag size={16} /></span>
                    <span className='text-base md:text-[14px] uppercase'>Add to Cart</span>
                  </div>
                </div>

              </div>

              <div className='border-gray-200 border rounded-full md:p-[15px]'><Heart size={18} className='text-gray-600 font-[800]' /></div>
              <div className='border-gray-200 border rounded-full md:p-[15px]'><GitCompare size={18} className='text-gray-600 font-[800]' /></div>

            </div>
            <div className='h-2 border-gray-200 border-t-[1px] md:mt-10 w-full'></div>
            {/* Meta data */}
            <div className='text-base md:text-[14px]'>
              <div className='flex gap-3 leading-10'>
                <span className='w-[30%] font-[600]' >Availability:</span>
                <span className='w-[70%] flex justify-start items-center'><input
                  type="checkbox"
                  className="h-3 w-3 bg-[#ca1515] accent-[#ca1515] border  rounded"
                /><span>In Stock</span></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-[30%] text-sm font-semibold">Available color:</div>
                <div className='w-[70%]  flex justify-start items-center'>
                  {colors.map((color) => (
                    <div
                      key={color.value}
                      className="relative w-6 h-6 cursor-pointer rounded-full border border-gray-300"
                    >
                      <input
                        type="radio"
                        name="color"
                        value={color.value}
                        checked={selectedColor === color.value}
                        onChange={() => setSelectedColor(color.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <span
                        className="block w-full h-full rounded-full"
                        style={{ backgroundColor: color.value }}
                      ></span>
                      {selectedColor === color.value && (
                        <Check
                          size={14}
                          className="absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        />
                      )}
                    </div>
                  ))}
                </div>

              </div>

              


            </div>
          </div>
        </div>

        {/* Descriptions  */}

        <div className=''>Descriptions section</div>
        <div className=''>Realted Products</div>
      </div>
    </div>
  )
}

export default ProductDetail