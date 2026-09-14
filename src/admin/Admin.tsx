import { FormEvent, useMemo, useState } from "react";
import { BarChart3, Box, DollarSign, PackagePlus, Trash2, TrendingUp } from "lucide-react";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "Available" | "Out of stock";
};

const initialProducts: Product[] = [
  { id: "demo-1", name: "Nexa Void X", category: "Console", price: 549, stock: 24, status: "Available" },
  { id: "demo-2", name: "Kryo Atlas RTX GPU", category: "GPU", price: 1199, stock: 8, status: "Available" },
  { id: "demo-3", name: "Ridge Arc 240Hz Monitor", category: "Monitor", price: 649, stock: 0, status: "Out of stock" },
];

function loadProducts() {
  try {
    const saved = localStorage.getItem("apexstore-admin-products");
    return saved ? (JSON.parse(saved) as Product[]) : initialProducts;
  } catch {
    return initialProducts;
  }
}

export default function Admin() {
  const [products, setProducts] = useState<Product[]>(loadProducts);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Gaming");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [message, setMessage] = useState("");

  const save = (next: Product[]) => {
    setProducts(next);
    localStorage.setItem("apexstore-admin-products", JSON.stringify(next));
  };

  const addProduct = (event: FormEvent) => {
    event.preventDefault();
    const cleanName = name.trim();
    const numericPrice = Number(price);
    const numericStock = Number(stock);
    if (!cleanName || !Number.isFinite(numericPrice) || numericPrice < 0 || !Number.isInteger(numericStock) || numericStock < 0) {
      setMessage("Enter a product name, valid price and stock quantity.");
      return;
    }

    const product: Product = {
      id: `${Date.now()}`,
      name: cleanName,
      category,
      price: numericPrice,
      stock: numericStock,
      status: numericStock > 0 ? "Available" : "Out of stock",
    };
    save([product, ...products]);
    setName("");
    setPrice("");
    setStock("");
    setMessage("Product added successfully.");
  };

  const removeProduct = (id: string) => save(products.filter((product) => product.id !== id));
  const inventoryValue = useMemo(() => products.reduce((sum, product) => sum + product.price * product.stock, 0), [products]);

  return (
    <div className="min-h-screen bg-[#070b12] text-white">
      <header className="border-b border-white/10 bg-[#0b111c]/90 px-6 py-5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">APEXSTORE</p>
            <h1 className="mt-1 text-2xl font-bold">Owner Control Center</h1>
          </div>
          <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">OWNER MODE</div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 p-6 lg:p-10">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={<PackagePlus />} label="Products" value={products.length.toString()} />
          <Stat icon={<Box />} label="Units in stock" value={products.reduce((sum, p) => sum + p.stock, 0).toString()} />
          <Stat icon={<DollarSign />} label="Inventory value" value={`$${inventoryValue.toLocaleString()}`} />
          <Stat icon={<TrendingUp />} label="Demo sales" value="$18,420" />
        </section>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
            <div className="mb-6 flex items-center gap-3">
              <PackagePlus className="text-cyan-400" />
              <div><h2 className="font-semibold">Add Product</h2><p className="text-sm text-white/45">Update current inventory</p></div>
            </div>
            <form onSubmit={addProduct} className="space-y-4">
              <Field label="Product name"><input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Apex Gaming Mouse" /></Field>
              <Field label="Category"><select value={category} onChange={(e) => setCategory(e.target.value)}><option>Gaming</option><option>Console</option><option>PC</option><option>GPU</option><option>Laptop</option><option>Monitor</option><option>Accessories</option></select></Field>
              <Field label="Price"><input type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" /></Field>
              <Field label="Stock"><input type="number" min="0" step="1" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="0" /></Field>
              <button className="w-full rounded-xl bg-cyan-400 py-3 font-bold text-black transition hover:bg-cyan-300">Add Product</button>
              {message && <p className="text-sm text-cyan-300">{message}</p>}
            </form>
          </section>

          <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
            <div className="flex items-center justify-between border-b border-white/10 p-6"><div><h2 className="font-semibold">Current Products</h2><p className="text-sm text-white/45">Products currently managed by the owner</p></div><BarChart3 className="text-cyan-400" /></div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm"><thead className="bg-white/[0.03] text-white/45"><tr><th className="px-6 py-4">Product</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Price</th><th className="px-6 py-4">Stock</th><th className="px-6 py-4">Status</th><th className="px-6 py-4"></th></tr></thead><tbody>{products.map((product) => <tr key={product.id} className="border-t border-white/5"><td className="px-6 py-4 font-medium">{product.name}</td><td className="px-6 py-4 text-white/55">{product.category}</td><td className="px-6 py-4">${product.price.toLocaleString()}</td><td className="px-6 py-4">{product.stock}</td><td className="px-6 py-4"><span className={product.stock > 0 ? "text-emerald-400" : "text-red-400"}>{product.status}</span></td><td className="px-6 py-4 text-right"><button onClick={() => removeProduct(product.id)} aria-label={`Delete ${product.name}`} className="rounded-lg p-2 text-white/40 hover:bg-red-500/10 hover:text-red-400"><Trash2 size={17} /></button></td></tr>)}</tbody></table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><div className="mb-4 text-cyan-400">{icon}</div><p className="text-sm text-white/45">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm text-white/60">{label}<div className="mt-2">{children}</div></label>;
}
