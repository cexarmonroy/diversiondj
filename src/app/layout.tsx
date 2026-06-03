import type { Viewport } from "next";
import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.brand} — DJ para eventos en Santiago`,
  description:
    "DJ Open Format con +20 años de experiencia. Matrimonios, fiestas de empresa y eventos privados en Santiago, Chile. Reserva tu fecha.",
  keywords: [
    "DJ Santiago",
    "DJ matrimonios Chile",
    "DJ eventos",
    "Diversión DJ",
    "Cesar Monroy DJ",
    "DJ fiestas empresa",
  ],
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.brand}`,
    description: siteConfig.tagline,
    locale: "es_CL",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${syne.variable} ${dmSans.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full antialiased" suppressHydrationWarning>
        <BackgroundEffects />
        {children}
      </body>
    </html>
  );
}
