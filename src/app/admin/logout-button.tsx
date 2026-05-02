"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <button
      onClick={logout}
      className="font-mono text-xs uppercase tracking-widest border border-border px-4 py-2 hover-elevate text-foreground/70 hover:text-foreground"
    >
      Sign out
    </button>
  );
}
