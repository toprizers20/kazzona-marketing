"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, BarChart, Code, Megaphone, Mail, PenTool, CheckCircle2, Zap, Users, TrendingUp, Star, Shield, Clock, IndianRupee, ArrowUpRight, HelpCircle, PlayCircle, ChevronLeft, ChevronRight, Target, Rocket, BarChart3, Search } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { buttonVariants } from "@/components/ui/button";
import VideoTestimonials from "@/components/VideoTestimonials";

const services = [
  {
    title: "SEO Optimization",
    description: "Rank #1 on Google India. We've helped 200+ Indian brands dominate organic search and generate ₹50Cr+ in organic revenue.",
    icon: BarChart,
    href: "/services/seo",
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-100",
    iconColor: "#059669",
    stat: "300% Avg Traffic Growth",
  },
  {
    title: "Website Development",
    description: "Lightning-fast, conversion-optimized websites built on React & Next.js. From D2C stores to enterprise platforms.",
    icon: Code,
    href: "/services/website-development",
    gradient: "from-blue-500 to-indigo-600",
    bg: "bg-blue-100",
    iconColor: "#2563eb",
    stat: "< 1s Load Times",
  },
  {
    title: "Performance Advertising",
    description: "Google Ads, Meta Ads, and LinkedIn campaigns with guaranteed ROAS. We manage ₹2Cr+ in monthly ad spend.",
    icon: Megaphone,
    href: "/services/advertisement",
    gradient: "from-amber-500 to-orange-600",
    bg: "bg-amber-100",
    iconColor: "#d97706",
    stat: "4.5x Avg ROAS",
  },
  {
    title: "Email Marketing",
    description: "Automated drip campaigns, cart recovery flows, and newsletter strategies that drive 30%+ of your total revenue.",
    icon: Mail,
    href: "/services/email-marketing",
    gradient: "from-purple-500 to-fuchsia-600",
    bg: "bg-purple-100",
    iconColor: "#9333ea",
    stat: "4400% ROI",
  },
  {
    title: "Graphic Designing",
    description: "Premium brand identities, UI/UX design, and ad creatives that make your business look like a Fortune 500 company.",
    icon: PenTool,
    href: "/services/graphic-designing",
    gradient: "from-rose-500 to-pink-600",
    bg: "bg-rose-100",
    iconColor: "#e11d48",
    stat: "100% Custom Design",
  },
];

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

function FadeIn({ children, delay = 0, className = "", direction = "up" }: { children: React.ReactNode; delay?: number; className?: string; direction?: "up" | "left" | "right" | "scale" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const variants = {
    up: { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
  };
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomeClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  return (
    <div className="flex flex-col">
      {/* SECTION 1: Hero */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(252,74,26,0.15),transparent)]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary mb-6">
                <Zap className="w-4 h-4" /> Best Digital Marketing Agency in Delhi NCR
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                <span className="block">We Help Brands Scale Revenue</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                  Digitally
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                From Delhi startups to global enterprises — we've generated <strong className="text-foreground">₹100Cr+ in revenue</strong> for businesses through SEO, performance marketing, and premium web development.
              </p>
              <div className="mt-8">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const input = form.elements[0] as HTMLInputElement;
                    const url = encodeURIComponent(input.value);
                    window.location.href = `/contact?audit=true&url=${url}`;
                  }}
                  className="flex flex-col sm:flex-row gap-3 max-w-2xl relative"
                >
                  <div className="relative flex-1 min-w-0">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <input
                      type="url"
                      placeholder="Enter your website URL"
                      required
                      className="w-full bg-secondary border border-primary/30 text-foreground text-base rounded-full pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary backdrop-blur-sm transition-all placeholder:text-muted-foreground placeholder:opacity-100"
                    />
                  </div>
                  <button
                    type="submit"
                    className="shrink-0 flex items-center justify-center rounded-full px-6 py-4 text-base font-bold shadow-xl shadow-primary/25 bg-gradient-to-r from-primary to-orange-500 text-white hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 whitespace-nowrap"
                  >
                    Analyze My Website <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </form>
                <p className="text-sm text-muted-foreground mt-3 ml-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free 25-point SEO & Performance Audit
                </p>
              </div>
              <div className="flex items-center gap-8 mt-10 pt-8 border-t border-border/50">
                <div>
                  <div className="text-3xl font-black text-primary">200+</div>
                  <div className="text-sm text-muted-foreground">Clients Served</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-accent">₹100Cr+</div>
                  <div className="text-sm text-muted-foreground">Revenue Generated</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-primary">4.9/5</div>
                  <div className="text-sm text-muted-foreground">Google Rating</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative aspect-[4/3] rounded-[3rem] bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-border/50 overflow-hidden p-8">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
                <div className="relative z-10 h-full flex flex-col gap-3">
                  <div className="flex gap-3">
                    <div className="flex-1 rounded-2xl bg-card/80 backdrop-blur border border-border/50 p-4">
                      <TrendingUp className="w-6 h-6 text-emerald-500 mb-2" />
                      <div className="text-xl lg:text-2xl font-bold">+312%</div>
                      <div className="text-[10px] lg:text-xs text-muted-foreground">Organic Traffic</div>
                    </div>
                    <div className="flex-1 rounded-2xl bg-card/80 backdrop-blur border border-border/50 p-4">
                      <IndianRupee className="w-6 h-6 text-amber-500 mb-2" />
                      <div className="text-xl lg:text-2xl font-bold">₹4.2Cr</div>
                      <div className="text-[10px] lg:text-xs text-muted-foreground">Pipeline Generated</div>
                    </div>
                  </div>
                  <div className="flex-1 rounded-2xl bg-card/80 backdrop-blur border border-border/50 p-4 flex flex-col justify-end">
                    <div className="flex items-end gap-2 h-16 lg:h-20">
                      {[30, 45, 38, 55, 42, 68, 60, 78, 72, 90, 85, 95].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t-sm transition-all" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                    <div className="text-[10px] lg:text-xs text-muted-foreground mt-2">Monthly Growth — Last 12 Months</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1 rounded-2xl bg-white border border-border/50 p-3 flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <div className="text-sm font-bold leading-tight">1,240</div>
                        <div className="text-[10px] text-muted-foreground leading-tight">Leads This Month</div>
                      </div>
                    </div>
                    <div className="flex-1 rounded-2xl bg-white border border-border/50 p-3 flex items-center gap-2">
                      <BarChart className="w-5 h-5 text-accent shrink-0" />
                      <div>
                        <div className="text-sm font-bold leading-tight">4.5x</div>
                        <div className="text-[10px] text-muted-foreground leading-tight">ROAS</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1.5: Trust Badges (EEAT) */}
      <FadeIn>
      <section className="py-8 bg-card border-y border-border/50 flex flex-wrap justify-center items-center gap-8 md:gap-14 px-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <Image key={n} src={`/images/${n}.png`} alt={`Partner ${n}`} width={96} height={96} quality={100} unoptimized style={{ width: "auto" }} className="h-20 md:h-24 rounded-xl bg-white p-2" />
        ))}
      </section>
      </FadeIn>

      {/* SECTION 2: Enterprise Logos — Driving Growth for India's Top Enterprises */}
      <section className="py-16 bg-gradient-to-b from-orange-50/60 to-white border-b border-border/50">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">Trusted by India&apos;s Leading Enterprises</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Driving Growth for India&apos;s Top Enterprises</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto mb-10">We partner with industry leaders to build impactful digital solutions.</p>

          {/* 2 Row Grid — 11 logos */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4 max-w-4xl mx-auto">
            {[7,8,9,10,11,12].map((n) => (
              <div key={n} className="flex items-center justify-center h-16 md:h-24 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow px-2 md:px-4">
                <Image src={`/images/${n}.png`} alt={`Enterprise ${n}`} width={120} height={60} quality={100} unoptimized style={{ width: "auto", maxHeight: "40px" }} className="object-contain" />
              </div>
            ))}
            {[13,14,15,16,17].map((n) => (
              <div key={n} className="flex items-center justify-center h-16 md:h-24 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow px-2 md:px-4">
                <Image src={`/images/${n}.png`} alt={`Enterprise ${n}`} width={120} height={60} quality={100} unoptimized style={{ width: "auto", maxHeight: "40px" }} className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: 200+ Brands — Infinite Alternate Marquee */}
      <section className="py-16 bg-[#FFF8F0] border-b border-orange-100 overflow-hidden relative">
        <div className="container mx-auto px-6 max-w-7xl text-center mb-10">
          <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">Trusted by 200+ brands across industries</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Powering Growth for 200+ Amazing Brands</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">From emerging startups to established brands, we help businesses grow digitally.</p>
        </div>

        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#FFF8F0] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#FFF8F0] to-transparent z-10 pointer-events-none" />

          {/* Row 1: Left */}
          <div className="flex overflow-hidden mb-8">
            <div className="flex min-w-full shrink-0 items-center animate-marquee">
              {[9,10,11,12,13,14,15,16,17].map((n) => (
                <div key={n} className="shrink-0 flex items-center justify-center px-6 md:px-10">
                  <Image src={`/clients/${n}.jpg`} alt={`Brand ${n}`} width={180} height={90} quality={100} unoptimized style={{ width: "auto", maxHeight: "72px" }} className="object-contain" />
                </div>
              ))}
            </div>
            <div className="flex min-w-full shrink-0 items-center animate-marquee" aria-hidden>
              {[9,10,11,12,13,14,15,16,17].map((n) => (
                <div key={n} className="shrink-0 flex items-center justify-center px-6 md:px-10">
                  <Image src={`/clients/${n}.jpg`} alt={`Brand ${n}`} width={180} height={90} quality={100} unoptimized style={{ width: "auto", maxHeight: "72px" }} className="object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Right (reverse) */}
          <div className="flex overflow-hidden mb-8">
            <div className="flex min-w-full shrink-0 items-center animate-marquee-reverse">
              {[18,19,20,21,22,23,24,25,26].map((n) => (
                <div key={n} className="shrink-0 flex items-center justify-center px-6 md:px-10">
                  <Image src={`/clients/${n}.jpg`} alt={`Brand ${n}`} width={180} height={90} quality={100} unoptimized style={{ width: "auto", maxHeight: "72px" }} className="object-contain" />
                </div>
              ))}
            </div>
            <div className="flex min-w-full shrink-0 items-center animate-marquee-reverse" aria-hidden>
              {[18,19,20,21,22,23,24,25,26].map((n) => (
                <div key={n} className="shrink-0 flex items-center justify-center px-6 md:px-10">
                  <Image src={`/clients/${n}.jpg`} alt={`Brand ${n}`} width={180} height={90} quality={100} unoptimized style={{ width: "auto", maxHeight: "72px" }} className="object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Row 3: Left */}
          <div className="flex overflow-hidden">
            <div className="flex min-w-full shrink-0 items-center animate-marquee">
              {[27,28,29,30,31,9,10,11,12].map((n) => (
                <div key={n} className="shrink-0 flex items-center justify-center px-6 md:px-10">
                  <Image src={`/clients/${n}.jpg`} alt={`Brand ${n}`} width={180} height={90} quality={100} unoptimized style={{ width: "auto", maxHeight: "72px" }} className="object-contain" />
                </div>
              ))}
            </div>
            <div className="flex min-w-full shrink-0 items-center animate-marquee" aria-hidden>
              {[27,28,29,30,31,9,10,11,12].map((n) => (
                <div key={n} className="shrink-0 flex items-center justify-center px-6 md:px-10">
                  <Image src={`/clients/${n}.jpg`} alt={`Brand ${n}`} width={180} height={90} quality={100} unoptimized style={{ width: "auto", maxHeight: "72px" }} className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Services — Unique Cards */}
      <FadeIn>
      <section className="py-24 relative bg-background overflow-hidden">
        {/* Background wave effects */}
        <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-orange-500/15 to-transparent" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-orange-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-orange-500/10 blur-[120px] rounded-full" />
        {/* Decorative dots left */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:grid grid-cols-4 gap-3 opacity-20">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-orange-400" />
          ))}
        </div>
        {/* Decorative dots right */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:grid grid-cols-4 gap-3 opacity-20">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-orange-400" />
          ))}
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold mb-6 uppercase tracking-wider">
              <Zap className="w-4 h-4" /> Our Services
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Performance-Driven Services<br />That <span className="text-primary">Grow Your Business</span></h2>
            <p className="text-muted-foreground text-lg">Every service we offer is designed with one goal in mind: maximizing your revenue and dominating the digital landscape.</p>
          </div>

          {/* Top row: 3 cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {services.slice(0, 3).map((service) => (
              <Link key={service.title} href={service.href} className="group relative bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 block overflow-hidden">
                {/* Top gradient */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${service.gradient}`} />
                <div className="flex items-start gap-5">
                  <div className={`w-16 h-16 rounded-2xl ${service.bg} flex items-center justify-center shrink-0`}>
                    <service.icon className="w-8 h-8" style={{ color: service.iconColor }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r ${service.gradient} text-white`}>{service.stat}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Learn More <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom row: 2 cards centered */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.slice(3, 5).map((service) => (
              <Link key={service.title} href={service.href} className="group relative bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 block overflow-hidden">
                {/* Top gradient */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${service.gradient}`} />
                <div className="flex items-start gap-5">
                  <div className={`w-16 h-16 rounded-2xl ${service.bg} flex items-center justify-center shrink-0`}>
                    <service.icon className="w-8 h-8" style={{ color: service.iconColor }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r ${service.gradient} text-white`}>{service.stat}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Learn More <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>
      </FadeIn>

      {/* SECTION 3.5: Built by Marketers */}
      <FadeIn delay={0.1}>
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="relative bg-gradient-to-br from-[#FFF8F0] to-[#FFF1E6] rounded-[2.5rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 overflow-hidden shadow-[0_8px_40px_rgba(249,115,22,0.08)] border border-orange-100">

            {/* Dot grid pattern - top left */}
            <div className="absolute top-8 left-8 grid grid-cols-4 gap-2.5 opacity-30">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-orange-300" />
              ))}
            </div>

            {/* Left: Logo Orb Animation */}
            <div className="relative w-full lg:w-[420px] h-[420px] shrink-0 flex items-center justify-center">

              {/* Outer ring */}
              <div className="absolute w-[380px] h-[380px] rounded-full border border-orange-200/60" />

              {/* Inner orbit path (dashed) */}
              <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-orange-300/40" />

              {/* Main K Logo */}
              <div className="relative z-10 w-[180px] h-[180px] rounded-full bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center shadow-[0_8px_32px_rgba(249,115,22,0.35)]">
                <span className="text-white text-7xl font-black tracking-tight">K</span>
              </div>

              {/* Inner orbit - 2 icons (BarChart, Users) */}
              <div className="absolute w-[280px] h-[280px] animate-orbit">
                {/* Top */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 animate-counter-spin">
                  <div className="w-12 h-12 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center justify-center border border-orange-100">
                    <BarChart3 className="w-5 h-5 text-[#F97316]" />
                  </div>
                </div>
                {/* Bottom */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 animate-counter-spin">
                  <div className="w-12 h-12 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center justify-center border border-orange-100">
                    <Users className="w-5 h-5 text-[#F97316]" />
                  </div>
                </div>
              </div>

              {/* Outer orbit - 2 icons (Target, Rocket) */}
              <div className="absolute w-[380px] h-[380px] animate-orbit-reverse">
                {/* Right */}
                <div className="absolute top-1/2 -right-2 -translate-y-1/2 animate-counter-spin-reverse">
                  <div className="w-12 h-12 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center justify-center border border-orange-100">
                    <Target className="w-5 h-5 text-[#F97316]" />
                  </div>
                </div>
                {/* Left */}
                <div className="absolute top-1/2 -left-2 -translate-y-1/2 animate-counter-spin-reverse">
                  <div className="w-12 h-12 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center justify-center border border-orange-100">
                    <Rocket className="w-5 h-5 text-[#F97316]" />
                  </div>
                </div>
              </div>

              {/* Static dots */}
              <div className="absolute w-[280px] h-[280px]">
                <div className="absolute top-[15px] left-[60px] w-2 h-2 rounded-full bg-orange-300/50" />
                <div className="absolute bottom-[15px] right-[60px] w-2 h-2 rounded-full bg-orange-300/50" />
              </div>
            </div>

            {/* Right: Content */}
            <div className="flex-1 space-y-6 relative z-10">

              {/* Quote mark */}
              <div className="text-orange-200 text-7xl font-serif leading-none -mb-4">&ldquo;</div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider">
                Built by Marketers
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-[2.6rem] font-bold font-heading leading-[1.2] text-gray-900">
                We don&apos;t just run campaigns.<br />
                We build <span className="text-[#F97316]">revenue engines.</span>
              </h2>

              {/* Orange divider */}
              <div className="w-16 h-1 rounded-full bg-[#F97316]" />

              {/* Paragraph */}
              <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                After spending years seeing agencies promise the world and deliver nothing but vanity metrics, we built Kazzona Marketing with a single mission: To tie every single marketing activity directly to your pipeline and revenue. No fluff, just scalable growth.
              </p>

              {/* Author card */}
              <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-orange-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center shadow-md">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Kazzona Leadership</div>
                  <div className="text-sm text-[#F97316] font-semibold">Scaling Indian Businesses Since 2016</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      </FadeIn>

      {/* SECTION 4: Why Choose Us — Indian Market Focus */}
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

      {/* SECTION 5: Case Study Highlights */}
      <FadeIn>
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold mb-4 uppercase tracking-wider">Proven Results</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Real Results for Real Brands</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Don't take our word for it. Here are verified results from our recent campaigns.</p>
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

      {/* SECTION 6: Testimonials */}
      <FadeIn direction="left">
      <section className="py-24 bg-card/30 border-y border-border/50 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full max-h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 uppercase tracking-wider">Client Love</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">What Our Partners Say</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We measure our success by the success of our clients. Here's what they think about working with Kazzona.</p>
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

      {/* SECTION 6B: Video Testimonials */}
      <VideoTestimonials />

      {/* SECTION 7: Process */}
      <FadeIn direction="scale">
      <section className="py-24 bg-[#FFFAF5] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#F97316]/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-6 right-8 grid grid-cols-5 gap-2 opacity-25">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
          ))}
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold mb-5 uppercase tracking-wider">Our Process</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5 text-gray-900">From Strategy to Scale<br /><span className="text-[#F97316]">in 4 Simple Steps</span></h2>
            <div className="w-12 h-1 rounded-full bg-[#F97316] mx-auto mb-5" />
            <p className="text-gray-500 text-lg">A proven process. Measurable results.<br />We turn insights into impact and strategies into sustainable growth.</p>
          </div>

          {/* Desktop: 4 columns */}
          <div className="hidden md:block relative">
            {/* Line */}
            <div className="absolute z-0" style={{ top: "85px", left: "60px", right: "60px", height: "2px", background: "#E5E7EB" }}>
              <div className="absolute -right-1.5 -top-[4px] w-3 h-3 rounded-full bg-[#F97316]" />
            </div>

            <div className="grid grid-cols-4 gap-4 relative z-10">
              {[
                { step: "01", title: "Discovery", desc: "We audit your current digital presence and understand your business goals.", icon: Search, fill: "107 251" },
                { step: "02", title: "Strategy", desc: "Custom roadmap built specifically for your target market audience.", icon: Target, fill: "179 179" },
                { step: "03", title: "Execute", desc: "Our 50+ member team implements the strategy across all channels.", icon: Zap, fill: "251 107" },
                { step: "04", title: "Scale", desc: "We optimize, scale winning campaigns, and double down on ROI.", icon: Rocket, fill: "358 0" },
              ].map((p, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  {/* Circle icon */}
                  <div className="w-[120px] h-[120px] rounded-full bg-white shadow-[0_2px_24px_rgba(0,0,0,0.07)] flex items-center justify-center relative mb-5">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="57" fill="none" stroke="#F0E6DA" strokeWidth="2" />
                      <circle cx="60" cy="60" r="57" fill="none" stroke="#F97316" strokeWidth="3" strokeDasharray={p.fill} strokeLinecap="round" transform="rotate(-50 60 60)" />
                    </svg>
                    <p.icon className="w-11 h-11 text-gray-800" strokeWidth={1.3} />
                  </div>
                  {/* Number badge */}
                  <div className="w-10 h-10 rounded-full bg-[#F97316] text-white text-xs font-bold flex items-center justify-center shadow-md mb-4">{p.step}</div>
                  {/* Text */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{p.title}</h3>
                  <div className="w-8 h-0.5 bg-[#F97316] rounded-full mx-auto mb-3" />
                  <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: stacked */}
          <div className="md:hidden space-y-10">
            {[
              { step: "01", title: "Discovery", desc: "We audit your current digital presence and understand your business goals.", icon: Search, fill: "70 160" },
              { step: "02", title: "Strategy", desc: "Custom roadmap built specifically for your target market audience.", icon: Target, fill: "117 117" },
              { step: "03", title: "Execute", desc: "Our 50+ member team implements the strategy across all channels.", icon: Zap, fill: "164 70" },
              { step: "04", title: "Scale", desc: "We optimize, scale winning campaigns, and double down on ROI.", icon: Rocket, fill: "232 0" },
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-5">
                <div className="shrink-0">
                  <div className="w-[80px] h-[80px] rounded-full bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)] flex items-center justify-center relative">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="37" fill="none" stroke="#F0E6DA" strokeWidth="2" />
                      <circle cx="40" cy="40" r="37" fill="none" stroke="#F97316" strokeWidth="2.5" strokeDasharray={p.fill} strokeLinecap="round" transform="rotate(-50 40 40)" />
                    </svg>
                    <p.icon className="w-8 h-8 text-gray-800" strokeWidth={1.3} />
                  </div>
                </div>
                <div className="text-left pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#F97316] text-white text-xs font-bold flex items-center justify-center">{p.step}</div>
                    <h3 className="text-lg font-bold text-gray-900">{p.title}</h3>
                  </div>
                  <div className="w-8 h-0.5 bg-[#F97316] rounded-full mb-2" />
                  <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      {/* SECTION 7.5: FAQ (SGE Optimized) */}
      <FadeIn>
      <section className="py-24 bg-card/30 border-t border-border/50">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">Everything you need to know about working with Kazzona.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: "What makes Kazzona different from other marketing agencies in India?", a: "Unlike traditional agencies that focus on vanity metrics like impressions and clicks, we operate as a growth partner. We tie every marketing activity directly to your pipeline and revenue generation. We guarantee transparent reporting and a focus on ROAS." },
              { q: "How long does it take to see results?", a: "For Paid Ads (Google/Meta), we typically launch campaigns within 7 days and you can see initial lead flow immediately. For SEO and organic growth, significant compounding results usually take 3 to 6 months depending on the competitive landscape." },
              { q: "Do you offer custom pricing packages?", a: "Yes. Every business is unique. While we have standard guidelines, we conduct a thorough discovery call to audit your current digital presence and propose a custom pricing structure based on your specific growth targets." },
              { q: "Who will be managing my account?", a: "You will be assigned a dedicated Account Manager along with a team of specialists (SEO experts, Ad buyers, designers) based out of our Delhi NCR office. You will have a direct communication channel via Slack/WhatsApp." }
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card border border-border/50 hover:border-emerald-500/30 transition-colors">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between font-bold text-lg cursor-pointer outline-none text-left">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-6 h-6 text-primary shrink-0" />
                    {faq.q}
                  </span>
                  <span className={`transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </button>
                {openFaq === i && (
                  <p className="text-muted-foreground pl-9 leading-relaxed mt-4 animate-in slide-in-from-top-2 fade-in-0 duration-300">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      {/* SECTION 8: Final CTA */}
      <FadeIn direction="scale">
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-gradient-to-r from-primary via-orange-500 to-accent rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
              Ready to 10x Your Digital Growth?
            </h2>
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto relative z-10">
              Join 200+ brands that trust Kazzona Marketing for their digital marketing. Get a free strategy session worth ₹25,000 — no strings attached.
            </p>
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className={buttonVariants({ variant: "secondary", size: "lg", className: "rounded-full font-bold px-10 text-lg hover:scale-105 transition-transform" })}>
                Book Free Strategy Call
              </Link>
              <Link href="/services" className="text-white/90 hover:text-white font-semibold underline underline-offset-4">
                Explore Our Services →
              </Link>
            </div>
          </div>
        </div>
      </section>
      </FadeIn>
    </div>
  );
}
