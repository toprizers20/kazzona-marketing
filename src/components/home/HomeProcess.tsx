"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, HelpCircle, Search, Target, Rocket } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { FadeIn } from "@/components/home/FadeIn";

const faqs = [
  { q: "What makes Kazzona different from other marketing agencies in India?", a: "Unlike traditional agencies that focus on vanity metrics like impressions and clicks, we operate as a growth partner. We tie every marketing activity directly to your pipeline and revenue generation. We guarantee transparent reporting and a focus on ROAS." },
  { q: "How long does it take to see results?", a: "For Paid Ads (Google/Meta), we typically launch campaigns within 7 days and you can see initial lead flow immediately. For SEO and organic growth, significant compounding results usually take 3 to 6 months depending on the competitive landscape." },
  { q: "Do you offer custom pricing packages?", a: "Yes. Every business is unique. While we have standard guidelines, we conduct a thorough discovery call to audit your current digital presence and propose a custom pricing structure based on your specific growth targets." },
  { q: "Who will be managing my account?", a: "You will be assigned a dedicated Account Manager along with a team of specialists (SEO experts, Ad buyers, designers) based out of our Delhi NCR office. You will have a direct communication channel via Slack/WhatsApp." },
];

function ProcessSection() {
  return (
    <FadeIn direction="scale">
      <section className="py-24 bg-[#FFFAF5] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#F97316]/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-6 right-8 grid grid-cols-5 gap-2 opacity-25">
          {Array.from({ length: 25 }).map((_, i) => (<div key={i} className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />))}
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold mb-5 uppercase tracking-wider">Our Process</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5 text-gray-900">From Strategy to Scale<br /><span className="text-[#F97316]">in 4 Simple Steps</span></h2>
            <div className="w-12 h-1 rounded-full bg-[#F97316] mx-auto mb-5" />
            <p className="text-gray-500 text-lg">A proven process. Measurable results.<br />We turn insights into impact and strategies into sustainable growth.</p>
          </div>

          <div className="hidden md:block relative">
            <div className="absolute z-0" style={{ top: "85px", left: "60px", right: "60px", height: "2px", background: "#E5E7EB" }}>
              <div className="absolute -right-1.5 -top-[4px] w-3 h-3 rounded-full bg-[#F97316]" />
            </div>

            <div className="grid grid-cols-4 gap-4 relative z-10">
              {[
                { step: "01", title: "Discovery", desc: "We audit your current digital presence and understand your business goals.", icon: Search, fill: "107 251" },
                { step: "02", title: "Strategy", desc: "Custom roadmap built specifically for your target market audience.", icon: Target, fill: "179 179" },
                { step: "03", title: "Execute", desc: "Our 50+ member team implements the strategy across all channels.", icon: Zap, fill: "251 107" },
                { step: "04", title: "Scale", desc: "We optimize, scale winning campaigns, and double down on ROI.", icon: Rocket, fill: "358 0" },
              ].map((p, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-[120px] h-[120px] rounded-full bg-white shadow-[0_2px_24px_rgba(0,0,0,0.07)] flex items-center justify-center relative mb-5">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="57" fill="none" stroke="#F0E6DA" strokeWidth="2" />
                      <circle cx="60" cy="60" r="57" fill="none" stroke="#F97316" strokeWidth="3" strokeDasharray={p.fill} strokeLinecap="round" transform="rotate(-50 60 60)" />
                    </svg>
                    <p.icon className="w-11 h-11 text-gray-800" strokeWidth={1.3} />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#F97316] text-white text-xs font-bold flex items-center justify-center shadow-md mb-4">{p.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{p.title}</h3>
                  <div className="w-8 h-0.5 bg-[#F97316] rounded-full mx-auto mb-3" />
                  <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:hidden space-y-10">
            {[
              { step: "01", title: "Discovery", desc: "We audit your current digital presence and understand your business goals.", icon: Search, fill: "70 160" },
              { step: "02", title: "Strategy", desc: "Custom roadmap built specifically for your target market audience.", icon: Target, fill: "117 117" },
              { step: "03", title: "Execute", desc: "Our 50+ member team implements the strategy across all channels.", icon: Zap, fill: "164 70" },
              { step: "04", title: "Scale", desc: "We optimize, scale winning campaigns, and double down on ROI.", icon: Rocket, fill: "232 0" },
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-5">
                <div className="shrink-0">
                  <div className="w-[80px] h-[80px] rounded-full bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)] flex items-center justify-center relative">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="37" fill="none" stroke="#F0E6DA" strokeWidth="2" />
                      <circle cx="40" cy="40" r="37" fill="none" stroke="#F97316" strokeWidth="2.5" strokeDasharray={p.fill} strokeLinecap="round" transform="rotate(-50 40 40)" />
                    </svg>
                    <p.icon className="w-8 h-8 text-gray-800" strokeWidth={1.3} />
                  </div>
                </div>
                <div className="text-left pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#F97316] text-white text-xs font-bold flex items-center justify-center">{p.step}</div>
                    <h3 className="text-lg font-bold text-gray-900">{p.title}</h3>
                  </div>
                  <div className="w-8 h-0.5 bg-[#F97316] rounded-full mb-2" />
                  <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeIn>
  );
}

function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <FadeIn>
      <section className="py-24 bg-card/30 border-t border-border/50">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">Everything you need to know about working with Kazzona.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card border border-border/50 hover:border-emerald-500/30 transition-colors">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between font-bold text-lg cursor-pointer outline-none text-left">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-6 h-6 text-primary shrink-0" />
                    {faq.q}
                  </span>
                  <span className={`transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </button>
                {openFaq === i && (
                  <p className="text-muted-foreground pl-9 leading-relaxed mt-4 animate-in slide-in-from-top-2 fade-in-0 duration-300">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeIn>
  );
}

function FinalCTA() {
  return (
    <FadeIn direction="scale">
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-gradient-to-r from-primary via-orange-500 to-accent rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
              Ready to 10x Your Digital Growth?
            </h2>
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto relative z-10">
              Join 200+ brands that trust Kazzona Marketing for their digital marketing. Get a free strategy session worth ₹25,000 — no strings attached.
            </p>
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className={buttonVariants({ variant: "secondary", size: "lg", className: "rounded-full font-bold px-10 text-lg hover:scale-105 transition-transform" })}>
                Book Free Strategy Call
              </Link>
              <Link href="/services" className="text-white/90 hover:text-white font-semibold underline underline-offset-4">
                Explore Our Services →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}

export function HomeProcess() {
  return (
    <>
      <ProcessSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
