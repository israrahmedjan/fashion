'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

function pages() {
  const { categoryId } = useParams();
  return (
    <>
    <div className='mt-[250px] mx-4 border-red-500 border '>
      
<div className='flex flex-col lg:flex-row justify-between'>
  <div className='w-full lg:w-1/2'>image section</div>
 <div className='w-full lg:w-1/2'>Other section</div>
</div>
    </div>
    </>
  )
}

export default pages