'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Products() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loading, setloading] = useState(false);
  const [servererror, setservererror] = useState("");
  const [products, setproduct] = useState([]);
  const [scrollY, setScrollY] = useState(0);


  const getProducts = async () => {
    try {
      setloading(true);
      const response = await axios.get('/api/products',{
        params: {
          category: 'electronics',
          sort: 'price',
          limit: 10
        }
      });
      console.log("Products Data is", response.data.data);
      //setproduct(response.data.data);
      setproduct(prevProducts => [...prevProducts, ...response.data.data]);
    } catch (error) {
      if (error) {
        setservererror(error.response?.data?.message || "Server Error");
      }
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    console.log("Use effect is called!");
    getProducts();
  }, []);

  // Scroll event listener with proper cleanup
  useEffect(() => {
    console.log("Scroll start!");
    const handleScroll = () => {
        // console.log(`window.scrollY`,window.innerHeight + document.documentElement.scrollTop
        // );
        // console.log(document.documentElement.scrollHeight);
       setScrollY(window.scrollY);  // Single function to handle scroll
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
          ) {
            getProducts();
          }

      };
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      console.log("Scroll Out!");
    };
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
      {servererror && <p>{servererror}</p>}
     
      {products.length > 0 && (
        <div>
          {products.map((prod, index) => (
            <div key={index}>
              
              <div>{index+1}-{prod.productName}</div>
              <div>{prod.categoryName}</div>
            </div>
          ))}
        </div>
      )}
      <div className="h-auto p-4">
        <h1 className="text-xl font-bold">Scroll to see the effect!</h1>
        {/* <p className="fixed top-4 right-4 bg-gray-800 text-white p-2 rounded">
            
          Scroll Y: {scrollY}px
        </p> */}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default Products;
