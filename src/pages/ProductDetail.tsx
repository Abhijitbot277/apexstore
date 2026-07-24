import { AnimatePresence, motion } from "framer-motion";
import {
  Star,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  ChevronRight,
  CreditCard,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductVisual from "../components/product/ProductVisual";
import ProductCard from "../components/product/ProductCard";
import Reveal from "../components/ui/Reveal";

const SPEC_LABELS: Record<string, string[]> = {
  console: ["Storage", "Resolution", "Frame rate", "Ports"],
  pc: ["Processor", "Graphics", "Memory", "Storage"],
  laptop: ["Display", "Processor", "Graphics", "Battery"],
  controller: ["Battery life", "Connectivity", "Weight", "Compatibility"],
  gpu: ["VRAM", "Boost clock", "Power draw", "Outputs"],
  headset: ["Driver size", "Battery life", "Connectivity", "Weight"],
  keyboard: ["Switch type", "Layout", "Connectivity", "Backlight"],
  mouse: ["Sensor", "Weight", "Battery life", "Connectivity"],
  monitor: ["Panel", "Refresh rate", "Response time", "Resolution"],
  phone: ["Display", "Chipset", "Battery", "Storage"],
};

const SPEC_VALUES = ["1TB NVMe SSD", "Up to 4K / 120Hz", "0.03ms response", "Wi-Fi 6E + Bluetooth 5.3"];

function EstimatorForm() {
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<string | null>(null);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (zip.trim()) setResult("Arrives in 2 business days · Free");
      }}
      className="flex gap-2"
    >
      <input
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        placeholder="Enter ZIP code"
        className="flex-1 rounded-full border border-border bg-panel-raised px-3.5 py-2 text-sm placeholder:text-text-faint focus:border-cyan/50 focus:outline-none"
      />
      <button type="submit" className="rounded-full border border-border px-4 text-sm text-text-muted hover:text-text">
        Check
      </button>
      {result && <p className="w-full pt-1 text-xs text-emerald">{result}</p>}
    </form>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id) ?? products[0];
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"description" | "specs" | "reviews">("description");
  const { addToCart } = useCart();
  const { toggle, has } = useWishlist();
  const wished = has(product.id);

  const specs = useMemo(() => {
    const labels = SPEC_LABELS[product.category];
    return labels.map((label, i) => ({ label, value: SPEC_VALUES[i] }));
  }, [product.category]);

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice ? Math.round(100 - (product.price / product.originalPrice) * 100) : null;

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-28 lg:px-8">
      {/* breadcrumb */}
      <div className="mb-6 flex items-center gap-1.5 text-xs text-text-faint">
        <Link to="/" className="hover:text-text">
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="capitalize">{product.category}</span>
        <ChevronRight size={12} />
        <span className="text-text">{product.name}</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_1fr_360px]">
        {/* gallery */}
        <div className="lg:col-span-2">
          <div className="grid gap-3 sm:grid-cols-[80px_1fr]">
            <div className="hidden gap-3 sm:flex sm:flex-col">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="aspect-square w-full rounded-xl border border-border bg-panel-raised opacity-70 hover:opacity-100"
                />
              ))}
            </div>
            <ProductVisual category={product.category} colorway={product.colorway} isHovered />
          </div>

          {/* tabs */}
          <div className="mt-10">
            <div className="flex gap-6 border-b border-border">
              {(["description", "specs", "reviews"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative pb-3 text-sm font-medium capitalize transition-colors ${
                    tab === t ? "text-text" : "text-text-faint hover:text-text-muted"
                  }`}
                >
                  {t}
                  {tab === t && (
                    <motion.span layoutId="tab-underline" className="absolute inset-x-0 -bottom-px h-0.5 bg-cyan" />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="py-6"
              >
                {tab === "description" && (
                  <p className="max-w-2xl text-sm leading-relaxed text-text-muted">
                    {product.description} Every unit ships tested and calibrated out of the box, backed by
                    ApexStore's 30-day satisfaction guarantee and the full manufacturer warranty.
                  </p>
                )}
                {tab === "specs" && (
                  <dl className="grid max-w-lg grid-cols-2 gap-y-3 text-sm">
                    {specs.map((s) => (
                      <div key={s.label} className="contents">
                        <dt className="text-text-faint">{s.label}</dt>
                        <dd className="text-text">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {tab === "reviews" && (
                  <div className="space-y-4">
                    {["This exceeded what I expected for the price.", "Setup was painless, runs quiet."].map(
                      (q, i) => (
                        <div key={i} className="rounded-2xl border border-border bg-panel p-4">
                          <div className="mb-1.5 flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Star key={j} size={12} className="fill-amber text-amber" />
                            ))}
                          </div>
                          <p className="text-sm text-text-muted">"{q}"</p>
                        </div>
                      )
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* sticky purchase panel */}
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="rounded-3xl border border-border bg-panel p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-text-faint">{product.brand}</p>
            <h1 className="mt-1 font-display text-2xl font-bold text-text">{product.name}</h1>

            <div className="mt-2 flex items-center gap-1.5 text-sm text-text-muted">
              <Star size={14} className="fill-amber text-amber" />
              <span className="font-mono">{product.rating.toFixed(1)}</span>
              <span>({product.reviewCount.toLocaleString()} reviews)</span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-mono text-3xl font-bold text-text">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="font-mono text-sm text-text-faint line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <span className="rounded-full bg-crimson/15 px-2 py-0.5 text-xs font-semibold text-crimson">
                    -{discount}%
                  </span>
                </>
              )}
            </div>
            <p className="mt-1 text-xs text-text-faint">or as low as ${Math.round(product.price / 12)}/mo with EMI</p>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-3 rounded-full border border-border px-3 py-2">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="text-text-muted hover:text-text">
                  <Minus size={14} />
                </button>
                <span className="w-4 text-center font-mono text-sm">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="text-text-muted hover:text-text">
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={() => {
                  for (let i = 0; i < qty; i++) addToCart(product);
                }}
                disabled={product.stock === "out-of-stock"}
                className="flex-1 rounded-full bg-gradient-to-br from-cyan to-violet py-2.5 text-sm font-bold text-void transition-transform hover:scale-[1.02] disabled:opacity-30"
              >
                {product.stock === "out-of-stock" ? "Out of stock" : "Add to cart"}
              </button>

              <button
                onClick={() => toggle(product.id)}
                aria-label="Toggle wishlist"
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${
                  wished ? "border-crimson/40 bg-crimson/10 text-crimson" : "border-border text-text-muted hover:text-text"
                }`}
              >
                <Heart size={17} className={wished ? "fill-crimson" : ""} />
              </button>
            </div>

            <div className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
              <div className="flex items-center gap-2 text-text-muted">
                <Truck size={15} className="text-cyan" /> Free delivery on orders over $500
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <ShieldCheck size={15} className="text-cyan" /> 2-year manufacturer warranty
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <RotateCcw size={15} className="text-cyan" /> 30-day free returns
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <CreditCard size={15} className="text-cyan" /> EMI available from $200
              </div>
            </div>

            <div className="mt-5 border-t border-border pt-5">
              <p className="mb-2 text-xs font-medium text-text-faint">Delivery estimator</p>
              <EstimatorForm />
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <Reveal className="mt-16" y={24}>
          <h2 className="mb-6 font-display text-2xl font-bold">You might also like</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}
