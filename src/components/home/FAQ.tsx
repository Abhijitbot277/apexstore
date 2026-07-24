import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import Reveal from "../ui/Reveal";

const FAQS = [
  {
    q: "How fast is shipping?",
    a: "Most in-stock orders ship same-day and arrive within 2 business days. Orders over $500 ship free.",
  },
  {
    q: "Can I pay in installments?",
    a: "Yes — EMI is available at checkout on orders over $200, split across 3, 6, or 12 months.",
  },
  {
    q: "What's covered under warranty?",
    a: "Every product includes the manufacturer's warranty, plus a 30-day ApexStore satisfaction guarantee.",
  },
  {
    q: "Do you accept trade-ins?",
    a: "Consoles, GPUs, and laptops in working condition can be traded in for store credit at checkout.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
      <Reveal className="mb-10 text-center" y={20}>
        <p className="text-xs font-semibold uppercase tracking-wider text-violet">Need to know</p>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Frequently asked questions</h2>
      </Reveal>

      <div className="space-y-3">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="overflow-hidden rounded-2xl border border-border bg-panel">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-medium text-text">{item.q}</span>
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-cyan">
                  <Plus size={18} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm leading-relaxed text-text-muted">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
