"use client";

import { useState } from "react";

import AmazonMapRoadmap from "@/components/AmazonMapRoadmap";
import IdeasGrid from "@/components/IdeasGrid";

type Idea = {
  id: string;
  cities: string[];
  domains: string[];
  phase: string;
  title: Record<string, string>;
  summary: Record<string, string>;
};

type Props = {
  roadmapCopy: {
    title: string;
    instructions: string;
    phaseLabel: string;
    allIdeasTitle: string;
    cityCards: {
      leticia: { challenge: string; opportunity: string; phase: string };
      la_pedrera: { challenge: string; opportunity: string; phase: string };
      manaus: { challenge: string; opportunity: string; phase: string };
      belem: { challenge: string; opportunity: string; phase: string };
    };
  };
  ideasCopy: {
    title: string;
    subtitle: string;
    filters: {
      all: string;
      bioeconomy: string;
      ai: string;
      iot: string;
      web3: string;
      hci: string;
      indigenous_partnership: string;
      connectivity: string;
    };
  };
  ideas: Idea[];
  locale: string;
};

export default function RoadmapIdeasSection({
  roadmapCopy,
  ideasCopy,
  ideas,
  locale,
}: Props) {
  const [selectedCity, setSelectedCity] = useState("leticia");

  return (
    <>
      <AmazonMapRoadmap
        roadmapCopy={roadmapCopy}
        ideas={ideas}
        locale={locale}
        onCityChange={setSelectedCity}
      />
      <IdeasGrid
        title={ideasCopy.title}
        subtitle={ideasCopy.subtitle}
        ideas={ideas}
        locale={locale}
        filters={ideasCopy.filters}
        selectedCity={selectedCity}
      />
    </>
  );
}
