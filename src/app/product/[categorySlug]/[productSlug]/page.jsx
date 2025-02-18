'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { productDetail } from '@/helper/helper';
import { ZoomIn, ZoomOut, X } from 'lucide-react';
import Loader from '@/components/Loader';
import Image from 'next/image';

function pages() {
  let home_url = process.env.NEXT_PUBLIC_FRONT_DOMAIN;
  //const { productSlug } = useParams();
  const { categorySlug, productSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState(); // For filtering by size
  const [selectedColor, setSelectedColor] = useState(""); // For filtering by color
  const [gallery, setGallery] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [error,setError] = useState(false);
  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();

    return (
      <div className="tools absolute z-10 right-3 top-4 flex text-primary cursor-pointer ">
        <ZoomIn size={25} onClick={() => zoomIn()}></ZoomIn>
        <ZoomOut size={25} onClick={() => zoomOut()}></ZoomOut >
        <X size={25} onClick={() => resetTransform()}></X >
      </div>
    );
  };


  // **Filter Products by Size and Color**
  const filteredProducts = products.filter(product =>
    // (!selectedColor || product.varrations.color === selectedColor) 

     (!selectedColor || product.varrations.color === selectedColor) ||
     (!selectedSize || product.varrations.size === selectedSize)
  );

  const ProductDetail = async () => {
    try {
      setLoading(true);
      const response = await productDetail(categorySlug,productSlug);
      console.log("Product Detail Found Found", response);

      setProducts(response);
      setSelectedSize(response[0].size);
      setSelectedColor(response[0].color);


    }
    catch (error) {
         
          if(error)
          {
              setError(true);
          }
    }
    finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    ProductDetail();
  }, [productSlug])

  useEffect(() => {

    const selectedProduct = products.find(
      product => product.varrations.size === selectedSize || product.varrations.color === selectedColor
    );
    
    const mainImage = selectedProduct ? selectedProduct.mainImage[0] : null;
    console.log("Selected Color changed", mainImage)
    setMainImage(mainImage);
    const extractedData = products.map(product => ({
      size: product.varrations.size,
      thumbnail: product.mainImage[0]
    }));
    setGallery(extractedData)


  }, [selectedColor, selectedSize])


  return (
    <>
  {loading && <div className='mx-6 h-screen flex items-center align-middle justify-center'><Loader /></div>}
      
    
  {error && <div className='flex mt-[220px] w-full'>
    <div className='mx-auto'>System Error</div>
    </div>}
      {products && (<div className='mt-[210px]'>
        <div className='flex text-secondary italic mx-6 pb-3 border-b-2 thin-border-bottom'>
       <div><span className='text-primary text-lg'>Home - </span> {products[0]?.Category[0]?.name} / {products[0]?.name}  </div>
       </div>
       {/* {JSON.stringify(products,null,2)} */}
        
        <div className='flex flex-col lg:flex-row gap-6 mx-6 mt-3'>

          <div className='w-full lg:w-1/2'>

            {mainImage && (

              <div className='p-2 thin-border relative shadow-lg'>
                <TransformWrapper
                  initialScale={1}
                  initialPositionX={200}
                  initialPositionY={100}
                >
                  {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
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

            {gallery && (
              <div className='flex gap-3 mt-2'>
                {gallery.map((prod, index) =>
                  <div
                    key={index}
                    className={`${prod.size === selectedSize ? "thin-border border-[3px] rounded-lg p-2" : "p-2"}`}
                    onClick={(e) => setSelectedSize(prod.size)}
                  >

                    <Image
                      src={prod.thumbnail}
                      width={100}
                      height={100}
                      alt="Product Image"
                      unoptimized
                    />
                  </div>
                )}
              </div>
            )}
           


          </div>
          <div className='w-full lg:w-1/2'>
         
            {/* Product infor */}

            <div className='text-primary mb-6'>
              {filteredProducts.map((product, index) => <div key={index} className='flex flex-col'>
                <h3 className="text-base lg:text-[30px] font-semibold mt-2">{product.name}</h3>
                <p className="text-sm mt-2">
                  Size: {product.varrations.size} | Color: {product.varrations.color}
                </p>
                <p className="font-bold text-lg text-secondary">Price: ${product.varrations.price}</p>
              </div>)}

            </div>
            <hr />
            <div className="flex gap-4 mb-4 mt-4">
              {/* Filter Options */}
              <div className=''>
   

{/* Color and Size Box */}
{!error && (<div><div className="text-primary">
  {/* Size Filter */}
  <div className="mb-4">
    <p className="">Select Size:</p>
    <div className="flex gap-2 mt-2">
      <button
        className={`border px-3 py-1 ${
          selectedSize === "" ? "bg-gray-200" : ""
        }`}
        onClick={() => setSelectedSize("")}
      >
        All Sizes
      </button>
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
    <p className="">Select Color:</p>
    <div className="flex gap-2 mt-2">
      <button
        className={`border px-3 py-1 ${
          selectedColor === "" ? "bg-gray-200" : ""
        }`}
        onClick={() => setSelectedColor("")}
      >
        All Colors
      </button>
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
</div>)}


                
              </div>

            </div>



          </div>
        </div>

      </div>)}
    </>
  )
}

export default pages