"use client";
import React, { useState, useEffect } from "react";
import { IndianRupee, TrendingUp, MousePointerClick, Eye, Target, BarChart3 } from "lucide-react";

export default function AdDashboardAnimation() {
  const [step, setStep] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [impressions, setImpressions] = useState(0);
  const [roas, setRoas] = useState(0);

  // Animate numbers
  useEffect(() => {
    if (step < 1) return;

    const targetRevenue = 2160000;
    const targetClicks = 18450;
    const targetImpressions = 542000;
    const targetRoas = 4.8;

    const duration = 2000;
    const steps = 40;
    const interval = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      const ease = 1 - Math.pow(1 - progress, 3);

      setRevenue(Math.floor(targetRevenue * ease));
      setClicks(Math.floor(targetClicks * ease));
      setImpressions(Math.floor(targetImpressions * ease));
      setRoas(parseFloat((targetRoas * ease).toFixed(1)));

      if (current >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setRevenue(0);
          setClicks(0);
          setImpressions(0);
          setRoas(0);
          setStep(0);
        }, 2500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [step]);

  // Auto start
  useEffect(() => {
    const timer = setTimeout(() => setStep(1), 500);
    return () => clearTimeout(timer);
  }, []);

  const formatINR = (num: number) => {
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
    return `₹${num}`;
  };

  return (
    <div className="w-full max-w-[540px] mx-auto">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F97316] flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-800 text-sm">Campaign Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[11px] text-green-600 font-medium">Live</span>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-3 gap-3 px-6 pt-5 pb-4">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <IndianRupee className="w-3 h-3 text-gray-400" />
              <span className="text-[10px] text-gray-400 font-medium uppercase">Spend</span>
            </div>
            <div className="text-lg font-black text-gray-800">₹4.5L</div>
          </div>
          <div className="bg-green-50 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-[10px] text-green-500 font-medium uppercase">Revenue</span>
            </div>
            <div className="text-lg font-black text-green-600">{formatINR(revenue)}</div>
          </div>
          <div className="bg-[#F97316]/10 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="w-3 h-3 text-[#F97316]" />
              <span className="text-[10px] text-[#F97316] font-medium uppercase">ROAS</span>
            </div>
            <div className="text-lg font-black text-[#F97316]">{roas}x</div>
          </div>
        </div>

        {/* Graph Area */}
        <div className="px-6 pb-4">
          <div className="bg-gray-50 rounded-2xl p-4 relative h-[140px] overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="30" x2="400" y2="30" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1="0" y1="60" x2="400" y2="60" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1="0" y1="90" x2="400" y2="90" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="4 4" />

              {/* Revenue area */}
              <path
                d={`M0,120 L0,${120 - (revenue / 2160000) * 100} L50,${120 - (revenue / 2160000) * 85} L100,${120 - (revenue / 2160000) * 90} L150,${120 - (revenue / 2160000) * 65} L200,${120 - (revenue / 2160000) * 75} L250,${120 - (revenue / 2160000) * 45} L300,${120 - (revenue / 2160000) * 55} L350,${120 - (revenue / 2160000) * 25} L400,${120 - (revenue / 2160000) * 10} L400,120 Z`}
                fill="url(#greenGradient)"
                opacity="0.3"
              />
              {/* Revenue line */}
              <path
                d={`M0,${120 - (revenue / 2160000) * 100} L50,${120 - (revenue / 2160000) * 85} L100,${120 - (revenue / 2160000) * 90} L150,${120 - (revenue / 2160000) * 65} L200,${120 - (revenue / 2160000) * 75} L250,${120 - (revenue / 2160000) * 45} L300,${120 - (revenue / 2160000) * 55} L350,${120 - (revenue / 2160000) * 25} L400,${120 - (revenue / 2160000) * 10}`}
                fill="none"
                stroke="#22C55E"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Ad spend line */}
              <path
                d="M0,95 L50,92 L100,94 L150,88 L200,90 L250,85 L300,87 L350,82 L400,80"
                fill="none"
                stroke="#F97316"
                strokeWidth="2"
                strokeDasharray="6 4"
                opacity="0.6"
              />

              <defs>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22C55E" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Legend */}
            <div className="absolute bottom-3 right-3 flex items-center gap-3 text-[10px]">
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-[#F97316] opacity-60" style={{ borderTop: "2px dashed #F97316" }} />
                <span className="text-gray-400">Ad Spend</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-green-500 rounded" />
                <span className="text-gray-400">Revenue</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 gap-3 px-6 pb-6">
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
            <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
              <MousePointerClick className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 uppercase font-medium">Clicks</div>
              <div className="text-sm font-bold text-gray-800">{clicks.toLocaleString("en-IN")}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
            <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center">
              <Eye className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 uppercase font-medium">Impressions</div>
              <div className="text-sm font-bold text-gray-800">{impressions.toLocaleString("en-IN")}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
