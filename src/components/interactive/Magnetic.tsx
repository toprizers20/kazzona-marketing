"use client";

import { type ReactNode, useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({ children, className = "", strength = 0.3 }: MagneticProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
