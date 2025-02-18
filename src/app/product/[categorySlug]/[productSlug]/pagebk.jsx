'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { productDetail } from '@/helper/helper';
import { array } from 'yup';
import { values } from 'lodash';

function pages() {
  const { productSlug } = useParams();
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState();
  let home_url = process.env.NEXT_PUBLIC_FRONT_DOMAIN;
  const [selectedSize, setSelectedSize] = useState(); // For filtering by size
  const [selectedColor, setSelectedColor] = useState(""); // For filtering by color


  // **Filter Products by Size and Color**
  const filteredProducts = products.filter((product) => {
    return (
      (selectedSize ? product.varrations.size === selectedSize : true) &&
      (selectedColor ? product.varrations.color === selectedColor : true)
    );
  });

  const ProductDetail = async () => {
    const response = await productDetail(productSlug);
    console.log("Product Detail Found Found", response);

    setProducts(response);
    setSelectedSize(response[0].size);

  }
  useEffect(() => {
    ProductDetail();
  }, [productSlug])

  useEffect(()=>
  {
    if(filteredProducts)
    {
         let galleryImagesArray = filteredProducts.flatMap((product) => product.galleryImages).flat();
console.log("Gallery images", galleryImagesArray);
 
    setImages(galleryImagesArray);
    }
 
  },[selectedSize,selectedColor])
  // const product = {
  //    name:"Smart Phone",
  //    description:"I am interested in remote work and have five years of experiencea fullstack developerMy expertise includes React and WordPress",
  //    category:"Electronics",
  //    images:["images/zoom.jpg","images/zoom2.jpg","images/zoom3.jpg"]
  //   }

  const images1 = [
    {
      "original": "https://res-console.cloudinary.com/dozddxjyh/thumbnails/v1/image/upload/v1730513403/Y2xkLXNhbXBsZS0z/drilldown",
      "thumbnail": "https://res-console.cloudinary.com/dozddxjyh/thumbnails/v1/image/upload/v1730513403/Y2xkLXNhbXBsZS0z/drilldown"
    },
    {
      "original": "https://res-console.cloudinary.com/dozddxjyh/thumbnails/v1/image/upload/v1730513403/Y2xkLXNhbXBsZS0z/drilldown",
      "thumbnail": "https://res-console.cloudinary.com/dozddxjyh/thumbnails/v1/image/upload/v1730513403/Y2xkLXNhbXBsZS0z/drilldown"
    },
    {
      "original": "https://res-console.cloudinary.com/dozddxjyh/thumbnails/v1/image/upload/v1730513403/Y2xkLXNhbXBsZS0z/drilldown",
      "thumbnail": "https://res-console.cloudinary.com/dozddxjyh/thumbnails/v1/image/upload/v1730513403/Y2xkLXNhbXBsZS0z/drilldown"
    }
  ];


  return (
    <>

      {products && (<div>
        <div className='flex flex-col lg:flex-row gap-2 mx-6 mt-[250px]'>

          <div className='w-full lg:w-1/2'>
            <p>left side</p>
            {/* <p>{JSON.stringify(images,null,2)}</p> */}
            {images && (<ImageGallery items={images} />)}
            
            {/* {filteredProducts.map((product, index) => (
                        <div key={index} className="border rounded-lg shadow">
                          <img
                            src={product["mainImage"][0]}
                            alt={product.name}
                            className="w-full object-cover rounded-md"
                          />

                         {/* Gallery Images */}
                         <div className="flex gap-2 mt-2">
                            {product["galleryImages"][0].map((img, i) => (
                              <img key={i} src={img} alt="" className="w-12 h-12 rounded-md object-cover" />
                            ))}
                          </div>

                        </div>
            ))} */}


            {/* <pre>
              {JSON.stringify(selectedSize, null, 2)}
              <hr />
              {JSON.stringify(filteredProducts, null, 2)}
            </pre> */}
          </div>
          <div className='w-full lg:w-1/2'>
            <p>Right Side</p>
           
            <div className="flex gap-4 mb-4">
 {/* Filter Options */}
<div className='border-red-400 border'>
              <select
                className="border p-2"
                onChange={(e) => setSelectedSize(e.target.value)}
                value={selectedSize}
              >
                <option value="">All Sizes</option>
                {products.map((prod, i) => <option key={i} value={prod.size}>{prod.size}</option>)}

              </select>

              <select
                className="border p-2"
                onChange={(e) => setSelectedColor(e.target.value)}
                value={selectedColor}
              >
                <option value="">All Colors</option>
                {products.map((prod, i) => <option key={i} value={prod.color}>{prod.color}</option>)}


              </select>
              </div>
              
            </div>
            {/* Product infor */}
            
            <div className='border-red-500'>
            {filteredProducts.map((product, index) => <div key={index} className='flex flex-col'>
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                          <p className="text-sm text-gray-600">
                            Size: {product.varrations.size} | Color: {product.varrations.color}
                          </p>
                          <p className="font-bold text-lg text-blue-600">${product.varrations.price}</p>
            </div>)}

            </div>

         
          </div>
        </div>
      
      </div>)}
    </>
  )
}

export default pages