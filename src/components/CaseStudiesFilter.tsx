"use client";
import React, { useState } from "react";
import { ArrowUpRight, Filter } from "lucide-react";

interface CaseStudy {
  brand: string;
  industry: string;
  logo: string;
  challenge: string;
  solution: string;
  results: { metric: string; label: string }[];
  services: string[];
  color: string;
}

interface Props {
  caseStudies: CaseStudy[];
}

export default function CaseStudiesFilter({ caseStudies }: Props) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const allIndustries = ["All", ...Array.from(new Set(caseStudies.map(cs => cs.industry)))];
  const filtered = activeFilter === "All"
    ? caseStudies
    : caseStudies.filter(cs => cs.industry === activeFilter);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-12 justify-center">
        <Filter className="w-4 h-4 text-gray-400" />
        {allIndustries.map((ind) => (
          <button
            key={ind}
            onClick={() => setActiveFilter(ind)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeFilter === ind
                ? "bg-[#F97316] text-white shadow-md shadow-[#F97316]/25"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {ind}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((cs, i) => (
          <div
            key={cs.brand}
            className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1"
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {/* Gradient top bar */}
            <div className={`h-2 bg-gradient-to-r ${cs.color}`} />

            {/* Content */}
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cs.color} flex items-center justify-center text-2xl shadow-sm`}>
                  {cs.logo}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-[#F97316] transition-colors">{cs.brand}</h3>
                  <span className="text-xs text-gray-400 font-medium">{cs.industry}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-[#F97316] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {cs.results.slice(0, 4).map((r, j) => (
                  <div key={j} className="bg-gray-50 rounded-xl p-3 text-center group-hover:bg-gray-100 transition-colors">
                    <div className="text-base font-black text-gray-800">{r.metric}</div>
                    <div className="text-[10px] text-gray-400 font-medium">{r.label}</div>
                  </div>
                ))}
              </div>

              {/* Services */}
              <div className="flex flex-wrap gap-1.5">
                {cs.services.map((s) => (
                  <span key={s} className="text-[10px] font-bold text-[#F97316] bg-[#F97316]/10 px-2 py-1 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Hover overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-[#F97316]/5 to-transparent pointer-events-none transition-opacity duration-500 ${
              hoveredCard === i ? "opacity-100" : "opacity-0"
            }`} />
          </div>
        ))}
      </div>
    </div>
  );
}
