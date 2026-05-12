export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 pt-24 pb-24">
      <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/40 flex items-center gap-3">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{
            background: "#7CFFA8",
            boxShadow: "0 0 6px rgba(124,255,168,0.85)",
            animation: "pulse 1.2s ease-in-out infinite",
          }}
        />
        Loading…
      </div>
    </div>
  );
}
