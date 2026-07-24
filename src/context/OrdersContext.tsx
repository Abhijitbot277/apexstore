import { createContext, useContext, useState, type ReactNode } from "react";
import type { CartLine } from "../types";

export interface Order {
  id: string;
  date: string;
  items: CartLine[];
  total: number;
  status: "processing" | "shipped" | "delivered";
}

interface OrdersContextValue {
  orders: Order[];
  placeOrder: (items: CartLine[], total: number) => void;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const placeOrder = (items: CartLine[], total: number) => {
    const order: Order = {
      id: `APX-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }),
      items,
      total,
      status: "processing",
    };
    setOrders((prev) => [order, ...prev]);
  };

  return <OrdersContext.Provider value={{ orders, placeOrder }}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}
