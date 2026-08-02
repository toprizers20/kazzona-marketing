"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

const comparisons = [
  { feature: "Strategy Focus", us: "Data-driven ROI", them: "Vanity Metrics" },
  { feature: "Execution Speed", us: "Automated & Agile", them: "Slow & Bureaucratic" },
  { feature: "Tech Stack", us: "Modern (Next.js/React)", them: "Legacy (WordPress)" },
  { feature: "SEO Approach", us: "Programmatic Scale", them: "Manual & Limited" },
  { feature: "Reporting", us: "Real-time Dashboards", them: "Monthly PDFs" },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-secondary/10">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Why Choose <span className="text-primary">Kazzona</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We don't just build websites. We engineer scalable systems designed to outperform your competition.
          </p>
        </div>

        <div className="bg-card border border-border/50 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-3 bg-secondary/30 p-6 border-b border-border/50 text-sm md:text-base font-semibold">
            <div className="text-muted-foreground">What matters</div>
            <div className="text-primary text-center">Kazzona Marketing</div>
            <div className="text-muted-foreground text-center">Traditional Agencies</div>
          </div>
          
          <div className="flex flex-col">
            {comparisons.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`grid grid-cols-3 p-6 items-center ${index !== comparisons.length - 1 ? 'border-b border-border/20' : ''}`}
              >
                <div className="font-medium text-foreground">{item.feature}</div>
                <div className="flex items-center justify-center gap-2 text-foreground font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-primary hidden sm:block" />
                  {item.us}
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <XCircle className="w-5 h-5 text-destructive hidden sm:block opacity-50" />
                  {item.them}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
