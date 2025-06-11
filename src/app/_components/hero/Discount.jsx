'use client'
import Image from 'next/image';
import React from 'react';
import CountdownTimer from './CountdownTimer';

function Discount() {
  const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN;
  return (
    <section className="w-full mt-[85px]">
      <div className="max-w-[1167px] mx-auto flex flex-col md:flex-row items-center md:items-stretch gap-0">
        
        {/* Image Container - 50% width on md+ */}
        <div className="w-full md:w-1/2">
          <Image
            src={`${domain}/images/discount.jpg`}
            width={580}
            height={390}
            alt="Discount Image"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Countdown Container - 50% width on md+ */}
        <div className="w-full md:w-1/2">
          <CountdownTimer />
        </div>

      </div>
    </section>
  );
}

export default Discount;
