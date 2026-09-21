import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CartDrawer from "./components/layout/CartDrawer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./admin/Admin";
import { useAuth } from "./context/AuthContext";

const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const CartPage = lazy(() => import("./pages/CartPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function ProtectedRoute({ role, children }: { role: "admin" | "customer"; children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to={`/login?role=${role}`} replace />;
  if (user.role !== role) return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />;
  return <>{children}</>;
}

function StorefrontLayout() {
  return (
    <div className="relative min-h-screen bg-void text-text">
      <Navbar />
      <CartDrawer />
      <main>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/dashboard" element={<ProtectedRoute role="customer"><Dashboard /></ProtectedRoute>} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<ProtectedRoute role="admin"><Admin /></ProtectedRoute>} />
        <Route path="/*" element={<StorefrontLayout />} />
      </Routes>
    </>
  );
}
