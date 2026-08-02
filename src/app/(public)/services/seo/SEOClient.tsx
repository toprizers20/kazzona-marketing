"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, TrendingUp, Search, Target, Activity, Zap, MapPin, Globe2, IndianRupee } from "lucide-react";
import PricingClient from "@/app/(public)/pricing/PricingClient";
import SEOSearchAnimation from "./SEOSearchAnimation";
import RelatedServices from "@/components/RelatedServices";

interface SEOClientProps {
  config: any;
}

export default function SEOClient({ config }: SEOClientProps) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(249,115,22,0.08),transparent)] -z-10" />
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                <Globe2 className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-primary tracking-widest uppercase">Trusted by 100+ Indian Brands</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                Stop Paying For Clicks. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Own The Search.</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-lg">
                We engineer data-driven SEO campaigns that put your business in front of high-intent buyers. Turn Google into your most profitable acquisition channel.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 items-center">
                <Link href="/contact" className="w-full sm:w-auto">
                  <button className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-full text-lg shadow-lg shadow-primary/25 transition-all hover:-translate-y-1 w-full sm:w-auto flex items-center justify-center gap-2">
                    Get Your Free SEO Audit <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium px-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> ₹25,000 Value
                </div>
              </div>
            </div>

            {/* Animated Search Mockup */}
            <div className="relative flex justify-center items-center h-[400px] lg:h-[500px] animate-slide-right mt-12 lg:mt-0">
              <SEOSearchAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary/30 border-y border-border/50">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="text-center mb-16 max-w-3xl mx-auto animate-fade-down">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Winning the Search Landscape</h2>
            <p className="text-lg text-muted-foreground">If your business isn&apos;t visible when your clients search, your competitors are taking your revenue.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 animate-scale-up" style={{ animationDelay: "0.1s" }}>
            {[
              { metric: "68%", desc: "of all online experiences begin with a search engine.", icon: Search },
              { metric: "5x", desc: "higher conversion rate than paid ads for B2B companies.", icon: TrendingUp },
              { metric: "₹10Cr+", desc: "monthly pipeline generated via organic search.", icon: IndianRupee }
            ].map((item, i) => (
              <div key={i} className="bg-card p-8 rounded-[2rem] border border-border/50 text-center hover:border-primary/30 transition-colors group" style={{ animationDelay: `${i * 0.12}s` }}>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-4xl font-black mb-3">{item.metric}</div>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl animate-fade-down">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Comprehensive Strategies</h2>
              <p className="text-muted-foreground text-lg">We don&apos;t just build links; we engineer holistic organic growth engines.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Technical SEO", desc: "Core Web Vitals, site speed, crawlability, and architecture optimization.", icon: Activity },
              { title: "Content Strategy", desc: "Data-backed content that answers search intent and ranks for high-value keywords.", icon: Target },
              { title: "Digital PR", desc: "Earning high-authority backlinks from top publications and relevant websites.", icon: Zap },
              { title: "Local SEO", desc: "Dominating the near me searches. Perfect for multi-location retail and healthcare.", icon: MapPin }
            ].map((feature, i) => (
              <div key={i} className="animate-slide-bl p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-colors group" style={{ animationDelay: `${i * 0.08}s` }}>
                <feature.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Execution Process */}
      <section className="py-24 bg-secondary/30 border-y border-border/50">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-16 text-center">The 90-Day Sprint to Page 1</h2>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-border/50 -translate-y-1/2 hidden md:block" />
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "Month 1", title: "Audit & Foundation", desc: "We fix technical errors and map out the keyword strategy based on competitor gaps." },
                { step: "Month 2", title: "Content Expansion", desc: "Publishing intent-driven content and starting outreach for foundational backlinks." },
                { step: "Month 3", title: "Authority Scaling", desc: "Aggressive link building, digital PR, and CRO to turn new traffic into leads." }
              ].map((process, i) => (
                <div key={i} className="relative z-10 bg-card p-8 rounded-3xl border border-border/50 text-center mt-8 md:mt-0 pt-12 shadow-lg">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/30">
                    {i + 1}
                  </div>
                  <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{process.step}</div>
                  <h3 className="font-bold text-xl mb-3">{process.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{process.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Investment Plans</h2>
          </div>
        </div>
        <PricingClient config={config} filterSectionId="seo" hideHeader />
      </section>

      {/* Related Services */}
      <RelatedServices currentSlug="seo" />

      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <div className="rounded-[3rem] bg-gradient-to-r from-primary via-orange-500 to-accent p-16 md:p-24 text-center shadow-2xl animate-scale-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">Stop Leaving Money on the Table</h2>
            <p className="text-white/80 text-lg mb-10">Your competitors are capturing your potential clients right now. Get a comprehensive SEO audit and find out exactly how to beat them.</p>
            <Link href="/contact">
              <button className="bg-white hover:bg-white/90 text-foreground font-bold px-10 py-5 rounded-full text-lg shadow-2xl transition-transform hover:scale-105 flex items-center gap-2 mx-auto">
                Claim Your Free Audit <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
