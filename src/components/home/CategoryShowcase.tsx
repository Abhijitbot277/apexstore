import { motion } from "framer-motion";
import {
  Gamepad2, Cpu, Laptop, Gamepad, CircuitBoard, Headphones, Keyboard,
  Mouse as MouseIcon, Monitor, Smartphone, ArrowUpRight, type LucideIcon,
} from "lucide-react";
import { categories, products } from "../../data/products";
import type { ProductCategory } from "../../types";
import Reveal from "../ui/Reveal";

const ICONS: Record<ProductCategory, LucideIcon> = {
  console: Gamepad2, pc: Cpu, laptop: Laptop, controller: Gamepad,
  gpu: CircuitBoard, headset: Headphones, keyboard: Keyboard,
  mouse: MouseIcon, monitor: Monitor, phone: Smartphone,
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

const ACCENTS: Record<ProductCategory, string> = {
  console: "#00e5ff", pc: "#8b5cf6", laptop: "#00e5ff", controller: "#00e5ff",
  gpu: "#a855f7", headset: "#a855f7", keyboard: "#00e5ff", mouse: "#8b5cf6",
  monitor: "#00e5ff", phone: "#a855f7",
};

export default function CategoryShowcase() {
  return (
    <section id="categories" className="relative mx-auto max-w-[1500px] px-5 py-20 lg:px-8">
      <Reveal className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between" y={20}>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-cyan">Browse categories</p>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">Shop by <span className="text-cyan">Category</span></h2>
          <p className="mt-3 max-w-2xl text-sm text-text-muted sm:text-base">Find your favorite gear, explore top brands and upgrade your setup.</p>
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan/30 bg-cyan/10 text-cyan"><ArrowUpRight size={20} /></div>
          <div><p className="text-sm font-semibold text-text">Top categories</p><p className="text-xs text-text-muted">Everything you need in one place.</p></div>
        </div>
      </Reveal>

      <Reveal className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5" stagger={0.06}>
        {categories.map(({ key, label }) => {
          const Icon = ICONS[key];
          const inCategory = products.filter((p) => p.category === key).length;
          const accent = ACCENTS[key];
          return (
            <motion.a key={key} href="#featured" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }} whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
              className="group relative block min-h-[255px] overflow-hidden rounded-[22px] border border-white/10 bg-[#07101d] shadow-[0_20px_60px_-35px_rgba(0,0,0,0.95)]"
              style={{ perspective: 900, transformStyle: "preserve-3d" }}>
              <div className="pointer-events-none absolute -inset-8 opacity-0 blur-3xl transition duration-500 group-hover:opacity-25" style={{ background: accent }} />
              <div className="absolute inset-[1px] overflow-hidden rounded-[21px]">
                <img src={CATEGORY_IMAGES[key]} alt={label + " products"} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center opacity-80 saturate-[0.9] transition duration-700 ease-out group-hover:scale-[1.12] group-hover:opacity-100 group-hover:saturate-100" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,18,0.05)_0%,rgba(3,8,18,0.08)_35%,rgba(3,8,18,0.92)_100%)]" />
                <div className="absolute inset-x-0 top-0 h-px opacity-70" style={{ background: "linear-gradient(90deg, transparent, " + accent + ", transparent)" }} />
                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-black/45 text-white shadow-lg backdrop-blur-xl transition duration-300 group-hover:scale-110 group-hover:border-white/30"><Icon size={19} strokeWidth={1.8} style={{ color: accent }} /></div>
                <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/45 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider text-white/75 backdrop-blur-xl">{String(inCategory).padStart(2, "0")}+</div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="mb-3 h-px w-10 opacity-70 transition-all duration-500 group-hover:w-16" style={{ background: accent }} />
                  <div className="flex items-end justify-between gap-2">
                    <div><h3 className="font-display text-base font-bold text-white">{label}</h3><p className="mt-1 text-[11px] text-white/55">{inCategory} {inCategory === 1 ? "Product" : "Products"}</p></div>
                    <span className="flex h-9 w-9 shrink-0 translate-y-1 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white/70 opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" style={{ boxShadow: "0 0 24px " + accent + "33" }}><ArrowUpRight size={16} /></span>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 transition duration-300 group-hover:opacity-100" style={{ boxShadow: "inset 0 0 0 1px " + accent + "99, 0 0 35px " + accent + "22" }} />
            </motion.a>
          );
        })}
      </Reveal>
    </section>
  );
}