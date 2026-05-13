import Link from "next/link";
import { SplitHeading } from "@/components/site/split-heading";
import { SecNum } from "@/components/site/sec-num";
import { Glitch } from "@/components/site/glitch";

export default function NotFound() {
  return (
    <div className="w-full">
      <section className="relative overflow-hidden">
        <div id="hero-grid" className="hero-grid" aria-hidden />
        <div className="relative z-[2] mx-auto w-full max-w-3xl px-4 sm:px-6 pt-24 md:pt-32 pb-24 md:pb-32 text-center">
          <SecNum label="// ERR / 404" className="!justify-center inline-block" />
          <SplitHeading
            as="h1"
            className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.02] tracking-tight mt-6"
            delay={120}
            step={90}
          >
            Off the{" "}
            <Glitch className="text-[#7CFFA8] inline-block">grid.</Glitch>
          </SplitHeading>
          <p className="text-foreground/65 mt-7 max-w-md mx-auto leading-relaxed">
            That page doesn&apos;t exist — or hasn&apos;t been racked yet.
          </p>
          <div className="mt-9 flex justify-center gap-3 flex-wrap">
            <Link href="/" className="btn-primary hover-elevate">
              ← Back home
            </Link>
            <Link href="/services" className="btn-secondary hover-elevate">
              Browse Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
