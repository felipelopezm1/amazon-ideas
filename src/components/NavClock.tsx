"use client";

import { useEffect, useState } from "react";

function getTimeParts() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const tz =
    Intl.DateTimeFormat(undefined, { timeZoneName: "short" })
      .formatToParts(now)
      .find((p) => p.type === "timeZoneName")?.value ?? "";
  return { hours, minutes, tz };
}

export default function NavClock({
  className = "",
}: {
  className?: string;
}) {
  const [time, setTime] = useState({ hours: "00", minutes: "00", tz: "" });
  const [colonVisible, setColonVisible] = useState(true);

  useEffect(() => {
    setTime(getTimeParts());
    const clockInterval = setInterval(() => setTime(getTimeParts()), 1000);
    const colonInterval = setInterval(
      () => setColonVisible((v) => !v),
      500
    );
    return () => {
      clearInterval(clockInterval);
      clearInterval(colonInterval);
    };
  }, []);

  return (
    <p className={`text-[0.65rem] font-medium uppercase tracking-[0.15em] ${className}`}>
      {time.hours}
      <span
        className="inline-block w-2 text-center"
        style={{ visibility: colonVisible ? "visible" : "hidden" }}
      >
        :
      </span>
      {time.minutes} {time.tz}
    </p>
  );
}
