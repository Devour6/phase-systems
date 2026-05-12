// Page transition wrapper — re-mounts on every route change,
// giving us a fresh fade-in via CSS.

export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-fade-in">{children}</div>;
}
