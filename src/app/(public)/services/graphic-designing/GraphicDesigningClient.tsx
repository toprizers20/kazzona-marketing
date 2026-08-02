"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Palette, PenTool, Layout, Image as ImageIcon, Briefcase, Zap, MousePointer2 } from "lucide-react";
import PricingClient from "@/app/(public)/pricing/PricingClient";
import DesignStudioAnimation from "../design-studio-animation";
import RelatedServices from "@/components/RelatedServices";

interface GraphicDesigningClientProps {
  config: any;
}

export default function GraphicDesigningClient({ config }: GraphicDesigningClientProps) {
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
                <Palette className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-primary tracking-widest uppercase">Premium Design Studio</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                Design That <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Commands Attention.</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-lg">
                In a crowded market, ugly design costs you money. We craft enterprise-grade branding, UI/UX, and ad creatives that position Indian startups as global leaders.
              </p>
              <Link href="/portfolio">
                <button className="bg-primary hover:bg-primary/90 text-white font-bold px-10 py-5 rounded-full text-lg shadow-lg shadow-primary/25 transition-all hover:-translate-y-1 flex items-center gap-2">
                  View Our Portfolio <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>

            {/* Right: Animation */}
            <div className="relative flex justify-center items-center animate-slide-right mt-12 lg:mt-0">
              <DesignStudioAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-secondary/30 border-y border-border/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 uppercase tracking-wider">The Agency Difference</div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">Ugly Design Costs You Money.</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                You can have the best product in the world, but if your website looks like it was built in 2012, or your ads look like cheap stock photos, the Indian consumer will not trust you.
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                We bridge the gap between aesthetics and performance. Every pixel we push is designed not just to look beautiful, but to drive conversions, reduce bounce rates, and elevate your perceived value.
              </p>
              <ul className="space-y-4">
                {[
                  "Position your brand to charge premium prices",
                  "Increase ad CTRs with scroll-stopping creatives",
                  "Build instant trust with a cohesive visual identity"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 bg-card p-4 rounded-xl border border-border/50">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="animate-slide-right bg-card p-8 rounded-3xl border border-border/50 text-center shadow-lg">
                <div className="text-4xl font-black mb-2">300%</div>
                <div className="text-sm text-muted-foreground">Increase in Ad CTRs</div>
              </div>
              <div className="animate-slide-right bg-primary/10 p-8 rounded-3xl border border-primary/20 text-center flex flex-col justify-center shadow-lg">
                <div className="text-4xl font-black text-primary mb-2">#1</div>
                <div className="text-sm font-bold text-primary">Brand Perception</div>
              </div>
              <div className="animate-slide-right col-span-2 bg-card p-8 rounded-3xl border border-border/50 flex items-center justify-between">
                <div className="font-bold text-xl">We Design for Conversion.</div>
                <MousePointer2 className="w-10 h-10 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 max-w-3xl mx-auto animate-fade-down">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Our Design Capabilities</h2>
            <p className="text-lg text-muted-foreground">A full-stack design studio at your fingertips, without the overhead of hiring an in-house team.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Brand Identity", desc: "Logos, color palettes, typography, and comprehensive brand guidelines.", icon: Briefcase },
              { title: "UI/UX Design", desc: "Figma prototypes, web app interfaces, and high-converting landing pages.", icon: Layout },
              { title: "Performance Creatives", desc: "Static ads, carousel designs, and thumbnails engineered for high CTR.", icon: Zap },
              { title: "Social Media Kits", desc: "Cohesive grid designs, story templates, and post creatives.", icon: ImageIcon },
              { title: "Print & Packaging", desc: "Premium unboxing experiences, brochures, and offline marketing materials.", icon: Palette },
              { title: "Custom Illustrations", desc: "Bespoke vector graphics and iconography unique to your brand.", icon: PenTool }
            ].map((feature, i) => (
              <div key={i} style={{ animationDelay: `${i * 0.12}s` }} className="animate-slide-bl p-8 rounded-[2rem] bg-card border border-border/50 hover:border-primary/30 transition-colors group">
                <feature.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-secondary/30 border-y border-border/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Unlimited Design Subscriptions</h2>
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 mb-6">
              <p className="text-primary font-semibold text-lg">
                Pause or cancel anytime. No hidden fees. Get your designs delivered in days, not weeks.
              </p>
            </div>
          </div>
        </div>
        <PricingClient config={config} filterSectionId="design" hideHeader />
      </section>

      {/* Related Services */}
      <RelatedServices currentSlug="graphic-designing" />

      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="animate-scale-up p-12 md:p-24 rounded-[3rem] bg-gradient-to-r from-primary via-orange-500 to-accent text-center shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 max-w-2xl mx-auto text-white">Ready to Elevate Your Brand?</h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
              Stop settling for mediocre design. Partner with Kazzona and make your brand unforgettable.
            </p>
            <Link href="/contact">
              <button className="bg-white hover:bg-white/90 text-foreground font-bold px-10 py-5 rounded-full text-lg shadow-xl transition-all duration-300">
                Start Your Design Project
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
