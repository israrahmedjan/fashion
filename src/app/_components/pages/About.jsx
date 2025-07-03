'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronRight, HomeIcon } from 'lucide-react';
import Link from 'next/link';

const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN;

const aboutItems = [
  {
    title: 'Our Mission',
    description: 'To empower individuals through fashion with personalized style advice and curated collections that reflect confidence and comfort.',
    image: `${domain}images/services/1.PNG`,
  },
  {
    title: 'Our Vision',
    description: 'To become a global destination for fashion solutions, where every customer finds their unique style identity.',
    image: `${domain}images/services/2.PNG`,
  },
  {
    title: 'Customer Commitment',
    description: 'We deliver premium quality and tailored experiences, ensuring every customer walks away feeling inspired.',
    image: `${domain}images/services/3.PNG`,
  },
  {
    title: 'Our Story',
    description: 'From a small styling studio to an online fashion hub — our journey is rooted in passion and purpose.',
    image: `${domain}images/services/4.png`,
  },
  {
    title: 'Ethical Fashion',
    description: 'We’re committed to ethical sourcing, sustainability, and reducing fashion waste wherever possible.',
    image: `${domain}images/services/5.PNG`,
  },
  {
    title: 'Diverse Team',
    description: 'Our diverse team of stylists, marketers, and designers collaborate to bring fashion-forward ideas to life.',
    image: `${domain}images/services/2.PNG`,
  },
];

export default function About() {
  return (
    <main className="max-w-7xl mx-auto py-12 px-6 mt-14">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm md:text-base space-x-1 h-auto md:h-[55px]">
        <HomeIcon size={18} />
        <ChevronRight size={15} />
        <span className="font-medium">Home</span>
        <ChevronRight size={15} />
        <span className="font-medium text-[#ca1515]">About Us</span>
      </div>

      {/* Section Header */}
      <div className="text-center mt-6 mb-10">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Learn more about who we are, what we stand for, and how we bring fashion to life.
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {aboutItems.map((item, i) => (
          <div
            key={i}
            className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-64 w-full">
              <Image
                src={item.image}
                alt={item.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-base md:text-[16px] font-[500] mb-2">{item.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
