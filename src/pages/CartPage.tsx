import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";

export default function CartPage() {
  const { lines, setQuantity, removeFromCart, clearCart, subtotal } = useCart();
  const { placeOrder } = useOrders();
  const [placed, setPlaced] = useState(false);
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 14.99;
  const tax = +(subtotal * 0.0725).toFixed(2);
  const total = subtotal + shipping + tax;

  if (placed) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-5 pb-24 pt-40 text-center">
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <CheckCircle2 size={48} className="mx-auto text-emerald" />
        </motion.div>
        <h1 className="mt-5 font-display text-2xl font-bold">Order placed</h1>
        <p className="mt-2 text-sm text-text-muted">
          Confirmation sent to your email. Track it anytime from your dashboard.
        </p>
        <Link
          to="/dashboard?tab=orders"
          className="mt-7 rounded-full bg-gradient-to-br from-cyan to-violet px-6 py-2.5 text-sm font-bold text-void"
        >
          View orders
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-5 pb-24 pt-40 text-center">
        <ShoppingBag size={40} className="text-text-faint" />
        <h1 className="mt-5 font-display text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-sm text-text-muted">Find your next upgrade in the shop.</p>
        <Link to="/" className="mt-7 rounded-full bg-gradient-to-br from-cyan to-violet px-6 py-2.5 text-sm font-bold text-void">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1100px] px-5 pb-24 pt-28 lg:px-8">
      <h1 className="mb-8 font-display text-3xl font-bold">Your cart</h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <AnimatePresence initial={false}>
            {lines.map((line) => (
              <motion.div
                key={line.product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="mb-4 flex items-center gap-4 rounded-2xl border border-border bg-panel p-4"
              >
                <div
                  className="h-20 w-20 shrink-0 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${line.product.colorway[0]}33, ${line.product.colorway[1]}33)`,
                  }}
                />
                <div className="flex-1">
                  <p className="text-xs text-text-faint">{line.product.brand}</p>
                  <p className="font-display font-semibold text-text">{line.product.name}</p>
                  <p className="mt-1 font-mono text-sm text-text-muted">${line.product.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-3 rounded-full border border-border px-3 py-2">
                  <button
                    onClick={() => setQuantity(line.product.id, line.quantity - 1)}
                    className="text-text-muted hover:text-text"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-4 text-center font-mono text-sm">{line.quantity}</span>
                  <button
                    onClick={() => setQuantity(line.product.id, line.quantity + 1)}
                    className="text-text-muted hover:text-text"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <span className="w-20 text-right font-mono font-semibold text-text">
                  ${(line.product.price * line.quantity).toLocaleString()}
                </span>
                <button onClick={() => removeFromCart(line.product.id)} className="text-text-faint hover:text-crimson">
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <aside className="h-fit rounded-3xl border border-border bg-panel p-6">
          <h2 className="mb-4 font-display text-lg font-bold">Order summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-text-muted">
              <span>Subtotal</span>
              <span className="font-mono text-text">${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-text-muted">
              <span>Shipping</span>
              <span className="font-mono text-text">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-text-muted">
              <span>Estimated tax</span>
              <span className="font-mono text-text">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold text-text">
              <span>Total</span>
              <span className="font-mono">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => {
              placeOrder(lines, total);
              clearCart();
              setPlaced(true);
            }}
            className="mt-6 w-full rounded-full bg-gradient-to-br from-cyan to-violet py-3 text-sm font-bold text-void transition-transform hover:scale-[1.02]"
          >
            Place order
          </button>
          <p className="mt-3 text-center text-xs text-text-faint">This is a demo checkout — no payment is collected.</p>
        </aside>
      </div>
    </div>
  );
}
