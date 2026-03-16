"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Ports", href: "#ports" },
  { label: "COP30", href: "#cop30" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Ideas", href: "#ideas" },
  { label: "Chagra", href: "#chagra" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Toggle menu"
        className="flex h-8 w-8 items-center justify-center lg:hidden"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="relative h-4 w-5">
          <span
            className={`absolute left-0 top-0 h-[1.5px] w-full bg-[var(--color-text-primary)] transition-all duration-300 ${
              open ? "top-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-[7px] h-[1.5px] w-full bg-[var(--color-text-primary)] transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`absolute bottom-0 left-0 h-[1.5px] w-full bg-[var(--color-text-primary)] transition-all duration-300 ${
              open ? "bottom-[7px] -rotate-45" : ""
            }`}
          />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm lg:hidden"
              onClick={close}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              className="fixed right-0 top-0 z-50 flex h-full w-[280px] max-w-[80vw] flex-col bg-[var(--color-cream)] shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4">
                <span className="text-[0.65rem] font-bold tracking-[0.3em] text-[var(--color-text-primary)]">
                  MENU
                </span>
                <button type="button" aria-label="Close menu" onClick={close} className="flex h-8 w-8 items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    className="rounded-lg px-4 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-pine)]/5 hover:text-[var(--color-pine)]"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              <div className="border-t border-[var(--color-border)] px-6 py-5">
                <p className="text-[0.55rem] font-medium tracking-[0.2em] text-[var(--color-text-secondary)]/50">
                  CHAGRA—NET &middot; 2026
                </p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
