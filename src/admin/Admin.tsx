import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { BarChart3, Box, DollarSign, PackagePlus, Search, Trash2, Users } from "lucide-react";
import type { Product } from "../types";
import { getOrders, getProducts, saveProducts, type StoreOrder } from "../services/store";

const categories: Product["category"][] = ["console", "pc", "laptop", "controller", "gpu", "headset", "keyboard", "mouse", "monitor", "phone"];

function normalizeStatus(stock: number): Product["stock"] {
  return stock <= 0 ? "out-of-stock" : stock <= 5 ? "low-stock" : "in-stock";
}

export default function Admin() {
  const [products, setProducts] = useState<Product[]>(getProducts);
  const [orders, setOrders] = useState<StoreOrder[]>(getOrders);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Product["category"]>("console");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const refresh = () => setProducts(getProducts());
    const refreshOrders = () => setOrders(getOrders());
    window.addEventListener("apexstore-products-updated", refresh);
    window.addEventListener("apexstore-orders-updated", refreshOrders);
    return () => {
      window.removeEventListener("apexstore-products-updated", refresh);
      window.removeEventListener("apexstore-orders-updated", refreshOrders);
    };
  }, []);

  const filteredProducts = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())),
    [products, search],
  );
  const units = products.reduce((sum, p) => sum + (p.stock === "out-of-stock" ? 0 : p.stock === "low-stock" ? 5 : 20), 0);
  const inventoryValue = products.reduce((sum, p) => sum + p.price * (p.stock === "out-of-stock" ? 0 : p.stock === "low-stock" ? 5 : 20), 0);
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const customers = new Set(orders.map((order) => order.customer)).size;

  const addProduct = (event: FormEvent) => {
    event.preventDefault();
    const cleanName = name.trim();
    const numericPrice = Number(price);
    const numericStock = Number(stock);
    if (!cleanName || !Number.isFinite(numericPrice) || numericPrice < 0 || !Number.isInteger(numericStock) || numericStock < 0) {
      setMessage("Enter a valid name, price and stock quantity.");
      return;
    }
    const product: Product = {
      id: `custom-${Date.now()}`,
      name: cleanName,
      brand: "ApexStore",
      category,
      price: numericPrice,
      rating: 0,
      reviewCount: 0,
      stock: normalizeStatus(numericStock),
      colorway: ["#00E5FF", "#7A5CFF"],
      description: "New product managed from the ApexStore Pro owner dashboard.",
    };
    const next = [product, ...products];
    saveProducts(next);
    setProducts(next);
    setName(""); setPrice(""); setStock("");
    setMessage("Product added to the shared store catalog.");
  };

  const removeProduct = (id: string) => {
    const next = products.filter((product) => product.id !== id);
    saveProducts(next);
    setProducts(next);
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-white">
      <header className="border-b border-white/10 bg-[#0b111c]/90 px-6 py-5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">APEXSTORE PRO</p><h1 className="mt-1 text-2xl font-bold">Owner Dashboard</h1><p className="text-sm text-white/40">Store operations & analytics</p></div>
          <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">OWNER MODE</div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl space-y-8 p-6 lg:p-10">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={<PackagePlus />} label="Products" value={products.length.toString()} />
          <Stat icon={<Box />} label="Stock units" value={units.toString()} />
          <Stat icon={<DollarSign />} label="Revenue" value={`$${revenue.toLocaleString()}`} />
          <Stat icon={<Users />} label="Customers" value={customers.toString()} />
        </section>
        <section className="grid gap-8 lg:grid-cols-[380px_1fr]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <div className="mb-6 flex items-center gap-3"><PackagePlus className="text-cyan-400" /><div><h2 className="font-semibold">Add Product</h2><p className="text-sm text-white/45">Changes the shared catalog</p></div></div>
              <form onSubmit={addProduct} className="space-y-4">
                <Field label="Product name"><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Apex Gaming Mouse" /></Field>
                <Field label="Category"><select value={category} onChange={(e) => setCategory(e.target.value as Product["category"])}>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></Field>
                <Field label="Price"><input type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" /></Field>
                <Field label="Stock"><input type="number" min="0" step="1" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="0" /></Field>
                <button className="w-full rounded-xl bg-cyan-400 py-3 font-bold text-black hover:bg-cyan-300">Add Product</button>
                {message && <p className="text-sm text-cyan-300">{message}</p>}
              </form>
            </section>
            <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"><p className="text-sm text-white/45">Inventory value</p><p className="mt-2 text-3xl font-bold">${inventoryValue.toLocaleString()}</p><p className="mt-2 text-xs text-white/35">Estimated from managed stock levels</p></section>
          </div>
          <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
            <div className="flex flex-col gap-4 border-b border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-semibold">Product Management</h2><p className="text-sm text-white/45">Search, inspect and remove catalog items</p></div><div className="relative"><Search className="absolute left-3 top-2.5 text-white/30" size={17} /><input className="!w-full !pl-9 sm:!w-64" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." /></div></div>
            <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-white/[0.03] text-white/45"><tr><th className="px-6 py-4">Product</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Price</th><th className="px-6 py-4">Stock</th><th className="px-6 py-4">Status</th><th className="px-6 py-4" /></tr></thead><tbody>{filteredProducts.map((product) => <tr key={product.id} className="border-t border-white/5"><td className="px-6 py-4 font-medium">{product.name}</td><td className="px-6 py-4 text-white/55">{product.category}</td><td className="px-6 py-4">${product.price.toLocaleString()}</td><td className="px-6 py-4">{product.stock === "out-of-stock" ? 0 : product.stock === "low-stock" ? 5 : 20}+</td><td className="px-6 py-4"><span className={product.stock === "out-of-stock" ? "text-red-400" : product.stock === "low-stock" ? "text-amber-400" : "text-emerald-400"}>{product.stock}</span></td><td className="px-6 py-4 text-right"><button onClick={() => removeProduct(product.id)} aria-label={`Delete ${product.name}`} className="rounded-lg p-2 text-white/40 hover:bg-red-500/10 hover:text-red-400"><Trash2 size={17} /></button></td></tr>)}</tbody></table></div>
          </section>
        </section>
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"><div className="flex items-center gap-3"><BarChart3 className="text-cyan-400" /><div><h2 className="font-semibold">Sales Analytics</h2><p className="text-sm text-white/45">Live from locally stored orders; Firebase can take over this layer after configuration.</p></div></div><div className="mt-6 grid gap-4 sm:grid-cols-3"><Metric label="Orders" value={orders.length.toString()} /><Metric label="Revenue" value={`$${revenue.toLocaleString()}`} /><Metric label="Conversion data" value="Ready" /></div></section>
      </main>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) { return <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><div className="mb-4 text-cyan-400">{icon}</div><p className="text-sm text-white/45">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></div>; }
function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-sm text-white/40">{label}</p><p className="mt-1 text-xl font-semibold">{value}</p></div>; }
function Field({ label, children }: { label: string; children: ReactNode }) { return <label className="block text-sm text-white/60">{label}<div className="mt-2">{children}</div></label>; }
