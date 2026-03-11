"use client";

const partners = [
  "Amazon Fund",
  "WWF",
  "UNDP",
  "GIZ",
  "MIT Media Lab",
  "Ethereum Foundation",
  "Natura &Co",
  "Rainforest Alliance",
  "IDEO.org",
  "Smithsonian",
  "NatGeo",
  "USAID",
];

export default function PartnersCarousel() {
  const doubled = [...partners, ...partners];

  return (
    <section className="overflow-hidden py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="text-center text-[0.6rem] font-bold uppercase tracking-[0.35em] text-[var(--color-text-secondary)]/40">
          Future partners &amp; collaborators
        </p>
      </div>

      <div className="partners-track mt-10 flex gap-16">
        {doubled.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex shrink-0 items-center gap-3 opacity-[0.18] grayscale"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-pine)]/8">
              <span className="text-[0.7rem] font-bold text-[var(--color-pine)]">
                {name.charAt(0)}
              </span>
            </div>
            <span className="whitespace-nowrap text-[0.82rem] font-semibold tracking-tight text-[var(--color-text-primary)]">
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
