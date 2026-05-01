import type { Metadata } from "next";
import { Audiowide, Outfit, Kode_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { AuroraBackground } from "@/components/site/aurora-background";
import "./globals.css";

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
  title: "Phase Systems — Built for the next generation of compute",
  description:
    "Phase Systems is Phase's data center vertical based in Des Moines, Iowa. Cloud compute, colocation, ISP, hardware, and security services.",
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
