'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { ArrowUpWideNarrow,ArrowDownWideNarrow  } from 'lucide-react';
import Loader from '@/components/Loader';

function Products() {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  
  const getProducts = async () => {
    try {
      if(serverError) return;
      setLoading(true);  // Fetching shuru hai
      const response = await axios.get('/api/products', {
        params: {
          page: count,
          sort: 'price',
          limit: 4,
        },
      });
      setProducts((prev) => [...prev, ...response.data.data]); // Products update karo
    } catch (error) {
      setServerError(error.response?.data?.message || 'Server Error'); // Error handle karo
    } finally {
      setLoading(false);  // Fetching khatam
    }
  };

  useEffect(() => {
    getProducts();
  }, [count]); // Jab count change ho, products fetch karo

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1
      ) {
        if (!loading) {  // Check karo ke fetching nahi ho rahi
          setCount((prevCount) => prevCount + 1); // Count barhao
        }
      }
    };

    // Debounce function: handleScroll ko limit karo
    const debounce = (func, wait) => {
      let timeout;
      return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    };

    const debouncedHandleScroll = debounce(handleScroll, 300); // 100ms wait karo

    window.addEventListener('scroll', debouncedHandleScroll);
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, [loading]); // isFetching ke change par listener update karo

  return (
    <>
     <div className='flex justify-between thin-border-bottom pb-3'>
      <h1 className='text-secondary sm:text-[12px] lg:text-lg uppercase w-full font-semibold'><span className='text-primary'>Latest</span> Products</h1>
      <div className='flex flex-row items-center gap-3'>
        <ArrowUpWideNarrow className='text-secondary' />
        <select
              className="h-10 px-3 bg-none border-primary-500 border-[0.5px] rounded-lg border-r outline-none"
              value=""
              onChange={(e) => console.log("set")}
            >
              <option>Ascending Price</option>
              <option>Ascending Price</option>
              <option>Ascending Price</option>
              </select>
      </div>
      

     </div>

    
    <div className="border-gray-100 border-[.5px] rounded-md grid 
    grid-cols-2 sm:grid-cols-2 md:grid-rows-3 lg:grid-cols-4 gap-1 mt-6">
     
      {products.map((prod, index) => (
        // <div key={index}>
        //   <div>{index + 1} - {prod.productName}</div>
        //   <div>{prod.categoryName}</div>
          <ProductCard key={index} product={prod} />
        // </div>
        
      ))}

     
    </div>
     <div className="grid grid-cols-1 text-center mb-8 mt-4">
     {serverError && <p className=''>{serverError}</p>}
 
     {loading && (<Loader />)}
     {!serverError && (
     <button 
          onClick={() => setCount((prevCount) => prevCount + 1)} 
          className="bg-secondary w- mx-auto text-white px-4 py-2 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          Load More
        </button>
        )}
     </div>
     </>
  );
}

export default Products;