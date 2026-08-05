"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, TrendingUp, IndianRupee, BarChart, Users, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/home/FadeIn";

export function HomeHero() {
  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(252,74,26,0.15),transparent)]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary mb-6">
                <Zap className="w-4 h-4" /> Best Digital Marketing Agency in Delhi NCR
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                <span className="block">We Help Brands Scale Revenue</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                  Digitally
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                From Delhi startups to global enterprises — we&apos;ve generated <strong className="text-foreground">₹100Cr+ in revenue</strong> for businesses through SEO, performance marketing, and premium web development.
              </p>
              <div className="mt-8">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const input = form.elements[0] as HTMLInputElement;
                    const url = encodeURIComponent(input.value);
                    window.location.href = `/contact?audit=true&url=${url}`;
                  }}
                  className="flex flex-col sm:flex-row gap-3 max-w-2xl relative"
                >
                  <div className="relative flex-1 min-w-0">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <input
                      type="url"
                      placeholder="Enter your website URL"
                      required
                      className="w-full bg-secondary border border-primary/30 text-foreground text-base rounded-full pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary backdrop-blur-sm transition-all placeholder:text-muted-foreground placeholder:opacity-100"
                    />
                  </div>
                  <button
                    type="submit"
                    className="shrink-0 flex items-center justify-center rounded-full px-6 py-4 text-base font-bold shadow-xl shadow-primary/25 bg-gradient-to-r from-primary to-orange-500 text-white hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 whitespace-nowrap"
                  >
                    Analyze My Website <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </form>
                <p className="text-sm text-muted-foreground mt-3 ml-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free 25-point SEO &amp; Performance Audit
                </p>
              </div>
              <div className="flex items-center gap-8 mt-10 pt-8 border-t border-border/50">
                <div>
                  <div className="text-3xl font-black text-primary">200+</div>
                  <div className="text-sm text-muted-foreground">Clients Served</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-accent">₹100Cr+</div>
                  <div className="text-sm text-muted-foreground">Revenue Generated</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-primary">4.9/5</div>
                  <div className="text-sm text-muted-foreground">Google Rating</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative aspect-[4/3] rounded-[3rem] bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-border/50 overflow-hidden p-8">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
                <div className="relative z-10 h-full flex flex-col gap-3">
                  <div className="flex gap-3">
                    <div className="flex-1 rounded-2xl bg-card/80 backdrop-blur border border-border/50 p-4">
                      <TrendingUp className="w-6 h-6 text-emerald-500 mb-2" />
                      <div className="text-xl lg:text-2xl font-bold">+312%</div>
                      <div className="text-[10px] lg:text-xs text-muted-foreground">Organic Traffic</div>
                    </div>
                    <div className="flex-1 rounded-2xl bg-card/80 backdrop-blur border border-border/50 p-4">
                      <IndianRupee className="w-6 h-6 text-amber-500 mb-2" />
                      <div className="text-xl lg:text-2xl font-bold">₹4.2Cr</div>
                      <div className="text-[10px] lg:text-xs text-muted-foreground">Pipeline Generated</div>
                    </div>
                  </div>
                  <div className="flex-1 rounded-2xl bg-card/80 backdrop-blur border border-border/50 p-4 flex flex-col justify-end">
                    <div className="flex items-end gap-2 h-16 lg:h-20">
                      {[30, 45, 38, 55, 42, 68, 60, 78, 72, 90, 85, 95].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t-sm transition-all" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                    <div className="text-[10px] lg:text-xs text-muted-foreground mt-2">Monthly Growth — Last 12 Months</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1 rounded-2xl bg-white border border-border/50 p-3 flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <div className="text-sm font-bold leading-tight">1,240</div>
                        <div className="text-[10px] text-muted-foreground leading-tight">Leads This Month</div>
                      </div>
                    </div>
                    <div className="flex-1 rounded-2xl bg-white border border-border/50 p-3 flex items-center gap-2">
                      <BarChart className="w-5 h-5 text-accent shrink-0" />
                      <div>
                        <div className="text-sm font-bold leading-tight">4.5x</div>
                        <div className="text-[10px] text-muted-foreground leading-tight">ROAS</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FadeIn>
        <section className="py-8 bg-card border-y border-border/50 flex flex-wrap justify-center items-center gap-8 md:gap-14 px-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Image key={n} src={`/images/${n}.png`} alt={`Partner ${n}`} width={96} height={96} quality={100} unoptimized style={{ width: "auto" }} className="h-20 md:h-24 rounded-xl bg-white p-2" />
          ))}
        </section>
      </FadeIn>
    </>
  );
}
