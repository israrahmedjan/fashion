'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { productDetail } from '@/helper/helper';

function pages() {
  const { productSlug } = useParams();
  const [product,setProduct] = useState();
  const [images,setImages] = useState(null);
  let home_url = process.env.NEXT_PUBLIC_FRONT_DOMAIN;
  const ProductDetail = async ()=>
  {
const product = await productDetail(productSlug);
console.log("Product Found",product[0].gelleryImages[0].length);


if(product[0].gelleryImages[0].length>0)
{
 setImages(product[0].gelleryImages[0]); 
}
//console.log("Main images",uniqueOriginalImages);
  }
  useEffect(()=>
  {
    ProductDetail();
  },[productSlug])

// const product = {
//    name:"Smart Phone",
//    description:"I am interested in remote work and have five years of experiencea fullstack developerMy expertise includes React and WordPress",
//    category:"Electronics",
//    images:["images/zoom.jpg","images/zoom2.jpg","images/zoom3.jpg"]
//   }

  const images1 = [
    {
        "original": "https://res-console.cloudinary.com/dozddxjyh/thumbnails/v1/image/upload/v1730513403/Y2xkLXNhbXBsZS0z/drilldown",
        "thumbnail": "https://res-console.cloudinary.com/dozddxjyh/thumbnails/v1/image/upload/v1730513403/Y2xkLXNhbXBsZS0z/drilldown",
        "medium": "https://res-console.cloudinary.com/dozddxjyh/thumbnails/v1/image/upload/v1730513403/Y2xkLXNhbXBsZS0z/drilldown",
        "large": "https://res-console.cloudinary.com/dozddxjyh/thumbnails/v1/image/upload/v1730513403/Y2xkLXNhbXBsZS0z/drilldown"
    },
	   {
        "original": "https://res-console.cloudinary.com/dozddxjyh/thumbnails/v1/image/upload/v1730513403/Y2xkLXNhbXBsZS0z/drilldown",
        "thumbnail": "https://res-console.cloudinary.com/dozddxjyh/thumbnails/v1/image/upload/v1730513403/Y2xkLXNhbXBsZS0z/drilldown",
        "medium": "https://res-console.cloudinary.com/dozddxjyh/thumbnails/v1/image/upload/v1730513403/Y2xkLXNhbXBsZS0z/drilldown",
        "large": "https://res-console.cloudinary.com/dozddxjyh/thumbnails/v1/image/upload/v1730513403/Y2xkLXNhbXBsZS0z/drilldown"
    },
   {
        "original": "https://res-console.cloudinary.com/dozddxjyh/thumbnails/v1/image/upload/v1730513403/Y2xkLXNhbXBsZS0z/drilldown",
        "thumbnail": "https://res-console.cloudinary.com/dozddxjyh/thumbnails/v1/image/upload/v1730513403/Y2xkLXNhbXBsZS0z/drilldown",
        "medium": "https://res-console.cloudinary.com/dozddxjyh/thumbnails/v1/image/upload/v1730513403/Y2xkLXNhbXBsZS0z/drilldown",
        "large": "https://res-console.cloudinary.com/dozddxjyh/thumbnails/v1/image/upload/v1730513403/Y2xkLXNhbXBsZS0z/drilldown"
    }
];


  return (
    <>


    <div className='mt-[250px] mx-4 border-red-500 border '>
      
<div className='flex flex-col lg:flex-row justify-between'>


  <div className='w-full lg:w-1/2'>
  {images && (<ImageGallery items={images} showPlayButton={false} showFullscreenButton={true} />)}
  
  </div>
  <div className='w-full lg:w-1/2'>Section2</div>
 
</div>
    </div>
    </>
  )
}

export default pages