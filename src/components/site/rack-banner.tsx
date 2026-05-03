import Image from "next/image";

export function RackBanner() {
  return (
    <section
      aria-label="Phase Systems rack — Des Moines, Iowa"
      className="relative w-screen left-1/2 -translate-x-1/2 my-16 md:my-24"
    >
      <div className="relative h-[44vh] min-h-[280px] md:h-[60vh] md:min-h-[480px] max-h-[680px] overflow-hidden">
        <Image
          src="/rack.jpg"
          alt="A Phase Systems server rack — production hardware in Des Moines"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Top + bottom fade into page bg */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #0F0E0C 0%, transparent 18%, transparent 82%, #0F0E0C 100%)",
          }}
        />
        {/* Side fade for full-bleed → page bg blend */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[12vw]"
          style={{
            background:
              "linear-gradient(to right, #0F0E0C 0%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-[12vw]"
          style={{
            background:
              "linear-gradient(to left, #0F0E0C 0%, transparent 100%)",
          }}
        />

        {/* Caption overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-8 md:pb-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div
                  className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em]"
                  style={{ color: "#7CFFA8" }}
                >
                  ◆ Live Rack · Des Moines
                </div>
                <div className="font-display text-xl md:text-3xl mt-2 leading-tight text-foreground">
                  Real hardware. Real fiber. Real Iowa.
                </div>
              </div>
              <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-foreground/55">
                41.5868°N · 93.6250°W
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
