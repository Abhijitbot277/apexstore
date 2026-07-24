import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  stagger?: number;
  as?: "div" | "section";
}

/** Wraps a section and fades/slides its direct children up into view on scroll. */
export default function Reveal({ children, className = "", y = 40, delay = 0, stagger = 0.08, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.children.length ? Array.from(el.children) : [el];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [y, delay, stagger]);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
