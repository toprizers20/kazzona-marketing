"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Code, Megaphone, Mail, PenTool, ArrowRight, Sparkles } from "lucide-react";

const allServices = [
  {
    slug: "seo",
    title: "SEO Optimization",
    desc: "Rank #1 on Google India",
    icon: Search,
    gradient: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50",
  },
  {
    slug: "website-development",
    title: "Website Development",
    desc: "Custom Next.js sites",
    icon: Code,
    gradient: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50",
  },
  {
    slug: "advertisement",
    title: "Advertisement",
    desc: "Google & Meta Ads",
    icon: Megaphone,
    gradient: "from-purple-500 to-pink-600",
    bgLight: "bg-purple-50",
  },
  {
    slug: "email-marketing",
    title: "Email Marketing",
    desc: "Automated revenue flows",
    icon: Mail,
    gradient: "from-rose-500 to-red-600",
    bgLight: "bg-rose-50",
  },
  {
    slug: "graphic-designing",
    title: "Graphic Designing",
    desc: "Premium branding & UI/UX",
    icon: PenTool,
    gradient: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50",
  },
];

const comboInsights: Record<string, { title: string; desc: string }> = {
  seo: {
    title: "SEO + Website Dev = Conversions",
    desc: "A beautiful site ranks nowhere without SEO. We build both so you get traffic AND leads.",
  },
  "website-development": {
    title: "Dev + SEO = Organic Growth",
    desc: "Websites we build are SEO-optimized from day one. No retro-fitting needed.",
  },
  advertisement: {
    title: "Ads + Email = Full Funnel",
    desc: "Run ads to capture leads, then nurture them with automated email flows. Complete loop.",
  },
  "email-marketing": {
    title: "Email + Ads = Maximum ROI",
    desc: "Retarget email openers with ads. Re-engage ad clickers with email. Multiply your touchpoints.",
  },
  "graphic-designing": {
    title: "Design + Ads = Click-Stopping Creatives",
    desc: "Premium ad creatives that stop the scroll. We design and run your campaigns together.",
  },
};

interface RelatedServicesProps {
  currentSlug: string;
}

export default function RelatedServices({ currentSlug }: RelatedServicesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const related = allServices.filter((s) => s.slug !== currentSlug).slice(0, 4);
  const insight = comboInsights[currentSlug];

  return (
    <section ref={ref} className="py-20 border-t border-border/50 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        {/* Combo Insight Banner */}
        {insight && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">{insight.title}</h3>
              <p className="text-muted-foreground text-sm">{insight.desc}</p>
            </div>
          </motion.div>
        )}

        {/* Related Services Grid */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">Related Services</h2>
          <p className="text-muted-foreground mt-2">Combine these for maximum growth</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {related.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full"
                >
                  <div className="h-full p-6 rounded-2xl bg-card/80 border border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${service.gradient} opacity-5 rounded-bl-[40px] group-hover:opacity-10 transition-opacity`} />
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.desc}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
