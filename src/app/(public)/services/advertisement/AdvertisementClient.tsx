"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Megaphone, Target, Eye, Search, Activity, IndianRupee } from "lucide-react";
import PricingClient from "@/app/(public)/pricing/PricingClient";
import RelatedServices from "@/components/RelatedServices";

interface AdvertisementClientProps {
  config: any;
}

export default function AdvertisementClient({ config }: AdvertisementClientProps) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(249,115,22,0.08),transparent)] -z-10" />
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="animate-slide-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                <Megaphone className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-primary tracking-widest uppercase">Performance Media Buying</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                Turn Ad Spend Into <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Measurable Profit.</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-lg">
                We don&apos;t care about impressions or likes. We engineer Google and Meta ad campaigns that deliver aggressive ROAS for Indian D2C and B2B brands.
              </p>
              <Link href="/contact">
                <button className="bg-primary hover:bg-primary/90 text-white font-bold px-10 py-5 rounded-full text-lg shadow-lg shadow-primary/25 transition-all hover:-translate-y-1 flex items-center gap-2">
                  Audit My Current Campaigns <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>

            {/* Right: Video */}
            <div className="relative flex justify-center items-center animate-slide-right">
              <div className="relative w-full max-w-[650px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-200">
                <video
                  src="/advertisement.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-24 bg-secondary/30 border-y border-border/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-left">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">Stop Burning Money on Ineffective Targeting</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Most agencies set up basic campaigns and let them run on autopilot. In the highly competitive Indian market, this strategy guarantees you will lose money.
              </p>
              <ul className="space-y-4">
                {[
                  "Eliminate wasted spend on unqualified clicks",
                  "A/B test creatives relentlessly to lower CPA",
                  "Scale budgets only when profitability is proven"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 bg-card p-4 rounded-xl border border-border/50">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="animate-slide-right grid grid-cols-2 gap-4">
              <div className="bg-card p-8 rounded-3xl border border-border/50 text-center shadow-lg">
                <div className="text-5xl font-black mb-2">65%</div>
                <div className="text-sm text-muted-foreground">Reduction in Cost Per Acquisition</div>
              </div>
              <div className="bg-primary/10 p-8 rounded-3xl border border-primary/20 text-center flex flex-col justify-center shadow-lg">
                <div className="text-4xl font-black text-primary mb-2">₹2Cr+</div>
                <div className="text-sm font-bold text-primary">Monthly Ad Spend Managed</div>
              </div>
              <div className="col-span-2 bg-card p-8 rounded-3xl border border-border/50 flex items-center justify-between">
                <div className="font-bold text-xl">Focus on Profit, Not Just Revenue.</div>
                <Target className="w-10 h-10 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Expertise */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="animate-fade-down text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Omnichannel Dominance</h2>
            <p className="text-lg text-muted-foreground">We deploy your budget across the platforms where your specific target audience is most likely to convert.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Google Ads (PPC)", desc: "Search, Shopping, and Performance Max campaigns targeting high-intent users actively searching for your solution.", icon: Search, highlight: "Best for immediate high-intent leads" },
              { title: "Meta Ads (FB/IG)", desc: "Hyper-targeted visual campaigns. We handle everything from UGC creative direction to complex retargeting funnels.", icon: Eye, highlight: "Best for D2C scaling & brand awareness" },
              { title: "LinkedIn Ads", desc: "Precision B2B targeting by job title, company size, and industry. Perfect for high-ticket SaaS and enterprise services.", icon: Target, highlight: "Best for premium B2B lead gen" }
            ].map((feature, i) => (
              <div key={i} className="animate-slide-bl flex flex-col bg-card border border-border/50 rounded-[2rem] overflow-hidden hover:border-primary/30 transition-colors group" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="p-8 flex-1">
                  <feature.icon className="w-10 h-10 text-primary mb-6" />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </div>
                <div className="bg-primary/10 px-8 py-4 text-xs font-bold text-primary border-t border-border/50">
                  {feature.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-secondary/30 border-y border-border/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Ad Management Pricing</h2>
          </div>
        </div>
        <PricingClient config={config} filterSectionId="ads" hideHeader />
      </section>

      {/* Related Services */}
      <RelatedServices currentSlug="advertisement" />

      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="animate-scale-up p-12 md:p-20 rounded-[3rem] bg-gradient-to-r from-primary via-orange-500 to-accent text-center shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 max-w-2xl mx-auto text-white">Ready to Scale Your Revenue?</h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
              Stop guessing with your ad budget. Let our media buyers craft a campaign that brings in high-quality, profitable leads.
            </p>
            <Link href="/contact">
              <button className="bg-white hover:bg-white/90 text-foreground font-bold px-10 py-5 rounded-full text-lg shadow-xl transition-all duration-300">
                Start Your Campaign
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
