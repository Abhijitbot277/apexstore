import type { Product } from "../types";
import { products as seedProducts } from "../data/products";

const PRODUCTS_KEY = "apexstore-products";
const ORDERS_KEY = "apexstore-orders";

export type StoreOrder = {
  id: string;
  createdAt: string;
  customer: string;
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: { productId: string; name: string; quantity: number; price: number }[];
};

export function getProducts(): Product[] {
  try {
    const saved = localStorage.getItem(PRODUCTS_KEY);
    return saved ? JSON.parse(saved) : seedProducts;
  } catch {
    return seedProducts;
  }
}

export function saveProducts(items: Product[]) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("apexstore-products-updated"));
}

export function getOrders(): StoreOrder[] {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveOrders(orders: StoreOrder[]) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  window.dispatchEvent(new Event("apexstore-orders-updated"));
}

export function resetStoreData() {
  localStorage.removeItem(PRODUCTS_KEY);
  localStorage.removeItem(ORDERS_KEY);
  window.dispatchEvent(new Event("apexstore-products-updated"));
  window.dispatchEvent(new Event("apexstore-orders-updated"));
}
