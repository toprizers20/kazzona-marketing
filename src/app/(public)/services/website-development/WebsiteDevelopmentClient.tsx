"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Code, LayoutTemplate, Smartphone, Gauge, Shield, Zap } from "lucide-react";
import WebDevAnimation from "../web-dev-animation";
import RelatedServices from "@/components/RelatedServices";

export default function WebsiteDevelopmentClient() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(249,115,22,0.08),transparent)] -z-10" />
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl animate-slide-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs font-bold text-primary tracking-widest uppercase">Premium Agency Grade</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight">
                Premium Websites <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Engineered For Growth.</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl">
                We design and develop high-ticket, futuristic web experiences that convert visitors into high-paying clients. Say goodbye to generic templates.
              </p>
              <div className="flex flex-wrap items-center gap-5 mb-16">
                <Link href="/contact">
                  <button className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-full text-lg shadow-lg shadow-primary/25 transition-all hover:-translate-y-1 flex items-center gap-2">
                    Book Free Consultation <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border/50">
                <div>
                  <div className="text-xl font-bold">250+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Clients</div>
                </div>
                <div>
                  <div className="text-xl font-bold">500+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Projects</div>
                </div>
                <div>
                  <div className="text-xl font-bold">98%</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Satisfaction</div>
                </div>
                <div>
                  <div className="text-xl font-bold">10+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Years</div>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center items-center h-[400px] lg:h-[500px] animate-slide-right mt-12 lg:mt-0">
              <WebDevAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-secondary/30 border-y border-border/50">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-down">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Our Core Services</h2>
            <p className="text-muted-foreground text-base">We deliver enterprise-grade digital solutions tailored to elevate your brand.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Code, title: "Website Development", desc: "Custom-coded, high-performance websites built with React and Next.js." },
              { icon: LayoutTemplate, title: "Ecommerce Development", desc: "Scalable storefronts engineered to maximize your conversion rates." },
              { icon: Smartphone, title: "Custom Web Apps", desc: "Complex SaaS platforms and web applications tailored to your business." },
              { icon: Zap, title: "Landing Pages", desc: "Conversion-focused landing pages designed for high-ticket offers." },
              { icon: Gauge, title: "Website Redesign", desc: "Modernize your outdated website with our premium UI/UX overhaul." },
              { icon: Shield, title: "Maintenance & Support", desc: "24/7 security monitoring, updates, and dedicated technical support." }
            ].map((srv, i) => (
              <div key={i} className="animate-slide-br p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-colors group" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <srv.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-3">{srv.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-16 text-center animate-fade-down">Our Execution Framework</h2>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-border/50 -translate-y-1/2 hidden md:block" />
            <div className="grid md:grid-cols-5 gap-8">
              {["Discovery", "Strategy", "Design", "Development", "Launch"].map((step, i) => (
                <div key={i} className="animate-fade-up relative z-10 flex flex-col items-center" style={{ animationDelay: `${i * 0.12}s` }}>
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mb-4 shadow-lg shadow-primary/30">
                    0{i + 1}
                  </div>
                  <h3 className="font-bold text-base">{step}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-secondary/30 border-y border-border/50">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="bg-card rounded-[3rem] border border-border/50 p-12 lg:p-20 shadow-lg">
            <div className="grid lg:grid-cols-2 gap-16 items-center animate-fade-down">
              <div className="animate-slide-left" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">The difference between a website and a <span className="text-primary">Sales Engine.</span></h2>
                <p className="text-muted-foreground text-base mb-8">We don&apos;t just write code; we engineer user journeys that maximize conversions.</p>
                <div className="space-y-6 animate-slide-right" style={{ animationDelay: '0.15s' }}>
                  <div className="flex items-center gap-4 border-b border-border/50 pb-6">
                    <div className="text-3xl font-black text-primary">+350%</div>
                    <div className="font-medium">Increase in Qualified Leads</div>
                  </div>
                  <div className="flex items-center gap-4 border-b border-border/50 pb-6">
                    <div className="text-3xl font-black text-accent">+210%</div>
                    <div className="font-medium">Boost in Conversion Rate</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-black text-primary">+180%</div>
                    <div className="font-medium">Overall Revenue Growth</div>
                  </div>
                </div>
              </div>
              <div className="relative aspect-square rounded-2xl bg-secondary/30 border border-border/50 flex items-center justify-center p-8">
                <div className="w-full h-full flex items-end justify-between gap-4">
                  {[20, 35, 50, 40, 70, 85, 100].map((h, i) => (
                    <div key={i} className="w-full bg-gradient-to-t from-primary to-accent rounded-t-md opacity-80" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <RelatedServices currentSlug="website-development" />

      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <div className="animate-fade-up rounded-[3rem] bg-gradient-to-r from-primary via-orange-500 to-accent p-16 md:p-24 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">Ready To Build Your Dream Website?</h2>
            <p className="text-white/80 text-lg mb-10">Stop losing clients to competitors with better websites. Elevate your brand today.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <button className="bg-white hover:bg-white/90 text-foreground font-bold px-10 py-5 rounded-full text-lg shadow-2xl transition-transform hover:scale-105">
                  Book Free Consultation
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
