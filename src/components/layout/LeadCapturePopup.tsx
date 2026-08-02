"use client";

import { useState, useEffect } from "react";
import { X, Search, CheckCircle2, ArrowRight } from "lucide-react";
import { submitLead } from "@/app/actions/crm";

export function LeadCapturePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hasDismissed) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;

      if (scrollPosition > (documentHeight - windowHeight) * 0.3) {
        setIsOpen(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    const timer = setTimeout(() => {
      setIsOpen(true);
      window.removeEventListener("scroll", handleScroll);
    }, 15000);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [hasDismissed]);

  const handleClose = () => {
    setIsOpen(false);
    setHasDismissed(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !email || loading) return;

    setLoading(true);
    await submitLead({
      name: "SEO Audit Request",
      email: email,
      service: "SEO Audit",
      message: `Website URL: ${url} — Requested a free SEO audit from the popup.`,
    });
    setLoading(false);

    setSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[100] w-[calc(100vw-2rem)] sm:w-[420px] animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-card/95 backdrop-blur-xl border border-border/60 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-primary/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Audit Requested!</h3>
            <p className="text-sm text-muted-foreground">
              Our SEO experts will analyze your website and email you the comprehensive report shortly.
            </p>
          </div>
        ) : (
          <div>
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 border border-primary/20">
              <Search className="w-6 h-6 text-primary" />
            </div>

            <h3 className="text-2xl font-bold font-heading mb-2 leading-tight">
              Want to rank higher?
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Get a comprehensive SEO audit report for your website completely free. Find out exactly why your competitors are outranking you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  required
                  className="w-full bg-secondary/30 border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-muted-foreground/60"
                />
              </div>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Work Email"
                  required
                  className="w-full bg-secondary/30 border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all placeholder:text-muted-foreground/60"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? "Submitting..." : <>Get Free Audit <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
