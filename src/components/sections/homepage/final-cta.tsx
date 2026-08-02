"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/10 -z-10" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent -z-10" />
      
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[100px] rounded-full -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Ready to dominate your market?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Request your free enterprise SEO and technical audit today. We'll identify exact bottlenecks and show you the roadmap to scalable growth.
              </p>
              <ul className="space-y-4 mb-8">
                {["Comprehensive Technical SEO Audit", "Competitor Gap Analysis", "Custom Growth Roadmap"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background rounded-2xl p-8 border border-border shadow-xl">
              <h3 className="font-heading text-2xl font-bold mb-6 text-foreground">Get Your Free Audit</h3>
              <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="website" className="text-sm font-medium text-foreground">Website URL</label>
                  <Input id="website" placeholder="https://yourcompany.com" className="bg-secondary/50" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Work Email</label>
                  <Input id="email" type="email" placeholder="john@yourcompany.com" className="bg-secondary/50" />
                </div>
                <Button size="lg" className="w-full mt-2 font-bold shadow-lg shadow-primary/20">
                  Request Audit <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  By requesting an audit, you agree to our Privacy Policy.
                </p>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
