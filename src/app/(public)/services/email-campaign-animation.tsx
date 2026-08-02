"use client";
import React, { useState, useEffect } from "react";
import { Mail, Send, Eye, MousePointerClick, ShoppingCart, CheckCircle2, TrendingUp, Users } from "lucide-react";

const stages = [
  { label: "Created", icon: Mail, color: "#6B7280" },
  { label: "Sent", icon: Send, color: "#3B82F6" },
  { label: "Delivered", icon: CheckCircle2, color: "#10B981" },
  { label: "Opened", icon: Eye, color: "#F59E0B" },
  { label: "Clicked", icon: MousePointerClick, color: "#F97316" },
  { label: "Converted", icon: ShoppingCart, color: "#22C55E" },
];

export default function EmailCampaignAnimation() {
  const [stage, setStage] = useState(0);
  const [sent, setSent] = useState(0);
  const [delivered, setDelivered] = useState(0);
  const [opened, setOpened] = useState(0);
  const [clicked, setClicked] = useState(0);
  const [converted, setConverted] = useState(0);
  const [revenue, setRevenue] = useState(0);

  // Auto progress through stages
  useEffect(() => {
    const timer = setInterval(() => {
      setStage((s) => {
        if (s < stages.length - 1) return s + 1;
        return 0;
      });
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  // Animate metrics based on stage
  useEffect(() => {
    const targets = [
      { sent: 0, delivered: 0, opened: 0, clicked: 0, converted: 0, revenue: 0 },
      { sent: 12450, delivered: 0, opened: 0, clicked: 0, converted: 0, revenue: 0 },
      { sent: 12450, delivered: 11890, opened: 0, clicked: 0, converted: 0, revenue: 0 },
      { sent: 12450, delivered: 11890, opened: 7134, clicked: 0, converted: 0, revenue: 0 },
      { sent: 12450, delivered: 11890, opened: 7134, clicked: 2845, converted: 0, revenue: 0 },
      { sent: 12450, delivered: 11890, opened: 7134, clicked: 2845, converted: 569, revenue: 456000 },
    ];

    const t = targets[stage];
    const duration = 1200;
    const steps = 30;
    const interval = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current++;
      const p = current / steps;
      const ease = 1 - Math.pow(1 - p, 3);

      setSent(Math.floor(t.sent * ease));
      setDelivered(Math.floor(t.delivered * ease));
      setOpened(Math.floor(t.opened * ease));
      setClicked(Math.floor(t.clicked * ease));
      setConverted(Math.floor(t.converted * ease));
      setRevenue(Math.floor(t.revenue * ease));

      if (current >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [stage]);

  return (
    <div className="w-full max-w-[520px] mx-auto">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#F97316] flex items-center justify-center">
              <Mail className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-gray-800 text-sm">Email Campaign</span>
          </div>
          <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-green-600 font-bold">Active</span>
          </div>
        </div>

        {/* Stage Progress */}
        <div className="px-6 pt-5 pb-4">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-[11px] left-[14px] right-[14px] h-[2px] bg-gray-100" />
            <div
              className="absolute top-[11px] left-[14px] h-[2px] bg-[#F97316] transition-all duration-500"
              style={{ width: `${(stage / (stages.length - 1)) * 100}%` }}
            />

            {stages.map((s, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    i <= stage
                      ? "bg-[#F97316] shadow-md shadow-[#F97316]/30"
                      : "bg-gray-100"
                  }`}
                >
                  {i < stage ? (
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  ) : i === stage ? (
                    <s.icon className="w-3 h-3 text-white" />
                  ) : (
                    <s.icon className="w-3 h-3 text-gray-300" />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 px-0.5">
            {stages.map((s, i) => (
              <span
                key={i}
                className={`text-[9px] font-semibold w-[52px] text-center leading-tight ${
                  i <= stage ? "text-[#F97316]" : "text-gray-300"
                }`}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>

        {/* Email Preview */}
        <div className="px-6 pb-4">
          <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#F97316]/10 flex items-center justify-center">
                <Mail className="w-4 h-4 text-[#F97316]" />
              </div>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded w-28 mb-1.5" />
                <div className="h-1.5 bg-gray-100 rounded w-20" />
              </div>
              {stage >= 3 && (
                <span className="text-[9px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-bold animate-in fade-in duration-300">
                  Opened
                </span>
              )}
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 bg-gray-200 rounded w-full" />
              <div className="h-1.5 bg-gray-200 rounded w-5/6" />
              <div className="h-1.5 bg-gray-200 rounded w-3/4" />
              <div className="mt-3 h-6 bg-[#F97316] rounded-lg w-20 flex items-center justify-center">
                <span className="text-[8px] text-white font-bold">Shop Now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 px-6 pb-5">
          <div className="bg-blue-50 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Send className="w-3 h-3 text-blue-500" />
              <span className="text-[9px] text-blue-500 font-bold uppercase">Sent</span>
            </div>
            <div className="text-base font-black text-blue-700">{sent.toLocaleString("en-IN")}</div>
          </div>
          <div className="bg-green-50 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Eye className="w-3 h-3 text-green-500" />
              <span className="text-[9px] text-green-500 font-bold uppercase">Opened</span>
            </div>
            <div className="text-base font-black text-green-700">{opened.toLocaleString("en-IN")}</div>
          </div>
          <div className="bg-orange-50 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <MousePointerClick className="w-3 h-3 text-[#F97316]" />
              <span className="text-[9px] text-[#F97316] font-bold uppercase">Clicked</span>
            </div>
            <div className="text-base font-black text-[#EA580C]">{clicked.toLocaleString("en-IN")}</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp className="w-3 h-3 text-purple-500" />
              <span className="text-[9px] text-purple-500 font-bold uppercase">Revenue</span>
            </div>
            <div className="text-base font-black text-purple-700">₹{(revenue / 1000).toFixed(0)}K</div>
          </div>
        </div>

        {/* Bottom Summary */}
        {stage >= 5 && (
          <div className="mx-6 mb-6 bg-gradient-to-r from-[#F97316] to-[#EA580C] rounded-xl p-3.5 flex items-center gap-3 animate-in slide-in-from-bottom-2 fade-in duration-500">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-white font-bold text-sm">{converted} Orders Recovered</div>
              <div className="text-white/70 text-[10px] truncate">Automated emails brought back abandoned carts</div>
            </div>
            <div className="ml-auto text-white font-black text-base shrink-0">₹{(revenue / 1000).toFixed(0)}K</div>
          </div>
        )}
      </div>
    </div>
  );
}
