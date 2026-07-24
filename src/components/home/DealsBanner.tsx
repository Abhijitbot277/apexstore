import { Flame } from "lucide-react";
import { useEffect, useState } from "react";
import { products } from "../../data/products";
import ProductCard from "../product/ProductCard";
import Reveal from "../ui/Reveal";

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    h: Math.floor(diff / 3_600_000),
    m: Math.floor((diff % 3_600_000) / 60_000),
    s: Math.floor((diff % 60_000) / 1000),
  };
}

export default function DealsBanner() {
  const [target] = useState(() => Date.now() + 1000 * 60 * 60 * 6 + 1000 * 60 * 42); // ~6h42m out
  const [time, setTime] = useState(() => getRemaining(target));

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const deals = products.filter((p) => p.tag === "deal" || p.originalPrice).slice(0, 4);

  return (
    <section id="deals" className="mx-auto max-w-[1400px] px-5 py-16 lg:px-8">
      <Reveal className="mb-10 flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-crimson/25 bg-gradient-to-br from-crimson/10 via-panel to-panel px-6 py-6 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-crimson/15 text-crimson">
            <Flame size={20} />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-crimson">Today's deals</p>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Flash prices, ending soon</h2>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono">
          {[time.h, time.m, time.s].map((unit, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="glass min-w-[52px] rounded-xl px-3 py-2 text-center">
                <span className="text-xl font-bold text-text">{String(unit).padStart(2, "0")}</span>
              </div>
              {i < 2 && <span className="text-text-faint">:</span>}
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" y={30} stagger={0.06}>
        {deals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Reveal>
    </section>
  );
}
