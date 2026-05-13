import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/admin-auth";
import { redis } from "@/lib/redis";
import { LogoutButton } from "./logout-button";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin" };

interface WaitlistEntry {
  email: string;
  name?: string;
  company?: string;
  interests?: string[] | string;
  createdAt?: string;
}

interface ContactEntry {
  id: string;
  email: string;
  name?: string;
  company?: string;
  message?: string;
  createdAt?: string;
}

async function loadWaitlist(): Promise<WaitlistEntry[]> {
  try {
    const emails = (await redis.smembers("waitlist:emails")) as string[];
    if (!emails || emails.length === 0) return [];
    const entries = await Promise.all(
      emails.map(async (email) => {
        const data = (await redis.hgetall(`waitlist:${email}`)) as Record<
          string,
          unknown
        > | null;
        if (!data) return { email } as WaitlistEntry;
        const interests = data.interests;
        return {
          email: String(data.email ?? email),
          name: data.name ? String(data.name) : "",
          company: data.company ? String(data.company) : "",
          interests:
            typeof interests === "string"
              ? safeParseArray(interests)
              : Array.isArray(interests)
              ? (interests as string[])
              : [],
          createdAt: data.createdAt ? String(data.createdAt) : "",
        };
      })
    );
    entries.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    return entries;
  } catch (err) {
    console.error("[admin] waitlist load error:", err);
    return [];
  }
}

async function loadContacts(): Promise<ContactEntry[]> {
  try {
    const ids = (await redis.lrange("contact:queue", 0, 99)) as string[];
    if (!ids || ids.length === 0) return [];
    const entries = await Promise.all(
      ids.map(async (id) => {
        const data = (await redis.hgetall(`contact:${id}`)) as Record<
          string,
          unknown
        > | null;
        if (!data) return { id, email: "" } as ContactEntry;
        return {
          id: String(data.id ?? id),
          email: data.email ? String(data.email) : "",
          name: data.name ? String(data.name) : "",
          company: data.company ? String(data.company) : "",
          message: data.message ? String(data.message) : "",
          createdAt: data.createdAt ? String(data.createdAt) : "",
        };
      })
    );
    return entries;
  } catch (err) {
    console.error("[admin] contact load error:", err);
    return [];
  }
}

function safeParseArray(s: string): string[] {
  try {
    const v = JSON.parse(s);
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

function fmtDate(iso?: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default async function AdminPage() {
  const authed = await isAdminAuthed();
  if (!authed) redirect("/admin/login");

  const [waitlist, contacts] = await Promise.all([
    loadWaitlist(),
    loadContacts(),
  ]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 pt-12 md:pt-20 pb-16 md:pb-24">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50">
            Admin
          </div>
          <h1 className="font-display text-3xl md:text-5xl mt-3 leading-tight">
            Phase Systems Console
          </h1>
        </div>
        <LogoutButton />
      </div>

      {/* WAITLIST */}
      <section className="mt-14">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl">Waitlist</h2>
          <div className="font-mono text-xs text-foreground/50">
            {waitlist.length} {waitlist.length === 1 ? "entry" : "entries"}
          </div>
        </div>
        <div className="mt-4 border border-border bg-card/40 backdrop-blur-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 font-mono text-[11px] uppercase tracking-widest text-foreground/50">
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Company</th>
                <th className="text-left p-3">Interests</th>
                <th className="text-left p-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {waitlist.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-foreground/50 font-mono text-xs"
                  >
                    No entries yet.
                  </td>
                </tr>
              ) : (
                waitlist.map((e) => (
                  <tr key={e.email} className="border-b border-border/30 last:border-0">
                    <td className="p-3 font-mono text-xs">{e.email}</td>
                    <td className="p-3">{e.name || "—"}</td>
                    <td className="p-3">{e.company || "—"}</td>
                    <td className="p-3 font-mono text-[11px] text-foreground/70">
                      {Array.isArray(e.interests) && e.interests.length > 0
                        ? e.interests.join(", ")
                        : "—"}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-foreground/50">
                      {fmtDate(e.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* CONTACTS */}
      <section className="mt-14">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl">Contact Messages</h2>
          <div className="font-mono text-xs text-foreground/50">
            {contacts.length} {contacts.length === 1 ? "entry" : "entries"}
          </div>
        </div>
        <div className="mt-4 space-y-3">
          {contacts.length === 0 ? (
            <div className="border border-border bg-card/40 backdrop-blur-sm p-8 text-center text-foreground/50 font-mono text-xs">
              No messages yet.
            </div>
          ) : (
            contacts.map((c) => (
              <div
                key={c.id}
                className="border border-border bg-card/40 backdrop-blur-sm p-5"
              >
                <div className="flex items-baseline justify-between flex-wrap gap-2">
                  <div>
                    <span className="font-mono text-xs">{c.email}</span>
                    {c.name && (
                      <span className="text-foreground/60 text-sm ml-2">
                        — {c.name}
                        {c.company && ` · ${c.company}`}
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-[11px] text-foreground/50">
                    {fmtDate(c.createdAt)}
                  </div>
                </div>
                <p className="mt-3 text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">
                  {c.message}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
