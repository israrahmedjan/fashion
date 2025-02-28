'use client'
import { getCategoriesAPI, productByCategoryAPI } from '@/helper/helper';
import React, { useEffect, useState } from 'react';
import PriceSlider from './PriceSlider';
import Categories from './Categories';
import Sort from './Sort';
import ProductCard from '../produccts/ProductCard';
import Loader from '@/components/Loader';
import { ArrowUpWideNarrow, ChevronDown, ChevronUp,Filter } from 'lucide-react';
function CategoryPage({ categorySlug }) {

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
      if (!slug) return;
      setLoading(true);
      const data = await productByCategoryAPI(slug, minPrice, maxPrice, limit, sort);
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
  // Handle sort

  const handleSort = (sortObject) => {
    setSort(sortObject);
  }

  // Handle slider state
  const handlePriceChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handelSlugs = (val) => {
    //console.log("Handle Slugs is called",val);
    setSlugs(val);
  }

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
    if (slugs) {
      fetchProducts(slugs);
    }
  }, [slugs, minPrice, maxPrice, sort]);

  return (
    <>
      {/* Medium and Large Devices */}
      <div className='hidden lg:block'>

        <div className='flex mx-6 flex-col '>

          <div className='flex lg:px-2 justify-between items-center thin-border-bottom pb-3 text-[12px] lg:text-[14px]'>
            <h1 className='text-secondary uppercase w-full font-semibold lg:text-lg'><span className='text-primary '>Category</span> {categorySlug && (categorySlug)}</h1>
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
          <div className='flex justify-between'>
            <div className=' border w-1/4 mt-2 pt-2 pl-2 rounded-lg'>

              <Sort handleSort={handleSort} sortValue={sort} />

              <Categories slugs={categorySlug} handelSlugs={handelSlugs} />


              <PriceSlider onChange={handlePriceChange} /> {/* Pass Callback */}
            </div>
            <div className=' w-full'>
              {products && (<div>
                <div className="grid 
    grid-cols-1 sm:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 gap-1">

                  {products.map((prod, index) => (
                    // <div key={index}>
                    //   <div>{index + 1} - {prod.productName}</div>
                    //   <div>{prod.categoryName}</div>
                    <ProductCard key={index} product={prod} />
                    // </div>

                  ))}
                </div>



              </div>
              )}
              {serverError && <p className=''>{serverError}</p>}

              {loading && (<Loader />)}
              {!serverError && (
                <button>
                  Load More
                </button>
              )}


            </div>
          </div>
        </div>
      </div>

      {/* Mobile Devices */}

      <div className='lg:hidden'>
      <div className='text-right m-3 flex justify-between items-center '> {/* Toggle Button */}
      <h1 className='text-secondary uppercase font-semibold lg:text-lg'><span className='text-primary '>Category</span> {categorySlug && (categorySlug)}</h1>
          
          <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="text-secondary font-semibold">
            {isFilterOpen ?  <Filter size={24} /> : <Filter size={24} />}
          </button></div>
          {!isFilterOpen && (<div className="relative">
       <div className='flex flex-col mx-6 justify-between  '>
                 <div className='flex flex-col justify-between items-center  '>
             
                  
                    <div className=' w-full thin-border-bottom pb-3'><Sort handleSort={handleSort} sortValue={sort} /></div>
                   
                    <div className=' w-full thin-border-bottom pb-3'> <PriceSlider onChange={handlePriceChange} /></div>
                    <div className=' w-full thin-border-bottom pb-3'> <Categories slugs={categorySlug} handelSlugs={handelSlugs} /></div>
                  
                    </div>
                        </div>
      
       </div>)}
      
       <div className=' w-full'>
              {products && (<div>
                <div className="grid 
    grid-cols-1 sm:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 gap-1 mb-[200px]">

                  {products.map((prod, index) => (
                    // <div key={index}>
                    //   <div>{index + 1} - {prod.productName}</div>
                    //   <div>{prod.categoryName}</div>
                    <ProductCard key={index} product={prod} />
                    // </div>

                  ))}
                </div>



              </div>
              )}
              {serverError && <p className=''>{serverError}</p>}

              {loading && (<Loader />)}
              {!serverError && (
                <button>
                  Load More
                </button>
              )}


            </div>
      </div>

    </>
  );
}

export default CategoryPage;
