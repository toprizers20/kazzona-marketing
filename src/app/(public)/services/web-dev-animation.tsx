"use client";
import React, { useState, useEffect } from "react";
import { Code, Globe, Smartphone, Gauge, CheckCircle } from "lucide-react";

const stages = [
  { label: "HTML Structure", code: "<div class='hero'>", color: "#F97316" },
  { label: "Styling with CSS", code: "style: gradient-bg", color: "#2563EB" },
  { label: "React Components", code: "<Component />", color: "#06B6D4" },
  { label: "Performance", code: "Lighthouse: 99/100", color: "#10B981" },
];

export default function WebDevAnimation() {
  const [stage, setStage] = useState(0);
  const [typedCode, setTypedCode] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [previewStep, setPreviewStep] = useState(0);

  const currentStage = stages[stage];

  // Typing effect for code
  useEffect(() => {
    const fullText = currentStage.code;
    if (typedCode.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedCode(fullText.slice(0, typedCode.length + 1));
      }, 40 + Math.random() * 30);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        if (stage < stages.length - 1) {
          setStage((s) => s + 1);
          setTypedCode("");
        } else {
          setShowPreview(true);
        }
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [typedCode, stage, currentStage.code]);

  // Preview build steps
  useEffect(() => {
    if (!showPreview) return;
    if (previewStep < 4) {
      const timeout = setTimeout(() => {
        setPreviewStep((s) => s + 1);
      }, 400);
      return () => clearTimeout(timeout);
    } else {
      // Reset everything
      const timeout = setTimeout(() => {
        setStage(0);
        setTypedCode("");
        setShowPreview(false);
        setPreviewStep(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [showPreview, previewStep]);

  return (
    <div className="w-full max-w-[520px] mx-auto">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">

        {/* Browser bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-white rounded-lg px-3 py-1.5 text-xs text-gray-400 border border-gray-200 ml-2">
            www.yourbusiness.com
          </div>
          <Globe className="w-4 h-4 text-gray-400" />
        </div>

        {/* Code + Preview split */}
        <div className="flex min-h-[340px]">

          {/* Left: Code editor */}
          <div className="w-1/2 bg-[#1E1E2E] p-4 font-mono text-xs border-r border-gray-700">
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <span className="ml-2 text-gray-500 text-[10px]">index.tsx</span>
            </div>

            {/* Line numbers + code */}
            <div className="space-y-1.5">
              <div className="flex">
                <span className="text-gray-600 w-5 text-right mr-3">1</span>
                <span className="text-purple-400">import</span>
                <span className="text-gray-300 ml-1">{"{ "}</span>
                <span className="text-yellow-300">Component</span>
                <span className="text-gray-300">{" }"}</span>
                <span className="text-purple-400 ml-1">from</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-5 text-right mr-3">2</span>
                <span className="text-green-400">&apos;react&apos;</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-5 text-right mr-3">3</span>
                <span className="text-gray-500">{"// Building your website..."}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 w-5 text-right mr-3">4</span>
                <span style={{ color: currentStage.color }}>{typedCode}</span>
                {typedCode.length < currentStage.code.length && (
                  <span className="inline-block w-[2px] h-3 ml-[1px] animate-pulse" style={{ background: currentStage.color }} />
                )}
              </div>
              <div className="flex">
                <span className="text-gray-600 w-5 text-right mr-3">5</span>
                <span className="text-gray-500 italic">{"  // "}{currentStage.label}</span>
              </div>
            </div>

            {/* Active stage indicator */}
            <div className="mt-4 pt-3 border-t border-gray-700/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: currentStage.color }} />
                <span className="text-[10px] text-gray-400">Stage {stage + 1}/4: {currentStage.label}</span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1 bg-gray-700 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${((stage + 1) / stages.length) * 100}%`, background: currentStage.color }}
                />
              </div>
            </div>
          </div>

          {/* Right: Live preview */}
          <div className="w-1/2 bg-gray-50 p-4 flex flex-col">
            <div className="flex items-center gap-1.5 mb-3">
              <Smartphone className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[10px] text-gray-400 font-medium">Live Preview</span>
              {showPreview && previewStep >= 4 && (
                <CheckCircle className="w-3.5 h-3.5 text-green-500 ml-auto" />
              )}
            </div>

            <div className="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              {/* Preview building up */}
              <div className="p-3 space-y-2">
                {/* Header */}
                {previewStep >= 1 && (
                  <div className="flex items-center justify-between animate-in slide-in-from-top-2 fade-in duration-300">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded bg-[#F97316]" />
                      <div className="h-2 bg-gray-800 rounded w-16" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-1.5 bg-gray-200 rounded w-6" />
                      <div className="h-1.5 bg-gray-200 rounded w-6" />
                      <div className="h-1.5 bg-gray-200 rounded w-6" />
                    </div>
                  </div>
                )}

                {/* Hero section */}
                {previewStep >= 2 && (
                  <div className="bg-gradient-to-br from-[#F97316]/10 to-[#F97316]/5 rounded-lg p-3 animate-in slide-in-from-bottom-2 fade-in duration-300">
                    <div className="h-2.5 bg-gray-800 rounded w-3/4 mb-1.5" />
                    <div className="h-2.5 bg-gray-800 rounded w-1/2 mb-2" />
                    <div className="h-1.5 bg-gray-400 rounded w-full mb-1" />
                    <div className="h-1.5 bg-gray-400 rounded w-4/5 mb-2.5" />
                    <div className="flex gap-1.5">
                      <div className="h-4 bg-[#F97316] rounded-full w-16" />
                      <div className="h-4 bg-white border border-gray-200 rounded-full w-16" />
                    </div>
                  </div>
                )}

                {/* Feature cards */}
                {previewStep >= 3 && (
                  <div className="grid grid-cols-3 gap-1.5 animate-in slide-in-from-bottom-2 fade-in duration-300">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                        <div className="w-4 h-4 rounded bg-[#F97316]/20 mb-1.5" />
                        <div className="h-1.5 bg-gray-300 rounded w-full mb-1" />
                        <div className="h-1 bg-gray-200 rounded w-2/3" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer */}
                {previewStep >= 4 && (
                  <div className="bg-gray-800 rounded-lg p-2 animate-in slide-in-from-bottom-2 fade-in duration-300">
                    <div className="flex justify-between items-center">
                      <div className="h-1.5 bg-gray-600 rounded w-12" />
                      <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full bg-gray-600" />
                        <div className="w-3 h-3 rounded-full bg-gray-600" />
                        <div className="w-3 h-3 rounded-full bg-gray-600" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Performance badge */}
            {showPreview && previewStep >= 4 && (
              <div className="mt-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2 flex items-center gap-2 animate-in slide-in-from-bottom-2 fade-in duration-500">
                <Gauge className="w-4 h-4 text-green-600" />
                <span className="text-[11px] font-bold text-green-700">99/100 Performance</span>
                <span className="text-[10px] text-green-500 ml-auto">Lightning Fast</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
