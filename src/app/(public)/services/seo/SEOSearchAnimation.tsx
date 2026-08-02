"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Search, MapPin, Star, ExternalLink, TrendingUp } from "lucide-react";

const searchSlides = [
  {
    keyword: "best digital marketing agency in delhi",
    title: "Kazzona Marketing | Best Digital Marketing Agency in Delhi NCR",
    desc: "India's leading digital marketing agency. SEO, PPC, Social Media & Web Development. 200+ brands scaled. ₹100Cr+ revenue generated.",
  },
  {
    keyword: "seo services for my niche",
    title: "Kazzona Marketing | SEO Services That Drive Real Revenue",
    desc: "Data-driven SEO strategies tailored for your industry. We rank your business for keywords that convert, not just traffic.",
  },
  {
    keyword: "top rated digital marketing company near me",
    title: "Kazzona Marketing | Top Rated Digital Marketing Company",
    desc: "Trusted by 200+ Indian brands. Full-service digital marketing — from SEO to Paid Ads to Social Media. Delhi NCR's #1 agency.",
  },
];

export default function SEOSearchAnimation() {
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const currentKeyword = searchSlides[keywordIndex].keyword;

  // Typing effect
  useEffect(() => {
    if (!isTyping) return;
    if (displayText.length < currentKeyword.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentKeyword.slice(0, displayText.length + 1));
      }, 55 + Math.random() * 40);
      return () => clearTimeout(timeout);
    } else {
      // Finished typing — pause then "search"
      const timeout = setTimeout(() => {
        setIsTyping(false);
        setIsSearching(true);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [displayText, isTyping, currentKeyword]);

  // Search click effect → show results
  useEffect(() => {
    if (!isSearching) return;
    const timeout = setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 800);
    return () => clearTimeout(timeout);
  }, [isSearching]);

  // After results shown → reset and move to next keyword
  useEffect(() => {
    if (!showResults) return;
    const timeout = setTimeout(() => {
      setShowResults(false);
      setDisplayText("");
      setIsTyping(true);
      setKeywordIndex((prev) => (prev + 1) % searchSlides.length);
    }, 3500);
    return () => clearTimeout(timeout);
  }, [showResults]);

  return (
    <div className="relative w-full max-w-[520px] mx-auto">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">

        {/* Google-style Search Bar */}
        <div className="p-5 pb-3">
          <div
            className={`flex items-center gap-3 bg-gray-50 border-2 ${
              isSearching
                ? "border-[#F97316] shadow-[0_0_0_3px_rgba(249,115,22,0.15)]"
                : "border-gray-200 hover:border-gray-300"
            } rounded-full px-5 py-3.5 transition-all duration-300`}
          >
            <Search className={`w-5 h-5 shrink-0 transition-colors ${isSearching ? "text-[#F97316]" : "text-gray-400"}`} />
            <div className="flex-1 relative">
              <span className="text-[15px] text-gray-800 font-medium">{displayText}</span>
              {/* Blinking cursor */}
              {isTyping && (
                <span className="inline-block w-[2px] h-[18px] bg-[#F97316] ml-[1px] align-middle animate-pulse" />
              )}
            </div>
            {/* Search button */}
            <button
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isSearching
                  ? "bg-[#F97316] scale-90 shadow-lg"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <Search className={`w-4 h-4 ${isSearching ? "text-white" : "text-gray-500"}`} />
            </button>
          </div>
        </div>

        {/* Search Ripple Animation */}
        {isSearching && (
          <div className="px-5 pb-3">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <span>Finding top results...</span>
            </div>
          </div>
        )}

        {/* Search Results */}
        {showResults && (
          <div className="px-5 pb-5 space-y-2.5 animate-in slide-in-from-top-2 fade-in duration-500">

            {/* Your Business — #1 Result */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-4 relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" /> #1 RANK
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F97316] flex items-center justify-center shrink-0 shadow-md">
                  <span className="text-white font-black text-sm">K</span>
                </div>
                <div className="space-y-1">
                  <div className="text-[13px] text-green-700 font-medium flex items-center gap-1">
                    www.kazzonamarketing.com
                  </div>
                  <div className="text-[15px] font-semibold text-gray-900 leading-snug">
                    {searchSlides[keywordIndex].title}
                  </div>
                  <div className="text-[13px] text-gray-500 leading-relaxed">
                    {searchSlides[keywordIndex].desc}
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                      <MapPin className="w-3 h-3" /> Delhi NCR
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 4.9/5
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                      <ExternalLink className="w-3 h-3" /> Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Competitor results (faded) */}
            <div className="opacity-40 space-y-2">
              <div className="border border-gray-100 rounded-xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">2</div>
                <div className="space-y-0.5 flex-1">
                  <div className="text-[13px] font-medium text-gray-600">Competitor Agency Pvt Ltd</div>
                  <div className="text-[11px] text-gray-400">Digital marketing services in Delhi...</div>
                </div>
              </div>
              <div className="border border-gray-100 rounded-xl p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">3</div>
                <div className="space-y-0.5 flex-1">
                  <div className="text-[13px] font-medium text-gray-600">Another Marketing Co.</div>
                  <div className="text-[11px] text-gray-400">We offer SEO and PPC services...</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Default state: bar chart when idle */}
        {!showResults && !isSearching && (
          <div className="px-5 pb-5">
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
              <div className="flex items-end gap-2.5 h-[120px]">
                {[35, 50, 40, 65, 55, 75, 70, 90, 85, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-[#F97316] to-[#FB923C] transition-all duration-700"
                    style={{
                      height: `${h}%`,
                      opacity: isTyping ? 0.3 + (i * 0.07) : 0.8,
                      transitionDelay: `${i * 50}ms`,
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-400 font-medium">
                <TrendingUp className="w-3.5 h-3.5" /> Organic Traffic Growth
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
