'use client';
import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import axios from "axios";
import { getCategoriesAPI } from "@/helper/helper";

import { Cross, Eye, Search, X } from "lucide-react";
import Loader from "@/components/Loader";
import Image from "next/image";
import Link from "next/link";

const MobileSearchBox = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery, selectedCategory) => {
      if (!searchQuery) return;
      // console.log("Searching for:", selectedCategory);
      try {
        setLoading(true);
        const response = await axios.get('/api/search', {
          params: { search: searchQuery, category: selectedCategory },
        });
        console.log(response.data);
        setProducts(response.data.data);
      } catch (error) {
        setError(error.message || 'Server Error');
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  // Input change event handler
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value, selectedCategory);
  };

  // Product click event handler
  const handleProductClick = (productName) => {
    setQuery(productName); // Input field ko update karo
    setProducts([]); // Search results ko hide kar do
  };

  // Get Categories setting
  const handelCategory = useCallback(async () => {
    const category = await getCategoriesAPI();
    setCategory(category);
    //console.log("Category List", category);
  }, []);

  const closeSearch = ()=>
  {
    setProducts([]);
  }

  useEffect(() => {
    handelCategory();
  }, [handelCategory]);

  // Trigger search when category changes
  useEffect(() => {
    debouncedSearch(query, selectedCategory);
  }, [selectedCategory]);

  return (

    <>

<div className="relative text-primary">
      <div className="flex justify-between gap-0 px-2 items-center text-[14px] sm:text-sm  mb-4 border-gray-200 border rounded-lg">


        {category.length !== 0 && (
          <select
            className="h-8 bg-white text-primary border-r outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>All category</option>
            {category.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        )}
        {/* {selectedCategory && (
        <p className="text-green-600 mt-2">Selected: {selectedCategory}</p>
      )} */}


        <input
          type="text"
          placeholder="Search Products"
          value={query}
          onChange={handleInputChange}
          className="w-1/2 h-8 px-2 outline-none border-gray-500"
        />

        <button className="h-8 px-2 ml-8 text-secondary hover:text-black flex items-center justify-center">
          <Search size={20} />
        </button>

      </div>
      <div className="w-full">
        {loading && (
          <div className=" bg-white border-gray-300 border-l-[0.5px] border-r-[0.5px] border-b-[0.5px] w-full shadow-md  absolute z-[99999]"><Loader /></div>)}
        {products.length > 0 && (
          <div className=" bg-white border-gray-300 border-l-[0.5px] w-full border-r-[0.5px] border-b-[0.5px] shadow-md top-[35px] absolute z-[99999] text-sm rounded-b-lg">
<div className="flex justify-between p-3"><span className="text-primary font-semibold text-base">Search Results..</span>
<span className="cursor-pointer"  onClick={closeSearch}><X size={20} /></span>
</div>
            {products.map((prod, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer border-b-[0.5px] 
                      flex items-center gap-2  border justify-between"
                onClick={() => handleProductClick(prod.productName)}
              >
                {/* Left Section: Image & Product Name */}
                <div className="flex items-center gap-2">
                  <Image src={prod.image} width={75} height={75} alt={prod.productName} />
                  <span>{prod.productName}</span>
                  <span className="text-right italic text-secondary"><Link href={`${process.env.NEXT_PUBLIC_FRONT_DOMAIN}category/${prod.categorySlug}`}> {prod.categoryName}</Link></span>
                </div>

                {/* Right Section: Views */}
                <span className="text-right text-primary"><Link href={`${process.env.NEXT_PUBLIC_FRONT_DOMAIN}product/${prod.categorySlug}/${prod.productSlug}`}><Eye size={22} /></Link></span>
              </div>
            ))}

          </div>
        )}</div>

   </div>  
    </>

  );
};

export default MobileSearchBox;