"use client";

import { useState, useEffect } from "react";
import { X, Rocket, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function OfferPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (hasSeen) return;

    if (pathname === "/" || pathname?.startsWith("/services")) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasSeen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [pathname, hasSeen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen
          ? "bg-black/60 opacity-100 pointer-events-auto"
          : "bg-transparent opacity-0 pointer-events-none"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-lg bg-card/95 border border-border/50 rounded-3xl p-8 shadow-2xl overflow-hidden transition-all duration-300 ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 border border-primary/20 shadow-inner">
            <Rocket className="w-8 h-8 text-primary" />
          </div>

          <h2 className="font-heading text-3xl font-bold mb-3 flex items-center justify-center gap-2 text-foreground">
            Accelerate Your Growth <Sparkles className="w-6 h-6 text-accent" />
          </h2>

          <p className="text-muted-foreground mb-8 text-lg">
            Book a <span className="font-semibold text-foreground">Free Strategy Call</span> with our experts today and discover how <span className="text-primary font-bold">Kazzona Marketing</span> can scale your revenue.
          </p>

          <div className="flex flex-col w-full gap-3">
            <Link
              href="/contact"
              onClick={handleClose}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold py-4 rounded-xl transition-all hover:-translate-y-1"
            >
              Claim Your Free Session <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={handleClose}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
