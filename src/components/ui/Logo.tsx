import { motion } from "framer-motion";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`group flex items-center gap-2.5 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none" className="shrink-0">
        <defs>
          <linearGradient id="logo-g" x1="4" y1="40" x2="44" y2="8" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#00E5FF" />
            <stop offset="1" stopColor="#7A5CFF" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="12" fill="var(--color-panel-raised)" />
        <motion.path
          d="M24 8 L40 38 M24 8 L8 38"
          stroke="url(#logo-g)"
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 1 }}
          whileHover={{ pathLength: [1, 0.85, 1] }}
          transition={{ duration: 0.6 }}
        />
        <path d="M14.5 30 H21" stroke="url(#logo-g)" strokeWidth="4.2" strokeLinecap="round" />
        <path d="M27 30 H33.5" stroke="url(#logo-g)" strokeWidth="4.2" strokeLinecap="round" />
        <motion.circle
          cx="24"
          cy="30"
          r="2.6"
          fill="#8DFF3D"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      <span className="font-display text-lg font-bold tracking-tight">
        Apex<span className="text-gradient">Store</span>
      </span>
    </div>
  );
}
