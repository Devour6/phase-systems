import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 pt-32 pb-32 text-center">
      <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50">
        404
      </div>
      <h1 className="font-display text-5xl mt-3" style={{ color: "#7CFFA8" }}>
        Off the grid.
      </h1>
      <p className="text-foreground/70 mt-5">
        That page doesn&apos;t exist — or hasn&apos;t been racked yet.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block font-mono text-xs uppercase tracking-widest border border-[#7CFFA8] px-5 py-3 hover-elevate"
        style={{ color: "#7CFFA8" }}
      >
        ← Back home
      </Link>
    </div>
  );
}
