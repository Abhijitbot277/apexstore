import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth, type UserRole } from "../context/AuthContext";
import Logo from "../components/ui/Logo";

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [role, setRole] = useState<UserRole>(searchParams.get("role") === "admin" ? "admin" : "customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isAdmin = role === "admin";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password, role);
      navigate(isAdmin ? "/admin" : "/dashboard", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-void text-text">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,color-mix(in_srgb,var(--color-cyan)_12%,transparent),transparent_30%),radial-gradient(circle_at_82%_78%,color-mix(in_srgb,var(--color-violet)_15%,transparent),transparent_34%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,var(--color-border-hi)_1px,transparent_0)] [background-size:32px_32px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center justify-center px-5 py-10">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-border bg-panel/80 shadow-2xl shadow-black/30 backdrop-blur-2xl lg:grid-cols-[0.95fr_1.05fr]">
          <section className="relative hidden min-h-[680px] overflow-hidden p-10 lg:flex lg:flex-col lg:justify-between">
            <Link to="/" aria-label="ApexStore home"><Logo /></Link>
            <div className="max-w-md">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan">APEX ACCESS</p>
              <h1 className="mt-4 font-display text-5xl font-bold leading-[1.02]">Your gear.<br /><span className="text-gradient">Your control.</span></h1>
              <p className="mt-6 max-w-sm text-sm leading-6 text-text-muted">
                Sign in to manage your ApexStore account, track orders, save your wishlist, or operate the store from the owner dashboard.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InfoCard icon={<ShieldCheck size={18} />} title="Protected access" text="Separate customer and owner areas." />
              <InfoCard icon={<Sparkles size={18} />} title="Apex experience" text="One account across the storefront." />
            </div>
          </section>

          <section className="flex min-h-[680px] items-center p-6 sm:p-10 lg:p-14">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8 lg:hidden"><Link to="/" aria-label="ApexStore home"><Logo /></Link></div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-text-faint">Welcome back</p>
              <h2 className="mt-2 font-display text-3xl font-bold">Sign in to ApexStore</h2>
              <p className="mt-2 text-sm text-text-muted">Choose how you want to access the store.</p>

              <div className="mt-8 grid grid-cols-2 rounded-2xl border border-border bg-void/60 p-1.5">
                {(["customer", "admin"] as UserRole[]).map((item) => (
                  <button key={item} type="button" onClick={() => { setRole(item); setError(""); }}
                    className={`relative rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${role === item ? "text-void" : "text-text-muted hover:text-text"}`}>
                    {role === item && <motion.span layoutId="login-role" className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan to-violet" />}
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {item === "admin" ? <ShieldCheck size={16} /> : <UserRound size={16} />}
                      {item === "admin" ? "Admin" : "Customer"}
                    </span>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={role} initial={{ opacity: 0, x: isAdmin ? 12 : -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                  <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-text-muted">{isAdmin ? "Owner email" : "Email address"}</label>
                      <div className="flex items-center gap-3 rounded-2xl border border-border bg-void/70 px-4 py-3.5 focus-within:border-cyan/50">
                        <UserRound size={18} className="text-text-faint" />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={isAdmin ? "owner@apexstore.com" : "you@example.com"} autoComplete="email" className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-faint" required />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-text-muted">Password</label>
                      <div className="flex items-center gap-3 rounded-2xl border border-border bg-void/70 px-4 py-3.5 focus-within:border-cyan/50">
                        <LockKeyhole size={18} className="text-text-faint" />
                        <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-faint" required />
                        <button type="button" onClick={() => setShowPassword((v) => !v)} className="text-text-faint hover:text-text" aria-label={showPassword ? "Hide password" : "Show password"}>
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    {error && <p className="rounded-2xl border border-crimson/20 bg-crimson/10 px-4 py-3 text-sm text-crimson">{error}</p>}
                    <button type="submit" disabled={loading} className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan via-blue-500 to-violet px-5 py-4 text-sm font-bold text-void transition-transform hover:scale-[1.01] disabled:cursor-wait disabled:opacity-60">
                      {loading ? "Signing in…" : `Continue as ${isAdmin ? "Admin" : "Customer"}`}
                      {!loading && <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />}
                    </button>
                  </form>
                </motion.div>
              </AnimatePresence>

              <div className="mt-7 flex items-start gap-3 rounded-2xl border border-border bg-panel-raised/50 p-4">
                {isAdmin ? <ShieldCheck size={18} className="mt-0.5 shrink-0 text-cyan" /> : <UserRound size={18} className="mt-0.5 shrink-0 text-violet" />}
                <p className="text-xs leading-5 text-text-muted">
                  {isAdmin ? "Owner access opens the ApexStore management dashboard." : "Customer access opens your orders, wishlist, profile and shopping dashboard."}
                </p>
              </div>
              <p className="mt-7 text-center text-xs text-text-faint"><Link to="/" className="hover:text-text">Back to store</Link></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-panel-raised/50 p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-void text-cyan">{icon}</div>
      <p className="mt-4 text-sm font-semibold">{title}</p>
      <p className="mt-1 text-xs leading-5 text-text-muted">{text}</p>
    </div>
  );
}
