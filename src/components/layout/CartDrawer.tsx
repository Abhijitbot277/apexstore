import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function CartDrawer() {
  const { isOpen, closeCart, lines, setQuantity, removeFromCart, subtotal } = useCart();
  const [coupon, setCoupon] = useState("");
  const navigate = useNavigate();
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 14.99;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 300 }}
            className="fixed right-0 top-0 z-[91] flex h-full w-full max-w-md flex-col border-l border-border bg-void"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="font-display text-lg font-bold">Your cart</h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-full text-text-muted hover:bg-panel-raised hover:text-text"
              >
                <X size={18} />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag size={36} className="text-text-faint" />
                <p className="text-text-muted">Your cart is empty.</p>
                <button
                  onClick={closeCart}
                  className="rounded-full bg-gradient-to-br from-cyan to-violet px-5 py-2 text-sm font-semibold text-void"
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.div
                        key={line.product.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                        className="mb-4 flex gap-3 border-b border-border pb-4 last:border-0"
                      >
                        <div
                          className="h-16 w-16 shrink-0 rounded-xl"
                          style={{
                            background: `linear-gradient(135deg, ${line.product.colorway[0]}33, ${line.product.colorway[1]}33)`,
                          }}
                        />
                        <div className="flex-1">
                          <p className="text-xs text-text-faint">{line.product.brand}</p>
                          <p className="font-display text-sm font-semibold text-text">{line.product.name}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-full border border-border px-2 py-1">
                              <button
                                onClick={() => setQuantity(line.product.id, line.quantity - 1)}
                                aria-label="Decrease quantity"
                                className="text-text-muted hover:text-text"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="w-4 text-center font-mono text-xs">{line.quantity}</span>
                              <button
                                onClick={() => setQuantity(line.product.id, line.quantity + 1)}
                                aria-label="Increase quantity"
                                className="text-text-muted hover:text-text"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                            <span className="font-mono text-sm font-semibold">
                              ${(line.product.price * line.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(line.product.id)}
                          aria-label="Remove item"
                          className="self-start text-text-faint hover:text-crimson"
                        >
                          <Trash2 size={15} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="space-y-4 border-t border-border px-6 py-5">
                  <div className="flex gap-2">
                    <input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Coupon code"
                      className="flex-1 rounded-full border border-border bg-panel-raised px-3.5 py-2 text-sm placeholder:text-text-faint focus:border-cyan/50 focus:outline-none"
                    />
                    <button className="rounded-full border border-border px-4 text-sm text-text-muted hover:text-text">
                      Apply
                    </button>
                  </div>

                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-text-muted">
                      <span>Subtotal</span>
                      <span className="font-mono text-text">${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-text-muted">
                      <span>Shipping</span>
                      <span className="font-mono text-text">{shipping === 0 ? "Free" : `$${shipping}`}</span>
                    </div>
                    <div className="flex justify-between pt-2 text-base font-semibold text-text">
                      <span>Total</span>
                      <span className="font-mono">${(subtotal + shipping).toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      closeCart();
                      navigate("/cart");
                    }}
                    className="w-full rounded-full bg-gradient-to-br from-cyan to-violet py-3 text-sm font-bold text-void transition-transform hover:scale-[1.02]"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
