import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project CHAGRA-NET",
  description:
    "Solarpunk ecotourism and digital nomad corridor for regenerative Amazon development across Colombia and Brazil.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Project CHAGRA-NET",
    description:
      "Solarpunk ecotourism corridor connecting digital nomads and indigenous communities across the Amazon.",
    images: [{ url: "/images/hero/amazon-river.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project CHAGRA-NET",
    description:
      "Solarpunk ecotourism corridor connecting digital nomads and indigenous communities across the Amazon.",
    images: ["/images/hero/amazon-river.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${sora.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
