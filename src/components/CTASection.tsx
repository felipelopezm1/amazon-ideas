"use client";

import { useState } from "react";
import ContactModal from "./ContactModal";
import { useTransition } from "@/contexts/TransitionContext";

interface CTASectionProps {
  title: string;
  body: string;
  primaryLabel: string;
  secondaryLabel: string;
}

export default function CTASection({
  title,
  body,
  primaryLabel,
  secondaryLabel,
}: CTASectionProps) {
  const [modal, setModal] = useState<"partner" | "resident" | null>(null);
  const transition = useTransition();

  const openModal = (type: "partner" | "resident") => {
    if (transition) {
      transition.playIn(() => setModal(type));
    } else {
      setModal(type);
    }
  };

  const closeModal = () => {
    setModal(null);
    transition?.playOut();
  };

  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-32 pt-8">
      <div className="relative overflow-hidden rounded-2xl bg-[var(--color-dark)] px-8 py-20 text-center lg:px-16 lg:py-28">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-[var(--color-pine)] opacity-20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-[250px] w-[250px] rounded-full bg-[var(--color-gold)] opacity-15 blur-[80px]" />

        {/* Decorative dotted accent lines — thick white */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            d="M -5 75 C 20 70, 35 85, 55 72 C 75 60, 90 78, 105 65"
            stroke="white"
            strokeWidth="0.5"
            strokeDasharray="1.2 0.8"
            strokeLinecap="round"
            opacity="0.6"
            className="trail-path-flow"
          />
          <path
            d="M -5 25 C 15 32, 40 15, 60 28 C 80 40, 95 22, 105 30"
            stroke="white"
            strokeWidth="0.4"
            strokeDasharray="1 0.8"
            strokeLinecap="round"
            opacity="0.5"
            className="trail-path-flow-slow"
          />
        </svg>

        <div className="relative">
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.25em] text-white" data-animate="fade">Join Us</p>
          <h2 className="section-heading mx-auto mt-4 max-w-xl text-white" data-animate="slide">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[0.95rem] leading-relaxed text-white/50">
            {body}
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => openModal("partner")}
              className="rounded-full bg-white px-7 py-3.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--color-dark)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,255,255,0.15)]"
            >
              {primaryLabel}
            </button>
            <button
              type="button"
              onClick={() => openModal("resident")}
              className="rounded-full border border-white/15 px-7 py-3.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/70 transition-all duration-300 hover:border-white/40 hover:-translate-y-0.5"
            >
              {secondaryLabel}
            </button>
          </div>
        </div>
      </div>

      <ContactModal
        type={modal || "partner"}
        open={modal !== null}
        onClose={closeModal}
      />
    </section>
  );
}
