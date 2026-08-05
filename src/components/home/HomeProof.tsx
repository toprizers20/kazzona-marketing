"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Shield, Users, Clock, IndianRupee, Star, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { buttonVariants } from "@/components/ui/button";
import { FadeIn } from "@/components/home/FadeIn";

const caseStudies = [
  { brand: "FreshKart", industry: "D2C E-Commerce", result: "312% increase in organic traffic in 6 months", service: "SEO + Ads", chartData: [20, 35, 30, 50, 45, 70, 85, 95], chartColor: "from-emerald-500 to-teal-600" },
  { brand: "CloudMinds", industry: "SaaS B2B", result: "₹4.2Cr pipeline generated from LinkedIn Ads", service: "Advertisement", chartData: [60, 45, 70, 55, 80, 65, 50, 75], chartColor: "from-blue-500 to-indigo-600" },
  { brand: "StyleHive", industry: "Fashion Retail", result: "2.8x ROAS with ₹18L/month ad spend", service: "PPC + Email", chartData: [30, 50, 40, 65, 55, 80, 70, 90], chartColor: "from-amber-500 to-orange-600" },
];

const testimonials = [
  { name: "Rajesh Sharma", role: "Founder, FreshKart", text: "Kazzona Marketing transformed our online presence completely. Our organic traffic went from 2,000 to 18,000 monthly visitors in just 6 months." },
  { name: "Priya Mehta", role: "CMO, CloudMinds", text: "Their LinkedIn ad strategy generated more qualified B2B leads in 3 months than our internal team did in an entire year." },
  { name: "Arjun Patel", role: "CEO, StyleHive", text: "The ROI we get from Kazzona is unbelievable. They manage our entire digital marketing stack and the results speak for themselves." },
  { name: "Neha Gupta", role: "Director, UrbanPulse", text: "We were struggling to scale our Google Ads profitably. Kazzona audited the account, restructured campaigns, and brought our CPA down by 40%." },
  { name: "Sameer Desai", role: "VP Marketing, TechNova", text: "The website Kazzona built for us isn't just beautiful; it's a lead generation machine. Conversion rates have doubled since launch." },
  { name: "Ananya Rao", role: "Founder, GreenLeaf", text: "I appreciate their transparency. Unlike other agencies, I know exactly where every rupee is going and what ROI it brings." },
  { name: "Vikram Singh", role: "Head of Growth, FinStack", text: "They truly act as an extension of our in-house team. The speed of execution and strategic insights are world-class." },
  { name: "Sneha Reddy", role: "Marketing Manager, MediCare+", text: "Our local SEO rankings shot up within 90 days. We now dominate search results for all our target clinics in Bangalore." },
  { name: "Kunal Bajaj", role: "E-commerce Head, LuxeWear", text: "The email automation flows they set up currently generate 25% of our total monthly revenue on autopilot." },
  { name: "Ritu Kapoor", role: "CEO, NextGen Interiors", text: "Highly professional and results-driven. They don't just chase metrics; they chase actual business growth." },
];

function WhyChooseUs() {
  return (
    <FadeIn>
      <section className="py-24 bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 uppercase tracking-wider">Why Kazzona</div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Your Premier <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Growth Partner</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                As a top digital marketing agency in Delhi, we understand the local and global digital ecosystem. Every strategy we build is designed specifically for your target audience to maximize conversions and ROI.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Shield, title: "Google Premier Partner", desc: "Certified expertise in Google Ads" },
                  { icon: Users, title: "50+ Member Team", desc: "Dedicated specialists in Noida" },
                  { icon: Clock, title: "Same-Day Reporting", desc: "Real-time dashboards for all clients" },
                  { icon: IndianRupee, title: "ROI-First Approach", desc: "Every rupee tracked, every campaign optimized" },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <f.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-sm">{f.title}</div>
                      <div className="text-xs text-muted-foreground">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "200+", label: "Clients Across India", color: "from-primary to-orange-600" },
                { number: "₹100Cr+", label: "Revenue Generated", color: "from-accent to-teal-500" },
                { number: "15+", label: "Industries Served", color: "from-amber-500 to-orange-600" },
                { number: "98%", label: "Client Retention Rate", color: "from-rose-500 to-pink-600" },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-3xl bg-card border border-border/50 text-center hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                  <div className={`text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>{stat.number}</div>
                  <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}

function CaseStudyHighlights() {
  return (
    <FadeIn>
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold mb-4 uppercase tracking-wider">Proven Results</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Real Results for Real Brands</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Don&apos;t take our word for it. Here are verified results from our recent campaigns.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <div key={i} className="bg-card border border-border/50 rounded-3xl p-0 overflow-hidden hover:border-primary/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 gradient-border flex flex-col">
                <div className="h-32 bg-secondary/30 relative flex items-end px-4 gap-2 border-b border-border/50 pt-8">
                  {cs.chartData.map((h, gi) => (
                    <div key={gi} className={`flex-1 bg-gradient-to-t ${cs.chartColor} opacity-80 rounded-t-sm group-hover:opacity-100 transition-all duration-500`} style={{ height: `${h}%` }} />
                  ))}
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold border border-border/50 uppercase tracking-wider text-primary">
                    {cs.service}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {cs.brand.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-lg">{cs.brand}</div>
                      <div className="text-xs text-muted-foreground">{cs.industry}</div>
                    </div>
                  </div>
                  <p className="text-foreground font-semibold text-xl mb-6 leading-snug flex-1">{cs.result}</p>
                  <div className="mt-auto">
                    <Link href="/case-studies" className="inline-flex items-center text-sm font-bold text-primary hover:text-accent transition-colors">
                      View Full Campaign <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/case-studies" className={buttonVariants({ variant: "outline", className: "rounded-full px-8" })}>
              View All Case Studies <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}

function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  return (
    <FadeIn direction="left">
      <section className="py-24 bg-card/30 border-y border-border/50 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full max-h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 uppercase tracking-wider">Client Love</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">What Our Partners Say</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We measure our success by the success of our clients. Here&apos;s what they think about working with Kazzona.</p>
          </div>
          <div className="relative max-w-7xl mx-auto">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-6">
                {testimonials.map((t, i) => (
                  <div key={i} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333333%] pl-6">
                    <div className="h-full bg-card/80 backdrop-blur-xl border border-border/60 rounded-3xl p-8 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 transition-all duration-300 relative group flex flex-col">
                      <div className="absolute top-6 right-8 text-6xl text-primary/10 font-serif leading-none group-hover:text-primary/20 transition-colors">&quot;</div>

                      <div className="flex gap-1 mb-6 relative z-10">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                      </div>

                      {i === 0 && (
                        <div className="w-full h-40 bg-secondary rounded-2xl mb-6 relative overflow-hidden group/video cursor-pointer border border-border/50 shrink-0">
                          <div className="absolute inset-0 bg-black/40 group-hover/video:bg-black/20 transition-colors z-10 flex items-center justify-center">
                            <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover/video:scale-110 transition-transform" />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                        </div>
                      )}

                      <p className="text-foreground/90 mb-8 leading-relaxed text-base relative z-10 font-medium flex-1">&quot;{t.text}&quot;</p>

                      <div className="flex items-center gap-4 pt-6 border-t border-border/50 relative z-10 mt-auto shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/20">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-foreground line-clamp-1">{t.name}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">{t.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => emblaApi?.scrollPrev()} className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg z-20">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => emblaApi?.scrollNext()} className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all shadow-lg z-20">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}

export function HomeProof() {
  return (
    <>
      <WhyChooseUs />
      <CaseStudyHighlights />
      <TestimonialsSection />
    </>
  );
}
