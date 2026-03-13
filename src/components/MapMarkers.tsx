"use client";

import { CircleMarker, Polyline } from "react-leaflet";

type CityId = "leticia" | "la_pedrera" | "manaus" | "belem";

const CITIES = [
  { id: "leticia" as CityId, lat: -4.215, lng: -69.94 },
  { id: "la_pedrera" as CityId, lat: -1.325, lng: -69.595 },
  { id: "manaus" as CityId, lat: -3.119, lng: -60.022 },
  { id: "belem" as CityId, lat: -1.455, lng: -48.502 },
];

export default function MapMarkers({
  activeId,
  visible,
}: {
  activeId: CityId | null;
  visible: boolean;
}) {
  if (!visible) return null;

  const activeIdx = CITIES.findIndex((c) => c.id === activeId);

  return (
    <>
      {/* Route segments between consecutive cities */}
      {CITIES.slice(0, -1).map((city, i) => {
        const next = CITIES[i + 1];
        const isReached = activeIdx >= i + 1;
        const isDrawing = activeIdx === i + 1;

        if (!isReached) return null;

        return (
          <Polyline
            key={`seg-${i}-${isDrawing ? "draw" : "done"}`}
            positions={[
              [city.lat, city.lng],
              [next.lat, next.lng],
            ]}
            pathOptions={{
              color: "#3d4f3a",
              weight: 3,
              opacity: 1,
              dashArray: "10 6",
              className: isDrawing ? "route-draw" : "route-pulse",
            }}
          />
        );
      })}

      {/* City dots */}
      {CITIES.map((city, i) => {
        const isActive = city.id === activeId;
        const isReached = i <= activeIdx;

        return (
          <CircleMarker
            key={`dot-${city.id}`}
            center={[city.lat, city.lng]}
            radius={isActive ? 7 : isReached ? 5 : 3}
            pathOptions={{
              color: isActive
                ? "#5a6b4e"
                : isReached
                  ? "rgba(90,107,78,0.6)"
                  : "rgba(51,51,51,0.25)",
              fillColor: isActive
                ? "#5a6b4e"
                : isReached
                  ? "rgba(90,107,78,0.5)"
                  : "rgba(51,51,51,0.15)",
              fillOpacity: 1,
              weight: isActive ? 2 : 1,
              className: isActive
                ? "dot-active"
                : isReached
                  ? "dot-reached"
                  : "dot-dim",
            }}
          />
        );
      })}
    </>
  );
}
