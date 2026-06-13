# Spacing Tokens — analytics-dark

## Base Unit: 4px

All spacing is a multiple of 4px. No exceptions.

```css
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
```

---

## Density Gradient — The Most Important Spacing Concept

Spacing communicates importance. The more important the information, the more breathing
room it gets. This is not about luxury — it is about guiding the eye.

```
Hero KPI card padding:     24px (--space-6)  — Important. Breathes.
Section container padding:  20px (--space-5)  — Structural. Clear.
Data table row padding:     12px (--space-3)  — Dense. Efficient.
Detail/metadata row:         8px (--space-2)  — Compact. Secondary.
Badge/tag internal:          4px (--space-1)  — Minimal. Inline.
```

**Rule:** If you are unsure which spacing to use, ask: "What level of importance is this
element?" Then pick the corresponding density tier from the table above.

---

## Layout Structure

### Sidebar
```css
width: 240px;               /* Fixed. Never fluid. */
padding: 16px 12px;         /* Tight — sidebar is navigation, not content. */
nav-item-padding: 8px 12px; /* Compact. The item label, not a hero. */
nav-item-gap: 2px;          /* Nav items sit close together. */
section-gap: 24px;          /* Gap between nav sections (Reports / Settings). */
```

### Main Content Area
```css
padding: 32px;              /* Page content padding. Generous. */
section-gap: 32px;          /* Gap between dashboard sections (KPIs → Charts → Tables). */
```

### KPI Card Grid
```css
gap: 16px;                  /* Between KPI cards. */
card-padding: 24px;         /* Internal card padding. */
label-to-metric-gap: 8px;   /* From metric label to the number. */
metric-to-delta-gap: 12px;  /* From metric number to the delta indicator. */
```

### Data Table
```css
header-padding: 12px 16px;  /* Column headers. */
cell-padding: 12px 16px;    /* Data cells. */
row-gap: 0;                 /* Rows are separated by borders, not gaps. */
```

### Chart Container
```css
padding: 24px;              /* Card padding around the chart. */
chart-top-gap: 16px;        /* Space between chart title and the chart. */
chart-bottom-gap: 8px;      /* Space below the chart to the card edge. */
```

---

## Grid Layouts

### KPI Cards Row
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
gap: 16px;
```

For 4 cards (the most common pattern):
```css
grid-template-columns: repeat(4, 1fr);
```

**Rule:** KPI cards should always be the same height within a row. If content varies,
use `align-items: stretch` and push the delta/trend to the bottom of each card with
`margin-top: auto`.

### Main Dashboard Layout
```css
/* Two-column: main content + sidebar */
display: grid;
grid-template-columns: 240px 1fr;
grid-template-rows: auto 1fr;
min-height: 100vh;
```

### Charts + Table Mixed Layout
```css
/* Common: 2/3 chart + 1/3 secondary stat */
grid-template-columns: 2fr 1fr;
gap: 16px;
```

---

## Spacing Rules to Enforce

- **Never use arbitrary spacing.** If it is not a multiple of 4px, it is wrong.
- **Never use the same padding inside a KPI card and inside a data table row.** The density
  difference is intentional and communicates hierarchy.
- **Never add `margin-bottom` to the last item in a container.** Use `gap` instead.
- **Page title to first KPI cards: 24px gap** — not 48px (too much) or 8px (too little).
- **Between KPI section and first chart section: 32px gap** — marks a logical break.
- **Within a single card: consistent internal spacing.** If the top padding is 24px, the
  bottom padding is 24px. No lopsided internal spacing.
