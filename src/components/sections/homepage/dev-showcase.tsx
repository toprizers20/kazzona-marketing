"use client";

import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function DevShowcase() {
  return (
    <section className="py-24 overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Enterprise <span className="text-primary">Development</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            We build blazing-fast, scalable web applications using the latest in React, Next.js, and Headless architectures.
          </p>
          <Link href="/portfolio" className={buttonVariants({ variant: "outline", className: "rounded-full" })}>
            View Our Work <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Mockup Container */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-xl border border-border/50 bg-secondary/20 p-2 shadow-2xl backdrop-blur-sm"
          >
            <div className="rounded-lg overflow-hidden border border-border/40 bg-background aspect-video relative flex items-center justify-center">
              {/* Placeholder for actual project image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5" />
              <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                  <span className="font-heading font-bold text-2xl">D</span>
                </div>
                <p className="font-medium">Premium Portfolio Mockup</p>
              </div>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -z-10" />
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-accent/20 blur-[100px] rounded-full -z-10" />
        </div>
      </div>
    </section>
  );
}
