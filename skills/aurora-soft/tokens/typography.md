# aurora-soft — Typography

## The font

**SF Pro Display** is the single typeface, used for everything — headings, metrics, labels, body, and numbers. It is the font in the source brand guide.

```css
--font-sans: "SF Pro Display", -apple-system, BlinkMacSystemFont, "SF Pro Text",
             system-ui, "Segoe UI", sans-serif;
```

Why SF Pro Display and not Inter: SF Pro is a neutral grotesque with slightly tighter apertures and a touch more warmth than Inter at display sizes; its numerals read as confident and rounded, which suits a metric-forward dashboard. It is the brand's chosen face — matching it is what makes output look like *this* product. On non-Apple platforms the system stack degrades to the native UI font (Segoe UI on Windows); load SF Pro Display via the web for fidelity (see `integration/setup.md`).

**There is no second font and no separate monospace font.** Numbers stay in SF Pro Display and rely on `font-variant-numeric: tabular-nums` to keep columns and live-updating values from shifting. This replaces the usual "use Geist/JetBrains Mono for numbers" default — here, tabular figures on the brand font do that job.

---

## The type scale

| Token        | Size | Weight        | Use case |
|--------------|------|---------------|----------|
| `display`    | 28px | SemiBold 600  | Page-level hero metric (e.g. `$ 9,257.51` in Sales Overview) |
| `title`      | 20px | SemiBold 600  | Page title ("Dashboard") |
| `metric`     | 24px | SemiBold 600  | KPI card values (`12,450`, `86.5%`), panel headline numbers |
| `body`       | 14px | Regular 400   | Default body, table cell values |
| `card-title` | 14px | Medium 500    | Card/panel titles ("Sales Overview", "List of Integration") |
| `label`      | 13px | Medium 500    | KPI labels ("Page Views"), nav item labels |
| `caption`    | 12px | Regular 400   | Helper text, "+ $143.50 increased", axis values |
| `micro`      | 11px | Medium 500    | Section labels & table column headers — UPPERCASE, +0.06em tracking |

Weights in use: **Regular 400, Medium 500, SemiBold 600, Bold 700.** Bold 700 is reserved for the brand wordmark and the largest display headings only. Never use 800/900 — the design's emphasis comes from size and tabular weight, not from black weights.

---

## The hierarchy rule

**The metric-to-label ratio is 2:1.** A KPI value is 24px; its label is 12–13px (`24 / 12 = 2`). The page hero metric is 28px against a 14px title. This is a moderate SaaS hierarchy — the number dominates clearly, but the design is not the extreme 4:1 of a sparse analytics wall.

Enforcement: if a metric and its label render at the same size, or within ~4px of each other, the hierarchy is wrong. The metric is always larger **and** higher contrast (`--text-primary`) **and** heavier (SemiBold) than its label (Medium, `--text-secondary`). All three signals stack — never rely on color alone or size alone.

---

## Formatting rules

- **Currency:** symbol, then a thin space, then the number: `$ 9,257.51`. Always 2 decimals for currency. Thousands separators always.
- **Counts:** integer with thousands separators, no decimals: `12,450`, `24,473`.
- **Percentages:** one decimal place: `86.5%`, `15.6%`. Deltas also one decimal: `34.0%`.
- **Deltas:** rendered inside a tinted pill (see colors), prefixed by a direction arrow glyph — `↗` for up, `↘` for down — colored by sign, never a triangle, never a bare `+`/`-` only.
- **Tabular numerals:** every number that can change or that sits in a column gets `font-variant-numeric: tabular-nums`. Non-negotiable for KPI values, table cells, axis labels.
- **Labels:** sentence case for nav and KPI labels ("Page Views", not "PAGE VIEWS"). UPPERCASE is reserved exclusively for `micro` — section dividers and table column headers — and always with +0.06em letter-spacing.
- **Letter-spacing:** display/title sizes get slight negative tracking (-0.01em) for a tighter headline; micro labels get +0.06em; everything else is default.

---

## What you must never do

- ❌ Never use Inter (or Roboto, or a generic system default) as the primary face. The font is SF Pro Display.
- ❌ Never introduce a separate monospace font for numbers. Use `tabular-nums` on SF Pro Display.
- ❌ Never render a metric and its label at the same weight or size — the 2:1 ratio plus weight/contrast separation is mandatory.
- ❌ Never use weights 800 or heavier.
- ❌ Never set headings or body in all-caps. Uppercase is only for 11px `micro` labels.
- ❌ Never use proportional (non-tabular) figures in a KPI value or a table column — values will jitter on update.
