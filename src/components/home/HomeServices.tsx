"use client";

import Link from "next/link";
import { ArrowUpRight, Zap, BarChart, Code, Megaphone, Mail, PenTool } from "lucide-react";
import { FadeIn } from "@/components/home/FadeIn";

const services = [
  { title: "SEO Optimization", description: "Rank #1 on Google India. We've helped 200+ Indian brands dominate organic search and generate ₹50Cr+ in organic revenue.", icon: BarChart, href: "/services/seo", gradient: "from-emerald-500 to-teal-600", bg: "bg-emerald-100", iconColor: "#059669", stat: "300% Avg Traffic Growth" },
  { title: "Website Development", description: "Lightning-fast, conversion-optimized websites built on React & Next.js. From D2C stores to enterprise platforms.", icon: Code, href: "/services/website-development", gradient: "from-blue-500 to-indigo-600", bg: "bg-blue-100", iconColor: "#2563eb", stat: "< 1s Load Times" },
  { title: "Performance Advertising", description: "Google Ads, Meta Ads, and LinkedIn campaigns with guaranteed ROAS. We manage ₹2Cr+ in monthly ad spend.", icon: Megaphone, href: "/services/advertisement", gradient: "from-amber-500 to-orange-600", bg: "bg-amber-100", iconColor: "#d97706", stat: "4.5x Avg ROAS" },
  { title: "Email Marketing", description: "Automated drip campaigns, cart recovery flows, and newsletter strategies that drive 30%+ of your total revenue.", icon: Mail, href: "/services/email-marketing", gradient: "from-purple-500 to-fuchsia-600", bg: "bg-purple-100", iconColor: "#9333ea", stat: "4400% ROI" },
  { title: "Graphic Designing", description: "Premium brand identities, UI/UX design, and ad creatives that make your business look like a Fortune 500 company.", icon: PenTool, href: "/services/graphic-designing", gradient: "from-rose-500 to-pink-600", bg: "bg-rose-100", iconColor: "#e11d48", stat: "100% Custom Design" },
];

function ServiceCard({ service }: { service: typeof services[0] }) {
  return (
    <Link href={service.href} className="group relative bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 block overflow-hidden">
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
  );
}

export function HomeServices() {
  return (
    <>
      <FadeIn>
        <section className="py-24 relative bg-background overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-orange-500/15 to-transparent" />
          <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-orange-500/10 blur-[120px] rounded-full" />
          <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-orange-500/10 blur-[120px] rounded-full" />
          <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:grid grid-cols-4 gap-3 opacity-20">
            {[...Array(16)].map((_, i) => (<div key={i} className="w-1.5 h-1.5 rounded-full bg-orange-400" />))}
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:grid grid-cols-4 gap-3 opacity-20">
            {[...Array(16)].map((_, i) => (<div key={i} className="w-1.5 h-1.5 rounded-full bg-orange-400" />))}
          </div>

          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold mb-6 uppercase tracking-wider">
                <Zap className="w-4 h-4" /> Our Services
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Performance-Driven Services<br />That <span className="text-primary">Grow Your Business</span></h2>
              <p className="text-muted-foreground text-lg">Every service we offer is designed with one goal in mind: maximizing your revenue and dominating the digital landscape.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {services.slice(0, 3).map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {services.slice(3, 5).map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.1}>
        <section className="py-24">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="relative bg-gradient-to-br from-[#FFF8F0] to-[#FFF1E6] rounded-[2.5rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 overflow-hidden shadow-[0_8px_40px_rgba(249,115,22,0.08)] border border-orange-100">
              <div className="absolute top-8 left-8 grid grid-cols-4 gap-2.5 opacity-30">
                {Array.from({ length: 16 }).map((_, i) => (<div key={i} className="w-1.5 h-1.5 rounded-full bg-orange-300" />))}
              </div>

              <div className="relative w-full lg:w-[420px] h-[420px] shrink-0 flex items-center justify-center">
                <div className="absolute w-[380px] h-[380px] rounded-full border border-orange-200/60" />
                <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-orange-300/40" />
                <div className="relative z-10 w-[180px] h-[180px] rounded-full bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center shadow-[0_8px_32px_rgba(249,115,22,0.35)]">
                  <span className="text-white text-7xl font-black tracking-tight">K</span>
                </div>
                <div className="absolute w-[280px] h-[280px] animate-orbit">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 animate-counter-spin">
                    <div className="w-12 h-12 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center justify-center border border-orange-100">
                      <svg className="w-5 h-5 text-[#F97316]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 animate-counter-spin">
                    <div className="w-12 h-12 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center justify-center border border-orange-100">
                      <svg className="w-5 h-5 text-[#F97316]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                  </div>
                </div>
                <div className="absolute w-[380px] h-[380px] animate-orbit-reverse">
                  <div className="absolute top-1/2 -right-2 -translate-y-1/2 animate-counter-spin-reverse">
                    <div className="w-12 h-12 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center justify-center border border-orange-100">
                      <svg className="w-5 h-5 text-[#F97316]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                    </div>
                  </div>
                  <div className="absolute top-1/2 -left-2 -translate-y-1/2 animate-counter-spin-reverse">
                    <div className="w-12 h-12 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center justify-center border border-orange-100">
                      <svg className="w-5 h-5 text-[#F97316]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>
                    </div>
                  </div>
                </div>
                <div className="absolute w-[280px] h-[280px]">
                  <div className="absolute top-[15px] left-[60px] w-2 h-2 rounded-full bg-orange-300/50" />
                  <div className="absolute bottom-[15px] right-[60px] w-2 h-2 rounded-full bg-orange-300/50" />
                </div>
              </div>

              <div className="flex-1 space-y-6 relative z-10">
                <div className="text-orange-200 text-7xl font-serif leading-none -mb-4">&ldquo;</div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider">
                  Built by Marketers
                </div>
                <h2 className="text-3xl md:text-[2.6rem] font-bold font-heading leading-[1.2] text-gray-900">
                  We don&apos;t just run campaigns.<br />
                  We build <span className="text-[#F97316]">revenue engines.</span>
                </h2>
                <div className="w-16 h-1 rounded-full bg-[#F97316]" />
                <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                  After spending years seeing agencies promise the world and deliver nothing but vanity metrics, we built Kazzona Marketing with a single mission: To tie every single marketing activity directly to your pipeline and revenue. No fluff, just scalable growth.
                </p>
                <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-orange-100">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center shadow-md">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
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
    </>
  );
}
