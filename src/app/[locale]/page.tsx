import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import RoadmapIdeasSection from "@/components/RoadmapIdeasSection";
import TeamSection from "@/components/TeamSection";
import CTASection from "@/components/CTASection";
import ScrollTrail from "@/components/ScrollTrail";
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
          stroke="var(--color-gold)"
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

      {/* ── Header ────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[var(--background)]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5">
          <Link href={`/${locale}`} className="text-[0.72rem] font-bold tracking-[0.3em] text-[var(--color-text-primary)]">
            CHAGRA—NET
          </Link>
          <div className="flex items-center gap-8">
            <nav className="hidden gap-7 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-secondary)] md:flex">
              {[
                { label: "Ports", href: "#ports" },
                { label: "Roadmap", href: "#roadmap" },
                { label: "Ideas", href: "#ideas" },
                { label: "Team", href: "#team" },
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
                  className={`rounded-full px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
                    locale === t
                      ? "bg-[var(--color-pine)] text-white"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-pine)]"
                  }`}
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <hr className="divider" />
      </header>

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="mx-auto max-w-[1200px] px-6 pb-32 pt-28 lg:pb-40 lg:pt-36">
        <p className="label">{c.hero.eyebrow}</p>
        <h1 className="hero-title mt-5">
          <em>Chagra</em>—Net
        </h1>
        <p className="body-lg mt-8 max-w-xl">{c.hero.subtitle}</p>
        <div className="mt-12 flex flex-wrap gap-4">
          <a className="btn-primary" href="#roadmap">
            {c.hero.primaryCta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
          <a className="btn-ghost" href="#ideas">{c.hero.secondaryCta}</a>
        </div>
      </section>

      {/* ── Hero Video (full-bleed) ──────────────────── */}
      <section className="px-6">
        <div className="mx-auto max-w-[1200px]">
          <div className="relative h-[50vh] min-h-[360px] overflow-hidden rounded-2xl">
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
            <div className="absolute bottom-8 left-8">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-white/60">
                Amazon River
              </p>
              <p className="mt-1 text-base font-semibold text-white/90">
                Leticia — Tabatinga tri-border zone
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrailDecoration variant={1} />

      {/* ── Why ───────────────────────────────────────── */}
      <section className="mx-auto max-w-[1200px] px-6 py-28 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[0.45fr_1fr] lg:items-start">
          <div>
            <p className="label">The Thesis</p>
            <h2 className="section-heading mt-4">
              {c.why.title.split(" ").slice(0, 2).join(" ")}{" "}
              <em>{c.why.title.split(" ").slice(2).join(" ")}</em>
            </h2>
          </div>
          <div className="space-y-0">
            {c.why.points.map((point, i) => (
              <div key={point}>
                {i > 0 && <hr className="divider" />}
                <div className="flex gap-6 py-8">
                  <span className="mt-0.5 text-[2rem] font-extralight leading-none text-[var(--color-pine)]/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[0.98rem] leading-[1.75] text-[var(--color-text-secondary)]">
                    {point}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrailDecoration variant={2} />

      {/* ── Core Ports ────────────────────────────────── */}
      <section id="ports" className="mx-auto max-w-[1200px] px-6 py-28 lg:py-32">
        <p className="label">Network Nodes</p>
        <h2 className="section-heading mt-4 max-w-lg">
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
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-white/50">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-white">{port.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[0.92rem] leading-relaxed text-[var(--color-text-secondary)]">{port.focus}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <TrailDecoration variant={3} />

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
      <section className="mx-auto max-w-[1200px] px-6 py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.45fr_1fr] lg:items-start">
          <div>
            <p className="label">Design Framework</p>
            <h2 className="section-heading mt-4">
              <em>Biomimicry</em> &times; Chagra
            </h2>
          </div>
          <div>
            <p className="text-[1.08rem] leading-[1.85] text-[var(--color-text-secondary)]">
              {c.chagra.body}
            </p>
          </div>
        </div>
      </section>

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

      {/* ── Footer ────────────────────────────────────── */}
      <footer className="border-t border-[var(--color-border)] py-10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[var(--color-text-secondary)]">
            &copy; 2026 CHAGRA—NET
          </p>
          <p className="text-[0.65rem] tracking-[0.2em] text-[var(--color-text-secondary)]/50">
            Solarpunk Amazon Corridor
          </p>
        </div>
      </footer>
    </main>
  );
}

export default async function LocalePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePageContent locale={locale} />;
}
