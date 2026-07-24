import { ArrowUpRight } from "lucide-react";
import Reveal from "../ui/Reveal";

const NEWS = [
  {
    tag: "Firmware",
    title: "Nexa Void firmware 4.2 adds cross-save and faster resume",
    excerpt: "The latest update trims cold-boot time by 30% and syncs saves across Void X and Void S.",
    gradient: ["#00E5FF", "#7A5CFF"],
  },
  {
    tag: "Guide",
    title: "Building a silent 4K rig with the Kryo Atlas GPU",
    excerpt: "Our hardware desk walks through airflow, undervolting, and case picks for a whisper-quiet build.",
    gradient: ["#7A5CFF", "#8DFF3D"],
  },
  {
    tag: "Community",
    title: "ApexStore Open Cup returns with a $50K prize pool",
    excerpt: "Registration opens next week for the community tournament across three regions.",
    gradient: ["#8DFF3D", "#00E5FF"],
  },
];

export default function GamingNews() {
  return (
    <section id="news" className="mx-auto max-w-[1400px] px-5 py-20 lg:px-8">
      <Reveal className="mb-10" y={20}>
        <p className="text-xs font-semibold uppercase tracking-wider text-cyan">From the desk</p>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Gaming news &amp; guides</h2>
      </Reveal>

      <Reveal className="grid gap-5 md:grid-cols-3" y={30} stagger={0.08}>
        {NEWS.map((n) => (
          <a
            key={n.title}
            href="#"
            className="group overflow-hidden rounded-3xl border border-border bg-panel transition-all hover:-translate-y-1 hover:border-border-hi"
          >
            <div
              className="h-36 w-full"
              style={{ background: `linear-gradient(135deg, ${n.gradient[0]}33, ${n.gradient[1]}33)` }}
            />
            <div className="p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-text-faint">{n.tag}</p>
              <h3 className="mt-2 font-display text-base font-semibold leading-snug text-text">{n.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{n.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-cyan">
                Read more{" "}
                <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </a>
        ))}
      </Reveal>
    </section>
  );
}
