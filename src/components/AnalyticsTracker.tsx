"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("_dtx_vid");
  if (!id) {
    id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem("_dtx_vid", id);
  }
  return id;
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const lastPath = useRef("");

  useEffect(() => {
    const visitorId = getVisitorId();
    if (!visitorId) return;

    // Only send pageview if the path actually changed
    if (pathname !== lastPath.current) {
      lastPath.current = pathname;

      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId,
          path: pathname,
          referrer: document.referrer || null,
          type: "pageview",
        }),
      }).catch(() => {});
    }

    // Heartbeat every 25 seconds to keep visitor "active"
    const heartbeat = setInterval(() => {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId,
          path: pathname,
          type: "heartbeat",
        }),
      }).catch(() => {});
    }, 25_000);

    return () => clearInterval(heartbeat);
  }, [pathname]);

  return null; // invisible component
}
