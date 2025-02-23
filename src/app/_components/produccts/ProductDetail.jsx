'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { productDetail } from '@/helper/helper';
import { ZoomIn, ZoomOut, X } from 'lucide-react';
import Loader from '@/components/Loader';
import Image from 'next/image';

function ProductDetail() {
  let home_url = process.env.NEXT_PUBLIC_FRONT_DOMAIN;

  // Using local state to store params after hydration
  const [params, setParams] = useState({ categorySlug: "", productSlug: "" });
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]); // Empty array initially
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [error, setError] = useState(false);
  const { categorySlug, productSlug } = useParams();

  // Controls for zoom
  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
      <div className="tools absolute z-10 right-3 top-4 flex text-primary cursor-pointer ">
        <ZoomIn size={25} onClick={() => zoomIn()} />
        <ZoomOut size={25} onClick={() => zoomOut()} />
        <X size={25} onClick={() => resetTransform()} />
      </div>
    );
  };

  // Fetch Product Details
  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const response = await productDetail(params.categorySlug, params.productSlug);
      console.log("Product Detail Found:", response);

      setProducts(response);
      setSelectedSize(response[0]?.size || null);
      setSelectedColor(response[0]?.color || null);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Get params from URL
  useEffect(() => {
    
    setParams({ categorySlug, productSlug });
  }, []);

  // Fetch product details when productSlug changes
  useEffect(() => {
    if (params.productSlug) {
      fetchProductDetail();
    }
  }, [params.productSlug]);

  // Update gallery & main image when size or color is selected
  useEffect(() => {
    if (!products.length) return;
    console.log(selectedColor)
    const selectedProduct = products.find(
      (product) => product.color === selectedColor
    );
console.log("Selected Products", selectedProduct);
    setMainImage(selectedProduct ? selectedProduct.image : null);
    setGallery(products.map((product) => ({ color: product.color, thumbnail: product.image })));
   // console.log("Use effect is called");
  }, [selectedColor, selectedSize, products]);

  // Show loader while data is loading
  if (loading) {
    return <div className='mx-6 h-screen flex items-center justify-center'><Loader /></div>;
  }

  // Show error message if fetching failed
  if (error) {
    return <div className='flex mt-[220px] w-full'><div className='mx-auto'>System Error</div></div>;
  }

  return (
    <>
      {products.length > 0 && (
        <div className='mt-[210px]'>
           
          {/* Breadcrumbs */}
          {products[0]?.Category?.[0]?.name && (
            <div className='flex text-secondary italic mx-6 pb-3 border-b-2 thin-border-bottom'>
              <div>
                <span className='text-primary text-lg'>Home - </span>
                {products[0]?.Category[0]?.name} / {products[0]?.ProductName}
              </div>
            </div>
          )}

          {/* Product Details Section */}
          <div className='flex flex-col lg:flex-row gap-6 mx-6 mt-3'>
            {/* Left: Product Image & Gallery */}
            <div className='w-full lg:w-1/2'>
              {mainImage && (
                <div className='p-2 thin-border relative shadow-lg'>
                  <TransformWrapper initialScale={1} initialPositionX={200} initialPositionY={100}>
                    {({ zoomIn, zoomOut, resetTransform }) => (
                      <>
                        <Controls />
                        <TransformComponent>
                          <Image
                            src={mainImage}
                            alt="Product Image"
                            width={500}
                            height={500}
                            className="object-contain z-10 w-full h-full"
                            unoptimized
                          />
                        </TransformComponent>
                      </>
                    )}
                  </TransformWrapper>
                </div>
              )}

              {/* Product Gallery */}
              {gallery.length > 0 && (
                <div className='flex gap-3 mt-2'>
                  {gallery.map((prod, index) => (
                    <div
                      key={index}
                      className={`${prod.color === selectedColor ? "thin-border border-[3px] rounded-lg p-2" : "p-2"}`}
                      onClick={() => setSelectedColor(prod.color)}
                    >
                      <Image src={prod.thumbnail} width={100} height={100} alt="Product Image" unoptimized />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Information */}
            <div className='w-full lg:w-1/2'>
              <div className='text-primary mb-6'>
                    <h1 className='text-2xl mb-2'>{products[0]?.ProductName}</h1>
                    <hr></hr>
                {products.map((product, index) => (
                  <div key={index} className='flex flex-col'>
                    {(selectedSize == product.size) && (<div><h3 className="text-base lg:text-[30px] font-semibold mt-2">{product.name}</h3>
                    <p className="text-sm mt-2">Size: {product.size} | Color: {product.color}</p>
                    <p className="font-bold text-lg text-secondary">Price: ${product.price}</p></div>)}
                    
                  </div>
                ))}
              </div>

              <hr />

              {/* Filter Options */}
              <div className="flex gap-4 mb-4 mt-4">
                {/* Size & Color Filters */}
                <div>
                  <div className="text-primary">
                    {/* Size Filter */}
                    <div className="mb-4">
                      <p>Select Size:</p>
                      <div className="flex gap-2 mt-2">
                        {products.map((prod, i) => (
                          <button
                            key={i}
                            className={`border px-3 py-1 ${
                              selectedSize === prod.size ? "border-secondary border text-primary" : "bg-gray-100"
                            }`}
                            onClick={() => setSelectedSize(prod.size)}
                          >
                            {prod.size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Color Filter */}
                    <div>
                      <p>Select Color:</p>
                      <div className="flex gap-2 mt-2">
                        {products.map((prod, i) => (
                          <button
                            key={i}
                            className={`w-8 h-8 rounded-full border-2 ${
                              selectedColor === prod.color ? "border-secondary" : "border-transparent"
                            }`}
                            style={{ backgroundColor: prod.color }}
                            onClick={() => setSelectedColor(prod.color)}
                          ></button>
                          
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetail;
