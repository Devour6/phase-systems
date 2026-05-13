// Shared media-query check: returns true when the user prefers reduced
// motion OR is on a data-saver connection. Use this to gate continuous
// timers and SVG animations across viz components.

export function shouldReduce(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(prefers-reduced-data: reduce)").matches
  );
}
