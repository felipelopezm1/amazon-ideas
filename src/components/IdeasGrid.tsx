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

export default function IdeasGrid({ title, subtitle, ideas, locale, filters, selectedCity }: Props) {
  const [activeFilter, setActiveFilter] = useState<keyof FilterLabels>("all");

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
                className="dark-card p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/6 px-2.5 py-1 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-white/35">
                    {idea.phase}
                  </span>
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
    </section>
  );
}
