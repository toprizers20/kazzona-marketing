"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glareColor?: string;
}

export function TiltCard({ children, className = "", glareColor = "rgba(252,74,26,0.08)" }: TiltCardProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
}
