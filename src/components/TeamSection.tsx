"use client";

import Image from "next/image";

type Props = {
  title: string;
  roles: { ceo: string; cto: string; cso: string };
};

const team = [
  {
    name: "Felipe López Mantilla",
    role: "ceo" as const,
    bio: "Creative Technologist & UX/UI specialist. MSc Creative Computing at UAL London. Biomimicry + AI researcher.",
    linkedin: "https://www.linkedin.com/in/felipelopezman/",
    image: "/images/team/felipe.jpeg",
  },
  {
    name: "Pearl Suchanan",
    role: "cto" as const,
    bio: "Technology strategist and systems architect driving scalable digital infrastructure.",
    linkedin: "https://www.linkedin.com/in/pearlsuchanan/",
    image: "/images/team/pearl.jpeg",
  },
  {
    name: "Juan G.",
    role: "cso" as const,
    bio: "Computer Engineer & Economist from Manaus. Full-stack dev, Web3 expansion lead, HCI researcher.",
    linkedin: "https://www.linkedin.com/in/junowoz/",
    image: "/images/team/juan.jpeg",
  },
] as const;

export default function TeamSection({ title, roles }: Props) {
  return (
    <section id="team" className="mx-auto max-w-[1200px] px-6 py-32">
      <p className="label">Leadership</p>
      <h2 className="section-heading mt-4">
        Meet the <em>Team</em>
      </h2>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-3">
        {team.map((m) => (
          <article key={m.name} className="group bg-white">
            <div className="relative h-72 overflow-hidden">
              <Image
                src={m.image}
                alt={m.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="p-6">
              <p className="text-[0.55rem] font-bold uppercase tracking-[0.3em] text-[var(--color-pine)]">
                {roles[m.role]}
              </p>
              <h3 className="mt-1.5 text-[1.05rem] font-semibold">{m.name}</h3>
              <p className="mt-3 text-[0.82rem] leading-relaxed text-[var(--color-text-secondary)]">
                {m.bio}
              </p>
              <a
                href={m.linkedin}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.15em] text-[var(--color-pine)] transition-colors hover:text-[var(--color-jungle)]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
