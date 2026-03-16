"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Node {
  id: string;
  label: string;
  desc: string;
  cx: number;
  cy: number;
  r: number;
  tier: "center" | "primary" | "secondary";
  parent?: string;
}

const NODES: Node[] = [
  {
    id: "pilot",
    label: "Leticia Pilot",
    desc: "Based at Reserva Natural Aguas Claras (~20 km from Leticia), this community-first pilot integrates indigenous knowledge, creative technology, and regenerative economics in the tri-border zone — 15 hectares of tropical rainforest, ecological trails, and living infrastructure for the corridor's first node.",
    cx: 400, cy: 260, r: 54, tier: "center",
  },
  // Primary ring
  {
    id: "communities",
    label: "Indigenous\nPartnerships",
    desc: "Ticuna resguardos, local families, and chagra keepers co-designing every layer of the corridor. Their knowledge is the root system.",
    cx: 165, cy: 140, r: 42, tier: "primary", parent: "pilot",
  },
  {
    id: "technology",
    label: "Creative\nTechnology",
    desc: "TouchDesigner installations, IoT sensors, AI translation, and immersive experiences that make the Amazon's invisible systems tangible.",
    cx: 635, cy: 140, r: 42, tier: "primary", parent: "pilot",
  },
  {
    id: "connectivity",
    label: "River\nConnectivity",
    desc: "Solar-powered mesh networks, co-working hubs, and learning labs creating the digital infrastructure for remote communities.",
    cx: 165, cy: 385, r: 42, tier: "primary", parent: "pilot",
  },
  {
    id: "ecosystem",
    label: "Mixed-Value\nEcosystem",
    desc: "Bio-economy markets, NFC souvenirs, and impact treasuries turning tourism into sustainable community-owned development.",
    cx: 635, cy: 385, r: 42, tier: "primary", parent: "pilot",
  },
  {
    id: "governance",
    label: "Shared\nGovernance",
    desc: "Community-directed funds, transparent smart contracts, and the Nomad Bio-Pass ensuring shared ownership of every outcome.",
    cx: 400, cy: 78, r: 36, tier: "primary", parent: "pilot",
  },
  // Leaves — Communities
  {
    id: "ticuna", label: "Ticuna\nResguardos",
    desc: "Indigenous governance structures guiding cultural protocols and land stewardship across the corridor.",
    cx: 55, cy: 60, r: 26, tier: "secondary", parent: "communities",
  },
  {
    id: "families", label: "Local\nFamilies",
    desc: "Host families and cooperative guides trained through Chagra Learning Labs, earning directly from nomad residencies.",
    cx: 62, cy: 210, r: 26, tier: "secondary", parent: "communities",
  },
  {
    id: "chagra_keepers", label: "Chagra\nKeepers",
    desc: "Elders sharing botanical wisdom, seed conservation, and cyclical farming knowledge at the core of the design framework.",
    cx: 238, cy: 50, r: 26, tier: "secondary", parent: "communities",
  },
  // Leaves — Technology
  {
    id: "installations", label: "Immersive\nArt",
    desc: "Wearable biofeedback installations and transparent screen overlays visualizing real-time environmental data through TouchDesigner.",
    cx: 562, cy: 50, r: 26, tier: "secondary", parent: "technology",
  },
  {
    id: "iot", label: "IoT\nSensors",
    desc: "ESP32/Raspberry Pi gateways monitoring rain, humidity, river levels, and biodiversity acoustics across the forest.",
    cx: 738, cy: 60, r: 26, tier: "secondary", parent: "technology",
  },
  {
    id: "ai_tools", label: "AI &\nTranslation",
    desc: "Language preservation tools, auto-translation for cultural workshops, and GenAI-adapted visualizations.",
    cx: 745, cy: 210, r: 26, tier: "secondary", parent: "technology",
  },
  // Leaves — Connectivity
  {
    id: "mesh", label: "Signal\nMesh",
    desc: "Solar-powered micro-connectivity nodes along river routes, providing internet to eco-lodges and remote communities.",
    cx: 55, cy: 320, r: 26, tier: "secondary", parent: "connectivity",
  },
  {
    id: "hubs", label: "Co-working\nHubs",
    desc: "Seasonal co-living and co-working stations embedded in communities along the Solarpunk Residency Circuit.",
    cx: 62, cy: 462, r: 26, tier: "secondary", parent: "connectivity",
  },
  {
    id: "labs", label: "Learning\nLabs",
    desc: "Community-led maker spaces combining digital fabrication, creative coding, and traditional ecological knowledge.",
    cx: 248, cy: 470, r: 26, tier: "secondary", parent: "connectivity",
  },
  // Leaves — Ecosystem
  {
    id: "biomarket", label: "Bio-economy\nMarket",
    desc: "Blockchain-verified marketplace for forest products — açaí, essential oils, crafts — with origin proof and fair-pay contracts.",
    cx: 552, cy: 470, r: 26, tier: "secondary", parent: "ecosystem",
  },
  {
    id: "nfc", label: "NFC\nSouvenirs",
    desc: "Eco-friendly blind box collectibles with NFC tags linking to personalized digital experiences and artisan stories.",
    cx: 738, cy: 462, r: 26, tier: "secondary", parent: "ecosystem",
  },
  {
    id: "treasury", label: "Impact\nTreasury",
    desc: "Decentralized community fund — tourism revenue automatically allocated to education, internet, and local enterprise.",
    cx: 745, cy: 320, r: 26, tier: "secondary", parent: "ecosystem",
  },
];

const TIER_STYLE = {
  center: { fill: "var(--color-pine)", stroke: "var(--color-pine)", text: "#faf8f4", fontSize: 10.5, fontWeight: 700 },
  primary: { fill: "var(--color-cream)", stroke: "var(--color-pine)", text: "var(--color-text-primary)", fontSize: 8.5, fontWeight: 600 },
  secondary: { fill: "var(--color-sun)", stroke: "var(--color-border)", text: "var(--color-text-secondary)", fontSize: 6.8, fontWeight: 500 },
} as const;

function getFamily(id: string): Set<string> {
  const s = new Set<string>();
  s.add(id);
  const node = NODES.find((n) => n.id === id);
  if (node?.parent) {
    s.add(node.parent);
    NODES.filter((n) => n.parent === node.parent).forEach((n) => s.add(n.id));
  }
  NODES.filter((n) => n.parent === id).forEach((n) => s.add(n.id));
  if (node?.tier === "center") NODES.filter((n) => n.parent === id).forEach((n) => s.add(n.id));
  return s;
}

export default function ChagraDiagram() {
  const [active, setActive] = useState<string | null>(null);
  const activeNode = NODES.find((n) => n.id === active);

  const family = useMemo(() => (active ? getFamily(active) : null), [active]);

  const edges = useMemo(
    () =>
      NODES.filter((n) => n.parent).map((n) => {
        const p = NODES.find((nd) => nd.id === n.parent)!;
        return { key: `${p.id}-${n.id}`, x1: p.cx, y1: p.cy, x2: n.cx, y2: n.cy, childId: n.id, parentId: p.id };
      }),
    [],
  );

  return (
    <div className="mt-10 sm:mt-14 lg:mt-16">
      <p className="mb-4 text-center text-[0.5rem] font-bold uppercase tracking-[0.3em] text-[var(--color-text-secondary)]/40 sm:mb-6 sm:text-[0.55rem]">
        Leticia Pilot — Chagra Network Model
      </p>

      <div className="relative mx-auto overflow-x-auto" style={{ maxWidth: 820 }}>
        <svg viewBox="0 0 800 520" className="w-full min-w-[500px]" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Edges */}
          {edges.map((e) => {
            const highlighted = family?.has(e.childId) && family?.has(e.parentId);
            const dimmed = family !== null && !highlighted;
            return (
              <line
                key={e.key}
                x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
                stroke="var(--color-pine)"
                strokeWidth={highlighted ? 1.5 : 0.7}
                strokeDasharray="6 5"
                opacity={dimmed ? 0.08 : 0.3}
                className="chagra-edge transition-all duration-500"
              />
            );
          })}

          {/* Center pulse rings */}
          <circle cx={400} cy={260} r={62} fill="none" stroke="var(--color-pine)" strokeWidth={0.4} opacity={0.15} className="chagra-pulse-ring" />
          <circle cx={400} cy={260} r={74} fill="none" stroke="var(--color-pine)" strokeWidth={0.3} opacity={0.08} className="chagra-pulse-ring-slow" />

          {/* Nodes */}
          {NODES.map((node) => {
            const s = TIER_STYLE[node.tier];
            const isActive = active === node.id;
            const dimmed = family !== null && !family.has(node.id);
            const lines = node.label.split("\n");

            return (
              <g
                key={node.id}
                className="cursor-pointer"
                style={{ opacity: dimmed ? 0.2 : 1, transition: "opacity 0.4s ease" }}
                onMouseEnter={() => setActive(node.id)}
                onMouseLeave={() => setActive(null)}
              >
                {/* Hover ring */}
                {isActive && (
                  <circle
                    cx={node.cx} cy={node.cy} r={node.r + 7}
                    fill="none" stroke={s.stroke} strokeWidth={0.6}
                    strokeDasharray="4 3" opacity={0.35}
                  />
                )}
                {/* Main circle */}
                <circle
                  cx={node.cx} cy={node.cy} r={node.r}
                  fill={s.fill} stroke={s.stroke}
                  strokeWidth={isActive ? 2 : node.tier === "secondary" ? 0.8 : 1.2}
                  strokeDasharray={node.tier === "secondary" ? "3 2" : "none"}
                  style={{ transition: "stroke-width 0.3s ease" }}
                  filter={isActive && node.tier === "center" ? "url(#glow)" : undefined}
                />
                {/* Label */}
                <text
                  x={node.cx} y={node.cy}
                  textAnchor="middle" dominantBaseline="central"
                  fill={s.text}
                  fontSize={s.fontSize} fontWeight={s.fontWeight}
                  letterSpacing={node.tier === "center" ? "0.05em" : "0.02em"}
                  style={{ pointerEvents: "none" }}
                >
                  {lines.length > 1
                    ? lines.map((l, i) => (
                        <tspan key={i} x={node.cx} dy={i === 0 ? `${-(lines.length - 1) * 0.55}em` : "1.15em"}>
                          {l}
                        </tspan>
                      ))
                    : node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        <AnimatePresence>
          {activeNode && (
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute bottom-2 left-1/2 w-[95%] max-w-md -translate-x-1/2 rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] px-4 py-3 shadow-sm sm:bottom-4 sm:w-[90%] sm:px-5 sm:py-4"
            >
              <p className="text-[0.55rem] font-bold uppercase tracking-[0.25em] text-[var(--color-pine)]">
                {activeNode.label.replace(/\n/g, " ")}
              </p>
              <p className="mt-1.5 text-[0.82rem] leading-relaxed text-[var(--color-text-secondary)]">
                {activeNode.desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
