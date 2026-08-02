"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Discovery & Strategy",
    desc: "We analyze your market, audit your current digital footprint, and engineer a roadmap for scalable growth."
  },
  {
    num: "02",
    title: "System Execution",
    desc: "Our engineers and marketers deploy custom infrastructure, from Next.js web builds to programmatic SEO engines."
  },
  {
    num: "03",
    title: "Scale & Optimize",
    desc: "Through continuous data analysis, A/B testing, and AI-driven insights, we maximize ROI and market share."
  }
];

export function ProcessTimeline() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Our Proven <span className="text-primary">Process</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            We don't guess. We follow a systematic framework to ensure consistent, predictable enterprise growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-border/50 -z-10" />

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col relative"
            >
              <div className="w-24 h-24 rounded-full bg-secondary border-4 border-background flex items-center justify-center font-heading text-3xl font-bold text-primary mb-6 shadow-xl">
                {step.num}
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
