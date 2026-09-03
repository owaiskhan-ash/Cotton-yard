# CottonYard Furnishings

Editorial website for **CottonYard Furnishings** — bespoke home décor in
Ahmedabad since 1958, now with a second showroom in Mumbai.

Showroom-only business: there is no cart, checkout, or account system.
Every call to action routes to a store visit, a phone call, or WhatsApp.

Built with [Vite](https://vitejs.dev) — vanilla JS, no framework, no runtime
dependencies.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build
```

---

## ⚠️ Before going live

The Mumbai address is a placeholder. Update it in **`src/data/site.js`**:

```js
stores[1].address  // street, locality, Mumbai, Maharashtra PIN
stores[1].map      // Google Maps URL
```

That one edit feeds the store card, the Visit list and the footer.
Then search `index.html` for `[MUMBAI ADDRESS]` and replace the two
remaining hardcoded instances.

---

## Project structure

```
index.html              markup shell — no inline CSS or JS
vite.config.js
src/
  main.js               imports styles, injects content, boots behaviour
  data/site.js          ← ALL CONTENT lives here
  sections/             pure render functions
    collections.js  mission.js  stores.js  brands.js  journal.js
  lib/                  one behaviour per module
    reveal.js           IntersectionObserver scroll reveals
    counters.js         count-up statistics (quart-out easing)
    header.js           sticky state + scroll progress (rAF throttled)
    parallax.js         hero image drift
    magnetic.js         cursor-pull on .pill buttons
    drawer.js           mobile menu, focus + Escape handling
  styles/               imported in order by main.js
    base.css            tokens, resets, grain, hairline grid
    patterns.css        4 subtle section textures
    header.css          ticker, nav, pills, drawer
    hero.css            hero, line reveals, curtain, marquee
    sections.css        splits, collections index, stats, cards, journal
    stores.css          two-store grid
    footer.css
    motion.css          reveal/stagger, reduced-motion, responsive
  assets/               6 duotoned JPGs, content-hashed at build
docs/
  source-site-audit.md  extraction + audit of the original cottonyard.in
```

### Editing content

All copy, links, store details, brand names and journal posts live in
`src/data/site.js`. You should rarely need to touch markup to change text.

---

## Design system

| Token | Value | Use |
|---|---|---|
| `--paper` | `#fbfcfe` | page ground |
| `--ink` | `#081527` | body text, footer |
| `--navy` | `#0d2b52` | headings, buttons, bands |
| `--blue` | `#15468c` | primary accent |
| `--azure` | `#3f7fd4` | secondary accent, indices |
| `--mist` | `#e6edf7` | hover washes |

**Type:** Didot / Bodoni MT display against Helvetica Neue for text.

**Textures:** woven warp-and-weft, engraved dots, blueprint grid, and plaster
arcs — rotated by section at 5–7.5% opacity so they read as paper stock rather
than decoration.

**Motion:** masked line-by-line headline rise, a curtain that lifts off the
hero, image wipes with slow settle-zoom, hero parallax, count-up statistics,
magnetic buttons, staggered card entrances, and a scroll-progress hairline.
All of it is gated behind `prefers-reduced-motion`.

---

## Accessibility

- Semantic landmarks, `aria-modal` / `aria-expanded` on the mobile drawer
- Escape closes the drawer; focus moves to the close button on open
- Visible `:focus-visible` rings throughout
- Motion fully disabled under `prefers-reduced-motion`
- All external links carry `rel="noopener"`

---

## Deploying

`npm run build` emits a static `dist/` — deployable to Netlify, Vercel,
Cloudflare Pages, or GitHub Pages with no server required.

For **GitHub Pages** from a project repo, set the base path:

```js
// vite.config.js
export default defineConfig({ base: '/<repo-name>/', /* ... */ })
```

---

## Immersive features

| # | Feature | Where |
|---|---|---|
| 1 | Native scroll-driven animations (compositor, off main thread) | `styles/scroll-driven.css` |
| 2 | View Transitions on navigation + quick-view | `styles/scroll-driven.css` |
| 3 | Sticky section indices | `styles/immersive.css` |
| 4 | Per-material fabric-swatch hover | `styles/immersive.css` |
| 5 | Optical typography (balance, small-caps, tabular figures) | `styles/typography.css` |
| 6 | Contextual cursor | `lib/cursor.js` |
| 7 | Scroll-velocity marquees | `lib/velocity.js` |
| 8 | Ambient cursor light on dark grounds | `lib/cursor.js` |
| 9 | Duotone lifts to full colour on hover | `styles/immersive.css` |
| 10 | Scroll-scrubbed counters | `lib/velocity.js` |
| 11 | Collection quick-view (native `<dialog>`) | `lib/quickview.js` |
| 12 | Store switcher + live open/closed | `lib/store-switcher.js` |
| 13 | Fabric-drape displacement on hero | `lib/drape.js` |
| 14 | Filmstrip view for collections | `lib/filmstrip.js` |
| 15 | Window measure tool → WhatsApp | `lib/measure.js` |

Every one degrades gracefully: `prefers-reduced-motion` disables all motion,
the cursor and drape are desktop-only, and `reveal.js`/`parallax.js` no-op
where native scroll timelines exist.

### Store hours

Open/closed state is computed in **IST** regardless of visitor timezone.
Edit `stores[].open` in `src/data/site.js` — array indexed by day
(0 = Sunday), `[openHour, closeHour]` or `null` for closed.

### Estimate assumptions

`lib/measure.js` assumes 137 cm bolt width, 20 cm hem-and-header allowance,
and ₹850–2400/m fabric. Adjust those constants if your ranges differ.
