import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import ThemeTransitionOverlay from "../components/layout/ThemeTransitionOverlay";
import type { ThemeMode } from "../types";

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [variant, setVariant] = useState<"tiles" | "blocks" | null>(null);
  const clickCount = useRef(0);

  const toggleTheme = useCallback(() => {
    if (variant) return; // one transition at a time
    clickCount.current += 1;
    // 1st click -> tiles (A), 2nd -> blocks (B), 3rd -> tiles (A) ... alternates forever
    setVariant(clickCount.current % 2 === 1 ? "tiles" : "blocks");
  }, [variant]);

  // Called by the overlay at the moment the screen is fully covered —
  // this is when we actually flip the underlying theme, unseen.
  const handleMidpoint = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("light", next === "light");
      return next;
    });
  }, []);

  const handleComplete = useCallback(() => setVariant(null), []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning: variant !== null }}>
      {children}
      {variant && (
        <ThemeTransitionOverlay
          variant={variant}
          fromTheme={theme}
          onMidpoint={handleMidpoint}
          onComplete={handleComplete}
        />
      )}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
