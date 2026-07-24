import { brands } from "../../data/products";
import Reveal from "../ui/Reveal";

export default function TopBrands() {
  const loop = [...brands, ...brands];

  return (
    <section id="brands" className="border-y border-border bg-panel py-14">
      <Reveal className="mx-auto mb-8 max-w-[1400px] px-5 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-violet">Trusted by the best</p>
        <h2 className="mt-2 font-display text-3xl font-bold">Top brands on ApexStore</h2>
      </Reveal>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-panel to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-panel to-transparent" />
        <div className="flex w-max animate-marquee gap-16">
          {loop.map((b, i) => (
            <span key={i} className="font-display text-3xl font-bold text-text-faint transition-colors hover:text-text">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
