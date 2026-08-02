"use client";
import React, { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsVisible(false), 400);
          return 100;
        }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0F0F0F] flex flex-col items-center justify-center transition-opacity duration-500 ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* K Logo Animation */}
      <div className="relative mb-12">
        {/* Outer ring */}
        <div className="w-28 h-28 rounded-full border-2 border-gray-800 flex items-center justify-center relative">
          {/* Spinning arc */}
          <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: "2s" }} viewBox="0 0 112 112">
            <circle cx="56" cy="56" r="53" fill="none" stroke="#F97316" strokeWidth="2.5" strokeDasharray="83 250" strokeLinecap="round" />
          </svg>
          {/* K letter */}
          <span className="text-5xl font-black text-white tracking-tight">K</span>
        </div>
        {/* Pulse rings */}
        <div className="absolute inset-0 rounded-full border border-[#F97316]/20 animate-ping" style={{ animationDuration: "1.5s" }} />
      </div>

      {/* Brand name */}
      <div className="mb-8">
        <span className="text-xl font-bold text-white tracking-wider">KAZZONA</span>
        <span className="text-xl font-light text-gray-500 ml-1">MARKETING</span>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#F97316] to-[#FB923C] rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading text */}
      <div className="mt-4 text-[11px] text-gray-500 font-medium tracking-widest uppercase">
        {progress < 30 ? "Initializing..." : progress < 70 ? "Loading Assets..." : progress < 100 ? "Almost Done..." : "Welcome"}
      </div>
    </div>
  );
}
