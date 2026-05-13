import { LoginForm } from "./login-form";

export const metadata = { title: "Admin — Phase Systems" };

export default function AdminLoginPage() {
  return (
    <div className="w-full">
      <section className="relative overflow-hidden">
        <div id="hero-grid" className="hero-grid" aria-hidden />
        <div className="relative z-[2] mx-auto w-full max-w-md px-4 sm:px-6 pt-24 pb-24">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/50">
            // Admin
          </div>
          <h1 className="font-display text-3xl md:text-4xl mt-4 leading-tight">
            Restricted
          </h1>
          <p className="mt-4 text-foreground/65 text-sm leading-relaxed">
            Enter the admin password to view waitlist and contact entries.
          </p>
          <div className="form-surface mt-9 p-6">
            <span className="corner-tl" aria-hidden />
            <span className="corner-br" aria-hidden />
            <LoginForm />
          </div>
        </div>
      </section>
    </div>
  );
}
