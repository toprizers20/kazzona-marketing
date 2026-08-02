"use client";
import React, { useState } from "react";
import { Mail, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { subscribeNewsletter } from "@/app/actions/newsletter";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    const result = await subscribeNewsletter(email);
    setLoading(false);

    if (result.success) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] rounded-3xl p-8 md:p-12 overflow-hidden border border-gray-800">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#F97316]/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F97316]/3 rounded-full blur-[60px]" />

      {/* Dot pattern */}
      <div className="absolute top-4 right-4 grid grid-cols-4 gap-2 opacity-20">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-[#F97316]" />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#F97316]/10 flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-7 h-7 text-[#F97316]" />
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Get Weekly Growth Insights
        </h3>
        <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
          Join 2,000+ Indian founders and marketers who get our best SEO, Ads, and Growth strategies every Thursday.
        </p>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <div className={`flex-1 relative transition-all duration-300 ${isFocused ? "ring-2 ring-[#F97316]/30" : ""} rounded-xl`}>
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                required
                className="w-full bg-white/5 border border-gray-700 rounded-xl pl-10 pr-4 py-3.5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#F97316] transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#DC2626] text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-lg shadow-[#F97316]/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              {loading ? "Subscribing..." : <>Subscribe <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl px-6 py-4 max-w-lg mx-auto animate-in slide-in-from-bottom-2 fade-in duration-500">
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
            <span className="text-green-400 text-sm font-medium">Welcome aboard! Check your inbox for confirmation.</span>
          </div>
        )}

        <p className="text-[11px] text-gray-600 mt-4">
          No spam. Unsubscribe anytime. Read by 2,000+ marketers.
        </p>
      </div>
    </div>
  );
}
