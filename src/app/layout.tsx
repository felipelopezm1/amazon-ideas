import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import LenisScroll from "@/components/LenisScroll";
import Preloader from "@/components/Preloader";
import { TransitionProvider } from "@/contexts/TransitionContext";

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
      <body className="antialiased">
        <TransitionProvider>
          <LenisScroll />
          <Preloader />
          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}
