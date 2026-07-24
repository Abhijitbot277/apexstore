import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { OrdersProvider } from "./context/OrdersContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <WishlistProvider>
          <OrdersProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </OrdersProvider>
        </WishlistProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
