"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 1000;

    const lenis = new Lenis({
      duration: isMobile ? 0.8 : 1.2,
      lerp: isMobile ? 0.075 : 0.1,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: isMobile ? 1.5 : 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    lenisRef.current = lenis;
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as Record<string, unknown>).__lenis;
    };
  }, []);

  return null;
}
