"use client";

import { useEffect, useState } from "react";

const waypoints = [0, 0.08, 0.18, 0.3, 0.5, 0.65, 0.78, 0.92, 1];

export default function ScrollTrail() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? y / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed left-4 top-0 z-30 hidden h-screen 2xl:block"
      style={{ width: 3 }}
    >
      {/* Background dashed track */}
      <div className="trail-track absolute inset-0" />
      {/* Progress fill */}
      <div
        className="trail-fill absolute left-0 top-0 w-full"
        style={{ height: `${progress * 100}%` }}
      />
      {/* Waypoint dots */}
      {waypoints.map((wp, i) => (
        <div
          key={i}
          className="absolute left-1/2 -translate-x-1/2 rounded-full transition-all duration-700"
          style={{
            top: `${wp * 100}%`,
            width: progress >= wp ? 7 : 3,
            height: progress >= wp ? 7 : 3,
            background:
              progress >= wp
                ? "var(--color-gold)"
                : "rgba(42, 102, 102, 0.15)",
            boxShadow:
              progress >= wp
                ? "0 0 12px rgba(254,213,131,0.5)"
                : "none",
          }}
        />
      ))}
    </div>
  );
}
