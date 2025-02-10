'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function pages() {
  const { categoryId } = useParams();
  let FrontDomain = process.env.NEXT_PUBLIC_FRONT_DOMAIN;

const product = {
   name:"Smart Phone",
   description:"I am interested in remote work and have five years of experiencea fullstack developerMy expertise includes React and WordPress",
   category:"Electronics",
   images:["images/zoom.jpg","images/zoom2.jpg","images/zoom3.jpg"]
  }

  const images = [
    { original: "/images/zoom.jpg", thumbnail: "/images/zoom.jpg" },
    { original: "/images/zoom2.jpg", thumbnail: "/images/zoom2.jpg" },
    { original: "/images/zoom3.jpg", thumbnail: "/images/zoom3.jpg" },
  ];


  return (
    <>


    <div className='mt-[250px] mx-4 border-red-500 border '>
      
<div className='flex flex-col lg:flex-row justify-between'>

  <div className='w-full lg:w-1/2'><ImageGallery items={images} showPlayButton={false} showFullscreenButton={true} /></div>
 <div className='w-full lg:w-1/2'>Other section</div>
</div>
    </div>
    </>
  )
}

export default pages