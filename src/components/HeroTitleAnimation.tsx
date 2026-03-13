"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function HeroTitleAnimation() {
  useEffect(() => {
    const el = document.querySelector("[data-hero-title]");
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        delay: 0.15,
        ease: "power3.out",
      }
    );
  }, []);

  return null;
}
