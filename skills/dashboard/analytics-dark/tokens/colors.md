# Color Tokens — analytics-dark

## The Rule Before the Tokens

Color in this system communicates exactly one of four things:
1. **Surface depth** — which layer something is on
2. **Interactivity** — this element responds to clicks
3. **Semantic state** — positive, negative, or warning
4. **Data identity** — which series in a chart is which

If a color does not serve one of these four purposes, it does not belong in this design.

---

## Background Surfaces (Depth Layers)

Use exactly three background levels. Never more.

```css
--bg-base:     #0A0A0B;   /* Page background. The void. */
--bg-surface:  #111113;   /* Cards, panels, sidebars. Primary UI surfaces. */
--bg-elevated: #1A1A1F;   /* Dropdowns, modals, tooltips, hover states. */
--bg-subtle:   #232328;   /* Table row hover, selected states, input backgrounds. */
```

**Critical rule:** Never use pure `#000000`. The slight warmth in `#0A0A0B` prevents
the harsh harshness of pure black. Always use these exact values.

**How to use:**
- Page wrapper → `--bg-base`
- KPI cards, table containers, sidebar → `--bg-surface`
- Dropdown menus, modal overlays, tooltips → `--bg-elevated`
- Row hover in a table, active nav item → `--bg-subtle`

---

## Text Colors

```css
--text-primary:   #F4F4F5;   /* Main content. Numbers, headings, body. */
--text-secondary: #A1A1AA;   /* Labels, helper text, column headers. */
--text-tertiary:  #52525B;   /* Disabled states, placeholder text, metadata. */
--text-inverse:   #0A0A0B;   /* Text on light/accent backgrounds. */
```

**Typography color rule:**
- Metric value → `--text-primary` (always)
- Metric label → `--text-secondary` (always)
- Table column header → `--text-secondary`
- Table cell value → `--text-primary`
- Helper text / last updated → `--text-tertiary`

---

## Accent Color (Interactive Only)

```css
--accent:          #3B82F6;   /* Blue-500. THE interactive color. */
--accent-hover:    #2563EB;   /* Blue-600. Hover state. */
--accent-subtle:   rgba(59, 130, 246, 0.10);  /* Focus rings, selected backgrounds. */
--accent-border:   rgba(59, 130, 246, 0.30);  /* Active input borders, focus outlines. */
```

**Critical rule:** `--accent` (`#3B82F6`) is used for:
- Buttons (primary CTA only)
- Active navigation item indicator
- Focused input borders
- Hyperlinks
- Selected state in filters/dropdowns

It is NEVER used for:
- Decorative gradients
- Card borders
- Chart series colors (charts have their own palette)
- Backgrounds
- Text other than links

---

## Semantic State Colors

These colors carry meaning. Use them ONLY for their meaning.

```css
/* Positive / Success */
--positive:        #10B981;   /* Emerald-500. Revenue up, error rate down, goal met. */
--positive-subtle: rgba(16, 185, 129, 0.10);   /* Positive background chip. */
--positive-border: rgba(16, 185, 129, 0.25);

/* Negative / Error */
--negative:        #F43F5E;   /* Rose-500. Revenue down, error spike, goal missed. */
--negative-subtle: rgba(244, 63, 94, 0.10);
--negative-border: rgba(244, 63, 94, 0.25);

/* Warning / Attention */
--warning:         #F59E0B;   /* Amber-500. Approaching limit, degraded, at risk. */
--warning-subtle:  rgba(245, 158, 11, 0.10);
--warning-border:  rgba(245, 158, 11, 0.25);

/* Neutral / Info */
--neutral:         #A1A1AA;   /* Gray. No-change delta, informational badges. */
--neutral-subtle:  rgba(161, 161, 170, 0.10);
```

**Delta indicator rule:**
- Positive change (↑) → `--positive` with an up arrow icon
- Negative change (↓) → `--negative` with a down arrow icon
- No change (—) → `--neutral` with a dash
- Never use plain red/green — always emerald/rose

---

## Border / Divider

```css
--border:         #27272A;   /* Default border. Cards, inputs, table separators. */
--border-subtle:  #1F1F23;   /* Very subtle separators. Use sparingly. */
--border-strong:  #3F3F46;   /* Emphasized borders. Active elements, selected rows. */
```

**Border rule:** Use borders to separate, not to decorate. If the background contrast
between two elements is already clear, do not add a border. The sidebar should not have
a right border if the base vs surface background contrast already separates them.

---

## Chart Data Series Palette

Six colors for chart series. Ordered by visual weight — Series 1 is always the primary metric.

```css
--chart-1: #3B82F6;   /* Blue. Primary series — the most important line/bar. */
--chart-2: #10B981;   /* Emerald. Secondary series. */
--chart-3: #8B5CF6;   /* Violet. Third series. */
--chart-4: #F59E0B;   /* Amber. Fourth series. */
--chart-5: #EC4899;   /* Pink. Fifth series. */
--chart-6: #06B6D4;   /* Cyan. Sixth series. */
```

**Chart color rules:**
- Never use the Recharts default palette (blue/green/red/orange random)
- Always use chart-1 for the primary KPI line
- Use a maximum of 4 series visible at once — more than 4 is unreadable
- Chart backgrounds: transparent — they inherit the card background
- Chart gridlines: `rgba(255,255,255,0.04)` horizontal only — no vertical gridlines
- Chart tooltips: `--bg-elevated` background, `--border` border, always show the exact value
