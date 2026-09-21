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
    <section id="categories" className="relative mx-auto max-w-[1400px] px-5 py-20 lg:px-8">
      <Reveal className="mb-8 flex items-end justify-between" y={20}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">Browse the store</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Shop by category</h2>
          <p className="mt-2 max-w-xl text-sm text-text-muted">
            Find the hardware you need — consoles, PCs, GPUs, displays and gaming essentials.
          </p>
        </div>
      </Reveal>

      <Reveal className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" stagger={0.05}>
        {categories.map(({ key, label }) => {
          const Icon = ICONS[key];
          const inCategory = products.filter((p) => p.category === key).length;

          return (
            <a
              key={key}
              href="#featured"
              className="group relative flex min-h-[154px] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-panel p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan/30 hover:bg-panel-raised hover:shadow-[0_18px_45px_-20px_rgba(0,229,255,0.45)]"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan/5 blur-2xl transition-all duration-300 group-hover:bg-cyan/15" />

              <div className="relative flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-panel-raised text-cyan transition-all duration-300 group-hover:scale-105 group-hover:border-cyan/30">
                  <Icon size={21} strokeWidth={1.7} />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-faint">
                  {String(inCategory).padStart(2, "0")}
                </span>
              </div>

              <div className="relative mt-6">
                <p className="font-display text-[15px] font-semibold text-text">{label}</p>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-xs text-text-faint">
                    {inCategory} {inCategory === 1 ? "product" : "products"}
                  </p>
                  <span className="translate-x-1 text-text-faint opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-cyan group-hover:opacity-100">
                    →
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </Reveal>
    </section>
  );
}
