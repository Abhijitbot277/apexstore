import { motion } from "framer-motion";
import { Heart, Eye, GitCompare, Plus, Star } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import ProductVisual from "./ProductVisual";

const TAG_STYLES: Record<NonNullable<Product["tag"]>, string> = {
  new: "bg-cyan/15 text-cyan border-cyan/30",
  bestseller: "bg-violet/15 text-violet border-violet/30",
  deal: "bg-crimson/15 text-crimson border-crimson/30",
  exclusive: "bg-lime/15 text-lime border-lime/30",
};

const TAG_LABEL: Record<NonNullable<Product["tag"]>, string> = {
  new: "New",
  bestseller: "Bestseller",
  deal: "Deal",
  exclusive: "Exclusive",
};

const STOCK_STYLES: Record<Product["stock"], { dot: string; label: string }> = {
  "in-stock": { dot: "bg-emerald", label: "In stock" },
  "low-stock": { dot: "bg-amber animate-pulse-soft", label: "Low stock" },
  "out-of-stock": { dot: "bg-crimson", label: "Out of stock" },
};

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useCart();
  const { toggle, has } = useWishlist();
  const wished = has(product.id);
  const stock = STOCK_STYLES[product.stock];
  const discount = product.originalPrice
    ? Math.round(100 - (product.price / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative rounded-3xl border border-border bg-panel p-3 transition-shadow duration-300 hover:border-border-hi hover:shadow-[0_20px_60px_-20px_rgba(0,229,255,0.25)]"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative">
          <ProductVisual category={product.category} colorway={product.colorway} isHovered={hovered} />

          {product.tag && (
            <span
              className={`absolute left-2 top-2 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${TAG_STYLES[product.tag]}`}
            >
              {TAG_LABEL[product.tag]}
            </span>
          )}
          {discount && (
            <span className="absolute right-2 top-2 rounded-full border border-crimson/30 bg-crimson/15 px-2.5 py-1 font-mono text-[11px] font-semibold text-crimson">
              -{discount}%
            </span>
          )}

          {/* quick actions */}
          <motion.div
            className="absolute bottom-2 right-2 flex gap-1.5"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            transition={{ duration: 0.2 }}
          >
            <IconAction label="Quick preview">
              <Eye size={15} />
            </IconAction>
            <IconAction label="Compare">
              <GitCompare size={15} />
            </IconAction>
          </motion.div>
        </div>

        <div className="mt-3 space-y-1.5 px-1">
          <p className="text-xs font-medium uppercase tracking-wide text-text-faint">{product.brand}</p>
          <h3 className="font-display text-[15px] font-semibold leading-snug text-text">{product.name}</h3>

          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Star size={13} className="fill-amber text-amber" />
            <span className="font-mono">{product.rating.toFixed(1)}</span>
            <span>({product.reviewCount.toLocaleString()})</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <span className={`h-1.5 w-1.5 rounded-full ${stock.dot}`} />
            {stock.label}
          </div>
        </div>
      </Link>

      <div className="mt-3 flex items-center justify-between px-1">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-lg font-semibold text-text">${product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="font-mono text-xs text-text-faint line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <motion.button
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
            onClick={(e) => {
              e.preventDefault();
              toggle(product.id);
            }}
            whileTap={{ scale: 0.8 }}
            animate={wished ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.35 }}
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
              wished ? "border-crimson/40 bg-crimson/10 text-crimson" : "border-border text-text-muted hover:text-text"
            }`}
          >
            <Heart size={16} className={wished ? "fill-crimson" : ""} />
          </motion.button>

          <motion.button
            aria-label="Add to cart"
            disabled={product.stock === "out-of-stock"}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: product.stock === "out-of-stock" ? 1 : 1.05 }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-violet text-void disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Plus size={16} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function IconAction({ children, label }: { children: ReactNode; label: string }) {
  return (
    <button
      aria-label={label}
      onClick={(e) => e.preventDefault()}
      className="glass flex h-8 w-8 items-center justify-center rounded-full text-text transition-colors hover:text-cyan"
    >
      {children}
    </button>
  );
}
