'use client'

import { removeFromCart } from '@/helper/cartlist'
import { Cross, Delete, DeleteIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useDispatch,useSelector } from 'react-redux'

function Cart({cartItems}) {
    const dispatch = useDispatch();
    const HandleRemoveItem = (id)=>
    {

       // alert("Hello",id);
        console.log(id)
        removeFromCart(dispatch,id);
        
    }
    return (
        <>
        {/* Lg Devices */}
            <div className="hidden md:block absolute top-16 right-[100px] bg-white border border-gray-100 rounded-2xl shadow-lg p-4 w-[400px]">
          {cartItems?.length == 0 && (<div className='flex justify-between content-center'><span>No Cart product availiable!</span><span><DeleteIcon size={22} /></span></div>)}
          {/* {JSON.stringify(cartItems,null,2)} */}
            {cartItems.map((item, index) => (
 <div key={index} className="flex items-center justify-between p-4 border-b">
 {/* Left side: Image + Text */}
 <div className="flex items-center gap-4">
   <Image
     src={item.image}
     alt={item.productName}
     width={60}
     height={60}
     className="object-cover rounded-lg border"
   />
   <div>
     <span className="text-sm w-[200px] font-medium block">
       {item.productName || 'Product Title'}
     </span>
     <p className="text-sm text-gray-500">
       Price : ${item.price || 'Short product description'}
     </p>
   </div>
 </div>

 {/* Right side: Remove */}
 <div onClick={()=>HandleRemoveItem(item.productId)} className="text-red-500 text-sm cursor-pointer hover:underline">
   <Delete size={22} />
 </div>
</div>

))}
                
            </div>

{/* Small Devices */}
<div className="md:hidden fixed bottom-16 right-4 bg-white border border-gray-100 rounded-xl shadow-lg p-3 w-[90%] max-w-xs z-50">
  {cartItems?.length === 0 && (
    <div className="flex justify-between items-center text-sm text-gray-700">
      <span>No Cart product available!</span>
      <DeleteIcon size={20} />
    </div>
  )}

  {cartItems?.map((item, index) => (
    <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
      {/* Left side: Image + Text */}
      <div className="flex items-center gap-3">
        <Image
          src={item.image}
          alt={item.productName}
          width={50}
          height={50}
          className="object-cover rounded-md border"
        />
        <div>
          <span className="text-sm font-medium block truncate max-w-[130px]">
            {item.productName || 'Product Title'}
          </span>
          <p className="text-xs text-gray-500">
            Price: ${item.price || 'N/A'}
          </p>
        </div>
      </div>

      {/* Right side: Remove */}
      <div
        onClick={() => HandleRemoveItem(item.productId)}
        className="text-red-500 cursor-pointer hover:underline"
      >
        <Delete size={20} />
      </div>
    </div>
  ))}
</div>
                
           
        </>
    )
}

export default Cart