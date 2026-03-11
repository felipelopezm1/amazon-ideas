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
      className="relative mx-auto max-w-[1200px] px-6"
      style={{ minHeight: "220vh", paddingTop: "8rem", paddingBottom: "8rem" }}
    >
      <div className="sticky top-16" style={{ zIndex: 10 }}>
        <div className="grid gap-12 lg:grid-cols-[0.36fr_1fr] lg:items-start">
          {/* Left sidebar */}
          <div>
            <p className="label text-white/35">{roadmapCopy.phaseLabel}</p>
            <h2 className="section-heading mt-4 text-white">
              <em>Interactive</em> Roadmap
            </h2>
            <p className="mt-4 text-[0.86rem] leading-relaxed text-white/40">
              {roadmapCopy.instructions}
            </p>

            {/* Progress line + city buttons */}
            <div className="relative mt-8 pl-5">
              {/* Vertical track */}
              <div className="absolute left-[13px] top-0 h-full w-px bg-white/8" />
              <motion.div
                className="absolute left-[13px] top-0 w-px bg-[var(--color-gold)]"
                animate={{ height: `${((activeIdx + 0.5) / cities.length) * 100}%` }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />

              <div className="flex flex-col gap-1">
                {cities.map((city, i) => {
                  const isActive = active === city.id;
                  const isPast = i <= activeIdx;
                  return (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => pick(city.id)}
                      className={`group relative flex items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-all duration-500 ${
                        isActive
                          ? "bg-white/8 text-white"
                          : "text-white/30 hover:bg-white/4 hover:text-white/55"
                      }`}
                    >
                      <span
                        className={`relative z-10 -ml-[29px] flex h-[11px] w-[11px] shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                          isActive
                            ? "border-[var(--color-gold)] bg-[var(--color-gold)]"
                            : isPast
                              ? "border-[var(--color-gold)] bg-transparent"
                              : "border-white/15 bg-transparent"
                        }`}
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-[0.6rem] font-bold tabular-nums opacity-40">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-semibold">{city.label}</span>
                        <span className="text-[0.55rem] uppercase tracking-[0.2em] opacity-35">
                          {city.country}
                        </span>
                      </div>
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
              className="relative overflow-hidden rounded-2xl border border-white/5"
              style={{ height: 440 }}
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
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
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
                    className="absolute inset-0 z-20 flex items-end justify-start p-8"
                  >
                    <div>
                      <p className="text-[0.55rem] font-bold uppercase tracking-[0.4em] text-white/20">
                        Scroll to explore
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white/45">
                        The Amazon Basin
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* City name overlay when zoomed in */}
              <AnimatePresence mode="wait">
                {scrollPhase !== "globe" && scrollPhase !== "region" && (
                  <motion.div
                    key={`label-${scrollPhase}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-6 top-6 z-20"
                  >
                    <p className="text-right text-2xl font-bold text-white/80">
                      {cityData.label}
                    </p>
                    <p className="text-right text-[0.6rem] font-bold uppercase tracking-[0.3em] text-white/25">
                      {cityData.country === "CO" ? "Colombia" : "Brazil"}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* City detail card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="dark-card p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-gold)]" />
                  <h3 className="text-lg font-semibold text-white">
                    {cityData.label}
                  </h3>
                  <span className="rounded-full bg-white/6 px-2.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.2em] text-white/40">
                    {card.phase}
                  </span>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div>
                    <p className="text-[0.58rem] font-bold uppercase tracking-[0.25em] text-white/30">
                      Challenge
                    </p>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-white/55">
                      {card.challenge}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.58rem] font-bold uppercase tracking-[0.25em] text-[var(--color-gold)]/60">
                      Opportunity
                    </p>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-white/70">
                      {card.opportunity}
                    </p>
                  </div>
                </div>

                <hr className="my-5 border-white/6" />

                <p className="text-[0.58rem] font-bold uppercase tracking-[0.25em] text-white/25">
                  {roadmapCopy.allIdeasTitle}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cityIdeas.map((idea) => (
                    <span
                      key={idea.id}
                      className="rounded-full bg-white/5 px-3 py-1.5 text-[0.72rem] text-white/50"
                    >
                      {idea.title[locale]}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
