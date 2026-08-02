"use client";
import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  { name: "Rajesh Sharma", role: "Founder, FreshKart", text: "Kazzona Marketing transformed our online presence completely. Our organic traffic went from 2,000 to 18,000 monthly visitors in just 6 months.", color: "from-emerald-400 to-teal-500" },
  { name: "Priya Mehta", role: "CMO, CloudMinds", text: "Their LinkedIn ad strategy generated more qualified B2B leads in 3 months than our internal team did in an entire year.", color: "from-blue-400 to-indigo-500" },
  { name: "Arjun Patel", role: "CEO, StyleHive", text: "The ROI we get from Kazzona is unbelievable. They manage our entire digital marketing stack and the results speak for themselves.", color: "from-rose-400 to-pink-500" },
  { name: "Neha Gupta", role: "Director, UrbanPulse", text: "We were struggling to scale our Google Ads profitably. Kazzona audited the account, restructured campaigns, and brought our CPA down by 40%.", color: "from-purple-400 to-violet-500" },
  { name: "Sameer Desai", role: "VP Marketing, TechNova", text: "The website Kazzona built for us isn't just beautiful; it's a lead generation machine. Conversion rates have doubled since launch.", color: "from-amber-400 to-orange-500" },
  { name: "Ananya Rao", role: "Founder, GreenLeaf", text: "I appreciate their transparency. Unlike other agencies, I know exactly where every rupee is going and what ROI it brings.", color: "from-cyan-400 to-blue-500" },
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];
  const prevT = testimonials[(current - 1 + testimonials.length) % testimonials.length];
  const nextT = testimonials[(current + 1) % testimonials.length];

  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6 items-center">
        {/* Previous card (small) */}
        <div className="hidden md:block opacity-40 scale-90 transition-all duration-500">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex gap-0.5 mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">&ldquo;{prevT.text}&rdquo;</p>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${prevT.color} flex items-center justify-center text-white text-xs font-bold`}>
                {prevT.name.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-bold text-gray-700">{prevT.name}</div>
                <div className="text-[10px] text-gray-400">{prevT.role}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Active card (large) */}
        <div className="relative">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] relative overflow-hidden">
            {/* Quote icon */}
            <Quote className="absolute top-4 right-4 w-10 h-10 text-[#F97316]/10" />

            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Text */}
            <p className="text-gray-700 leading-relaxed mb-6 font-medium relative z-10">&ldquo;{t.text}&rdquo;</p>

            {/* Author */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-gray-900">{t.name}</div>
                <div className="text-sm text-gray-400">{t.role}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Next card (small) */}
        <div className="hidden md:block opacity-40 scale-90 transition-all duration-500">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex gap-0.5 mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">&ldquo;{nextT.text}&rdquo;</p>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${nextT.color} flex items-center justify-center text-white text-xs font-bold`}>
                {nextT.name.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-bold text-gray-700">{nextT.name}</div>
                <div className="text-[10px] text-gray-400">{nextT.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button onClick={prev} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#F97316] hover:border-[#F97316] transition-all shadow-sm">
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-[#F97316]" : "w-2 bg-gray-200 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button onClick={next} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#F97316] hover:border-[#F97316] transition-all shadow-sm">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
