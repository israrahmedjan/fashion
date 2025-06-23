'use client'
import { JsonWebTokenError } from 'jsonwebtoken'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


function HeroSlider({data}) {
  //console.log("My data",data);
  const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN;

  const dataFormatted = {};

data.forEach(item => {
  const slug = item.slug;

  if (!dataFormatted[slug]) {
    dataFormatted[slug] = [];
  }

  dataFormatted[slug].push({
    name: item.name,
    slug: item.slug,
    description: item.description,
    image: item.image,
    imageThumb: item.imageThumb,
    total: item.total
  });
});
let newArry = [dataFormatted.mens_fashion[0],
  dataFormatted.kidz_fashion[0],
  dataFormatted.cosmetics[0],
  dataFormatted.accessories[0]]
//console.log(dataFormatted);
//console.log("New Array",newArry)
return (

    <>

    {/* Medium and large devices */}
    <section className='hidden md:block'>
{/* <div>{JSON.stringify(data,null,2)}</div> */}
      <div className='grid grid-cols-2 gap-3 mt-[100px]  text-[#111111]'>
       {dataFormatted.women_fashion.length>0 && (
 <div
          className="bg-[#fbe3d7] bg-no-repeat h-[600px] flex flex-col gap-3 justify-center items-center"
          style={{
            backgroundImage: `url(${dataFormatted.women_fashion[0].image})`,
            backgroundPosition: '60% 20%',
          }}
        >
          <div className='  mx-16 '>
          <h1 className='font-cookie text-[71px]'>{dataFormatted.women_fashion[0]?.name} </h1>
            <p className='w-[80%] text-[#666666] text-[14px]'>
              {dataFormatted.women_fashion[0]?.description}</p>
            <div className="text-[14px] mt-6 font-[600] uppercase" ><Link href={`${domain}category/${dataFormatted.women_fashion[0]?.slug}`}>Shop Now</Link></div>
            <div className="w-[85px] h-[2px] bg-[#ca1515] mt-2"></div>

          </div>
        </div>
       )}
       
        <div className=''>
          <div className="grid grid-cols-2 gap-3">
   
             {newArry && (    newArry.map((cat, num) => (
              <div
                key={num}
                className="w-full h-[294px]  bg-cover bg-center bg-no-repeat flex items-center justify-center"
                style={{ backgroundImage: `url(${cat.image})` }}
              >
                <div className=' flex flex-col items-start w-full mx-8 '>
                  <h2 className="text-[24px] font-[700]">{cat.name}</h2>
                  <span className="text-[14px] text-[#666666]">{cat.total} Items</span>
                  <span className="text-[14px] font-[600]  uppercase mt-4" style={{ lineHeight: '1' }}><Link href={`${domain}category/${cat.slug}`} >Shop Now</Link></span>
                  <div className="w-[85px] h-[2px] bg-[#ca1515] mt-2"></div>
                </div>
              </div>
            )))}
        
          </div>

        </div>

      </div>





    </section>

    {/* ✅ Mobile-only layout */}
<section className="block md:hidden mt-[60px] px-4 text-[#111111]">
  {/* Top Banner */}
    {dataFormatted.women_fashion.length>0 && (
       <div
    className="bg-red-300 bg-cover bg-no-repeat h-[400px] flex flex-col justify-center items-start px-4"
    style={{
      backgroundImage: `url(${dataFormatted.women_fashion[0].image})`,
      backgroundPosition: 'center',
    }}
  >
    <h1 className="font-cookie text-[36px] mb-2">{dataFormatted.women_fashion[0].name}</h1>
    <p className="text-[13px] text-[#666666] w-[90%]">
      {dataFormatted.women_fashion[0].description}
    </p>
    <div className="text-[13px] mt-4 font-[600] uppercase">
      <Link href={`${domain}/category/${dataFormatted.women_fashion[0].slug}`}>Shop Now</Link>
    </div>
    <div className="w-[60px] h-[2px] bg-[#ca1515] mt-2"></div>
  </div>
    )}
 

  {/* Category Cards */}
  <div className="grid grid-cols-1 gap-4 mt-6">

     {newArry && (newArry.map((cat, num) => (
      <div
        key={num}
        className="w-full h-[250px] bg-cover bg-center bg-no-repeat flex items-end"
        style={{ backgroundImage: `url(${cat.image})` }}
      >
        <div className="bg-white/80 w-full px-4 py-3">
          <h2 className="text-[20px] font-[700]">{cat.name}</h2>
          <span className="text-[13px] text-[#666666]">{cat.total} items</span>
          <span className="text-[13px] font-[600] uppercase block mt-2"><Link href={`${domain}/category/${cat.slug}`}>Shop Now</Link></span>
          <div className="w-[60px] h-[2px] bg-[#ca1515] mt-1"></div>
        </div>
      </div>
     )))}
   
  </div>
</section>

    </>
  )
}

export default HeroSlider