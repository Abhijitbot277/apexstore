export type ProductCategory =
  | "console"
  | "pc"
  | "laptop"
  | "controller"
  | "gpu"
  | "headset"
  | "keyboard"
  | "mouse"
  | "monitor"
  | "phone";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stock: "in-stock" | "low-stock" | "out-of-stock";
  tag?: "new" | "bestseller" | "deal" | "exclusive";
  colorway: [string, string]; // gradient pair used for the placeholder art
  description: string;
}

export interface CartLine {
  product: Product;
  quantity: number;
}

export type ThemeMode = "dark" | "light";
