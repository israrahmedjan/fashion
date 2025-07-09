'use client'
import { removeFromWishlist } from '@/helper/whislist'
import { Cross, Delete, DeleteIcon, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useDispatch,useSelector } from 'react-redux'

function Wishlist({wishlistItems,isOpenWishlist, setIsOpenWishlist}) {
    const dispatch = useDispatch();
    const HandleRemoveItem = (id)=>
    {

       // alert("Hello",id);
        console.log(id)
        removeFromWishlist(dispatch,id);
        
    }
    return (
        <>
        {/* Lg Devices */}
            <div className="hidden md:block absolute top-16 right-[100px] bg-white border border-gray-100 rounded-2xl shadow-lg p-4 w-[400px]">
            <div className='flex justify-between content-center mb-2 text-primary font-semibold'><span>Wishlist Items</span><span className='cursor-pointer' onClick={()=>setIsOpenWishlist(!isOpenWishlist)}><X size={22} /></span></div>
          <hr />
        
          {wishlistItems?.length == 0 && (<div className='flex justify-between content-center'><span>No Wishlist product availiable!</span><span><DeleteIcon size={22} /></span></div>)}
          {/* {JSON.stringify(wishlistItems,null,2)} */}
            {wishlistItems.map((item, index) => (
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
<div className='flex justify-between content-center mb-2 text-primary font-semibold'><span>Wishlist Items</span><span className='cursor-pointer' onClick={()=>setIsOpenWishlist(!isOpenWishlist)}><X size={22} /></span></div>
          <hr />
       
  {wishlistItems?.length === 0 && (
    <div className="flex justify-between items-center text-sm text-gray-700">
      <span>No Wishlist product available!</span>
      <DeleteIcon size={20} />
    </div>
  )}

  {wishlistItems?.map((item, index) => (
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

export default Wishlist