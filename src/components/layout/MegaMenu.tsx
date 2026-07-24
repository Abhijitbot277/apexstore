import { motion } from "framer-motion";
import {
  Gamepad2,
  Cpu,
  Laptop,
  Gamepad,
  CircuitBoard,
  Headphones,
  Keyboard,
  Mouse as MouseIcon,
  Monitor,
  Smartphone,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { categories, products } from "../../data/products";
import type { ProductCategory } from "../../types";

const ICONS: Record<ProductCategory, LucideIcon> = {
  console: Gamepad2,
  pc: Cpu,
  laptop: Laptop,
  controller: Gamepad,
  gpu: CircuitBoard,
  headset: Headphones,
  keyboard: Keyboard,
  mouse: MouseIcon,
  monitor: Monitor,
  phone: Smartphone,
};

export default function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const spotlight = products.find((p) => p.tag === "exclusive") ?? products[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="glass absolute left-1/2 top-full z-40 mt-3 w-[min(920px,92vw)] -translate-x-1/2 rounded-3xl p-6 shadow-2xl"
    >
      <div className="grid grid-cols-[1fr_260px] gap-6">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-faint">Shop by category</p>
          <div className="grid grid-cols-3 gap-1.5">
            {categories.map(({ key, label }) => {
              const Icon = ICONS[key];
              return (
                <a
                  key={key}
                  href="/#categories"
                  onClick={onNavigate}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-panel-raised"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-panel-raised text-cyan transition-transform group-hover:scale-110">
                    <Icon size={17} strokeWidth={1.7} />
                  </span>
                  <span className="text-sm text-text">{label}</span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border-hi bg-panel-raised p-4">
          <p className="mb-2 inline-block rounded-full bg-lime/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-lime">
            Spotlight
          </p>
          <h4 className="font-display text-sm font-semibold text-text">{spotlight.name}</h4>
          <p className="mt-1 text-xs leading-relaxed text-text-muted">{spotlight.description}</p>
          <a
            href={`/product/${spotlight.id}`}
            onClick={onNavigate}
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-cyan"
          >
            View product <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
