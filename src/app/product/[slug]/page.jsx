

import React from 'react'

function page({params }) {
  const {slug} = params;
  return (
  <div className='mt-[100px]'>
    this is product detail page - {slug}
  </div>
  )
}

export default page