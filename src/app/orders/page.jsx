import React from 'react'
import { myOrders, myOrdersAPI } from '../_components/user/userOperations';
import MyOrders from '../_components/user/MyOrders';

async function page() {
  
  
  return (
    <div className='mt-[150px]'>
    <MyOrders  />
    </div>
  )
}

export default page