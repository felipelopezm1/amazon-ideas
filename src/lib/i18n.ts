import en from "@/content/site.en.json";
import es from "@/content/site.es.json";
import pt from "@/content/site.pt.json";

export const locales = ["en", "es", "pt"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

const copyByLocale = {
  en,
  es,
  pt,
} as const;

export function getCopy(locale: Locale) {
  return copyByLocale[locale];
}
