import { Star } from "lucide-react";
import Reveal from "../ui/Reveal";

const REVIEWS = [
  {
    name: "Priya N.",
    tag: "Verified buyer · Nexa Void X",
    quote:
      "Order came two days early and setup took ten minutes. The bundle deal on the Halcyon controller sealed it.",
    rating: 5,
  },
  {
    name: "Marcus D.",
    tag: "Verified buyer · Kryo Forge R9",
    quote: "Build quality is stupid good for the price. Support actually picked up the phone when I called about RAM.",
    rating: 5,
  },
  {
    name: "Ade O.",
    tag: "Verified buyer · Obsidian Strider 16",
    quote: "Wishlist price-drop alerts saved me about $200 on my laptop. Small thing that made a big difference.",
    rating: 4,
  },
];

export default function Reviews() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 lg:px-8">
      <Reveal className="mb-10" y={20}>
        <p className="text-xs font-semibold uppercase tracking-wider text-lime">Word on the street</p>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">What players are saying</h2>
      </Reveal>

      <Reveal className="grid gap-5 md:grid-cols-3" y={30} stagger={0.08}>
        {REVIEWS.map((r) => (
          <div key={r.name} className="rounded-3xl border border-border bg-panel p-6">
            <div className="mb-3 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className={i < r.rating ? "fill-amber text-amber" : "text-border-hi"} />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-text">"{r.quote}"</p>
            <div className="mt-4">
              <p className="text-sm font-semibold text-text">{r.name}</p>
              <p className="text-xs text-text-faint">{r.tag}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
