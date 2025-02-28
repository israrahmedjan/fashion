import { getCategoriesAPI } from '@/helper/helper';
import React, { useEffect, useState } from 'react'

function Categories({ slugs = "", handelSlugs }) {
    const [categories, setCategories] = useState(null);
    const [selectedSlugs, setselectedSlugs] = useState([slugs]);
    const [value,setvalue] = useState(null);
    const fetchCategories = async () => {

        if (!slugs) return;

        try {
            const categoriesData = await getCategoriesAPI();
            if (categoriesData) {
                setCategories(categoriesData);
                setselectedSlugs((prev) => [...prev, slugs]);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // ✅ Handle Checkbox Selection
    const handleselectedSlugs = (e) => {
        let { value, checked } = e.target;

        //clearTimeout(window.handleselectedSlugsTimteOut); // Clear any previous timeout
        //window.handleselectedSlugsTimteOut = setTimeout(() => {
            if (checked) {
                
                setselectedSlugs((prev) => [...prev, value]);
               

            } else {
                setselectedSlugs((prev) => prev.filter((slug) => slug !== value));
                //handelSlugs(selectedSlugs);
            }
      //  }, 10)


    };


    useEffect(() => {
        
        fetchCategories();
       // setselectedSlugs((prev) => [...prev, value]);
    }, [])

    useEffect(() => {
       // console.log("Slugs is changed!");
       let tempArr = selectedSlugs;
       handelSlugs(tempArr.join(","));
        return () => {
           // console.log("Please clear the slugs");
            //setselectedSlugs([]);
        }
    }, [selectedSlugs])

  

    return (
        <>
           
           {/* Large Devices */}
            <div className='hidden lg:block mt-3'>
                <h1 className='text-lg text-primary text-left thin-border-bottom mb-5 pb-3'>Select Categories</h1>
               
              
                {categories && (
                    <div>{categories.map((cat, index) => {
                        return (
                            <div key={index} className='flex gap-3  mb-3 border-b-2 thin-border-bottom'>
                                <input
                                    type="checkbox"
                                    value={cat.slug}
                                    checked={selectedSlugs.includes(cat.slug)}
                                    onChange={(e) => handleselectedSlugs(e)}
                                    className='h-5 w-5 '
                                />
                                <label className='text-base'>{cat.name}</label>
                            </div>
                        )
                    })}</div>
                )}


            </div>


        {/* Mobile devices */}
         
            <div className='lg:hidden mt-3'>
               
              
            {categories && (
  <div className="grid grid-cols-2 gap-4  p-3 ">
    {categories.map((cat, index) => (
      <div key={index} className="flex items-center gap-2 border-b pb-2">
        <input
          type="checkbox"
          value={cat.slug}
          checked={selectedSlugs.includes(cat.slug)}
          onChange={(e) => handleselectedSlugs(e)}
          className="h-5 w-5"
        />
        <label className="text-base">{cat.name}</label>
      </div>
    ))}
  </div>
)}

            </div>
        </>
    )
}

export default Categories