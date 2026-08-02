"use client";

import { type ReactNode } from "react";

interface CountUpProps {
  target: string;
  className?: string;
}

export function CountUp({ target, className = "" }: CountUpProps) {
  return (
    <span className={className}>
      {target}
    </span>
  );
}
