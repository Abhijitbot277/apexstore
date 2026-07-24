import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { ThemeMode } from "../../types";

// Keep in sync with the token values in src/index.css
const PALETTE: Record<ThemeMode, { void: string; panelRaised: string }> = {
  dark: { void: "#0b0d10", panelRaised: "#1c2027" },
  light: { void: "#eef1f5", panelRaised: "#f7f8fa" },
};
const ACCENTS = ["#00e5ff", "#7a5cff", "#8dff3d"];

interface OverlayProps {
  variant: "tiles" | "blocks";
  fromTheme: ThemeMode;
  onMidpoint: () => void;
  onComplete: () => void;
}

export default function ThemeTransitionOverlay({ variant, fromTheme, onMidpoint, onComplete }: OverlayProps) {
  const toTheme: ThemeMode = fromTheme === "dark" ? "light" : "dark";
  const outgoing = PALETTE[fromTheme];
  const incoming = PALETTE[toTheme];

  useEffect(() => {
    const midMs = variant === "tiles" ? 430 : 560;
    const doneMs = variant === "tiles" ? 900 : 1350;
    const midTimer = setTimeout(onMidpoint, midMs);
    const doneTimer = setTimeout(onComplete, doneMs);
    return () => {
      clearTimeout(midTimer);
      clearTimeout(doneTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  return (
    <div
      className="fixed inset-0 z-[999]"
      style={{ background: incoming.void }}
      aria-hidden="true"
    >
      {variant === "tiles" ? <TileFlip outgoing={outgoing} /> : <BlockFall outgoing={outgoing} incoming={incoming} />}
    </div>
  );
}

/* ---------------- Animation A: 3D tile flip ---------------- */
function TileFlip({ outgoing }: { outgoing: { void: string; panelRaised: string } }) {
  const cols = 10;
  const rows = 6;

  const tiles = useMemo(() => {
    const arr: { row: number; col: number; accent: string }[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        arr.push({ row: r, col: c, accent: ACCENTS[(r + c) % ACCENTS.length] });
      }
    }
    return arr;
  }, []);

  return (
    <div
      className="absolute inset-0 grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        perspective: 1400,
      }}
    >
      {tiles.map(({ row, col, accent }) => {
        const delay = (row + col) * 0.032;
        return (
          <div key={`${row}-${col}`} style={{ transformStyle: "preserve-3d" }}>
            <motion.div
              className="h-full w-full"
              style={{
                background: outgoing.void,
                borderTop: `2px solid ${accent}33`,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
              initial={{ rotateX: 0 }}
              animate={{ rotateX: 180 }}
              transition={{ duration: 0.42, delay, ease: [0.65, 0, 0.35, 1] }}
            />
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Animation B: gravity block fall + rebuild ---------------- */
function BlockFall({
  outgoing,
  incoming,
}: {
  outgoing: { void: string; panelRaised: string };
  incoming: { void: string; panelRaised: string };
}) {
  const cols = 8;
  const rows = 4;
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFading(true), 1080);
    return () => clearTimeout(t);
  }, []);

  const blocks = useMemo(() => {
    const arr: { row: number; col: number; accent: string; delay: number; tilt: number }[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        arr.push({
          row: r,
          col: c,
          accent: ACCENTS[(r * cols + c) % ACCENTS.length],
          delay: c * 0.03 + r * 0.015 + Math.random() * 0.04,
          tilt: c % 2 === 0 ? -1 : 1,
        });
      }
    }
    return arr;
  }, []);

  return (
    <motion.div
      className="absolute inset-0 grid"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.24, ease: "easeInOut" }}
    >
      {blocks.map(({ row, col, accent, delay, tilt }) => (
        <div key={`${row}-${col}`} className="relative">
          {/* outgoing panel — drops away under gravity */}
          <motion.div
            className="absolute inset-[3px]"
            style={{ background: outgoing.void, borderBottom: `2px solid ${accent}44` }}
            initial={{ y: 0, rotate: 0, opacity: 1 }}
            animate={{ y: "160%", rotate: tilt * 7, opacity: 0.6 }}
            transition={{ duration: 0.46, delay, ease: [0.55, 0, 1, 0.45] }}
          />
          {/* incoming panel — falls into place to rebuild the UI */}
          <motion.div
            className="absolute inset-[3px]"
            style={{ background: incoming.panelRaised, border: `1px solid ${accent}55` }}
            initial={{ y: "-160%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.26, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      ))}
    </motion.div>
  );
}
