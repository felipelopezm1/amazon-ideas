"use client";

import { useMap } from "react-leaflet";
import { useEffect } from "react";

export default function MapFlyTo({
  lat,
  lng,
  zoom,
}: {
  lat: number;
  lng: number;
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lng], zoom, { duration: 1.8, easeLinearity: 0.25 });
  }, [map, lat, lng, zoom]);

  return null;
}
