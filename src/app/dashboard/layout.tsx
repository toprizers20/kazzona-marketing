"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BarChart3, 
  PenTool, 
  Users, 
  Search, 
  Zap, 
  Star, 
  CreditCard, 
  Blocks, 
  Settings,
  Shield,
  LogOut,
  PanelTop,
  Menu
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { logoutAction } from "@/app/actions/auth";

const sidebarLinks = [
  { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
  { name: "Content CMS", icon: PenTool, href: "/dashboard/content" },
  { name: "Header & Footer", icon: PanelTop, href: "/dashboard/header-footer" },
  { name: "Lead CRM", icon: Users, href: "/dashboard/crm" },
  { name: "SEO Center", icon: Search, href: "/dashboard/seo" },
  { name: "Automations", icon: Zap, href: "/dashboard/automations" },
  { name: "Testimonials", icon: Star, href: "/dashboard/testimonials" },
  { name: "Pricing", icon: CreditCard, href: "/dashboard/pricing" },
  { name: "Ops", icon: Shield, href: "/dashboard/ops" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is authenticated by trying to fetch a protected resource
    fetch("/api/auth/check")
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          window.location.href = "/sign-in";
        }
      })
      .catch(() => {
        window.location.href = "/sign-in";
      });
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen bg-background items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center px-6 border-b border-border/40">
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
            D
          </div>
          <span className="font-heading font-bold text-lg tracking-tight">
            Kazzona <span className="text-primary font-normal">OS</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1 custom-scrollbar">
        {sidebarLinks.map((link) => {
          const isActive = link.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(link.href);
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'}`}
            >
              <link.icon className="w-4 h-4" />
              {link.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">
            A
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-sm font-medium truncate">Dashboard Access</span>
            <span className="text-xs text-muted-foreground truncate">Admin Mode</span>
          </div>
          <Link href="/dashboard/settings" onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-primary transition-colors shrink-0">
            <Settings className="w-4 h-4" />
          </Link>
          <form action={logoutAction} className="shrink-0">
            <button type="submit" className="text-muted-foreground hover:text-destructive transition-colors flex items-center">
              <LogOut className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-border/40 bg-card hidden md:flex flex-col">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden w-full">
        <header className="h-16 border-b border-border/40 bg-background flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground cursor-pointer flex items-center justify-center">
                <Menu className="w-5 h-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0 flex flex-col bg-card border-r-border/40">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <h1 className="text-lg font-semibold font-heading hidden sm:block">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="text-sm text-muted-foreground hover:text-foreground">View Website</Link>
          </div>
        </header>
        <div className="flex-1 overflow-auto bg-secondary/5 p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
