"use client";
import React, { useState, useEffect } from "react";
import { Palette, Type, Image, Square, Circle, Layers, Download, Check, MousePointer2 } from "lucide-react";

const designSteps = [
  { label: "Layout", icon: Layout },
  { label: "Colors", icon: Palette },
  { label: "Typography", icon: Type },
  { label: "Assets", icon: Image },
  { label: "Export", icon: Download },
];

function Layout(props: any) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  );
}

const colorPalettes = [
  ["#F97316", "#1E293B", "#F8FAFC", "#0EA5E9"],
  ["#8B5CF6", "#EC4899", "#FBBF24", "#10B981"],
  ["#EF4444", "#1E40AF", "#F97316", "#22C55E"],
];

const fonts = ["Inter", "Playfair", "Poppins", "Montserrat"];

export default function DesignStudioAnimation() {
  const [step, setStep] = useState(0);
  const [paletteIdx, setPaletteIdx] = useState(0);
  const [fontIdx, setFontIdx] = useState(0);
  const [elements, setElements] = useState(0);
  const [showExport, setShowExport] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });

  // Auto progress
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => {
        if (s < designSteps.length - 1) return s + 1;
        // Reset
        setTimeout(() => {
          setPaletteIdx(0);
          setFontIdx(0);
          setElements(0);
          setShowExport(false);
        }, 200);
        return 0;
      });
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  // Animate elements on canvas
  useEffect(() => {
    if (step === 0) setElements(0);
    if (step >= 1) {
      const t = setTimeout(() => setElements(1), 200);
      return () => clearTimeout(t);
    }
    if (step >= 2) {
      const t = setTimeout(() => setElements(2), 200);
      return () => clearTimeout(t);
    }
    if (step >= 3) {
      const t = setTimeout(() => setElements(3), 200);
      return () => clearTimeout(t);
    }
    if (step >= 4) {
      const t = setTimeout(() => setShowExport(true), 300);
      return () => clearTimeout(t);
    }
  }, [step]);

  // Cycle palette
  useEffect(() => {
    if (step === 1) {
      const t = setInterval(() => setPaletteIdx((p) => (p + 1) % colorPalettes.length), 600);
      return () => clearInterval(t);
    }
  }, [step]);

  // Cycle font
  useEffect(() => {
    if (step === 2) {
      const t = setInterval(() => setFontIdx((f) => (f + 1) % fonts.length), 500);
      return () => clearInterval(t);
    }
  }, [step]);

  // Cursor movement
  useEffect(() => {
    const positions = [
      { x: 60, y: 40 }, { x: 30, y: 60 }, { x: 70, y: 70 },
      { x: 45, y: 30 }, { x: 55, y: 55 }, { x: 40, y: 45 },
    ];
    let idx = 0;
    const t = setInterval(() => {
      setCursorPos(positions[idx % positions.length]);
      idx++;
    }, 1500);
    return () => clearInterval(t);
  }, []);

  const palette = colorPalettes[paletteIdx];

  return (
    <div className="w-full max-w-[520px] mx-auto">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#F97316] flex items-center justify-center">
              <Palette className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-gray-800 text-sm">Design Studio</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-gray-400 font-medium">Editing</span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-1 px-4 py-2 border-b border-gray-100 bg-gray-50/50">
          {[
            { icon: MousePointer2, active: step === 0 },
            { icon: Square, active: step === 1 },
            { icon: Type, active: step === 2 },
            { icon: Image, active: step === 3 },
            { icon: Layers, active: step === 4 },
          ].map((tool, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                tool.active ? "bg-[#F97316] text-white shadow-sm" : "text-gray-400 hover:bg-gray-100"
              }`}
            >
              <tool.icon className="w-4 h-4" />
            </div>
          ))}
          <div className="ml-auto flex items-center gap-1.5">
            {palette.map((c, i) => (
              <div key={i} className="w-4 h-4 rounded-full border border-gray-200" style={{ background: c }} />
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="relative bg-gray-100 p-4 min-h-[280px]">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="0.5" fill="#9CA3AF" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Design canvas */}
          <div className="relative bg-white rounded-xl shadow-md border border-gray-200 h-[240px] overflow-hidden">
            {/* Background color */}
            <div
              className="absolute inset-0 transition-colors duration-500"
              style={{ background: palette[2] }}
            />

            {/* Header bar */}
            {elements >= 1 && (
              <div
                className="absolute top-0 left-0 right-0 h-10 flex items-center px-4 animate-in slide-in-from-top-2 fade-in duration-300"
                style={{ background: palette[1] }}
              >
                <div className="w-5 h-5 rounded" style={{ background: palette[0] }} />
                <div className="ml-2 h-1.5 bg-white/30 rounded w-16" />
                <div className="ml-auto flex gap-2">
                  <div className="h-1.5 bg-white/20 rounded w-8" />
                  <div className="h-1.5 bg-white/20 rounded w-8" />
                  <div className="h-1.5 bg-white/20 rounded w-8" />
                </div>
              </div>
            )}

            {/* Hero section */}
            {elements >= 2 && (
              <div
                className="absolute animate-in slide-in-from-bottom-2 fade-in duration-500"
                style={{ top: "48px", left: "16px", right: "16px" }}
              >
                <div
                  className="text-lg font-bold mb-1"
                  style={{ color: palette[1], fontFamily: fonts[fontIdx] }}
                >
                  Your Brand
                </div>
                <div className="text-[10px] mb-2" style={{ color: palette[1] + "99" }}>
                  Beautiful designs that convert
                </div>
                <div
                  className="inline-block h-5 px-3 rounded-full text-[8px] text-white font-bold flex items-center"
                  style={{ background: palette[0] }}
                >
                  Get Started
                </div>
              </div>
            )}

            {/* Cards */}
            {elements >= 3 && (
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 animate-in slide-in-from-bottom-2 fade-in duration-500">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="rounded-lg p-2 border"
                    style={{
                      background: palette[2],
                      borderColor: palette[1] + "15",
                    }}
                  >
                    <div
                      className="w-full h-8 rounded mb-1.5"
                      style={{ background: palette[0] + "20" }}
                    />
                    <div className="h-1.5 rounded w-3/4 mb-1" style={{ background: palette[1] + "30" }} />
                    <div className="h-1 rounded w-1/2" style={{ background: palette[1] + "20" }} />
                  </div>
                ))}
              </div>
            )}

            {/* Cursor */}
            <div
              className="absolute z-20 transition-all duration-700 ease-out"
              style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%` }}
            >
              <MousePointer2
                className="w-4 h-4 -ml-1 -mt-1 drop-shadow-md"
                style={{ color: palette[0] }}
                fill={palette[0]}
              />
            </div>

            {/* Export overlay */}
            {showExport && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300">
                <div className="bg-white rounded-2xl shadow-xl p-5 text-center border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="font-bold text-gray-800 text-sm mb-1">Design Exported!</div>
                  <div className="text-[10px] text-gray-400">PNG, SVG, PDF ready</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {designSteps.map((s, i) => (
              <div
                key={i}
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-semibold transition-all ${
                  i === step
                    ? "bg-[#F97316] text-white"
                    : i < step
                    ? "bg-green-50 text-green-600"
                    : "bg-gray-50 text-gray-300"
                }`}
              >
                {i < step ? <Check className="w-2.5 h-2.5" /> : <s.icon className="w-2.5 h-2.5" />}
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
