"use client";

import { useEffect, useState } from "react";

function getTimeString() {
  if (typeof window === "undefined") return "00:00 GMT";
  const now = new Date();
  const tz = Intl.DateTimeFormat(undefined, { timeZoneName: "short" })
    .formatToParts(now)
    .find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");
  return `${h}:${m} ${tz}`;
}

const ROWS = [
  { label: "Network", value: "Amazon Basin Corridor" },
  { label: "Registered Nodes", value: "Leticia · La Pedrera · Manaus · Belém" },
  { label: "Partnerships", value: "partner@chagra-net.org" },
  { label: "Residency", value: "apply@chagra-net.org" },
  { label: "Status", value: "Open for Applications" },
];

export default function ContactSection() {
  const [time, setTime] = useState("00:00 GMT");

  useEffect(() => {
    setTime(getTimeString());
    const id = setInterval(() => setTime(getTimeString()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="contact" className="relative py-24">
      <div className="contact-visual">
        <div className="contact-visual-icon">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--color-pine)]"
          >
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
          </svg>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6">
        <div className="contact-info">
          <div className="contact-info-row">
            <p className="font-medium text-[var(--color-text-primary)]">Temporal</p>
            <p className="contact-clock font-stylish">{time}</p>
          </div>
          {ROWS.map((row) => (
            <div key={row.label} className="contact-info-row">
              <p className="font-medium text-[var(--color-text-primary)]">{row.label}</p>
              <p className="font-stylish text-[var(--color-text-secondary)]">{row.value}</p>
            </div>
          ))}
        </div>

        <div className="contact-footer mt-16">
          <div className="container flex justify-between border-t border-[var(--color-border)] pt-8">
            <p className="type-mono text-[0.6rem] text-[var(--color-text-secondary)]">
              CHAGRA—NET __ 2026
            </p>
            <p className="type-mono text-[0.6rem] text-[var(--color-text-secondary)]/60">
              Solarpunk Amazon Corridor
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
