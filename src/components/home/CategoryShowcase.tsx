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

const CATEGORY_IMAGES: Record<ProductCategory, string> = {
  console: "https://commons.wikimedia.org/wiki/Special:FilePath/PlayStation_5_and_DualSense_with_transparent_background.png",
  pc: "https://commons.wikimedia.org/wiki/Special:FilePath/Gaming_pc.jpg",
  laptop: "https://commons.wikimedia.org/wiki/Special:FilePath/Gaming_PC_(Unsplash).jpg",
  controller: "https://commons.wikimedia.org/wiki/Special:FilePath/Game_Controller_(53551105521).jpg",
  gpu: "https://commons.wikimedia.org/wiki/Special:FilePath/Graphics_Card_(25600081191).jpg",
  headset: "https://commons.wikimedia.org/wiki/Special:FilePath/Gaming_Headsets.png",
  keyboard: "https://commons.wikimedia.org/wiki/Special:FilePath/GamingKeyboard.jpg",
  mouse: "https://commons.wikimedia.org/wiki/Special:FilePath/Gaming_PC-Setup_-_Astaroth-_The_Completed_System.jpg",
  monitor: "https://commons.wikimedia.org/wiki/Special:FilePath/Gaming_PC-Setup_-_Astaroth-_The_Completed_System.jpg",
  phone: "https://commons.wikimedia.org/wiki/Special:FilePath/Gaming_PC-Setup_-_Astaroth-_The_Completed_System.jpg",
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
              className="group relative min-h-[190px] overflow-hidden rounded-2xl border border-border bg-panel transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan/30 hover:shadow-[0_18px_45px_-20px_rgba(0,229,255,0.45)]"
            >
              <img
                src={CATEGORY_IMAGES[key]}
                alt={`${label} products`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-500 group-hover:scale-110 group-hover:opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
              <div className="absolute inset-0 bg-cyan/0 transition-colors duration-300 group-hover:bg-cyan/5" />

              <div className="relative flex min-h-[190px] flex-col justify-between p-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-black/45 text-cyan backdrop-blur-md">
                    <Icon size={19} strokeWidth={1.7} />
                  </div>
                  <span className="rounded-full border border-white/10 bg-black/40 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/70 backdrop-blur-md">
                    {String(inCategory).padStart(2, "0")}
                  </span>
                </div>

                <div>
                  <p className="font-display text-[15px] font-semibold text-white">{label}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-xs text-white/60">
                      {inCategory} {inCategory === 1 ? "product" : "products"}
                    </p>
                    <span className="translate-x-1 text-cyan opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </Reveal>
    </section>
  );
}
