"use client";

import { useState } from "react";
import { CheckCircle2, ChevronRight, Zap } from "lucide-react";
import Link from "next/link";
import type { PricingConfig } from "@/lib/pricing-defaults";

export default function PricingClient({ 
  config: originalConfig,
  filterSectionId,
  hideHeader = false 
}: { 
  config: PricingConfig;
  filterSectionId?: string;
  hideHeader?: boolean;
}) {
  const config = {
    ...originalConfig,
    sections: filterSectionId 
      ? originalConfig.sections.filter(s => s.id === filterSectionId)
      : originalConfig.sections
  };

  const [activeSectionId, setActiveSectionId] = useState(config.sections[0]?.id || "");
  const [activeCategoryIds, setActiveCategoryIds] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    config.sections.forEach(section => {
      if (section.categories.length > 0) {
        initial[section.id] = section.categories[0].id;
      }
    });
    return initial;
  });

  const activeSection = config.sections.find(s => s.id === activeSectionId);
  const activeCategoryId = activeCategoryIds[activeSectionId];
  const activeCategory = activeSection?.categories.find(c => c.id === activeCategoryId);

  if (config.sections.length === 0) {
    return null;
  }

  return (
    <div className={`bg-background relative overflow-hidden ${hideHeader ? 'py-12' : 'min-h-screen pt-32 pb-24'}`}>
      {!hideHeader && (
        <>
          <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary/10 via-background to-background pointer-events-none" />
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
        </>
      )}

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        
        {!hideHeader && (
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-6 animate-fade-down">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
              <Zap className="w-4 h-4" />
              <span>Transparent Pricing</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight">
              Scale Your Business With <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Premium Solutions</span>
            </h1>
            
            {config.bannerText && (
              <p className="text-lg md:text-xl text-muted-foreground">
                {config.bannerText}
              </p>
            )}
          </div>
        )}

        {config.sections.length > 1 && (
          <div className="flex justify-center mb-12 animate-fade-in">
            <div className="inline-flex bg-secondary/50 p-1.5 rounded-2xl border border-border/50 backdrop-blur-sm">
              {config.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSectionId(section.id)}
                  className={`px-6 py-3 rounded-xl text-sm md:text-base font-semibold transition-all duration-300 ${
                    activeSectionId === section.id 
                      ? "bg-gradient-to-r from-primary to-orange-600 text-white shadow-lg shadow-primary/20" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeSection && activeSection.categories.length > 1 && (
          <div className="flex justify-center mb-16 animate-fade-in">
            <div className="inline-flex flex-wrap justify-center gap-2">
              {activeSection.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategoryIds(prev => ({ ...prev, [activeSection.id]: category.id }))}
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
          className={`grid grid-cols-1 gap-8 mx-auto transition-opacity duration-300 animate-scale-up ${
            activeCategory?.plans.length === 1 ? "max-w-md" :
            activeCategory?.plans.length === 2 ? "md:grid-cols-2 max-w-4xl" :
            activeCategory?.plans.length === 3 ? "md:grid-cols-3 max-w-6xl" :
            "md:grid-cols-2 xl:grid-cols-4 max-w-7xl"
          }`}
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
    </div>
  );
}
