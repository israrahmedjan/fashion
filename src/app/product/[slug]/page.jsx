

import ProductDetail from '@/app/_components/produccts/ProductDetail';
import React from 'react'

function page({params }) {
 const slug = params?.slug; // This is safe and works
  return (
  <div className='mt-[100px]'>
   
   
   {slug && (<ProductDetail slug={slug} />)}
    
  </div>
  )
}

export default page