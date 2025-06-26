'use client'
import Category from '@/app/_components/category/Category';
import { useParams } from 'next/navigation';
import React from 'react'

function page() {
  const { slug } = useParams(); 

  return (
    <div className='mt-[150px] lg:mt-[120px]'>
      {/* <h1>this is slug{slug}</h1> */}
     <Category slug={slug} />
    
     </div>
  )
}

export default page