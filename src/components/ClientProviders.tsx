"use client";
import React from "react";
import { usePathname } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageTransition from "@/components/PageTransition";
import { OfferPopup } from "@/components/ui/OfferPopup";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard") || pathname.startsWith("/sign-in");

  return (
    <>
      <LoadingScreen />
      <PageTransition>{children}</PageTransition>
      <ScrollToTop />
      {!isDashboard && <WhatsAppButton />}
      {!isDashboard && <OfferPopup />}
    </>
  );
}
