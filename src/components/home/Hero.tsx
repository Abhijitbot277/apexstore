import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, PlayCircle } from "lucide-react";
import { lazy, Suspense } from "react";
import { useMousePosition } from "../../hooks/useMousePosition";
import MagneticButton from "../ui/MagneticButton";

const HeroParticles = lazy(() => import("./HeroParticles"));

const STATS = [
  { value: "500K+", label: "Players served" },
  { value: "4.8/5", label: "Average rating" },
  { value: "30-day", label: "Free returns" },
];

export default function Hero() {
  const mouse = useMousePosition();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-void">
      {/* base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 0%, color-mix(in srgb, var(--color-violet) 18%, transparent), transparent), radial-gradient(ellipse 70% 50% at 85% 90%, color-mix(in srgb, var(--color-cyan) 14%, transparent), transparent)",
        }}
      />
      <Suspense fallback={null}>
        <HeroParticles />
      </Suspense>

      {/* parallax glow orbs */}
      <motion.div
        className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-violet/20 blur-[100px]"
        animate={{ x: mouse.x * -40, y: mouse.y * -30 }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
      />
      <motion.div
        className="absolute -right-24 bottom-10 h-[28rem] w-[28rem] rounded-full bg-cyan/15 blur-[110px]"
        animate={{ x: mouse.x * 50, y: mouse.y * 40 }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 pt-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-text-muted"
          >
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-lime" />
            New season hardware just landed
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Gear built for
            <br />
            <span className="text-gradient">the summit.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-balance text-lg text-text-muted"
          >
            Consoles, PCs, and peripherals engineered for players who refuse to plateau. Curated by ApexStore,
            delivered fast.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <MagneticButton
              as="a"
              href="#featured"
              className="flex items-center gap-2 rounded-full bg-gradient-to-br from-cyan to-violet px-7 py-3.5 text-sm font-bold text-void shadow-[0_10px_40px_-10px_rgba(0,229,255,0.5)]"
            >
              Shop the drop <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton
              as="a"
              href="/#categories"
              className="glass flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-text"
            >
              <PlayCircle size={16} /> Explore consoles
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mx-auto mt-14 flex max-w-md items-center justify-between border-t border-border pt-6"
          >
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-mono text-xl font-bold text-text">{s.value}</p>
                <p className="mt-0.5 text-xs text-text-faint">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-faint"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
}
