"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const items = [
  { src: "/images/instagram/insta-1.jpg", alt: "Instagram handle" },
  { src: "/images/instagram/insta-2.jpg", alt: "Clothing" },
  { src: "/images/instagram/insta-3.jpg", alt: "Yarn & Coffee" },
  { src: "/images/instagram/insta-4.jpg", alt: "Knitted clothes" },
  { src: "/images/instagram/insta-5.jpg", alt: "Applying lotion" },
  { src: "/images/instagram/insta-6.jpg", alt: "Tops" },
];

export default function Socials() {
  return (
    <section className="w-full mt-[100px]">
      {/* ✅ Mobile Section (small devices only) */}
      <div className="block md:hidden px-4">
        <div className="flex flex-wrap justify-center gap-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="group relative w-[45%] h-[220px] sm:w-[48%] sm:h-[240px] overflow-hidden rounded-md"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-white/10 group-hover:bg-white/80 transition-colors duration-300 flex justify-center items-center">
                <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out text-[#111] flex flex-col items-center gap-2">
                  <Instagram size={24} />
                  <h1 className="text-xs sm:text-sm font-medium">Fashion Shop</h1>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ✅ Desktop Section (md and up only) */}
      <div className="hidden md:block">
        <div className="flex justify-center gap-4 md:gap-0">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="group relative flex-1 lg:w-[226px] lg:h-[320px] overflow-hidden"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-white/10 group-hover:bg-white/80 transition-colors duration-300 flex justify-center items-center">
                <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out text-[#111] flex flex-col items-center gap-2">
                  <Instagram size={28} />
                  <h1 className="text-sm font-medium cursor-pointer">Fashion Shop</h1>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
