import { products } from "../data/products";
import CategoryShowcase from "../components/home/CategoryShowcase";
import DealsBanner from "../components/home/DealsBanner";
import FAQ from "../components/home/FAQ";
import GamingNews from "../components/home/GamingNews";
import Hero from "../components/home/Hero";
import Newsletter from "../components/home/Newsletter";
import ProductSection from "../components/home/ProductSection";
import Reviews from "../components/home/Reviews";
import TopBrands from "../components/home/TopBrands";

export default function Home() {
  const featured = products.filter((p) => ["new", "exclusive", "bestseller"].includes(p.tag ?? "")).slice(0, 8);
  const trending = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
  const bestSellers = products.filter((p) => p.tag === "bestseller").concat(products.slice(0, 4)).slice(0, 8);
  const latestArrivals = products.filter((p) => p.tag === "new").concat(products.slice(4, 8)).slice(0, 8);
  const recentlyViewed = [...products].reverse().slice(0, 4);

  return (
    <>
      <Hero />
      <CategoryShowcase />
      <ProductSection
        id="featured"
        eyebrow="Curated for you"
        title="Featured products"
        subtitle="Hand-picked hardware our team is running right now."
        productList={featured}
        tone="cyan"
      />
      <DealsBanner />
      <ProductSection eyebrow="Right now" title="Trending this week" productList={trending} tone="violet" />
      <TopBrands />
      <ProductSection eyebrow="Fan favorites" title="Best sellers" productList={bestSellers} tone="lime" />
      <ProductSection eyebrow="Just landed" title="Latest arrivals" productList={latestArrivals} tone="cyan" />
      <Reviews />
      <ProductSection eyebrow="Pick up where you left off" title="Recently viewed" productList={recentlyViewed} tone="violet" />
      <GamingNews />
      <FAQ />
      <Newsletter />
    </>
  );
}
