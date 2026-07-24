import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Mail } from "lucide-react";
import { useState } from "react";
import Reveal from "../ui/Reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-20 lg:px-8">
      <Reveal
        className="relative overflow-hidden rounded-3xl border border-border-hi px-6 py-14 text-center sm:px-12"
        y={20}
      >
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 0%, color-mix(in srgb, var(--color-cyan) 14%, transparent), var(--color-panel))",
          }}
        />
        <Mail size={28} className="mx-auto text-cyan" />
        <h2 className="mx-auto mt-4 max-w-md font-display text-2xl font-bold sm:text-3xl">
          Get drop alerts before they sell out
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-text-muted">
          Restocks, flash deals, and new hardware — straight to your inbox, once a week at most.
        </p>

        <div className="mx-auto mt-7 max-w-sm">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 rounded-full bg-emerald/15 px-5 py-3 text-sm font-medium text-emerald"
              >
                <CheckCircle2 size={16} /> You're on the list.
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setSubmitted(true);
                }}
                className="flex gap-2"
              >
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="flex-1 rounded-full border border-border bg-panel-raised px-4 py-3 text-sm placeholder:text-text-faint focus:border-cyan/50 focus:outline-none"
                />
                <button
                  type="submit"
                  className="whitespace-nowrap rounded-full bg-gradient-to-br from-cyan to-violet px-6 py-3 text-sm font-bold text-void"
                >
                  Subscribe
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
