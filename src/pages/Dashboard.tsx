import { motion } from "framer-motion";
import {
  Package,
  Heart,
  MapPin,
  Wallet,
  Settings as SettingsIcon,
  LayoutGrid,
  Trophy,
  Moon,
  Sun,
  Bell,
} from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";
import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";
import { products } from "../data/products";
import ProductCard from "../components/product/ProductCard";

type Tab = "overview" | "orders" | "wishlist" | "addresses" | "wallet" | "settings";

const TABS: { key: Tab; label: string; icon: typeof Package }[] = [
  { key: "overview", label: "Overview", icon: LayoutGrid },
  { key: "orders", label: "Orders", icon: Package },
  { key: "wishlist", label: "Wishlist", icon: Heart },
  { key: "addresses", label: "Addresses", icon: MapPin },
  { key: "wallet", label: "Wallet & rewards", icon: Wallet },
  { key: "settings", label: "Settings", icon: SettingsIcon },
];

export default function Dashboard() {
  const [params, setParams] = useSearchParams();
  const initial = (params.get("tab") as Tab) || "overview";
  const [tab, setTab] = useState<Tab>(TABS.some((t) => t.key === initial) ? initial : "overview");
  const { orders } = useOrders();
  const { ids } = useWishlist();
  const { count: cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();

  const wishlisted = products.filter((p) => ids.has(p.id));
  const rewardPoints = orders.reduce((sum, o) => sum + Math.round(o.total), 0);

  const selectTab = (t: Tab) => {
    setTab(t);
    setParams(t === "overview" ? {} : { tab: t });
  };

  return (
    <div className="mx-auto max-w-[1200px] px-5 pb-24 pt-28 lg:px-8">
      <h1 className="mb-8 font-display text-3xl font-bold">Your dashboard</h1>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => selectTab(key)}
              className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
                tab === key ? "bg-panel-raised text-text" : "text-text-muted hover:text-text"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {tab === "overview" && (
            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard icon={Package} label="Orders placed" value={orders.length} />
              <StatCard icon={Heart} label="Wishlist items" value={wishlisted.length} />
              <StatCard icon={LayoutGrid} label="Items in cart" value={cartCount} />
              <StatCard icon={Trophy} label="Reward points" value={rewardPoints} />
              <StatCard icon={Wallet} label="Wallet balance" value="$0.00" />
              <StatCard icon={MapPin} label="Saved addresses" value={0} />
            </div>
          )}

          {tab === "orders" &&
            (orders.length === 0 ? (
              <EmptyState icon={Package} title="No orders yet" body="Orders you place will show up here." />
            ) : (
              <div className="space-y-3">
                {orders.map((o) => (
                  <div key={o.id} className="rounded-2xl border border-border bg-panel p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-mono text-sm font-semibold text-text">{o.id}</p>
                        <p className="text-xs text-text-faint">{o.date}</p>
                      </div>
                      <span className="rounded-full bg-amber/15 px-2.5 py-1 text-xs font-medium capitalize text-amber">
                        {o.status}
                      </span>
                      <span className="font-mono text-sm font-semibold text-text">${o.total.toFixed(2)}</span>
                    </div>
                    <p className="mt-2 text-xs text-text-muted">
                      {o.items.map((l) => `${l.product.name} × ${l.quantity}`).join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            ))}

          {tab === "wishlist" &&
            (wishlisted.length === 0 ? (
              <EmptyState icon={Heart} title="Your wishlist is empty" body="Tap the heart on any product to save it here." />
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {wishlisted.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ))}

          {tab === "addresses" && (
            <EmptyState icon={MapPin} title="No saved addresses" body="Add an address at checkout to save it for next time." />
          )}

          {tab === "wallet" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-border-hi bg-gradient-to-br from-panel-raised to-panel p-6">
                <p className="text-xs text-text-faint">Wallet balance</p>
                <p className="mt-1 font-mono text-3xl font-bold text-text">$0.00</p>
              </div>
              <div className="rounded-2xl border border-border bg-panel p-6">
                <div className="flex items-center gap-2">
                  <Trophy size={16} className="text-lime" />
                  <p className="text-sm font-semibold text-text">Reward points</p>
                </div>
                <p className="mt-1 font-mono text-2xl font-bold text-text">{rewardPoints}</p>
                <p className="mt-1 text-xs text-text-faint">Earned 1pt per $1 spent · redeemable at checkout</p>
              </div>
            </div>
          )}

          {tab === "settings" && (
            <div className="max-w-md space-y-4">
              <div className="flex items-center justify-between rounded-2xl border border-border bg-panel p-4">
                <div className="flex items-center gap-3">
                  {theme === "dark" ? <Moon size={17} className="text-cyan" /> : <Sun size={17} className="text-cyan" />}
                  <div>
                    <p className="text-sm font-medium text-text">Appearance</p>
                    <p className="text-xs text-text-faint">Currently {theme} mode</p>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className="rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-text-muted hover:text-text"
                >
                  Switch
                </button>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-border bg-panel p-4">
                <div className="flex items-center gap-3">
                  <Bell size={17} className="text-cyan" />
                  <div>
                    <p className="text-sm font-medium text-text">Email notifications</p>
                    <p className="text-xs text-text-faint">Restocks, deals, and order updates</p>
                  </div>
                </div>
                <ToggleSwitch />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof Package; label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-border bg-panel p-5">
      <Icon size={18} className="text-cyan" />
      <p className="mt-3 font-mono text-2xl font-bold text-text">{value}</p>
      <p className="mt-0.5 text-xs text-text-faint">{label}</p>
    </div>
  );
}

function EmptyState({ icon: Icon, title, body }: { icon: typeof Package; title: string; body: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-border-hi py-16 text-center">
      <Icon size={30} className="text-text-faint" />
      <p className="mt-4 font-display text-base font-semibold text-text">{title}</p>
      <p className="mt-1 max-w-xs text-sm text-text-muted">{body}</p>
      <Link to="/" className="mt-5 text-sm font-semibold text-cyan">
        Browse the shop →
      </Link>
    </div>
  );
}

function ToggleSwitch() {
  const [on, setOn] = useState(true);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-cyan" : "bg-panel-raised"}`}
      aria-pressed={on}
    >
      <motion.span
        animate={{ x: on ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 h-4 w-4 rounded-full bg-void"
      />
    </button>
  );
}
