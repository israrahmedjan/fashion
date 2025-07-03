'use client';

import Image from 'next/image';
import { HomeIcon, ChevronRight, CheckCircle } from 'lucide-react';

const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN;

const sections = [
  {
    title: 'Who We Are',
    description:
      'We are a fashion-forward brand dedicated to helping individuals express themselves through style Our journey started with a small boutique and has grown into a global online destination for curated fashion collections. We are a fashion-forward brand dedicated to helping individuals express themselves through style Our journey started with a small boutique and has grown into a global online destination for curated fashion collections. We are a fashion-forward brand dedicated to helping individuals express themselves through style Our journey started with a small boutique and has grown into a global online destination for curated fashion collections.We are a fashion-forward brand dedicated to helping individuals express themselves through style Our journey started with a small boutique and has grown into a global online destination for curated fashion collections.',
    image: `${domain}images/services/4.PNG`,
  },
  {
    title: 'Our Mission',
      description:
      'We are a fashion-forward brand dedicated to helping individuals express themselves through style Our journey started with a small boutique and has grown into a global online destination for curated fashion collections. We are a fashion-forward brand dedicated to helping individuals express themselves through style Our journey started with a small boutique and has grown into a global online destination for curated fashion collections. We are a fashion-forward brand dedicated to helping individuals express themselves through style Our journey started with a small boutique and has grown into a global online destination for curated fashion collections.We are a fashion-forward brand dedicated to helping individuals express themselves through style Our journey started with a small boutique and has grown into a global online destination for curated fashion collections.',
    image: `${domain}images/services/2.PNG`,
  },
  {
    title: 'What We Offer',
    description:
      'We are a fashion-forward brand dedicated to helping individuals express themselves through style Our journey started with a small boutique and has grown into a global online destination for curated fashion collections. We are a fashion-forward brand dedicated to helping individuals express themselves through style Our journey started with a small boutique and has grown into a global online destination for curated fashion collections. We are a fashion-forward brand dedicated to helping individuals express themselves through style Our journey started with a small boutique and has grown into a global online destination for curated fashion collections.We are a fashion-forward brand dedicated to helping individuals express themselves through style Our journey started with a small boutique and has grown into a global online destination for curated fashion collections.',    image: `${domain}images/services/3.png`,
  },
];

const highlights = [
  'Personalized Styling Services',
  'Eco-conscious Fashion',
  'Dedicated Customer Support',
  'Trusted by Thousands Worldwide',
];

export default function About() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12 mt-[75px] mb-14">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm md:text-base space-x-1 mb-6">
        <HomeIcon size={18} />
        <ChevronRight size={15} />
        <span className="font-medium">Home</span>
        <ChevronRight size={15} />
        <span className="font-medium text-[#ca1515]">About Us</span>
      </div>

      {/* Header */}
      {/* <div className="text-center mb-12">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto mt-2">
          Discover our story, vision, and what makes us your trusted fashion partner.
        </p>
      </div> */}

      {/* Sections */}
      {sections.map((section, i) => (
        <div
          key={i}
          className={`flex flex-col md:flex-row ${
            i % 2 === 1 ? 'md:flex-row-reverse' : ''
          } items-center gap-10 mb-16`}
        >
          {/* Image */}
          <div className="relative w-full md:w-1/2 h-72 md:h-96 rounded overflow-hidden shadow">
            <Image
              src={section.image}
              alt={section.title}
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Text */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              {section.description}
            </p>
          </div>
        </div>
      ))}

      {/* Highlights */}
      <div className="bg-gray-100 py-10 px-6 rounded-lg shadow-sm mt-10">
        <h2 className="text-2xl font-semibold text-center mb-6">Why Choose Us</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <CheckCircle size={22} className="text-[#ca1515]" />
              <span className="text-sm text-gray-700 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
