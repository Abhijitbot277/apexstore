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
  type LucideIcon,
} from "lucide-react";
import { categories, products } from "../../data/products";
import type { ProductCategory } from "../../types";
import Reveal from "../ui/Reveal";

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

export default function CategoryShowcase() {
  return (
    <section id="categories" className="mx-auto max-w-[1400px] px-5 py-20 lg:px-8">
      <Reveal className="mb-10 flex items-end justify-between" y={20}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan">Browse</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Top categories</h2>
        </div>
      </Reveal>

      <Reveal className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5" stagger={0.06}>
        {categories.map(({ key, label }) => {
          const Icon = ICONS[key];
          const inCategory = products.filter((p) => p.category === key).length;
          return (
            <a
              key={key}
              href={`#featured`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-panel p-5 transition-all hover:-translate-y-1 hover:border-border-hi hover:shadow-[0_16px_40px_-16px_rgba(0,229,255,0.25)]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-panel-raised text-cyan transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <Icon size={20} strokeWidth={1.6} />
              </div>
              <p className="font-display text-sm font-semibold text-text">{label}</p>
              <p className="mt-0.5 text-xs text-text-faint">{inCategory} products</p>
            </a>
          );
        })}
      </Reveal>
    </section>
  );
}
