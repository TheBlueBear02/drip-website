# aurora-soft — Spacing

## The base unit

A strict **4px** grid. Every margin, padding, gap, and dimension is a multiple of 4. No arbitrary values (`13px`, `7px`, `22px` are forbidden). The scale in practice: `4, 8, 12, 16, 20, 24, 32, 40, 48`.

```
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
--space-5: 20px;  --space-6: 24px;  --space-8: 32px;  --space-10: 40px;
```

---

## The density gradient

Spacing communicates importance. aurora-soft uses **three density tiers**. The same screen runs all three at once — that contrast is what keeps it from looking like a flat template.

### Tier 1 — Generous (the headline data)
The most important, most-looked-at elements get the most air.
- **KPI cards:** 24px padding all sides.
- **Page section gaps:** 24px between the KPI row, the chart row, and the table row.
- **Hero metric block:** 16px below the metric before the delta/subtext.
- Breathing room around the page hero number so it reads as the focal point.

### Tier 2 — Standard (panels & navigation)
Supporting containers and controls.
- **Chart/panel cards:** 20px padding.
- **Card title → content gap:** 16px.
- **Sidebar nav items:** 8px vertical / 10px horizontal padding, 2px gap between items.
- **Buttons & pills:** 8px vertical / 14px horizontal.

### Tier 3 — Dense (tabular data)
Where the user scans many rows, tighten to fit more without crowding.
- **Table rows:** 44px row height, 12px vertical / 16px horizontal cell padding.
- **Table header row:** 36px height, 12px horizontal padding.
- **Integration list cells:** 8px gap between icon and label.
- **Legend chips:** 4px gap inside, 12px between chips.

Rule: an element never borrows a tier it doesn't belong to. A KPI card is never tightened to table density "to fit more cards"; a table row is never padded to card generosity "to look premium."

---

## Layout structure (exact values)

```
Sidebar width:            240px fixed                 [INFER: estimated from full-page screenshot]
Sidebar padding:          16px
Topbar height:            56px
Content padding:          24px (mobile) → 32px (≥1280px)
Card gap (grid gutter):   16px
Section gap (vertical):   24px

Card radius (large):      16px   /* KPI cards, chart panels, table panel */
Card radius (small):      12px   /* nested wells, dropdown menus, the team card */
Input radius:             10px
Pill / badge radius:      9999px (fully rounded) /* delta pills, legend chips, segmented controls */

Card padding (KPI):       24px
Card padding (panel):     20px
Card border:              1px solid --border (#ECEEF2)
Card shadow:              0 1px 2px rgba(16,24,40,0.04)   /* single soft layer, see motion.md */
```

---

## Grid systems

- **KPI row:** 3 equal columns (`grid-cols-3`), 16px gutter. Always 3–4 cards, never 1, never 6.
- **Primary content row:** asymmetric 2-up — a wide left panel and a narrower right panel, roughly 7:5 (`lg:grid-cols-12` with `col-span-7` / `col-span-5`). The main chart gets the larger share.
- **Lower row:** 2-up, roughly 5:7 — a compact distribution chart left, the wide data table right.
- **Full-bleed page:** `[240px sidebar] [1fr content]`. Content max-width is not capped; it fills the viewport like an app, not a marketing page.

Stacking: below 1024px the asymmetric rows collapse to a single column in source order; the sidebar becomes an off-canvas drawer.

---

## Rules

- ❌ Never use uniform padding across all tiers (e.g. 16px everywhere). The three-tier contrast is the system.
- ❌ Never use non-multiple-of-4 values.
- ❌ Never cap content width to a narrow reading column — this is an app surface, it fills the screen.
- ❌ Never make all KPI cards a 4-up identical grid pushed edge to edge with no gutter; keep the 16px gutter and 3-up rhythm.
- ❌ Never reduce card radius below 12px or square the corners — soft rounding is part of the identity.
