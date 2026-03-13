"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false },
);
const MapFlyTo = dynamic(() => import("./MapFlyTo"), { ssr: false });
const MapMarkers = dynamic(() => import("./MapMarkers"), { ssr: false });

type CityId = "leticia" | "la_pedrera" | "manaus" | "belem";

type CityCopy = { challenge: string; opportunity: string; phase: string };
type RoadmapCopy = {
  title: string;
  instructions: string;
  phaseLabel: string;
  allIdeasTitle: string;
  cityCards: Record<CityId, CityCopy>;
};
type Idea = {
  id: string;
  cities: string[];
  domains: string[];
  phase: string;
  title: Record<string, string>;
  summary: Record<string, string>;
  details?: Record<string, string>;
};

type Props = {
  roadmapCopy: RoadmapCopy;
  ideas: Idea[];
  locale: string;
  onCityChange: (city: CityId) => void;
};

const GLOBE_VIEW = { lat: -8, lng: -55, zoom: 3 };
const REGION_VIEW = { lat: -2.5, lng: -60, zoom: 5 };

const cities: Array<{
  id: CityId;
  label: string;
  country: string;
  lat: number;
  lng: number;
  zoom: number;
}> = [
  { id: "leticia", label: "Leticia", country: "CO", lat: -4.215, lng: -69.94, zoom: 8 },
  { id: "la_pedrera", label: "La Pedrera", country: "CO", lat: -1.325, lng: -69.595, zoom: 8 },
  { id: "manaus", label: "Manaus", country: "BR", lat: -3.119, lng: -60.022, zoom: 8 },
  { id: "belem", label: "Belém", country: "BR", lat: -1.455, lng: -48.502, zoom: 8 },
];

type ScrollPhase = "globe" | "region" | CityId;

export default function AmazonMapRoadmap({
  roadmapCopy,
  ideas,
  locale,
  onCityChange,
}: Props) {
  const [active, setActive] = useState<CityId>("leticia");
  const [mounted, setMounted] = useState(false);
  const [scrollPhase, setScrollPhase] = useState<ScrollPhase>("globe");
  const sectionRef = useRef<HTMLElement>(null);
  const userOverride = useRef(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    const handleScroll = () => {
      if (userOverride.current) return;

      const rect = section.getBoundingClientRect();
      const sectionH = rect.height;
      const viewH = window.innerHeight;
      const entered = viewH - rect.top;
      const progress = Math.max(0, Math.min(1, entered / (sectionH + viewH * 0.5)));

      let nextPhase: ScrollPhase;
      let nextCity: CityId | null = null;

      if (progress < 0.08) {
        nextPhase = "globe";
      } else if (progress < 0.2) {
        nextPhase = "region";
      } else if (progress < 0.4) {
        nextPhase = "leticia";
        nextCity = "leticia";
      } else if (progress < 0.55) {
        nextPhase = "la_pedrera";
        nextCity = "la_pedrera";
      } else if (progress < 0.72) {
        nextPhase = "manaus";
        nextCity = "manaus";
      } else {
        nextPhase = "belem";
        nextCity = "belem";
      }

      setScrollPhase(nextPhase);
      if (nextCity) {
        setActive(nextCity);
        onCityChange(nextCity);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onCityChange]);

  const pick = useCallback(
    (id: CityId) => {
      userOverride.current = true;
      setActive(id);
      setScrollPhase(id);
      onCityChange(id);
      setTimeout(() => {
        userOverride.current = false;
      }, 2500);
    },
    [onCityChange],
  );

  const cityIdeas = useMemo(
    () => ideas.filter((i) => i.cities.includes(active)),
    [active, ideas],
  );
  const card = roadmapCopy.cityCards[active];
  const cityData = cities.find((c) => c.id === active)!;

  const mapTarget = useMemo(() => {
    if (scrollPhase === "globe") return GLOBE_VIEW;
    if (scrollPhase === "region") return REGION_VIEW;
    const city = cities.find((c) => c.id === scrollPhase);
    return city ? { lat: city.lat, lng: city.lng, zoom: city.zoom } : REGION_VIEW;
  }, [scrollPhase]);

  const activeIdx = cities.findIndex((c) => c.id === active);

  return (
    <section
      ref={sectionRef}
      id="roadmap"
      className="relative w-full bg-[var(--color-cream)]"
      style={{ minHeight: "220vh", paddingTop: "8rem", paddingBottom: "8rem" }}
    >
      <div
        className="sticky top-16 flex min-h-[calc(100vh-4rem)] items-center justify-center py-12"
        style={{ zIndex: 10 }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="grid gap-12 grid-cols-1 md:grid-cols-[0.36fr_1fr] md:items-start">
          {/* Left sidebar — cream beige + dark charcoal + olive accents */}
          <div>
            <p className="label text-[var(--color-text-secondary)]/80">{roadmapCopy.phaseLabel}</p>
            <h2 className="section-heading mt-4 text-[var(--color-text-primary)]">
              <em>Interactive</em> Roadmap
            </h2>
            <p className="mt-4 text-[0.86rem] leading-relaxed text-[var(--color-text-secondary)]">
              {roadmapCopy.instructions}
            </p>

            {/* Progress line + city list (dashed track, filled/hollow dots) */}
            <div className="relative mt-8 pl-4">
              {/* Dashed vertical track */}
              <div
                className="absolute left-[5px] top-0 h-full w-px"
                style={{
                  background: "repeating-linear-gradient(to bottom, rgba(51,51,51,0.2) 0, rgba(51,51,51,0.2) 4px, transparent 4px, transparent 8px)",
                }}
              />
              <motion.div
                className="absolute left-[5px] top-0 w-px"
                style={{
                  background: "repeating-linear-gradient(to bottom, var(--color-pine) 0, var(--color-pine) 4px, transparent 4px, transparent 8px)",
                }}
                animate={{ height: `${((activeIdx + 0.5) / cities.length) * 100}%` }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />

              <div className="flex flex-col gap-0.5">
                {cities.map((city, i) => {
                  const isActive = active === city.id;
                  const isPast = i < activeIdx;
                  return (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => pick(city.id)}
                      className={`group relative flex items-center gap-3 rounded-lg py-3 text-left transition-all duration-300 ${
                        isActive ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)]/70 hover:text-[var(--color-text-primary)]"
                      }`}
                    >
                      <span
                        className={`relative z-10 -ml-[19px] flex h-[8px] w-[8px] shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isActive
                            ? "border-2 border-[var(--color-pine)] bg-[var(--color-pine)]"
                            : isPast
                              ? "border-2 border-[var(--color-pine)] bg-transparent"
                              : "border border-[var(--color-border)] bg-transparent"
                        }`}
                      />
                      <span className="text-[0.6rem] font-bold tabular-nums text-[var(--color-text-secondary)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.8rem] font-medium">{city.label}</span>
                      <span className="text-[0.55rem] uppercase tracking-[0.15em] text-[var(--color-text-secondary)]/60">
                        {city.country}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: map + detail card */}
          <div className="space-y-4">
            {/* Map */}
            <div
              className="relative overflow-hidden rounded-xl border border-[var(--color-border)]"
              style={{ height: 480 }}
            >
              {mounted && (
                <>
                  <MapContainer
                    center={[GLOBE_VIEW.lat, GLOBE_VIEW.lng]}
                    zoom={GLOBE_VIEW.zoom}
                    zoomControl={false}
                    dragging={false}
                    scrollWheelZoom={false}
                    doubleClickZoom={false}
                    touchZoom={false}
                    attributionControl={false}
                    style={{
                      height: "100%",
                      width: "100%",
                      position: "absolute",
                      inset: 0,
                    }}
                  >
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                    <MapFlyTo
                      lat={mapTarget.lat}
                      lng={mapTarget.lng}
                      zoom={mapTarget.zoom}
                    />
                    <MapMarkers
                      activeId={scrollPhase !== "globe" && scrollPhase !== "region" ? active : null}
                      visible={scrollPhase !== "globe"}
                    />
                  </MapContainer>
                </>
              )}

              {/* Globe label */}
              <AnimatePresence mode="wait">
                {scrollPhase === "globe" && (
                  <motion.div
                    key="globe-label"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 z-[500] flex items-end justify-start p-8"
                  >
                    <div>
                      <p className="text-[0.55rem] font-bold uppercase tracking-[0.4em] text-[var(--color-text-secondary)]/60">
                        Scroll to explore
                      </p>
                      <p className="mt-1 text-lg font-semibold text-[var(--color-text-primary)]">
                        The Amazon Basin
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Phase badge — top right, animates on change */}
              <div className="absolute right-6 top-6 z-[500] flex flex-col items-end gap-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={card.phase}
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-lg border border-[var(--color-border)] bg-[var(--color-cream)] px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[var(--color-pine)] shadow-sm"
                  >
                    {card.phase}
                  </motion.span>
                </AnimatePresence>
                {/* City name when zoomed in */}
                <AnimatePresence mode="wait">
                  {scrollPhase !== "globe" && scrollPhase !== "region" && (
                    <motion.div
                      key={`label-${scrollPhase}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                    <p className="text-right text-2xl font-bold text-[var(--color-text-primary)]">
                      {cityData.label}
                    </p>
                    <p className="text-right text-[0.6rem] font-bold uppercase tracking-[0.3em] text-[var(--color-text-secondary)]">
                      {cityData.country === "CO" ? "Colombia" : "Brazil"}
                    </p>
                  </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Compact bottom bar: city only */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-cream)] px-6 py-4"
              >
                <span className="h-2 w-2 rounded-full bg-[var(--color-pine)]" />
                <span className="font-semibold text-[var(--color-text-primary)]">{cityData.label}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
