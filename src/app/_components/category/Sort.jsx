'use client'
import { ArrowUpWideNarrow, ArrowDownWideNarrow } from 'lucide-react'
import React, { useState } from 'react'

function Sort({handleSort, sortValue}) {
    const [sortObj,setsortObj] = useState(sortValue);

    const handleSortChange = (e) => {

        console.log("Called!555")
        const value = e.target.value;
        let sortObj = {};
    
        switch (value) {
          case "asc_name":
            sortObj = { name: 1 };
            break;
          case "desc_name":
            sortObj = { name: -1 };
            break;
          case "asc_price":
            sortObj = { price: 1 };
            break;
          case "desc_price":
            sortObj = { price: -1 };
            break;
          default:
            sortObj = { name: 1 };
        }
        console.log("Sort Object:",sortObj);
        setsortObj(sortObj);
        handleSort(sortObj);
      };

  return (
    <>
    {/* Large Devices */}
    <div className='hidden lg:block'>
        {/* {JSON.stringify(sortObj,null,2)}
        {sortObj.name} */}
         <h1 className='text-lg text-primary text-left thin-border-bottom mb-5 pb-3'>Sort Products</h1>
   
    <div className='flex flex-row items-center gap-3'>
              
        <ArrowUpWideNarrow className='text-secondary' />
        <select
              className="h-10 px-3 bg-none border-primary-500 border-[0.5px] rounded-lg border-r outline-none"
              onChange={(e) => handleSortChange(e)}
            >
                 <option value="asc_name"> Ascending Name</option>
                 <option value="desc_name">Descending Name</option>
              <option value="asc_price">Ascending Price</option>
              <option value="desc_price">Descending Price</option>
             
              </select>
      </div>

    </div>

      {/* Mobile Devices Devices */}
      <div className='lg:hidden'>
      
     
    <div className='flex flex-row items-center gap-3'>
              
        <ArrowUpWideNarrow className='text-secondary' />
        <select
              className="h-10 px-3 bg-none border-primary-500 border-[0.5px] rounded-lg border-r outline-none"
              onChange={(e) => handleSortChange(e)}
            >
                 <option value="asc_name"> Ascending Name</option>
                 <option value="desc_name">Descending Name</option>
              <option value="asc_price">Ascending Price</option>
              <option value="desc_price">Descending Price</option>
             
              </select>
      </div>

    </div>
    </>
  )
}

export default Sort