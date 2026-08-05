"use client";

import Image from "next/image";

export function HomeSocialProof() {
  return (
    <>
      {/* Enterprise Logos */}
      <section className="py-16 bg-gradient-to-b from-orange-50/60 to-white border-b border-border/50">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">Trusted by India&apos;s Leading Enterprises</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Driving Growth for India&apos;s Top Enterprises</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto mb-10">We partner with industry leaders to build impactful digital solutions.</p>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4 max-w-4xl mx-auto">
            {[7,8,9,10,11,12].map((n) => (
              <div key={n} className="flex items-center justify-center h-16 md:h-24 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow px-2 md:px-4">
                <Image src={`/images/${n}.png`} alt={`Enterprise ${n}`} width={120} height={60} quality={100} unoptimized style={{ width: "auto", maxHeight: "40px" }} className="object-contain" />
              </div>
            ))}
            {[13,14,15,16,17].map((n) => (
              <div key={n} className="flex items-center justify-center h-16 md:h-24 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow px-2 md:px-4">
                <Image src={`/images/${n}.png`} alt={`Enterprise ${n}`} width={120} height={60} quality={100} unoptimized style={{ width: "auto", maxHeight: "40px" }} className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Marquee */}
      <section className="py-16 bg-[#FFF8F0] border-b border-orange-100 overflow-hidden relative">
        <div className="container mx-auto px-6 max-w-7xl text-center mb-10">
          <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">Trusted by 200+ brands across industries</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Powering Growth for 200+ Amazing Brands</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">From emerging startups to established brands, we help businesses grow digitally.</p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#FFF8F0] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#FFF8F0] to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden mb-8">
            <div className="flex min-w-full shrink-0 items-center animate-marquee">
              {[9,10,11,12,13,14,15,16,17].map((n) => (
                <div key={n} className="shrink-0 flex items-center justify-center px-6 md:px-10">
                  <Image src={`/clients/${n}.jpg`} alt={`Brand ${n}`} width={180} height={90} quality={100} unoptimized style={{ width: "auto", maxHeight: "72px" }} className="object-contain" />
                </div>
              ))}
            </div>
            <div className="flex min-w-full shrink-0 items-center animate-marquee" aria-hidden>
              {[9,10,11,12,13,14,15,16,17].map((n) => (
                <div key={n} className="shrink-0 flex items-center justify-center px-6 md:px-10">
                  <Image src={`/clients/${n}.jpg`} alt={`Brand ${n}`} width={180} height={90} quality={100} unoptimized style={{ width: "auto", maxHeight: "72px" }} className="object-contain" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex overflow-hidden mb-8">
            <div className="flex min-w-full shrink-0 items-center animate-marquee-reverse">
              {[18,19,20,21,22,23,24,25,26].map((n) => (
                <div key={n} className="shrink-0 flex items-center justify-center px-6 md:px-10">
                  <Image src={`/clients/${n}.jpg`} alt={`Brand ${n}`} width={180} height={90} quality={100} unoptimized style={{ width: "auto", maxHeight: "72px" }} className="object-contain" />
                </div>
              ))}
            </div>
            <div className="flex min-w-full shrink-0 items-center animate-marquee-reverse" aria-hidden>
              {[18,19,20,21,22,23,24,25,26].map((n) => (
                <div key={n} className="shrink-0 flex items-center justify-center px-6 md:px-10">
                  <Image src={`/clients/${n}.jpg`} alt={`Brand ${n}`} width={180} height={90} quality={100} unoptimized style={{ width: "auto", maxHeight: "72px" }} className="object-contain" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex overflow-hidden">
            <div className="flex min-w-full shrink-0 items-center animate-marquee">
              {[27,28,29,30,31,9,10,11,12].map((n) => (
                <div key={n} className="shrink-0 flex items-center justify-center px-6 md:px-10">
                  <Image src={`/clients/${n}.jpg`} alt={`Brand ${n}`} width={180} height={90} quality={100} unoptimized style={{ width: "auto", maxHeight: "72px" }} className="object-contain" />
                </div>
              ))}
            </div>
            <div className="flex min-w-full shrink-0 items-center animate-marquee" aria-hidden>
              {[27,28,29,30,31,9,10,11,12].map((n) => (
                <div key={n} className="shrink-0 flex items-center justify-center px-6 md:px-10">
                  <Image src={`/clients/${n}.jpg`} alt={`Brand ${n}`} width={180} height={90} quality={100} unoptimized style={{ width: "auto", maxHeight: "72px" }} className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
