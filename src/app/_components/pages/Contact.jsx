'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock, User, MessageSquare, HomeIcon, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Contact({name}) {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 mt-14">
       <div className="flex items-center text-sm md:text-base space-x-1 h-auto md:h-[55px]">
          <HomeIcon size={18} />
          <ChevronRight size={15} />
          <span className='font-medium'>Home</span>
          <ChevronRight size={15} />
          <Link href={``}><span className='font-medium'>{name}</span></Link>
          {/* <ChevronRight size={15} />
          <span>{product?.name}</span> */}
        </div>
      {/* Info + Map */}
      <div className="grid md:grid-cols-2 gap-10 mb-12">
        {/* Info Section */}
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <MapPin className="text-[#ca1515]" size={28} />
            <div>
              <h2 className="text-xl font-semibold mb-1">Our Location</h2>
              <p>Fashion Plaza, 5th Floor<br />Blue Area, Islamabad, Pakistan</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="text-[#ca1515]" size={28} />
            <div>
              <h2 className="text-xl font-semibold mb-1">Call Us</h2>
              <p>Phone: +92 300 1234567</p>
              <p>Email: contact@fashionstore.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Clock className="text-[#ca1515]" size={28} />
            <div>
              <h2 className="text-xl font-semibold mb-1">Working Hours</h2>
              <p>Mon – Sat: 10:00 AM – 8:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="h-80 w-full">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.058481681736!2d73.0551!3d33.6844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf6f77f76343%3A0x267a69dc6f6a7639!2sBlue%20Area%2C%20Islamabad%2C%20Pakistan!5e0!3m2!1sen!2s!4v1629563823473!5m2!1sen!2s"
            className="w-full h-full border-0 rounded-md"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
        <form className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border pl-10 pr-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ca1515]"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border pl-10 pr-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ca1515]"
            />
          </div>

          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 text-gray-400" size={20} />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border pl-10 pr-4 pt-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ca1515]"
            />
          </div>

          <button
            type="submit"
            className="bg-[#ca1515] text-white px-6 py-2 rounded hover:bg-[#a51212] transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
