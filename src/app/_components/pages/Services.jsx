'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronRight, HomeIcon } from 'lucide-react';
import Link from 'next/link';

const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN
const services = [
  {
    title: 'Personal Styling',
    description: 'Tailored fashion advice to enhance your wardrobe.',
    image: `${domain}images/services/1.PNG`,
  },
  {
    title: 'Wardrobe Audit',
    description: 'Organize and refresh your current clothing collection.',
     image: `${domain}images/services/2.PNG`,
  },
  {
    title: 'Event Consultation',
    description: 'Choose the perfect outfit for special occasions.',
     image: `${domain}images/services/3.PNG`,
  },
    {
    title: 'Personal Styling',
    description: 'Choose the perfect outfit for special occasions.',
     image: `${domain}images/services/4.PNG`,
  },
    {
    title: 'Wardrobe Audit',
    description: 'Choose the perfect outfit for special occasions.',
     image: `${domain}images/services/5.PNG`,
  },
    {
    title: 'Event Consultation',
    description: 'Choose the perfect outfit for special occasions.',
     image: `${domain}images/services/2.PNG`,
  },
    {
    title: 'Wardrobe Audit',
    description: 'Organize and refresh your current clothing collection.',
     image: `${domain}images/services/2.PNG`,
  },
];


export default function Services({name}) {
  return (
    <main className="max-w-7xl mx-auto py-12 px-6 mt-14">
        
        <div className="flex items-center text-sm md:text-base space-x-1 h-auto md:h-[55px]">
          <HomeIcon size={18} />
          <ChevronRight size={15} />
          <span className='font-medium'>Home</span>
          <ChevronRight size={15} />
          <Link href={``}><span className='font-medium'>{name}</span></Link>
          {/* <ChevronRight size={15} />
          <span>{product?.name}</span> */}
        </div>
     
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
        {services.map((svc,i) => (
          <div key={i} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-64 w-full">
              <Image
                src={svc.image}
                alt={svc.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-base md:text-[16px] font-[500] mb-2">{svc.title}</h2>
              <p className="text-gray-600">{svc.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
