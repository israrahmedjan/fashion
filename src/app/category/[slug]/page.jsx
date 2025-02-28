'use client'
import CategoryPage from '@/app/_components/category/CategoryPage';
import { useParams } from 'next/navigation';
import React from 'react'

function page() {
  const { slug } = useParams(); 

  return (
    <div className='mt-[200px]'>
      {/* <h1>this is slug{slug}</h1> */}
     <CategoryPage categorySlug={slug} />
    </div>
  )
}

export default page