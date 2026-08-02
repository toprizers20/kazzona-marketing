"use client";
import React from "react";
import Image from "next/image";

const logos = Array.from({ length: 11 }, (_, i) => `/images/${i + 7}.png`);

export default function ClientLogoTicker() {
  return (
    <section className="py-16 bg-[#FFF8F0] border-y border-orange-100 overflow-hidden">
      <div className="container mx-auto px-6 mb-8">
        <div className="text-center">
          <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Trusted By Industry Leaders</span>
        </div>
      </div>

      {/* Ticker wrapper */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling logos */}
        <div className="flex animate-logo-scroll">
          {/* Duplicate for seamless loop */}
          {[...logos, ...logos, ...logos].map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-6 w-[140px] h-[70px] flex items-center justify-center"
            >
              <Image
                src={src}
                alt={`Client logo ${(i % logos.length) + 1}`}
                width={140}
                height={70}
                className="object-contain rounded-xl"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
