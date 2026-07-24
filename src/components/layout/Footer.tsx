import { MessageCircle, Rss, Video, Share2, Apple, Smartphone } from "lucide-react";
import Logo from "../ui/Logo";

const COLUMNS = [
  {
    title: "Shop",
    links: ["Consoles", "Gaming PCs", "Laptops", "Accessories", "Deals"],
  },
  {
    title: "Support",
    links: ["Track an order", "Returns & warranty", "Shipping info", "Contact us", "FAQ"],
  },
  {
    title: "Company",
    links: ["About ApexStore", "Careers", "Press", "Affiliates", "Sustainability"],
  },
  {
    title: "Legal",
    links: ["Terms of service", "Privacy policy", "Cookie settings", "Accessibility"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-panel">
      <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
              The premium marketplace for players who don't compromise — consoles, PCs, and gear, curated and
              delivered fast.
            </p>
            <div className="mt-5 flex gap-2">
              {[MessageCircle, Share2, Video, Rss].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-cyan/40 hover:text-cyan"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="mb-3 text-sm font-semibold text-text">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-text-muted transition-colors hover:text-text">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-text-faint">© {new Date().getFullYear()} ApexStore. All rights reserved.</p>

          <div className="flex items-center gap-2">
            {["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"].map((m) => (
              <span
                key={m}
                className="rounded-md border border-border px-2.5 py-1 font-mono text-[10px] text-text-faint"
              >
                {m}
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <a
              href="#"
              className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-text-muted hover:text-text"
            >
              <Apple size={13} /> App Store
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-text-muted hover:text-text"
            >
              <Smartphone size={13} /> Google Play
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
