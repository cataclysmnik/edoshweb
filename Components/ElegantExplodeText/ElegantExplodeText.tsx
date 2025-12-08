"use client"
import React, { useRef, useEffect, useState } from "react";

interface ElegantExplodeTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function ElegantExplodeText({ children, className }: ElegantExplodeTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowHeight - 60 && rect.bottom > 60) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Animate orange text shimmer
  useEffect(() => {
    if (!ref.current) return;
    const orangeSpans = ref.current.querySelectorAll(".text-orange-400");
    orangeSpans.forEach(span => {
      (span as HTMLElement).classList.add("elegant-shimmer");
    });
    return () => {
      orangeSpans.forEach(span => {
        (span as HTMLElement).classList.remove("elegant-shimmer");
      });
    };
  }, [visible]);

  return (
    <div
      ref={ref}
      className={`elegant-gradient-text ${className ?? ""} select-none transition-all duration-700${visible ? " opacity-100 translate-y-0 scale-105 elegant-glow" : " opacity-0 translate-y-8 scale-100"}`}
      style={{ transitionProperty: "opacity, transform, filter" }}
    >
      {children}
    </div>
  );
}