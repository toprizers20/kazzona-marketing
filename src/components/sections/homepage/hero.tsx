"use client";

import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-32">
      {/* Background Gradients */}
      <div className="absolute inset-0 w-full h-full bg-background -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10 opacity-50" />
      
      <div className="container mx-auto px-6 max-w-5xl text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border text-sm font-medium text-muted-foreground mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Enterprise Digital Growth Agency</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1] mb-8"
        >
          Scale Your Brand With <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Data-Driven Systems
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
        >
          We engineer high-converting digital ecosystems, orchestrate programmatic SEO, and automate lead generation for enterprise businesses ready to dominate their market.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          <Link href="/audit" className={buttonVariants({ size: "lg", className: "rounded-full px-8 h-14 text-base w-full sm:w-auto shadow-xl shadow-primary/25" })}>
            Get Free SEO Audit <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link href="/services" className={buttonVariants({ size: "lg", variant: "outline", className: "rounded-full px-8 h-14 text-base w-full sm:w-auto bg-background/50 backdrop-blur-sm hover:bg-secondary" })}>
            Explore Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
