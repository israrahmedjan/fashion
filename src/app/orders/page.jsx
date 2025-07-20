import React from 'react'
import { myOrders } from '../_components/user/userOperations';
import MyOrders from '../_components/user/MyOrders';

async function page() {
   const ordersData = await myOrders("israr@gmail.com");
  console.log("My current orders", ordersData)
  return (
    <div className='mt-[150px]'>
      {(ordersData && ordersData.length>0) && (<MyOrders items={ordersData} />) }
    </div>
  )
}

export default page