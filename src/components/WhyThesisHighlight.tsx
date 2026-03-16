"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = { points: string[] };

export default function WhyThesisHighlight({ points }: Props) {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean);
    const triggers: ScrollTrigger[] = [];
    rows.forEach((row) => {
      const numEl = row?.querySelector<HTMLElement>("[data-thesis-num]");
      if (!numEl) return;

      const st = ScrollTrigger.create({
        trigger: row,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.to(numEl, {
            backgroundColor: "var(--color-pine)",
            color: "white",
            duration: 0.4,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(numEl, {
            backgroundColor: "transparent",
            color: "rgba(90, 107, 78, 0.25)",
            duration: 0.3,
            ease: "power2.out",
          });
        },
        onLeave: () => {
          gsap.to(numEl, {
            backgroundColor: "transparent",
            color: "rgba(90, 107, 78, 0.25)",
            duration: 0.3,
            ease: "power2.out",
          });
        },
        onEnterBack: () => {
          gsap.to(numEl, {
            backgroundColor: "var(--color-pine)",
            color: "white",
            duration: 0.4,
            ease: "power2.out",
          });
        },
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [points.length]);

  return (
    <div className="space-y-0">
      {points.map((point, i) => (
        <div key={point}>
          {i > 0 && <hr className="divider-thin" />}
          <div
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className="group -mx-4 flex gap-4 px-4 py-5 transition-colors duration-300 hover:bg-[var(--color-pine)] sm:-mx-6 sm:gap-6 sm:px-6 sm:py-8"
          >
            <span
              data-thesis-num
              className="font-stylish mt-0.5 inline-flex h-8 min-w-8 items-center justify-center rounded px-1 text-[1.5rem] font-extralight leading-none transition-colors group-hover:bg-white/10 group-hover:text-white sm:h-10 sm:min-w-10 sm:text-[2rem]"
              style={{ color: "rgba(90, 107, 78, 0.25)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="font-stylish text-[0.88rem] leading-[1.75] text-[var(--color-text-secondary)] transition-colors group-hover:text-white/95 sm:text-[1rem]">
              {point}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
