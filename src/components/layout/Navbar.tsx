import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingCart,
  Bell,
  User,
  Sun,
  Moon,
  Menu,
  X,
  Globe,
  ChevronDown,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useTheme } from "../../context/ThemeContext";
import { products } from "../../data/products";
import Logo from "../ui/Logo";
import MegaMenu from "./MegaMenu";

const NAV_LINKS = [
  { label: "Shop", mega: true },
  { label: "Deals", href: "/#deals" },
  { label: "Brands", href: "/#brands" },
  { label: "News", href: "/#news" },
];

const LANGS = ["EN", "ES", "DE", "JA"];

const NOTIFICATIONS = [
  { title: "Order shipped", body: "Your Nexa Void X is on its way — arriving Tuesday.", time: "2h" },
  { title: "Back in stock", body: "Halcyon Edge Elite just restocked.", time: "6h" },
  { title: "Flash deal", body: "20% off Vantage gear for the next 3 hours.", time: "1d" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState("EN");

  const searchRef = useRef<HTMLDivElement>(null);
  const { count: cartCount, openCart } = useCart();
  const { count: wishCount } = useWishlist();
  const { theme, toggleTheme, isTransitioning } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const results = query.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.brand.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
    : [];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-4 px-5 lg:px-8">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        {/* primary links */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) =>
            link.mega ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm text-text-muted transition-colors hover:text-text">
                  {link.label}
                  <ChevronDown size={14} className={`transition-transform ${megaOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {megaOpen && <MegaMenu onNavigate={() => setMegaOpen(false)} />}
                </AnimatePresence>
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-text-muted transition-colors hover:text-text"
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        {/* search */}
        <div ref={searchRef} className="relative hidden flex-1 max-w-sm md:block">
          <motion.div
            animate={{ width: searchOpen ? "100%" : "100%" }}
            className={`flex items-center gap-2 rounded-full border px-3.5 py-2 transition-colors ${
              searchOpen ? "border-cyan/50 bg-panel" : "border-border bg-panel-raised"
            }`}
          >
            <Search size={16} className="text-text-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search consoles, GPUs, gear…"
              className="w-full bg-transparent text-sm text-text placeholder:text-text-faint focus:outline-none"
            />
          </motion.div>

          <AnimatePresence>
            {searchOpen && results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="glass absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl shadow-xl"
              >
                {results.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      navigate(`/product/${p.id}`);
                      setSearchOpen(false);
                      setQuery("");
                    }}
                    className="flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-panel-raised"
                  >
                    <span>
                      <span className="text-text-faint">{p.brand}</span> <span className="text-text">{p.name}</span>
                    </span>
                    <span className="font-mono text-text-muted">${p.price.toLocaleString()}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* actions */}
        <div className="flex items-center gap-1">
          {/* language */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1 rounded-full px-2.5 py-2 text-sm text-text-muted hover:text-text"
              aria-label="Select language"
            >
              <Globe size={17} />
              <span className="font-mono text-xs">{lang}</span>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="glass absolute right-0 top-full mt-2 w-20 overflow-hidden rounded-xl"
                >
                  {LANGS.map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLang(l);
                        setLangOpen(false);
                      }}
                      className="block w-full px-3 py-2 text-left text-xs hover:bg-panel-raised"
                    >
                      {l}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* theme toggle */}
          <button
            onClick={toggleTheme}
            disabled={isTransitioning}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full text-text-muted transition-colors hover:text-text disabled:opacity-50"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* wishlist */}
          <Link
            to="/dashboard?tab=wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-text-muted transition-colors hover:text-text"
            aria-label="Wishlist"
          >
            <Heart size={18} />
            {wishCount > 0 && <CountBadge n={wishCount} color="bg-crimson" />}
          </Link>

          {/* notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen((v) => !v)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-text-muted transition-colors hover:text-text"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-lime" />
            </button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="glass absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-2xl shadow-xl"
                >
                  <p className="border-b border-border px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-faint">
                    Notifications
                  </p>
                  {NOTIFICATIONS.map((n) => (
                    <div key={n.title} className="border-b border-border px-4 py-3 last:border-0 hover:bg-panel-raised">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-text">{n.title}</p>
                        <span className="text-[11px] text-text-faint">{n.time}</span>
                      </div>
                      <p className="mt-0.5 text-xs text-text-muted">{n.body}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* account */}
          <div className="relative">
            <button
              onClick={() => setAccountOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-text-muted transition-colors hover:text-text"
              aria-label="Account"
            >
              <User size={18} />
            </button>
            <AnimatePresence>
              {accountOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="glass absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-2xl shadow-xl"
                >
                  {[
                    { label: "Dashboard", to: "/dashboard" },
                    { label: "Orders", to: "/dashboard?tab=orders" },
                    { label: "Wishlist", to: "/dashboard?tab=wishlist" },
                    { label: "Settings", to: "/dashboard?tab=settings" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setAccountOpen(false)}
                      className="block px-4 py-2.5 text-sm text-text hover:bg-panel-raised"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* cart */}
          <button
            onClick={openCart}
            className="relative ml-1 flex h-10 items-center gap-2 rounded-full bg-panel-raised px-3.5 text-text-muted transition-colors hover:text-text"
            aria-label="Open cart"
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && <CountBadge n={cartCount} color="bg-cyan" dark />}
          </button>

          {/* mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-text lg:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* mobile panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="glass overflow-hidden lg:hidden"
          >
            <div className="space-y-1 px-5 py-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href ?? "/#categories"}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-text"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function CountBadge({ n, color, dark = false }: { n: number; color: string; dark?: boolean }) {
  return (
    <motion.span
      key={n}
      initial={{ scale: 0.4 }}
      animate={{ scale: 1 }}
      className={`absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 font-mono text-[10px] font-bold ${color} ${
        dark ? "text-void" : "text-white"
      }`}
    >
      {n}
    </motion.span>
  );
}
