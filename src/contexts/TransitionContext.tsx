"use client";

import React, { createContext, useCallback, useContext, useRef } from "react";
import gsap from "gsap";

const TransitionContext = createContext<{
  playIn: (onComplete?: () => void) => void;
  playOut: (onComplete?: () => void) => void;
} | null>(null);

export function useTransition() {
  const ctx = useContext(TransitionContext);
  return ctx;
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const gridRef = useRef<HTMLDivElement>(null);

  const playIn = useCallback((onComplete?: () => void) => {
    const grid = gridRef.current;
    if (!grid) {
      onComplete?.();
      return;
    }
    const blocks = grid.querySelectorAll(".transition-block");
    if (!blocks.length) {
      onComplete?.();
      return;
    }
    (grid as HTMLElement).style.pointerEvents = "auto";
    (grid as HTMLElement).style.zIndex = "99999";
    gsap.set(blocks, { opacity: 0 });
    const shuffled = [...blocks].sort(() => Math.random() - 0.5);
    shuffled.forEach((block, i) => {
      gsap.to(block, {
        opacity: 1,
        duration: 0.065,
        delay: i * 0.02,
        repeat: 1,
        yoyo: true,
        ease: "power2.inOut",
        onComplete:
          i === shuffled.length - 1
            ? () => {
                (grid as HTMLElement).style.pointerEvents = "none";
                (grid as HTMLElement).style.zIndex = "0";
                onComplete?.();
              }
            : undefined,
      });
    });
  }, []);

  const playOut = useCallback((onComplete?: () => void) => {
    const grid = gridRef.current;
    if (!grid) {
      onComplete?.();
      return;
    }
    const blocks = grid.querySelectorAll(".transition-block");
    if (!blocks.length) {
      (grid as HTMLElement).style.pointerEvents = "none";
      (grid as HTMLElement).style.zIndex = "0";
      onComplete?.();
      return;
    }
    const shuffled = [...blocks].sort(() => Math.random() - 0.5);
    shuffled.forEach((block, i) => {
      gsap.to(block, {
        opacity: 0,
        duration: 0.05,
        delay: i * 0.018,
        repeat: 1,
        yoyo: true,
        ease: "power2.inOut",
        onComplete:
          i === shuffled.length - 1
            ? () => {
                (grid as HTMLElement).style.pointerEvents = "none";
                (grid as HTMLElement).style.zIndex = "0";
                onComplete?.();
              }
            : undefined,
      });
    });
  }, []);

  return (
    <TransitionContext.Provider value={{ playIn, playOut }}>
      {children}
      <div
        ref={gridRef}
        className="transition-grid"
        aria-hidden
        style={{ pointerEvents: "none", zIndex: 0 } as React.CSSProperties}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="transition-block" />
        ))}
      </div>
    </TransitionContext.Provider>
  );
}
