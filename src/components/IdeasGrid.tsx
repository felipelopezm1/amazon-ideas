"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";

type Idea = {
  id: string;
  cities: string[];
  domains: string[];
  phase: string;
  title: Record<string, string>;
  summary: Record<string, string>;
};

type FilterLabels = {
  all: string;
  bioeconomy: string;
  ai: string;
  iot: string;
  web3: string;
  hci: string;
  indigenous_partnership: string;
  connectivity: string;
};

type Props = {
  title: string;
  subtitle: string;
  ideas: Idea[];
  locale: string;
  filters: FilterLabels;
  selectedCity: string;
};

const filterKeys: Array<keyof FilterLabels> = [
  "all", "bioeconomy", "ai", "iot", "web3", "hci", "indigenous_partnership", "connectivity",
];

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80",
  "https://images.unsplash.com/photo-1501004318855-e73f5adbbdab?w=600&q=80",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80",
  "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
];

const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export default function IdeasGrid({ title, subtitle, ideas, locale, filters, selectedCity }: Props) {
  const [activeFilter, setActiveFilter] = useState<keyof FilterLabels>("all");
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);

  const visible = useMemo(() => {
    return ideas.filter((idea) => {
      const city = selectedCity ? idea.cities.includes(selectedCity) : true;
      const tag = activeFilter === "all" || idea.domains.includes(activeFilter);
      return city && tag;
    });
  }, [activeFilter, ideas, selectedCity]);

  return (
    <section id="ideas" className="mx-auto max-w-[1200px] px-6 py-32">
      <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:items-start">
        <div>
          <p className="label text-white/35">Projects</p>
          <h2 className="section-heading mt-4 text-white">
            <em>Idea</em> Bank
          </h2>
          <p className="mt-5 text-[0.92rem] leading-relaxed text-white/40">{subtitle}</p>

          <div className="mt-8 flex flex-col gap-1">
            {filterKeys.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveFilter(key)}
                className={`rounded-lg px-3 py-2 text-left text-[0.72rem] font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
                  activeFilter === key
                    ? "bg-white/8 text-white"
                    : "text-white/30 hover:text-white/55"
                }`}
              >
                {filters[key]}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((idea, i) => (
              <motion.article
                key={idea.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="dark-card cursor-pointer p-6 transition-colors duration-300 hover:bg-white/[0.06]"
                onClick={() => setSelectedIdea(idea)}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/6 px-2.5 py-1 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-white/35">
                    {idea.phase}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/20">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
                <h3 className="mt-4 text-[0.95rem] font-semibold leading-snug text-white/90">
                  {idea.title[locale]}
                </h3>
                <p className="mt-2.5 text-[0.82rem] leading-relaxed text-white/40">
                  {idea.summary[locale]}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {idea.domains.map((d) => (
                    <span
                      key={d}
                      className="rounded-full bg-white/4 px-2.5 py-1 text-[0.58rem] font-medium text-white/30"
                    >
                      {filters[d as keyof FilterLabels]}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Idea Detail Modal ── */}
      <AnimatePresence>
        {selectedIdea && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-[var(--color-dark)]/80 backdrop-blur-md"
              onClick={() => setSelectedIdea(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/8 bg-[#0f2520] shadow-2xl"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Hero image */}
              <div className="relative h-52 overflow-hidden rounded-t-2xl">
                <img
                  src={PLACEHOLDER_IMAGES[ideas.indexOf(selectedIdea) % PLACEHOLDER_IMAGES.length]}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2520] via-[#0f2520]/40 to-transparent" />
                <button
                  onClick={() => setSelectedIdea(null)}
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white/60 backdrop-blur-sm transition-colors hover:bg-black/50 hover:text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute bottom-5 left-7">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-white/50 backdrop-blur-sm">
                    {selectedIdea.phase}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <h3 className="text-xl font-semibold text-white">
                  {selectedIdea.title[locale]}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-white/55">
                  {selectedIdea.summary[locale]}
                </p>

                <hr className="my-6 border-white/6" />

                <div className="space-y-4">
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-white/25">
                    Details
                  </p>
                  <p className="text-[0.88rem] leading-[1.8] text-white/40">
                    {LOREM}
                  </p>
                </div>

                <hr className="my-6 border-white/6" />

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedIdea.domains.map((d) => (
                      <span
                        key={d}
                        className="rounded-full bg-white/5 px-3 py-1.5 text-[0.62rem] font-medium text-white/35"
                      >
                        {filters[d as keyof FilterLabels]}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-1.5">
                    {selectedIdea.cities.map((c) => (
                      <span
                        key={c}
                        className="rounded-full bg-[var(--color-gold)]/8 px-3 py-1.5 text-[0.62rem] font-semibold text-[var(--color-gold)]/60"
                      >
                        {c.replace("_", " ")}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
