import { LoginForm } from "./login-form";

export const metadata = { title: "Admin — Phase Systems" };

export default function AdminLoginPage() {
  return (
    <div className="mx-auto w-full max-w-md px-6 pt-32 pb-24">
      <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50">
        Admin
      </div>
      <h1 className="font-display text-3xl mt-3">Restricted</h1>
      <p className="mt-3 text-foreground/70 text-sm">
        Enter the admin password to view waitlist and contact entries.
      </p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </div>
  );
}
