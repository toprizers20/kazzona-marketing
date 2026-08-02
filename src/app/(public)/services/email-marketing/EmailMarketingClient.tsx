"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, Users, RefreshCw, MessageSquare, Repeat } from "lucide-react";
import PricingClient from "@/app/(public)/pricing/PricingClient";
import EmailCampaignAnimation from "../email-campaign-animation";
import RelatedServices from "@/components/RelatedServices";

interface EmailMarketingClientProps {
  config: any;
}

export default function EmailMarketingClient({ config }: EmailMarketingClientProps) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(249,115,22,0.08),transparent)] -z-10" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-primary tracking-widest uppercase">Klaviyo & Mailchimp Certified</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                Unlock Your Hidden <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Revenue Stream.</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-lg">
                Stop relying solely on expensive paid ads. We build automated email sequences that nurture leads, recover abandoned carts, and turn one-time buyers into loyal brand advocates.
              </p>
              <Link href="/contact">
                <button className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-full text-lg shadow-lg shadow-primary/25 transition-all hover:-translate-y-1 flex items-center gap-2">
                  Get a Free Strategy Plan <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>

            {/* Animated Email Campaign */}
            <div className="relative flex justify-center items-center h-[350px] lg:h-[450px] animate-slide-right mt-12 lg:mt-0">
              <EmailCampaignAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-secondary/30 border-y border-border/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-down">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">The Leaky Bucket Problem</h2>
            <p className="text-lg text-muted-foreground">You are spending thousands on ads to drive traffic. But what happens when 98% of those visitors don&apos;t buy on their first visit?</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { metric: "69%", title: "Average Cart Abandonment", desc: "Nearly 7 out of 10 Indian shoppers add items to their cart but leave before paying." },
              { metric: "42x", title: "ROI Potential", desc: "Email marketing consistently delivers the highest ROI of any digital channel. For every ₹1 spent, average return is ₹42." },
              { metric: "0%", title: "Algorithm Dependency", desc: "Unlike Facebook or Google, you own your email list. No algorithm changes can cut off your access to customers." }
            ].map((item, i) => (
              <div key={i} className="animate-scale-up bg-card p-8 rounded-[2rem] border border-border/50 hover:border-primary/30 transition-colors" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-5xl font-black text-primary mb-4">{item.metric}</div>
                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Flows */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 max-w-3xl mx-auto animate-fade-down">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Automated Revenue Systems</h2>
            <p className="text-lg text-muted-foreground">We set up, design, and write complex automation flows that make you money while you sleep.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Welcome Series Flow", desc: "Introduce your brand, build trust, and convert new subscribers with a strategic sequence of emails.", icon: Users },
              { title: "Cart Abandonment Flow", desc: "The highest-converting flow. Recover lost sales with perfectly timed reminders and psychological triggers.", icon: RefreshCw },
              { title: "Post-Purchase & Cross-Sell", desc: "Turn first-time buyers into repeat customers by recommending complementary products.", icon: Repeat },
              { title: "B2B Lead Nurturing", desc: "Educate B2B leads over a 30-90 day cycle, handling objections before the sales call.", icon: MessageSquare }
            ].map((feature, i) => (
              <div key={i} className="animate-slide-br p-8 rounded-[2rem] bg-card border border-border/50 hover:border-primary/30 transition-colors flex items-start gap-6" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-24 bg-secondary/30 border-y border-border/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="bg-card rounded-[3rem] border border-border/50 p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 shadow-lg">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">Client Win</div>
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">Increasing D2C Fashion Revenue by 28% Without Ad Spend</h2>
              <p className="text-lg text-muted-foreground">By implementing an aggressive 5-part cart abandonment flow and a VIP segmentation strategy, we added ₹12L/month in pure profit for StyleHive.</p>
            </div>
            <div className="w-full md:w-1/3 space-y-4">
              <div className="bg-secondary/30 p-6 rounded-2xl text-center border border-border/50">
                <div className="text-4xl font-black text-primary mb-2">28%</div>
                <div className="text-sm text-muted-foreground">Total Revenue from Email</div>
              </div>
              <div className="bg-secondary/30 p-6 rounded-2xl text-center border border-border/50">
                <div className="text-4xl font-black text-primary mb-2">44%</div>
                <div className="text-sm text-muted-foreground">Open Rate on Flows</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Email Marketing Plans</h2>
          </div>
        </div>
        <PricingClient config={config} filterSectionId="email-marketing" hideHeader />
      </section>

      {/* Related Services */}
      <RelatedServices currentSlug="email-marketing" />

      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="animate-scale-up p-12 md:p-24 rounded-[3rem] bg-gradient-to-r from-primary via-orange-500 to-accent text-center shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 max-w-2xl mx-auto text-white">Don&apos;t Let Your Leads Go Cold</h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
              Start building an automated revenue engine today. We&apos;ll audit your current setup for free.
            </p>
            <Link href="/contact">
              <button className="bg-white hover:bg-white/90 text-foreground font-bold px-10 py-5 rounded-full text-lg shadow-xl transition-all duration-300">
                Claim Your Free Audit
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
