# ApexStore

A premium gaming marketplace concept — original branding, original visual language, built with React, TypeScript, Tailwind CSS v4, Framer Motion, GSAP, and Three.js.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed local URL. Production build: `npm run build` (outputs to `dist/`, verified to build clean with `tsc -b && vite build`).

## What's implemented

**Design system** — deep-black/graphite base with electric cyan, neon violet, and lime accents; Syne (display) + Inter (body) + JetBrains Mono (prices/specs) type pairing; all colors and fonts are CSS custom properties in `src/index.css`, so re-theming is a token edit, not a find-and-replace.

**Navigation** — sticky glass navbar, hover mega menu, live search with instant results, wishlist/cart/notification/account dropdowns, language selector, responsive mobile panel.

**Signature interaction** — the dark/light toggle (top right) alternates between two full-screen transitions every click: a 3D tile-flip wipe, then a gravity block-fall rebuild, forever alternating. See `src/context/ThemeContext.tsx` and `src/components/layout/ThemeTransitionOverlay.tsx`.

**Hero** — Three.js ambient particle field (lazy-loaded, code-split from the main bundle), cursor-parallax glow, magnetic CTA buttons.

**Product cards** — 3D hover elevation, category-aware hover animation (consoles rotate, GPUs spin their "fans," laptops "open," keyboards/mice sweep an RGB wave, monitors get a shine pass), wishlist pulse, quick-add, quick preview / compare affordances.

**Full homepage** — hero, categories, featured/trending/best-sellers/latest-arrivals/recently-viewed product rows, a live-countdown deals banner, a brand marquee, reviews, gaming news, FAQ accordion, newsletter capture.

**Working commerce state** — cart (add/remove/quantity, drawer + full page), wishlist, and a demo checkout that creates a real order object you can see under Dashboard → Orders. All in-memory (no backend), via React Context.

**Product detail page** — gallery, spec table, description/reviews tabs, sticky purchase panel with EMI estimate, delivery estimator, related products.

**Dashboard** — overview stats, orders, wishlist (pulls from real state), addresses, wallet/rewards, settings (theme + notification toggle).

## Deliberate simplifications, and what's next

This is a real, running app, not a mockup — but a handful of things were scoped down to ship a coherent, working slice rather than twenty half-built ones:

- **Product media** is placeholder gradient/icon art with category-specific hover motion standing in for real photography, video loops, and true 360°/3D viewers — swap in real assets and the hover system already has hooks for it.
- **Search and category browsing** surface results in the nav dropdown and via anchors, but there's no dedicated `/search` or `/category/:slug` results page with filters/sorting yet.
- **Checkout** is a single-step demo (no payment form, address form, or multi-step flow).
- **No backend** — products, orders, and wishlist all live in memory and reset on refresh.

Happy to build out any of these next — a full search/filter results page and a real checkout flow would be the next two I'd tackle.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Framer Motion · GSAP (ScrollTrigger) · Three.js · React Router · lucide-react
