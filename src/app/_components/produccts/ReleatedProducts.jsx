'use client'
import { getCategoriesAPI, productByCategoryAPI } from '@/helper/helper';
import React, { useEffect, useState } from 'react';

import ProductCard from '../produccts/ProductCard';
import Loader from '@/components/Loader';
import { ArrowUpWideNarrow, ChevronDown, ChevronUp, Filter } from 'lucide-react';



function ReleatedProducts({ categorySlug }) {
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [slugs, setSlugs] = useState();
  const [limit, setlimit] = useState(4);
  const [sort, setSort] = useState({ name: 1 })
  const [isFilterOpen, setIsFilterOpen] = useState(true);


  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);


  // ✅ Fetch Products
  const fetchProducts = async (slug) => {
    try {
      if (!categorySlug) return;

      const data = await productByCategoryAPI(categorySlug, minPrice, maxPrice, limit, sort);
      if (data) {
        setProducts(data);
        console.log(data.data);
        // setProducts((prev) => [...prev, ...response]); // Products update karo
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setServerError(error.response?.data?.message || 'Server Error'); // Error handle karo
    }
    finally {
      setLoading(false);
    }
  };

  // ✅ Effect for API Calls on Category Change
  useEffect(() => {
    //setSlugs((prev) => [...prev, categorySlug]);

    fetchProducts(categorySlug);

    return () => {
      //console.log("Cleanup: Resetting slugs and products...");
      setSlugs(null);   // Reset slugs
      setProducts(null); // Reset products
    };
  }, []); // Runs when categorySlug changes


  useEffect(() => {
    if (categorySlug) {
      fetchProducts(categorySlug);
    }
  }, [categorySlug]);




  return (
    <>
    <div className='mt-5 ml-4'>
     <h1 className='text-secondary uppercase w-full font-semibold lg:text-lg'><span className='text-primary '>Related</span> Products :  {categorySlug && (categorySlug)}</h1>
    {products && (

        <div className='grid lg:grid-cols-4 gap-1'>

{products.map((prod, index) => (
  // <div key={index}>
  //   <div>{index + 1} - {prod.productName}</div>
  //   <div>{prod.categoryName}</div>
  <ProductCard key={index} product={prod} />
  // </div>

))}


        </div>
      )}
      
      </div>
        </>
        )
}

        export default ReleatedProducts