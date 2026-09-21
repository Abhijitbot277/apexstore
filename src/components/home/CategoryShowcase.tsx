import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Gamepad2, Cpu, Laptop, Gamepad, CircuitBoard, Headphones, Keyboard,
  Mouse as MouseIcon, Monitor, Smartphone, ArrowUpRight, type LucideIcon,
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

const ACCENTS: Record<ProductCategory, string> = {
  console: "#00E5FF",
  pc: "#8B5CF6",
  laptop: "#00E5FF",
  controller: "#8B5CF6",
  gpu: "#A855F7",
  headset: "#00E5FF",
  keyboard: "#8B5CF6",
  mouse: "#00E5FF",
  monitor: "#A855F7",
  phone: "#00E5FF",
};

function CategoryCard({
  category,
  label,
}: {
  category: ProductCategory;
  label: string;
}) {
  const Icon = ICONS[category];
  const accent = ACCENTS[category];
  const count = products.filter((p) => p.category === category).length;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 260,
    damping: 22,
  });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 260,
    damping: 22,
  });

  return (
    <motion.a
      href="#featured"
      className="group relative block h-[330px] overflow-visible"
      style={{ perspective: 1200 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mx.set((event.clientX - rect.left) / rect.width - 0.5);
        my.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#070B14] shadow-[0_30px_80px_-35px_rgba(0,0,0,.95)]"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -8, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
        <div
          className="absolute -inset-20 opacity-20 blur-3xl transition duration-500 group-hover:opacity-50"
          style={{ background: `radial-gradient(circle, ${accent}, transparent 65%)` }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(145deg, rgba(255,255,255,.09), transparent 35%), linear-gradient(180deg, transparent 38%, rgba(0,0,0,.9) 100%)`,
          }}
        />

        <div className="absolute inset-x-4 top-4 flex items-center justify-between" style={{ transform: "translateZ(45px)" }}>
          <div
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-black/40 text-white backdrop-blur-xl"
            style={{ boxShadow: `0 0 28px ${accent}30` }}
          >
            <Icon size={18} style={{ color: accent }} strokeWidth={1.8} />
          </div>
          <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-white/70 backdrop-blur-xl">
            {String(count).padStart(2, "0")} ITEMS
          </span>
        </div>

        <motion.div
          className="absolute left-1/2 top-[45%] h-[180px] w-[88%] -translate-x-1/2 -translate-y-1/2"
          style={{ transform: "translateZ(65px)" }}
        >
          <div
            className="absolute left-1/2 top-1/2 h-[125px] w-[125px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl opacity-35"
            style={{ background: accent }}
          />
          <motion.img
            src={CATEGORY_IMAGES[category]}
            alt={`${label} products`}
            loading="lazy"
            className="relative z-10 h-full w-full object-contain drop-shadow-[0_30px_25px_rgba(0,0,0,.8)]"
            initial={{ scale: 0.94, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            whileHover={{ scale: 1.12, y: -10, rotate: 2 }}
            transition={{ duration: 0.45 }}
          />
        </motion.div>

        <div
          className="absolute inset-x-5 bottom-5"
          style={{ transform: "translateZ(55px)" }}
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="h-px w-10" style={{ background: accent }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-white/45">
              Apex collection
            </span>
          </div>
          <div className="flex items-end justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-bold tracking-tight text-white">{label}</h3>
              <p className="mt-1 text-xs text-white/45">
                {count} {count === 1 ? "product" : "products"} available
              </p>
            </div>
            <motion.span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-xl"
              whileHover={{ rotate: 45, scale: 1.1 }}
            >
              <ArrowUpRight size={17} />
            </motion.span>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            boxShadow: `inset 0 0 0 1px ${accent}99, inset 0 -80px 100px ${accent}12, 0 0 50px ${accent}22`,
          }}
        />

        <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px opacity-50" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
      </motion.div>
    </motion.a>
  );
}

export default function CategoryShowcase() {
  return (
    <section id="categories" className="relative overflow-hidden px-5 py-24 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/5 blur-[140px]" />

      <div className="relative mx-auto max-w-[1500px]">
        <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between" y={24}>
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-12 bg-cyan" />
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-cyan">Explore the collection</p>
            </div>
            <h2 className="font-display text-4xl font-bold tracking-[-0.04em] text-text sm:text-5xl lg:text-6xl">
              Shop by <span className="text-cyan">Category</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-text-muted sm:text-base">
              Premium hardware, gaming gear and everyday tech — presented as a complete 3D collection.
            </p>
          </div>

          <div className="hidden rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-xl md:block">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">Collection</p>
            <p className="mt-1 font-display text-lg font-bold text-white">10 categories</p>
          </div>
        </Reveal>

        <Reveal className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" stagger={0.045}>
          {categories.map(({ key, label }) => (
            <CategoryCard key={key} category={key} label={label} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
