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
  type LucideIcon,
} from "lucide-react";
import type { ProductCategory } from "../../types";

type HoverFX = "spin3d" | "fanSpin" | "lidOpen" | "rgbWave" | "shine";

const FX_BY_CATEGORY: Record<ProductCategory, HoverFX> = {
  console: "spin3d",
  pc: "fanSpin",
  laptop: "lidOpen",
  controller: "rgbWave",
  gpu: "fanSpin",
  headset: "spin3d",
  keyboard: "rgbWave",
  mouse: "rgbWave",
  monitor: "shine",
  phone: "lidOpen",
};

const ICON_BY_CATEGORY: Record<ProductCategory, LucideIcon> = {
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

interface ProductVisualProps {
  category: ProductCategory;
  colorway: [string, string];
  isHovered: boolean;
}

export default function ProductVisual({ category, colorway, isHovered }: ProductVisualProps) {
  const fx = FX_BY_CATEGORY[category];
  const Icon = ICON_BY_CATEGORY[category];
  const [c1, c2] = colorway;

  return (
    <div
      className="relative aspect-square w-full overflow-hidden rounded-2xl"
      style={{ background: `radial-gradient(circle at 30% 20%, ${c1}22, var(--color-panel) 65%)` }}
    >
      {/* ambient glow blob, hue-shifts for RGB categories */}
      <motion.div
        className="absolute -inset-6 rounded-full blur-2xl"
        style={{ background: `linear-gradient(120deg, ${c1}, ${c2})`, opacity: 0.25 }}
        animate={
          fx === "rgbWave"
            ? { filter: isHovered ? ["hue-rotate(0deg)", "hue-rotate(360deg)"] : "hue-rotate(0deg)" }
            : { opacity: isHovered ? 0.4 : 0.25 }
        }
        transition={fx === "rgbWave" ? { duration: 1.8, repeat: isHovered ? Infinity : 0, ease: "linear" } : { duration: 0.4 }}
      />

      {/* shine sweep, for monitors/phones */}
      {(fx === "shine") && (
        <motion.div
          className="absolute inset-y-0 w-1/3 -skew-x-12"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)" }}
          initial={{ x: "-120%" }}
          animate={{ x: isHovered ? "220%" : "-120%" }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />
      )}

      {/* icon plate */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: 600 }}>
        <motion.div
          className="glass flex h-20 w-20 items-center justify-center rounded-2xl"
          style={{ transformStyle: "preserve-3d" }}
          animate={
            fx === "spin3d"
              ? { rotateY: isHovered ? 360 : 0 }
              : fx === "lidOpen"
              ? { rotateX: isHovered ? 0 : 18, y: isHovered ? -2 : 0 }
              : { scale: isHovered ? 1.06 : 1 }
          }
          transition={
            fx === "spin3d"
              ? { duration: 1.4, repeat: isHovered ? Infinity : 0, ease: "linear" }
              : { duration: 0.5, ease: "easeOut" }
          }
        >
          <motion.div
            animate={fx === "fanSpin" ? { rotate: isHovered ? 360 : 0 } : {}}
            transition={fx === "fanSpin" ? { duration: 0.7, repeat: isHovered ? Infinity : 0, ease: "linear" } : {}}
          >
            <Icon size={34} style={{ color: c1 }} strokeWidth={1.6} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
