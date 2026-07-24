import { ArrowRight } from "lucide-react";
import type { Product } from "../../types";
import ProductCard from "../product/ProductCard";
import Reveal from "../ui/Reveal";

interface ProductSectionProps {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  productList: Product[];
  tone?: "cyan" | "violet" | "lime";
}

const TONE: Record<string, string> = {
  cyan: "text-cyan",
  violet: "text-violet",
  lime: "text-lime",
};

export default function ProductSection({ id, eyebrow, title, subtitle, productList, tone = "cyan" }: ProductSectionProps) {
  return (
    <section id={id} className="mx-auto max-w-[1400px] px-5 py-16 lg:px-8">
      <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4" y={20}>
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider ${TONE[tone]}`}>{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-2 max-w-lg text-sm text-text-muted">{subtitle}</p>}
        </div>
        <button className="flex items-center gap-1.5 text-sm font-semibold text-text-muted transition-colors hover:text-text">
          View all <ArrowRight size={15} />
        </button>
      </Reveal>

      <Reveal className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" y={30} stagger={0.06}>
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Reveal>
    </section>
  );
}
