"use client";

import { motion } from "framer-motion";

const metrics = [
  { value: "$50M+", label: "Client Revenue Generated" },
  { value: "500%", label: "Average Traffic Growth" },
  { value: "200+", label: "Enterprise Projects" },
  { value: "10K+", label: "Keywords Ranked #1" },
];

export function TrustBar() {
  return (
    <section className="py-12 border-y border-border/50 bg-secondary/20">
      <div className="container mx-auto px-6 max-w-7xl">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest">
          Trusted by fast-growing enterprises
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {metrics.map((metric, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center text-center space-y-2"
            >
              <h3 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                {metric.value}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground font-medium">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
