'use client'
import { removeFromWishlist } from '@/helper/whislist'
import { Cross, Delete, DeleteIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useDispatch,useSelector } from 'react-redux'

function Wishlist({wishlistItems}) {
    const dispatch = useDispatch();
    const HandleRemoveItem = (id)=>
    {

       // alert("Hello",id);
        console.log(id)
        removeFromWishlist(dispatch,id);
        
    }
    return (
        <>
            <div className="absolute top-16 right-[100px] bg-white border border-gray-100 rounded-2xl shadow-lg p-4 w-[400px]">
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
        </>
    )
}

export default Wishlist