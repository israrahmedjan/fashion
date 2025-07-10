'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Star } from 'lucide-react';

export default function ProductCard({product}) {
  return (
    <Card className="group relative overflow-hidden rounded-none border-none">
      {/* Product Image */}
      <div className="relative w-full h-[350px]">
        <Image
           src={product.image}
          alt="Men Shirt"
          fill
          className="object-cover"
        />

        {/* Hover Icons */}
<div className="absolute top-3 right-3 flex flex-col items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
    <div 
    className="w-12 h-12 border-gray-200 border bg-gray-50 rounded-full p-0 flex items-center justify-center transform scale-75 opacity-0 translate-y-2 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-hover:translate-y-0 delay-200" onClick={()=>console.log("Button")}>
    <ShoppingCart size={20} className='text-[#444] font-serif' /> {/* ✅ Use size prop here */}
</div>
   <div 
    className="w-12 h-12 border-gray-200 border bg-gray-50 rounded-full p-0 flex items-center justify-center transform scale-75 opacity-0 translate-y-2 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-hover:translate-y-0 delay-200" onClick={()=>console.log("Button")}>
    <Heart size={20} className='text-[#444] font-serif' /> {/* ✅ Use size prop here */}
</div>
  <div 
    className="w-12 h-12 border-gray-200 border bg-gray-50 rounded-full p-0 flex items-center justify-center transform scale-75 opacity-0 translate-y-2 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-hover:translate-y-0 delay-200" onClick={()=>console.log("Button")}>
    <Eye size={20} className='text-[#444] font-serif' /> {/* ✅ Use size prop here */}
</div>
</div>






      </div>

      {/* Product Details */}
      <CardContent className="text-center py-4 space-y-1">
        <div className="flex justify-center items-center gap-1 text-yellow-500">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-500 stroke-yellow-500" />
            ))}
        </div>

        <h4 className="font-[500] text-sm md:text-[14px] text-[#111111]">{product.name}</h4>
  <div className="flex items-center flex-col justify-center mt-4 gap-2">
    <div className="text-[#111111] font-[600] text-sm md:text-[16px]">
    ${product.price}
  </div>
  <button className="flex gap-2 font-[500] text-[16px] hover:border-gray-200 hover:border-b  text-[#ca1515]  pl-2 pr-2 pt-1 pb-1  rounded-md transition">
    <ShoppingCart className="w-5 h-5" /><span>Add to Cart</span>
  </button>


</div>

      </CardContent>
    </Card>
  );
}
