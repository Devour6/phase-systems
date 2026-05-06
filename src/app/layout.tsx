import type { Metadata, Viewport } from "next";
import { Audiowide, Outfit, Kode_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { AuroraBackground } from "@/components/site/aurora-background";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F0E0C",
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

const kodeMono = Kode_Mono({
  subsets: ["latin"],
  variable: "--font-kode-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://phase-systems.vercel.app"),
  title: "Phase Systems — Built for the next generation of compute",
  description:
    "Phase Systems is Phase's data center vertical based in Des Moines, Iowa. Cloud compute, colocation, ISP, hardware, and security services.",
  openGraph: {
    title: "Phase Systems",
    description: "Built for the next generation of compute. Des Moines, Iowa.",
    url: "https://phase-systems.vercel.app",
    siteName: "Phase Systems",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phase Systems",
    description: "Built for the next generation of compute. Des Moines, Iowa.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${audiowide.variable} ${outfit.variable} ${kodeMono.variable} antialiased relative min-h-screen`}
      >
        <AuroraBackground />
        <TooltipProvider>
          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteNav />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
