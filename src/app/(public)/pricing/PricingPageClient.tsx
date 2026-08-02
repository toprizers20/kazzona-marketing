"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, Zap, Globe, Search, Megaphone, AlertCircle } from "lucide-react";
import Link from "next/link";
import type { PricingConfig, PricingSection } from "@/lib/pricing-defaults";

const SECTION_THEMES: Record<string, { color: string; gradient: string; icon: React.ElementType; note?: string }> = {
  website: {
    color: "blue",
    gradient: "from-blue-500 to-orange-600",
    icon: Globe,
  },
  ecommerce: {
    color: "violet",
    gradient: "from-violet-500 to-purple-600",
    icon: Globe,
  },
  seo: {
    color: "emerald",
    gradient: "from-emerald-500 to-teal-600",
    icon: Search,
    note: "SEO is a long-term investment — results typically take 3 to 6 months to materialize. We provide detailed monthly reports so you can track your progress with full transparency.",
  },
  ads: {
    color: "amber",
    gradient: "from-amber-500 to-orange-600",
    icon: Megaphone,
    note: "Ad budget and management fee are separate — your entire budget goes directly to ads, with zero cuts in between.",
  },
};

function SectionPricing({ section, config }: { section: PricingSection; config: PricingConfig }) {
  const [activeCategoryId, setActiveCategoryId] = useState(section.categories[0]?.id || "");
  const activeCategory = section.categories.find(c => c.id === activeCategoryId);
  const theme = SECTION_THEMES[section.id] || SECTION_THEMES.website;
  const Icon = theme.icon;

  return (
    <section className="py-24 border-b border-border/30">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4 animate-fade-down">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
            <Icon className="w-4 h-4" />
            <span>{section.title}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight">
            {section.title}
          </h2>
          
          {theme.note && (
            <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5 mt-4 max-w-2xl mx-auto">
              <div className="flex items-start gap-3 justify-center">
                <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground font-medium text-left">
                  {theme.note}
                </p>
              </div>
            </div>
          )}
        </div>

        {section.categories.length > 1 && (
          <div className="flex justify-center mb-14 animate-fade-in">
            <div className="inline-flex flex-wrap justify-center gap-2">
              {section.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategoryId(category.id)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                    activeCategoryId === category.id
                      ? "bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                      : "bg-background border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <div
          key={activeCategoryId}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 transition-opacity duration-300 animate-scale-up"
        >
          {activeCategory?.plans.map((plan, idx) => (
            <div 
              key={idx}
              className={`relative flex flex-col bg-card/40 backdrop-blur-sm border rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                plan.popular 
                  ? "border-primary/50 shadow-xl shadow-primary/10" 
                  : "border-border/50 hover:border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <span className="bg-gradient-to-r from-primary to-accent text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-primary/20">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-8 text-center">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex justify-center items-baseline gap-2">
                  <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <ul className="space-y-4">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-8 border-t border-border/50">
                <Link 
                  href={config.ctaHref}
                  className={`w-full rounded-xl py-4 font-bold text-base transition-all duration-300 flex items-center justify-center ${
                    plan.popular 
                      ? "bg-gradient-to-r from-primary to-orange-600 text-white hover:shadow-lg hover:shadow-primary/25" 
                      : "bg-secondary/80 hover:bg-secondary text-foreground"
                  }`}
                >
                  {config.ctaText} <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PricingPageClient({ config }: { config: PricingConfig }) {
  const sectionOrder = ["website", "ecommerce", "seo", "ads"];
  const orderedSections = sectionOrder
    .map(id => config.sections.find(s => s.id === id))
    .filter((s): s is PricingSection => !!s);
  
  const remainingSections = config.sections.filter(s => !sectionOrder.includes(s.id));
  const allSections = [...orderedSections, ...remainingSections];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary/10 via-background to-background pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 pt-32 pb-16">
        <div className="container max-w-7xl mx-auto px-6 text-center max-w-3xl animate-fade-down">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
            <Zap className="w-4 h-4" />
            <span>Transparent Pricing</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight mb-6">
            Scale Your Business With <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Premium Solutions</span>
          </h1>
          
          {config.bannerText && (
            <p className="text-lg md:text-xl text-muted-foreground">
              {config.bannerText}
            </p>
          )}
        </div>
      </div>

      <div className="relative z-10">
        {allSections.map((section) => (
          <SectionPricing key={section.id} section={section} config={config} />
        ))}
      </div>

      <div className="relative z-10 py-24">
        <div className="container max-w-5xl mx-auto px-6 text-center">
          <div className="p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 relative overflow-hidden animate-fade-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Contact us today for a free consultation. We&apos;ll help you choose the perfect plan for your business goals.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-orange-600 text-white font-bold px-10 py-4 rounded-full text-lg shadow-xl shadow-primary/25 hover:-translate-y-1 transition-all"
            >
              Contact Us Today <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
