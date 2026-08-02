"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Home, Search, MessageCircle } from "lucide-react";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Page Not Found | Kazzona Marketing";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <div className="text-center max-w-lg relative z-10">
        {/* Animated 404 */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="relative mb-8"
        >
          <span className="font-heading text-[10rem] md:text-[14rem] font-black text-primary/10 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl shadow-primary/30"
            >
              <span className="text-white font-heading font-black text-4xl md:text-5xl">K</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="font-heading text-2xl md:text-3xl font-bold mb-3">
            Oops! Lost in the <span className="text-primary">digital maze</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
            This page doesn&apos;t exist anymore or never did. Let&apos;s get you back on track.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-orange-500 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            <Home className="w-5 h-5" /> Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-card border border-border/60 text-foreground px-8 py-4 rounded-full font-bold hover:border-primary/50 hover:text-primary transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" /> Contact Us
          </Link>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 pt-8 border-t border-border/50"
        >
          <p className="text-sm text-muted-foreground mb-4">Or try one of these popular pages:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: "Services", href: "/services" },
              { label: "Case Studies", href: "/case-studies" },
              { label: "Blog", href: "/blog" },
              { label: "About", href: "/about" },
              { label: "Pricing", href: "/pricing" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full bg-secondary/50 text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
