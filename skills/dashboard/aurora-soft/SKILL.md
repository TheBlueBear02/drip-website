---
name: aurora-soft
description: >-
  A bright, light SaaS analytics dashboard where saturated color lives only inside the
  data — a four-stop indigo→violet→blue→teal gradient spectrum in charts — while the chrome
  stays neutral white-on-cool-grey. Use when building a dashboard, analytics, or admin
  overview, or when the user mentions KPI cards, charts, a metrics dashboard, or asks for a
  "Stripe/Mixpanel-style" or "colorful but clean" light data product.
version: 1.0.0
metadata:
  stack: React + Tailwind CSS + Recharts + Framer Motion + Lucide React
  category: light
  projectType: dashboard
  mood: [vibrant, gradient, airy, friendly, polished, energetic]
  signature_element: Four-stop brand gradient (indigo→violet→blue→teal) used ONLY as chart fills; the chrome carries no saturated color except the single indigo accent.
---

## What this design system feels like

aurora-soft is a working analytics surface, not a marketing page. White cards float on a cool light-grey canvas (#F3F4F7), separated by hairline borders and one barely-there shadow. The interface is deliberately quiet — neutral text, tertiary icons, a recessed sidebar — so that the only saturated color on screen lives inside the charts, where the four-hue spectrum (indigo, violet, blue, teal) distinguishes categories and a single focal bar pulls into full gradient while its neighbors fall back to grey.

The three things an AI must understand before touching this skill:
1. **Color lives in the data, not the chrome.** Saturated color appears only inside visualizations. The frame is neutral; the one exception is the indigo accent, reserved strictly for interactivity.
2. **Hierarchy is built from size + weight + contrast together,** at a 2:1 metric-to-label ratio — never from color, never from decoration.
3. **The chrome recedes.** Sidebar, borders, and icons sit a tier below content in contrast, on purpose.

Reference products: **Stripe Dashboard**, **Mixpanel/analytics tooling**, **Revolut**.

## Reading order

**Tier A — always, before any page**
- `philosophy.md` — the intent behind every decision
- `tokens/colors.md` — the chrome-vs-data color law
- `tokens/typography.md` — SF Pro Display, 2:1 ratio, tabular-nums

**Tier B — before building a full page**
- `tokens/spacing.md` — three density tiers + layout grid
- `tokens/motion.md` — what animates, what never does
- `integration/setup.md` — tokens, fonts, Recharts overrides, page scaffold

**Tier C — before building a specific component**
- `components/kpi-card.md` — the primary unit
- `components/sidebar.md` — navigation
- `components/data-table.md` — the integration list / data display

---

## The anti-AI-slop rules

### Universal rules (all 11, adapted to aurora-soft)

**1. No generic font defaults.** The face is **SF Pro Display** for everything, including numbers. Never Inter, never Roboto, never a system default as the primary font. There is no separate monospace font — numbers use `font-variant-numeric: tabular-nums` on SF Pro. Check: is every number tabular and in SF Pro?

**2. The hierarchy ratio is explicit and enforced — 2:1.** A KPI metric is 24px; its label is 12–13px. The metric is always larger, heavier (SemiBold), and higher-contrast (`--text-primary`) than its label (Medium, `--text-secondary`). All three signals stack. If metric and label render at the same size or weight, the hierarchy is wrong.

**3. Color only means something.** Indigo `--accent` (#5347CE) = interactivity ONLY. The four-hue spectrum (#5347CE/#887CFD/#4896FE/#16C8C7) = chart series ONLY. Emerald = positive only, rose = negative only. Any color not serving surface/interactivity/data is removed. No decorative color, no gradient on chrome.

**4. The background depth system has a ceiling — 3 levels.** `--canvas` #F3F4F7 → `--surface` #FFFFFF → `--surface-sunken` #F8F9FB. Never a 4th level. Dropdowns/modals use white + shadow, not a new color. Never a colored or gradient-filled card background.

**5. Third-party library defaults are always overridden.** Recharts: never its default palette — fill with the spectrum gradients; never its default tooltip — use a white custom tooltip; never vertical gridlines — horizontal only; Y-axis hidden. Framer Motion: only the entrance/count-up patterns in `motion.md`, no springs. Lucide: always `strokeWidth={1.5}`.

**6. Loading states must match content shape.** Every data component ships a skeleton that replicates its exact dimensions (KPI card = two-row 24px-padding layout; table = 44px rows with per-column widths). Skeleton blocks use `--surface-sunken` on white, not grey-300. No generic rectangles.

**7. Motion must serve function.** Animate: card entrance (fade+rise 8px, staggered), chart first render, metric count-up (first mount only), hover/press feedback, focal-bar gradient. Never animate: table sorts, filter changes, pagination, sidebar nav switching, post-mount number updates, gradient borders, anything looping.

**8. Spacing signals importance.** Three density tiers: Generous (KPI cards 24px, section gaps 24px), Standard (panels 20px, nav items), Dense (table rows 44px / 12px padding). Spacing is never uniform across tiers.

**9. Navigation recedes by design.** Sidebar is white (same as cards) with a 1px border, not a shadow. Inactive nav text is `--text-secondary`, icons `--text-tertiary`; the active item uses an `--accent-soft` lavender fill (never solid indigo) with primary text + accent icon. Section labels are 11px uppercase tertiary.

**10. Empty and error states are designed, not blank.** Every data component defines an empty state (Lucide icon 24px tertiary + title + description + optional CTA) and an error state (icon + message + retry). A table with no rows is never a blank panel.

**11. No emojis in UI.** No emojis in headings, labels, buttons, empty states, nav items, badges, or tooltips. Use Lucide icons (strokeWidth 1.5). The only emojis permitted are inside user-generated content; never inject them from the codebase.

### Skill-specific rules (the distinctive decisions)

**S1. Saturated color is confined to data visualizations.** The four-hue spectrum and its gradients appear only as chart fills (bars, funnel segments, donut/gauge arcs). They never touch a button, link, label, border, badge, icon, or background. If you find a teal button or a violet card, the skill is broken.

**S2. The focal-bar pattern.** In bar/column charts, the bar(s) being compared-to or in focus get the gradient fill (`--grad-warm`); all other bars fall back to `--surface-sunken` grey. Never color every bar the same, and never rainbow every bar a different hue without a categorical reason.

**S3. Deltas are tinted pills with arrow glyphs.** Every trend value renders as a fully-rounded pill: `--positive-soft`/`--negative-soft` background, `--positive`/`--negative` text, prefixed with `↗` or `↘`. Never bare colored text, never a triangle, never a colored card to show direction.

**S4. Numbers use tabular SF Pro, not a mono font.** Currency formats as `$ 9,257.51` (symbol + thin space). The dashboard's monospaced-digit job is done by `tabular-nums`, not by importing Geist/JetBrains Mono.

---

## What you can override / what you must never override

**Can override (per project, aesthetic intact):**
- The specific KPI metrics, chart types, and table columns.
- The exact section labels and nav items in the sidebar.
- Number of KPI cards (3 or 4) and the precise column split of content rows.
- Which two adjacent spectrum stops form a given chart's gradient.
- The `--warning` amber (inferred; tune to taste as long as it doesn't collide with the accent).

**Never override (changing these leaves the skill):**
- Color lives in the data, not the chrome — saturated color only inside charts.
- Indigo #5347CE is the single interactive accent; no second chrome accent.
- The four-stop spectrum (#5347CE/#887CFD/#4896FE/#16C8C7) is the only chart palette.
- White cards on a cool-grey canvas (#F3F4F7); flat fills, hairline borders, one soft shadow — never colored or gradient card backgrounds, never heavy shadows.
- SF Pro Display + tabular-nums for all numbers; no Inter, no separate mono font.
- The recessed sidebar with an `--accent-soft` active fill (never solid indigo).
- Delta pills with arrow glyphs.

---

## Agent behavior rules

- When generating a KPI section, use 3–4 cards. Never a single card, never 6+. Vary the metric type (count, currency, percentage) so the row isn't monotone.
- Every chart must have a custom white tooltip. If you ship the Recharts default tooltip, you have not followed the skill.
- Every chart hides its Y-axis and uses horizontal gridlines only (or none). Vertical gridlines never appear.
- In any bar chart, decide which bar is the focus and give only it the gradient; grey the rest. Do not gradient all bars.
- A rate/progress bar inside a table uses the indigo accent, not a spectrum hue — it is a measure, not a series.
- Every component that fetches data renders skeleton → (loaded | empty | error). Never render a bare spinner or a blank panel.
- Reach for an icon (Lucide, 1.5 stroke, tertiary) before reaching for any emoji — and never reach for an emoji.
- Keep the sidebar quieter than the content: if the nav ever looks as loud as the charts, lower its contrast.

## Layout template

```jsx
<div className="flex min-h-screen" style={{ background: "var(--canvas)" }}>
  <Sidebar />                                {/* 240px, white, hairline border, recessed */}
  <div className="flex-1">
    <Topbar />                               {/* 56px, white, search + actions + avatar */}
    <main className="space-y-6 p-6 xl:p-8">  {/* 24px section gaps */}
      <h1 className="text-[20px] font-semibold" style={{ color: "var(--text-primary)" }}>Dashboard</h1>

      <section className="grid grid-cols-3 gap-4">
        {/* 3 KPI cards — Tier 1 generous, 24px padding, delta pills */}
      </section>

      <section className="grid grid-cols-12 gap-4">
        <div className="col-span-7">{/* main chart panel — gradient series */}</div>
        <div className="col-span-5">{/* secondary chart — focal-bar pattern */}</div>
      </section>

      <section className="grid grid-cols-12 gap-4">
        <div className="col-span-5">{/* distribution donut/gauge */}</div>
        <div className="col-span-7">{/* integration data table — Tier 3 dense */}</div>
      </section>
    </main>
  </div>
</div>
```
