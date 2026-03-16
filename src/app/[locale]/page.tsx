import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import RoadmapIdeasSection from "@/components/RoadmapIdeasSection";
import TeamSection from "@/components/TeamSection";
import CTASection from "@/components/CTASection";
import ScrollTrail from "@/components/ScrollTrail";
import PartnersCarousel from "@/components/PartnersCarousel";
import ChagraDiagram from "@/components/ChagraDiagram";
import MobileNav from "@/components/MobileNav";
import NavClock from "@/components/NavClock";
import ScrollAnimations from "@/components/ScrollAnimations";
import FooterParallax from "@/components/FooterParallax";
import HeroTitleAnimation from "@/components/HeroTitleAnimation";
import WhyThesisHighlight from "@/components/WhyThesisHighlight";
import ideas from "@/content/ideas.json";
import { getCopy, isLocale, locales, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getCopy(locale);
  return { title: c.meta.title, description: c.meta.description };
}

const portImages: Record<string, string> = {
  leticia: "/images/ports/leticia.jpg",
  la_pedrera: "/images/ports/la-pedrera.jpeg",
  manaus: "/images/ports/manaus.jpg",
  belem: "/images/ports/belem.jpg",
};

function TrailDecoration({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const paths: Record<number, string> = {
    1: "M 0 30 C 250 5, 500 55, 750 20 C 1000 -5, 1100 30, 1200 25",
    2: "M 0 45 Q 300 5, 600 35 T 1200 15",
    3: "M 0 10 C 200 50, 500 5, 800 45 C 1000 20, 1100 30, 1200 15",
  };
  return (
    <div className="mx-auto max-w-[1200px] overflow-hidden px-6">
      <svg
        viewBox="0 0 1200 50"
        className="h-8 w-full"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d={paths[variant]}
          stroke="var(--color-pine)"
          strokeWidth="1.2"
          strokeDasharray="8 6"
          strokeLinecap="round"
          opacity="0.12"
          className="trail-path-flow"
        />
      </svg>
    </div>
  );
}

function HomePageContent({ locale }: { locale: Locale }) {
  const c = getCopy(locale);

  return (
    <main className="relative">
      <ScrollTrail />
      <ScrollAnimations />
      <HeroTitleAnimation />

      {/* ── Header ────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-cream)]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3 sm:py-4">
          <div className="flex items-center gap-4 sm:gap-8">
            <Link href={`/${locale}`} className="text-[0.65rem] font-bold tracking-[0.3em] text-[var(--color-text-primary)] sm:text-[0.72rem]">
              CHAGRA—NET
            </Link>
            <NavClock className="hidden text-[var(--color-text-secondary)] sm:block" />
          </div>
          <div className="flex items-center gap-4 sm:gap-8">
            <nav className="hidden gap-5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)] lg:flex xl:gap-7 xl:text-[0.68rem]">
              {[
                { label: "Ports", href: "#ports" },
                { label: "COP30", href: "#cop30" },
                { label: "Roadmap", href: "#roadmap" },
                { label: "Ideas", href: "#ideas" },
                { label: "Chagra", href: "#chagra" },
                { label: "Team", href: "#team" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <a key={link.href} href={link.href} className="transition-colors duration-300 hover:text-[var(--color-pine)]">
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex gap-1">
              {locales.map((t) => (
                <Link
                  key={t}
                  href={`/${t}`}
                  className={`rounded-lg px-2 py-1 text-[0.55rem] font-bold uppercase tracking-[0.18em] transition-all duration-300 sm:px-3 sm:py-1.5 sm:text-[0.62rem] ${
                    locale === t
                      ? "bg-[var(--color-pine)] text-[var(--color-cream)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-pine)]"
                  }`}
                >
                  {t}
                </Link>
              ))}
            </div>
            <MobileNav />
          </div>
        </div>
      </header>

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="mx-auto max-w-[1200px] px-6 pb-16 pt-16 sm:pb-24 sm:pt-20 lg:pb-40 lg:pt-36">
        <p className="label" data-animate="fade">{c.hero.eyebrow}</p>
        <h1 className="hero-title mt-5" data-hero-title>
          <em>Chagra</em>—Net
        </h1>
        <p className="body-lg mt-8 max-w-xl" data-animate="fade">{c.hero.subtitle}</p>
        <div className="mt-12 flex flex-wrap gap-4">
          <a className="btn-primary" href="#roadmap">
            {c.hero.primaryCta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
          <a className="btn-ghost" href="#ideas">{c.hero.secondaryCta}</a>
        </div>
      </section>

      {/* ── Hero Video (full-bleed) ──────────────────── */}
      <section className="relative px-6">
        <div className="mx-auto max-w-[1200px]">
          <div className="relative h-[35vh] min-h-[240px] overflow-hidden rounded-2xl sm:h-[45vh] sm:min-h-[300px] lg:h-[50vh] lg:min-h-[360px]">
            <video
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              className="absolute inset-0 h-full w-full object-cover"
              src="/images/hero/amazon-river.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8">
              <p className="text-[0.52rem] font-bold uppercase tracking-[0.3em] text-white/60 sm:text-[0.62rem]">
                Amazon River
              </p>
              <p className="mt-1 text-sm font-semibold text-white/90 sm:text-base">
                Leticia — Tabatinga tri-border zone
              </p>
            </div>
            {/* Hero footer (deadspace-style) */}
            <div className="hero-footer pointer-events-none absolute inset-x-0 bottom-0">
              <div className="container flex justify-between px-6 py-6">
                <p className="type-mono text-[0.6rem] text-white/40">
                  CHAGRA—NET __ 2026
                </p>
                <p className="type-mono text-[0.6rem] text-white/30">
                  Solarpunk Amazon Corridor
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrailDecoration variant={1} />

      {/* ── Why ───────────────────────────────────────── */}
      <section className="mx-auto max-w-[1200px] px-6 py-16 sm:py-20 lg:py-32">
        <div className="grid gap-10 sm:gap-16 lg:grid-cols-[0.45fr_1fr] lg:items-start">
          <div>
            <p className="label" data-animate="fade">The Thesis</p>
            <h2 className="section-heading mt-4" data-animate="slide">
              {c.why.title.split(" ").slice(0, 2).join(" ")}{" "}
              <em>{c.why.title.split(" ").slice(2).join(" ")}</em>
            </h2>
          </div>
          <WhyThesisHighlight points={c.why.points} />
        </div>
      </section>

      <TrailDecoration variant={2} />

      {/* ── Core Ports ────────────────────────────────── */}
      <section id="ports" className="mx-auto max-w-[1200px] px-6 py-16 sm:py-20 lg:py-32">
        <p className="label" data-animate="fade">Network Nodes</p>
        <h2 className="section-heading mt-4 max-w-lg" data-animate="slide">
          <em>Core</em> Amazon {c.ports.title.split(" ").pop()}
        </h2>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {c.ports.items.map((port, i) => (
            <article key={port.id} className="card group overflow-hidden">
              <div className="relative h-56 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[800ms] ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('${portImages[port.id]}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)] via-[var(--color-dark)]/30 to-transparent opacity-70" />
                <div className="absolute bottom-5 left-6">
                  <p className="font-stylish text-[0.62rem] font-bold uppercase tracking-[0.3em] text-white/50">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-stylish mt-1 text-lg font-semibold text-white">{port.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="font-stylish text-[1rem] leading-relaxed text-[var(--color-text-secondary)]">{port.focus}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <TrailDecoration variant={3} />

      {/* ── COP30 Alignment ────────────────────────────── */}
      <section id="cop30" className="mx-auto max-w-[1200px] px-6 py-16 sm:py-20 lg:py-32">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[0.45fr_1fr] lg:items-start">
          <div>
            <p className="label" data-animate="fade">{c.cop30.eyebrow}</p>
            <h2 className="section-heading mt-4" data-animate="slide">
              <em>{c.cop30.title.split(" ").slice(0, 2).join(" ")}</em>{" "}
              {c.cop30.title.split(" ").slice(2).join(" ")}
            </h2>
          </div>
          <div>
            <p className="text-[1.08rem] leading-[1.85] text-[var(--color-text-secondary)]">
              {c.cop30.body}
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.cop30.pillars.map((pillar, i) => (
            <article
              key={i}
              className="card group overflow-hidden p-6 transition-all duration-500"
              data-animate="fade"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-[var(--color-pine)]/10 px-2.5 py-1 text-[0.52rem] font-bold uppercase tracking-[0.2em] text-[var(--color-pine)]">
                  {pillar.tag}
                </span>
              </div>
              <h3 className="mt-4 text-[0.95rem] font-semibold leading-tight text-[var(--color-text-primary)]">
                {pillar.title}
              </h3>
              <p className="mt-3 text-[0.82rem] leading-relaxed text-[var(--color-text-secondary)]">
                {pillar.desc}
              </p>
            </article>
          ))}
        </div>

        <blockquote className="mx-auto mt-16 max-w-2xl border-l-2 border-[var(--color-pine)]/30 pl-6">
          <p className="text-[0.95rem] font-light italic leading-relaxed text-[var(--color-text-secondary)]">
            &ldquo;{c.cop30.quote}&rdquo;
          </p>
        </blockquote>
      </section>

      <TrailDecoration variant={1} />

      {/* ── Roadmap + Ideas ───────────────────────────── */}
      <div className="dark-section">
        <RoadmapIdeasSection
          roadmapCopy={c.roadmap}
          ideasCopy={c.ideas}
          ideas={ideas}
          locale={locale}
        />
      </div>

      <TrailDecoration variant={1} />

      {/* ── Chagra Framework ──────────────────────────── */}
      <section id="chagra" className="mx-auto max-w-[1200px] px-6 py-16 sm:py-20 lg:py-32">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[0.45fr_1fr] lg:items-start">
          <div>
            <p className="label" data-animate="fade">Design Framework</p>
            <h2 className="section-heading mt-4" data-animate="slide">
              <em>Biomimicry</em> &times; Chagra
            </h2>
          </div>
          <div>
            <p className="text-[1.08rem] leading-[1.85] text-[var(--color-text-secondary)]">
              {c.chagra.body}
            </p>
          </div>
        </div>

        <ChagraDiagram />
      </section>

      {/* ── Partners Carousel ─────────────────────────── */}
      <PartnersCarousel />

      <TrailDecoration variant={2} />

      {/* ── Team ──────────────────────────────────────── */}
      <TeamSection title={c.team.title} roles={c.team.roles} />

      <TrailDecoration variant={3} />

      {/* ── CTA with modals ─────────────────────────── */}
      <CTASection
        title={c.cta.title}
        body={c.cta.body}
        primaryLabel={c.cta.primary}
        secondaryLabel={c.cta.secondary}
      />

      {/* ── Contact section removed for now ── */}

      {/* ── Footer (deadspace-style parallax) ───────────── */}
      <footer className="border-t border-white/5">
        <FooterParallax>
          <div className="footer-container">
            <div className="footer-row">
              <div className="footer-col">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-white/90">
                  &copy; 2026 CHAGRA—NET
                </p>
                <p className="text-[0.6rem] tracking-[0.18em] text-white/50">
                  Solarpunk Amazon Corridor
                </p>
              </div>
              <div className="footer-col">
                {[
                  { label: "Ports", href: "#ports" },
                  { label: "COP30", href: "#cop30" },
                  { label: "Roadmap", href: "#roadmap" },
                  { label: "Ideas", href: "#ideas" },
                  { label: "Chagra", href: "#chagra" },
                  { label: "Team", href: "#team" },
                  { label: "Contact", href: "#contact" },
                ].map((l) => (
                  <a key={l.href} href={l.href} className="text-[0.65rem] font-medium tracking-[0.15em] text-white/60 transition-opacity hover:text-white/90">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </FooterParallax>
      </footer>
    </main>
  );
}

export default async function LocalePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePageContent locale={locale} />;
}
