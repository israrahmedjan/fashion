

import { SingleProductBySlug } from '@/app/_components/produccts/operationsAPI';
import ProductDetail from '@/app/_components/produccts/ProductDetail';
import React from 'react'

async function page({params}) {
 const slug = params?.slug; // This is safe and works
 const data = await SingleProductBySlug(slug);
  return (
  <div className='mt-[100px]'>
   
   {/* {JSON.stringify(data,null,2)} */}
   {(data && data.length) && (<ProductDetail product={data[0]} />)}
    
  </div>
  )
}

export default page