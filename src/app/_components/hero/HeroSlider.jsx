'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


function HeroSlider() {
  const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN
  const categories = [
    {
      title: "Men’s fashion",
      count: "358 items",
      link: "/Mens",
      image: `${domain}/images/categories/category-2.jpg`
    },
    {
      title: "Kid’s fashion",
      count: "55 items",
      link: "/Mens",
      image: `${domain}/images/categories/category-3.jpg`
    },
    {
      title: "Cosmetics",
      count: "358 items",
      link: "/Mens",
      image: `${domain}/images/categories/category-4.jpg`
    },
    {
      title: "Accessories",
      count: "358 items",
      link: "/Mens",
      image: `${domain}/images/categories/category-5.jpg`
    }

  ]
  return (

    <>

    {/* Medium and large devices */}
    <section className='hidden md:block'>

      <div className='grid grid-cols-2 gap-3 mt-[100px]  text-[#111111]'>
        <div
          className="bg-[#fbe3d7] bg-no-repeat h-[600px] flex flex-col gap-3 justify-center items-center"
          style={{
            backgroundImage: `url(${domain}/images/categories/category-1.jpg)`,
            backgroundPosition: '60% 20%',
          }}
        >
          <div className='  mx-16 '>
            <h1 className='font-cookie text-[71px]'>Women’s fashion</h1>
            <p className='w-[80%] text-[#666666] text-[14px]'>Sitamet, consectetur adipiscing elit, sed
              do eiusmod tempor incidid-unt labore edolore magna
              aliquapendisse ultrices gravida.</p>
            <div className="text-[14px] mt-6 font-[600] uppercase" ><Link href="">Shop Now</Link></div>
            <div className="w-[85px] h-[2px] bg-[#ca1515] mt-2"></div>

          </div>
        </div>
        <div className=''>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat, num) => (
              <div
                key={num}
                className="w-full h-[294px]  bg-cover bg-center bg-no-repeat flex items-center justify-center"
                style={{ backgroundImage: `url(${cat.image})` }}
              >
                <div className=' flex flex-col items-start w-full mx-8 '>
                  <h2 className="text-[24px] font-[700]">{cat.title}</h2>
                  <span className="text-[14px] text-[#666666]">{cat.count}</span>
                  <span className="text-[14px] font-[600]  uppercase mt-4" style={{ lineHeight: '1' }}>Shop Now</span>
                  <div className="w-[85px] h-[2px] bg-[#ca1515] mt-2"></div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>





    </section>

    {/* ✅ Mobile-only layout */}
<section className="block md:hidden mt-[60px] px-4 text-[#111111]">
  {/* Top Banner */}
  <div
    className="bg-red-300 bg-cover bg-no-repeat h-[400px] flex flex-col justify-center items-start px-4"
    style={{
      backgroundImage: `url(${domain}/images/categories/category-1.jpg)`,
      backgroundPosition: 'center',
    }}
  >
    <h1 className="font-cookie text-[36px] mb-2">Women’s fashion</h1>
    <p className="text-[13px] text-[#666666] w-[90%]">
      Sitamet, consectetur adipiscing elit, sed do eiusmod tempor incididunt labore edolore magna aliquapendisse ultrices gravida.
    </p>
    <div className="text-[13px] mt-4 font-[600] uppercase">
      <Link href="">Shop Now</Link>
    </div>
    <div className="w-[60px] h-[2px] bg-[#ca1515] mt-2"></div>
  </div>

  {/* Category Cards */}
  <div className="grid grid-cols-1 gap-4 mt-6">
    {categories.map((cat, num) => (
      <div
        key={num}
        className="w-full h-[250px] bg-cover bg-center bg-no-repeat flex items-end"
        style={{ backgroundImage: `url(${cat.image})` }}
      >
        <div className="bg-white/80 w-full px-4 py-3">
          <h2 className="text-[20px] font-[700]">{cat.title}</h2>
          <span className="text-[13px] text-[#666666]">{cat.count}</span>
          <span className="text-[13px] font-[600] uppercase block mt-2">Shop Now</span>
          <div className="w-[60px] h-[2px] bg-[#ca1515] mt-1"></div>
        </div>
      </div>
    ))}
  </div>
</section>

    </>
  )
}

export default HeroSlider