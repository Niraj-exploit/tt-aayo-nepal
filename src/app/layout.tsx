import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aayo Nepal Journeys | Discover Nepal Differently",
  description: "Discover thoughtfully designed Nepal journeys—from Kathmandu heritage and Pokhara lakes to Chitwan wildlife, Mustang culture and Himalayan trekking.",
  keywords: ["Nepal tours", "Nepal travel packages", "Kathmandu tours", "Pokhara holidays", "Chitwan safari", "Nepal trekking"],
  openGraph: {
    title: "Aayo Nepal Journeys",
    description: "Nepal is not one experience. It is many journeys.",
    images: ["/images/kathmandu.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1d241f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
