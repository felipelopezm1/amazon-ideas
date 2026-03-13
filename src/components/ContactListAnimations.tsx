"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GAP_MIN = 0.5;
const GAP_MAX = 2.5;

export default function ContactListAnimations() {
  useEffect(() => {
    const section = document.querySelector("#contact");
    if (!section) return;

    const rows = section.querySelectorAll(".contact-info-row");

    rows.forEach((row) => {
      ScrollTrigger.create({
        trigger: row,
        start: "top 75%",
        end: "top 45%",
        scrub: true,
        onUpdate: (self) => {
          const gap = GAP_MIN + (GAP_MAX - GAP_MIN) * self.progress;
          (row as HTMLElement).style.gap = `${gap}rem`;
        },
      });

      ScrollTrigger.create({
        trigger: row,
        start: "top 50%",
        end: "top 20%",
        scrub: true,
        onUpdate: (self) => {
          const gap = GAP_MAX - (GAP_MAX - GAP_MIN) * self.progress;
          (row as HTMLElement).style.gap = `${gap}rem`;
        },
      });
    });

    return () => {
      rows.forEach((row) => {
        (row as HTMLElement).style.gap = "";
      });
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
