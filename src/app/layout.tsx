import type { Metadata, Viewport } from "next";
import { Audiowide, Outfit } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { AuroraBackground } from "@/components/site/aurora-background";
import { BootOverlay } from "@/components/site/boot-overlay";
import { CustomCursor } from "@/components/site/custom-cursor";
import { ScrollToTop } from "@/components/site/scroll-to-top";
import { JsonLd } from "@/components/site/json-ld";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F0F0E",
  colorScheme: "dark",
};

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://phase-systems.vercel.app"),
  title: {
    default: "Phase Systems — Built for the next generation of compute",
    template: "%s · Phase Systems",
  },
  description:
    "Phase Systems is Phase's data center vertical based in Des Moines, Iowa. Cloud compute, colocation, ISP, hardware, and security services.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "data center",
    "Des Moines",
    "Iowa",
    "colocation",
    "bare metal",
    "Phase Systems",
    "Phase",
    "cloud compute",
    "ISP",
    "Midwest fiber",
  ],
  openGraph: {
    title: "Phase Systems",
    description: "Built for the next generation of compute. Des Moines, Iowa.",
    url: "https://phase-systems.vercel.app",
    siteName: "Phase Systems",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phase Systems",
    description: "Built for the next generation of compute. Des Moines, Iowa.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${audiowide.variable} ${outfit.variable} antialiased relative min-h-screen`}
      >
        <BootOverlay />
        <CustomCursor />
        <AuroraBackground />
        <TooltipProvider>
          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteNav />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <ScrollToTop />
        </TooltipProvider>
      </body>
    </html>
  );
}
