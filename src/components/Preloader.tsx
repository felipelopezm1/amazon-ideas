"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

const PRELOADER_KEY = "chagraPreloaderSeen";

export default function Preloader() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;

    const hasSeen = sessionStorage.getItem(PRELOADER_KEY) === "true";

    if (hasSeen) {
      return;
    }

    setVisible(true);

    const progressIndicator = document.querySelector(
      ".preloader-progress-indicator"
    ) as HTMLElement;
    const progressText = document.querySelector(
      ".preloader-progress-text"
    ) as HTMLElement;
    const progressBar = document.querySelector(
      ".preloader-progress-bar"
    ) as HTMLElement;
    const preloader = document.querySelector(".preloader") as HTMLElement;
    const blocks = document.querySelectorAll(".preloader-block");

    if (!progressIndicator || !progressText || !progressBar || !preloader)
      return;

    gsap.to(progressBar, {
      opacity: 1,
      duration: 0.15,
      delay: 0.5,
    });

    let currentProgress = 0;
    const totalSteps = 5;
    let stepCount = 0;

    const generateIncrements = () => {
      const inc: number[] = [];
      let remaining = 100;
      for (let i = 0; i < totalSteps - 1; i++) {
        const maxIncrement = Math.min(30, remaining - (totalSteps - 1 - i));
        const minIncrement = Math.max(
          5,
          Math.floor((remaining / (totalSteps - i)) * 0.5)
        );
        const val =
          Math.floor(Math.random() * (maxIncrement - minIncrement)) +
          minIncrement;
        inc.push(val);
        remaining -= val;
      }
      inc.push(remaining);
      return inc.sort(() => Math.random() - 0.5);
    };

    const increments = generateIncrements();

    const animateNext = () => {
      if (stepCount >= totalSteps) {
        sessionStorage.setItem(PRELOADER_KEY, "true");
        const shuffled = [...blocks].sort(() => Math.random() - 0.5);
        shuffled.forEach((block, i) => {
          gsap.to(block, {
            opacity: 0,
            duration: 0.075,
            delay: i * 0.025,
            repeat: 1,
            yoyo: true,
            onComplete: () => {
              (block as HTMLElement).style.opacity = "0";
              if (i === shuffled.length - 1) {
                preloader.style.display = "none";
              }
            },
          });
        });
        return;
      }

      const target = Math.min(
        currentProgress + increments[stepCount],
        100
      );
      const delay = 200 + Math.random() * 400;

      setTimeout(() => {
        gsap.to(progressIndicator, {
          "--progress": target / 100,
          overwrite: true,
          duration: 0.5,
          ease: "power2.out",
          onUpdate: () => {
            const v = Math.round(
              (gsap.getProperty(progressIndicator, "--progress") as number) * 100
            );
            progressText.textContent = `${v}%`;
          },
          onComplete: () => {
            currentProgress = target;
            stepCount++;
            animateNext();
          },
        });
      }, delay);
    };

    setTimeout(animateNext, 600);
  }, [mounted, visible]);

  if (!mounted || !visible) return null;

  return (
    <div className="preloader fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-[var(--color-dark)] p-8">
      <div className="preloader-grid absolute inset-0 grid grid-cols-4 grid-rows-3 -z-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="preloader-block bg-[var(--color-text-primary)] opacity-100"
          />
        ))}
      </div>

      <div className="preloader-progress-bar flex w-1/2 max-w-md flex-col gap-2 opacity-0">
        <div
          className="preloader-progress-indicator relative h-[1.25px] w-full rounded-full bg-white/15"
          style={{ ["--progress" as string]: 0 } as React.CSSProperties}
        />
        <div className="flex justify-between text-[0.65rem] uppercase tracking-[0.2em] text-white/60">
          <span>Loading</span>
          <span className="preloader-progress-text">0%</span>
        </div>
      </div>
    </div>
  );
}
