"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 1000;

    const lenis = new Lenis({
      duration: isMobile ? 0.8 : 1.2,
      lerp: isMobile ? 0.075 : 0.1,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: isMobile ? 1.5 : 2,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    lenisRef.current = lenis;

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
}
