"use client";
import React, { useState, useEffect, useRef } from "react";
import { Rocket, Trophy, Users, IndianRupee, Award, Target } from "lucide-react";

const milestones = [
  { year: "2019", title: "Founded in Noida", desc: "Started with 3 team members and a mission to make premium digital marketing accessible to Indian startups.", icon: Rocket, color: "#F97316" },
  { year: "2020", title: "First ₹1Cr Revenue", desc: "Helped our first client cross ₹1Cr in annual revenue through organic SEO within 8 months.", icon: IndianRupee, color: "#10B981" },
  { year: "2021", title: "Team of 20+", desc: "Expanded our team to 20+ specialists across SEO, PPC, design, and development.", icon: Users, color: "#3B82F6" },
  { year: "2022", title: "100+ Clients", desc: "Crossed the 100-client milestone, serving industries from D2C to SaaS to Healthcare.", icon: Target, color: "#8B5CF6" },
  { year: "2023", title: "Google Premier Partner", desc: "Achieved Google Premier Partner status, placing us in the top 3% of agencies in India.", icon: Award, color: "#F59E0B" },
  { year: "2024", title: "₹100Cr+ Revenue", desc: "Collectively generated over ₹100Cr in revenue for our clients through digital channels.", icon: Trophy, color: "#EC4899" },
];

export default function TimelineAnimation() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Intersection observer to trigger animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Auto progress
  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(() => {
      setActiveIdx((i) => (i < milestones.length - 1 ? i + 1 : 0));
    }, 2500);
    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <div ref={ref} className="relative">
      {/* Desktop: Horizontal timeline */}
      <div className="hidden md:block">
        {/* Line */}
        <div className="relative mx-8">
          <div className="absolute top-[28px] left-0 right-0 h-[3px] bg-gray-100 rounded-full" />
          <div
            className="absolute top-[28px] left-0 h-[3px] bg-gradient-to-r from-[#F97316] to-[#FB923C] rounded-full transition-all duration-700"
            style={{ width: `${(activeIdx / (milestones.length - 1)) * 100}%` }}
          />

          {/* Milestone nodes */}
          <div className="flex justify-between relative">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              const isActive = i <= activeIdx;
              const isCurrent = i === activeIdx;
              return (
                <div key={i} className="flex flex-col items-center" style={{ width: "120px" }}>
                  {/* Icon circle */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isCurrent
                        ? "bg-[#F97316] shadow-lg shadow-[#F97316]/30 scale-110"
                        : isActive
                        ? "bg-[#F97316]/10 border-2 border-[#F97316]"
                        : "bg-gray-50 border-2 border-gray-100"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 transition-colors duration-500 ${
                        isCurrent ? "text-white" : isActive ? "text-[#F97316]" : "text-gray-300"
                      }`}
                    />
                  </div>
                  {/* Year */}
                  <div
                    className={`mt-3 text-sm font-bold transition-colors duration-500 ${
                      isCurrent ? "text-[#F97316]" : isActive ? "text-gray-700" : "text-gray-300"
                    }`}
                  >
                    {m.year}
                  </div>
                  {/* Title */}
                  <div
                    className={`mt-1 text-xs font-semibold text-center transition-colors duration-500 ${
                      isCurrent ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {m.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active milestone description */}
        <div className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 mx-8 animate-in fade-in slide-in-from-bottom-2 duration-500" key={activeIdx}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: milestones[activeIdx].color + "15" }}>
              {React.createElement(milestones[activeIdx].icon, { className: "w-6 h-6", style: { color: milestones[activeIdx].color } })}
            </div>
            <div>
              <div className="text-sm font-bold text-[#F97316] mb-0.5">{milestones[activeIdx].year}</div>
              <div className="text-lg font-bold text-gray-900 mb-1">{milestones[activeIdx].title}</div>
              <p className="text-sm text-gray-500 leading-relaxed">{milestones[activeIdx].desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Vertical timeline */}
      <div className="md:hidden space-y-6">
        {milestones.map((m, i) => {
          const Icon = m.icon;
          const isActive = i <= activeIdx;
          const isCurrent = i === activeIdx;
          return (
            <div key={i} className="flex gap-4">
              {/* Vertical line + dot */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${
                    isCurrent
                      ? "bg-[#F97316] shadow-md shadow-[#F97316]/30"
                      : isActive
                      ? "bg-[#F97316]/10 border-2 border-[#F97316]"
                      : "bg-gray-50 border-2 border-gray-100"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isCurrent ? "text-white" : isActive ? "text-[#F97316]" : "text-gray-300"}`} />
                </div>
                {i < milestones.length - 1 && (
                  <div className={`w-0.5 flex-1 mt-2 rounded-full transition-all duration-500 ${
                    i < activeIdx ? "bg-[#F97316]/30" : "bg-gray-100"
                  }`} />
                )}
              </div>
              {/* Content */}
              <div className={`pb-6 transition-opacity duration-500 ${isCurrent ? "opacity-100" : "opacity-50"}`}>
                <div className="text-xs font-bold text-[#F97316]">{m.year}</div>
                <div className="text-sm font-bold text-gray-900 mt-0.5">{m.title}</div>
                {isCurrent && (
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed animate-in fade-in duration-300">{m.desc}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
