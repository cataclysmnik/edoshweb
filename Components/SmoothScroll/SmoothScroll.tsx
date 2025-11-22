"use client";

import React, { useEffect, useRef } from "react";

interface SmoothScrollProps {
  children: React.ReactNode;
  ease?: number; // 0-1, higher is snappier
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children, ease = 0.08 }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const currentRef = useRef(0);
  const targetRef = useRef(0);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    let resizeObserver: ResizeObserver | null = null;

    const setBodyHeight = () => {
      document.body.style.height = `${content.getBoundingClientRect().height}px`;
    };

    setBodyHeight();

    // update body height on resize
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => setBodyHeight());
      resizeObserver.observe(content);
    }

    const onScroll = () => {
      targetRef.current = window.scrollY || window.pageYOffset;
      // ensure RAF loop running
      startRaf();
    };

    const startRaf = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    const loop = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      const delta = target - current;
      const next = Math.abs(delta) < 0.1 ? target : current + delta * ease;
      currentRef.current = next;
      if (content) {
        content.style.transform = `translate3d(0, -${next}px, 0)`;
      }
      if (Math.abs(delta) > 0.1) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        if (rafRef.current != null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", setBodyHeight);

    // initialize
    targetRef.current = window.scrollY || window.pageYOffset;
    currentRef.current = targetRef.current;
    if (content) content.style.willChange = "transform";
    content.style.transform = `translate3d(0, -${targetRef.current}px, 0)`;

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", setBodyHeight);
      if (resizeObserver) resizeObserver.disconnect();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      document.body.style.height = "";
      if (content) content.style.transform = "";
    };
  }, [ease]);

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden" }}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
};

export default SmoothScroll;
