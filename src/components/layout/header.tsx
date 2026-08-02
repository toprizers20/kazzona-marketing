"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Code, Megaphone, Mail, PenTool, BarChart3, Link2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { GlobalSearchModal } from "./GlobalSearchModal";

interface HeaderNavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface HeaderConfigProps {
  logoText: string;
  logoUrl?: string;
  logoHeight?: number;
  logoWidth?: number;
  navigationItems: HeaderNavItem[];
  ctaText: string;
  ctaHref: string;
}

const knownServicesMap: Record<string, { desc: string; icon: any }> = {
  "/services/seo": { desc: "Rank #1 on Google India", icon: Search },
  "/services/website-development": { desc: "Custom Next.js sites", icon: Code },
  "/services/advertisement": { desc: "Google & Meta Ads", icon: Megaphone },
  "/services/email-marketing": { desc: "Automated campaigns", icon: Mail },
  "/services/graphic-designing": { desc: "Premium branding", icon: PenTool },
};

export function Header({ 
  isLoggedIn = false, 
  config 
}: { 
  isLoggedIn?: boolean; 
  config?: HeaderConfigProps;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // Merge dynamic config with defaults
  const logoText = config?.logoText || "Kazzona Marketing";
  const logoUrl = config?.logoUrl || "";
  const logoHeight = config?.logoHeight || 32;
  const logoWidth = config?.logoWidth || 32;
  const ctaText = config?.ctaText || "Free Strategy Call";
  const ctaHref = config?.ctaHref || "/contact";
  const navigationItems = config?.navigationItems || [
    { label: "Home", href: "/" },
    {
      label: "Services",
      href: "#",
      children: [
        { label: "SEO Optimization", href: "/services/seo" },
        { label: "Website Development", href: "/services/website-development" },
        { label: "Advertisement", href: "/services/advertisement" },
        { label: "Email Marketing", href: "/services/email-marketing" },
        { label: "Graphic Designing", href: "/services/graphic-designing" }
      ]
    },
    { label: "About", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? "bg-background/80 backdrop-blur-xl border-border/40 py-4 shadow-sm" : "bg-transparent border-transparent py-6"}`}>
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          
          {/* Dynamic Logo branding */}
          <Link href="/" className="flex items-center gap-2 group z-50">
            {logoUrl ? (
              <Image 
                src={logoUrl} 
                alt={logoText} 
                height={logoHeight}
                width={logoWidth}
                className="object-contain"
                priority
              />
            ) : (
              <div 
                style={{ height: logoHeight, width: logoWidth }}
                className="rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300"
              >
                {logoText.charAt(0)}
              </div>
            )}
            <span className="font-heading font-bold text-xl tracking-tight text-foreground">
              {logoText}
            </span>
          </Link>

          {/* Dynamic navigation menu */}
          <nav className="hidden lg:flex items-center gap-7">
            {navigationItems.map((link) => {
              const isActive = pathname === link.href;
              
              // Render dropdown structure if sublinks exist
              if (link.children && link.children.length > 0) {
                const hasActiveChild = link.children.some(c => pathname === c.href);
                return (
                  <div key={link.label} className="relative group">
                    <button className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${pathname.startsWith(link.href) || hasActiveChild ? "text-primary" : "text-muted-foreground"}`}>
                      {link.label}
                      <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className={`${link.label.toLowerCase() === "services" ? "w-[420px]" : "w-[220px]"} bg-card/95 backdrop-blur-xl border border-border/60 rounded-2xl shadow-2xl shadow-black/20 p-4 grid gap-1 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
                        
                        {link.children.map((child) => {
                          const known = knownServicesMap[child.href];
                          if (known) {
                            const Icon = known.icon;
                            return (
                              <Link key={child.label} href={child.href} className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors group/item relative z-10">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover/item:bg-gradient-to-br group-hover/item:from-primary group-hover/item:to-accent group-hover/item:text-white transition-all duration-300">
                                  <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="font-semibold text-sm text-foreground group-hover/item:text-primary transition-colors">{child.label}</div>
                                  <div className="text-xs text-muted-foreground">{known.desc}</div>
                                </div>
                              </Link>
                            );
                          } else {
                            return (
                              <Link key={child.label} href={child.href} className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary/50 transition-colors group/item relative z-10">
                                <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                  <Link2 className="w-3.5 h-3.5" />
                                </div>
                                <div className="font-semibold text-sm text-foreground group-hover/item:text-primary transition-colors">{child.label}</div>
                              </Link>
                            );
                          }
                        })}
                        
                        {link.label.toLowerCase() === "services" && (
                          <div className="mt-2 pt-2 border-t border-border/50">
                            <Link href="/services" className="flex items-center gap-2 p-3 rounded-xl hover:bg-secondary/50 text-sm font-semibold text-primary relative z-10">
                              <BarChart3 className="w-4 h-4" /> View All Services →
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link key={link.label} href={link.href} className={`relative text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {link.label}
                  {isActive && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />}
                </Link>
              );
            })}
          </nav>

          {/* Dynamic CTA button */}
          <div className="hidden lg:flex items-center gap-4">
            <button onClick={() => setSearchOpen(true)} className="p-2 text-muted-foreground hover:text-primary transition-colors flex items-center justify-center rounded-full hover:bg-secondary/50">
              <Search className="w-5 h-5" />
            </button>
            {isLoggedIn && (
              <Link href="/dashboard" className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">Dashboard</Link>
            )}
            <Link href={ctaHref} className={buttonVariants({ className: "rounded-full px-6 font-bold shadow-lg shadow-primary/20 bg-gradient-to-r from-primary to-orange-500 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 text-white" })}>
              {ctaText}
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center gap-2 z-50">
            <button onClick={() => setSearchOpen(true)} className="p-2 text-muted-foreground hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button
              className="relative w-10 h-10 flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className={`absolute w-6 h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out ${mobileMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"}`} />
              <span className={`absolute w-6 h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out ${mobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"}`} />
              <span className={`absolute w-6 h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out ${mobileMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"}`} />
            </button>
          </div>
        </div>

        {/* Mobile nav layout */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden fixed inset-0 top-[72px] bg-background/98 backdrop-blur-xl border-t border-border/40 p-6 pb-32 overflow-y-auto z-40 shadow-2xl"
            >
              <div className="flex flex-col gap-1">
                {navigationItems.map((link, i) => {
                  if (link.children && link.children.length > 0) {
                    return (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.3 }}
                        className="space-y-1"
                      >
                        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider py-2 px-3">{link.label}</div>
                        <div className="grid gap-0.5 pl-3 border-l-2 border-primary/30">
                          {link.children.map((child) => (
                            <Link key={child.label} href={child.href} onClick={() => setMobileMenuOpen(false)} className="text-[15px] font-medium text-foreground py-2.5 px-3 rounded-lg hover:text-primary hover:bg-primary/5 transition-all">{child.label}</Link>
                          ))}
                        </div>
                      </motion.div>
                    );
                  }
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.3 }}
                    >
                      <Link href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium hover:text-primary transition-colors block py-2.5 px-3 rounded-lg hover:bg-primary/5">{link.label}</Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                  className="pt-4 mt-2 border-t border-border/40 flex flex-col gap-3"
                >
                  {isLoggedIn && (
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className={buttonVariants({ variant: "outline", className: "w-full justify-center rounded-xl" })}>Dashboard</Link>
                  )}
                  <Link href={ctaHref} onClick={() => setMobileMenuOpen(false)} className={buttonVariants({ className: "w-full justify-center rounded-xl font-bold py-6 text-lg bg-gradient-to-r from-primary to-orange-500 text-white shadow-lg shadow-primary/20" })}>
                    {ctaText}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
