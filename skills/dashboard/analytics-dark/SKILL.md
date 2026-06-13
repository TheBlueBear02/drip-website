---
name: analytics-dark
description: >-
  Applies professional command-center dashboard aesthetics. Ultra-tight data hierarchy,
  semantic color, Geist Mono metrics, custom chart palette. The Vercel/Segment/Linear
  analytics look — data first, zero decoration. Use when building any analytics
  dashboard, admin panel, reporting interface, or data product.
version: 1.0.0
metadata:
  stack: React + Tailwind CSS + Recharts
  category: dark
  projectType: dashboard
  mood: [precise, utilitarian, commanding, focused, professional]
  signature_element: Geist Mono metrics with 4:1 size hierarchy and semantic-only color
paths:
  - "skills/analytics-dark/**"
  - "**/skills/analytics-dark/**"
---

# ANALYTICS DARK SKILL

A complete design system for professional data dashboards. Built on the principle that
data is the hero — every design decision either helps the user read data faster, or
it is removed. No gradient blobs. No decorative shadows. No blue-purple gradients.
Just precise, readable, information-dense UI that looks like a senior product designer
at Vercel, Segment, or Linear built it.

This is the opposite of what AI generates by default. The AI defaults exist because
they appear most frequently in training data. This skill overrides all of them.

---

## HOW TO USE THIS SKILL

### STEP 1 — Read intent before writing code

#### Tier A (always — read first)
1. `philosophy.md`              ← The core principle. Data is the hero. Read this.
2. `tokens/colors.md`           ← The full color system. Every color has one purpose.
3. `tokens/typography.md`       ← The 4:1 hierarchy rule. Geist Mono for metrics.

#### Tier B (before building any page)
4. `tokens/spacing.md`          ← The density gradient. Spacing communicates importance.
5. `tokens/motion.md`           ← What to animate and what to never animate.

#### Tier C (before each component)
6. `components/kpi-card.md`     ← The most important component. Read the WHY annotations.
7. `components/sidebar.md`      ← The sidebar should disappear. Intentional low contrast.
8. `components/chart.md`        ← Never use Recharts defaults. Always override colors.
9. `components/data-table.md`   ← Density rules. Status badge patterns. Skeleton states.

### STEP 2 — Set up the design foundation first

Before building any UI, add the CSS custom properties to the root. Every component
in this skill references these variables. Without them, the system breaks down.

See `integration/setup.md` for the exact setup.

### STEP 3 — Build from Tier C components

Do not freestyle components. Always refer to the relevant component file before
building any KPI card, chart, table, or sidebar. The WHY annotations explain
decisions that look arbitrary but are intentional.

---

## THE ANTI-AI-GENERIC RULES

These are the specific rules that prevent the default AI output. Apply them without exception.

### Rule 1: Metric font is always Geist Mono
Every number that is the primary point of a card, chart callout, or table cell uses
`font-family: 'Geist Mono'`. Never Inter for metrics. Monospaced digits prevent
layout shift when values update live and signal precision.

### Rule 2: The 4:1 hierarchy is non-negotiable
Metric value: 48px. Metric label: 12px. This exact ratio.
If both the metric and its label are readable at the same glance, the hierarchy is wrong.
The metric should dominate. The label should be context, not content.

### Rule 3: Color only means something
`#3B82F6` (blue) = interactive elements only (buttons, links, active states).
`#10B981` (emerald) = positive delta / success only.
`#F43F5E` (rose) = negative delta / error only.
`#F59E0B` (amber) = warning only.
If color appears anywhere else, it is decoration. Remove it.

### Rule 4: Three background depths, no more
`#0A0A0B` = page background.
`#111113` = cards, panels, sidebar.
`#1A1A1F` = elevated (dropdowns, modals, hover states).
Do not invent a fourth depth. Do not use colored card backgrounds.

### Rule 5: The sidebar must recede
Default nav item text color: `#71717A` (≈45% luminance vs content).
Section label color: `#52525B` (≈30% luminance).
When the user is reading a chart or table, they should not notice the sidebar.

### Rule 6: Charts get custom colors, never defaults
The Recharts default palette is a random sequence of colors. It communicates nothing.
Always use the skill's chart palette: `#3B82F6`, `#10B981`, `#8B5CF6`, `#F59E0B`, `#EC4899`, `#06B6D4`.
Always turn off vertical gridlines. Always use a custom tooltip.

### Rule 7: Tables use Geist Mono for numeric cells
Any cell containing a number (revenue, percentage, count, date) uses Geist Mono.
This ensures digits align vertically when scanning down a column.

### Rule 8: Skeleton loaders match content shape exactly
A skeleton loader must have the same dimensions as the loaded content.
Generic grey rectangles are not acceptable. If a metric card has a 48px metric and
a 12px label, the skeleton must have boxes at those exact heights.

### Rule 9: Never animate table sorts or filter changes
Sorting a table is an instant operation. Animating it looks like a bug.
Animate: initial page load (cards fade in), chart first render, number counter updates.
Never animate: filter toggles, sort direction changes, pagination, search results.

### Rule 10: Spacing must signal importance
KPI cards: 24px internal padding.
Section gaps: 32px.
Data table rows: 12px vertical padding.
These are not arbitrary. Dense elements are less important. Spacious elements are focal points.

---

## WHAT YOU CAN OVERRIDE
- **Accent color**: Replace `#3B82F6` with a different brand color. Keep it saturated.
  The semantic role does not change — it stays the interactive-only color.
- **Font choice**: Geist Mono can be replaced with JetBrains Mono or Fira Code.
  Inter can be replaced with Geist Sans or Plus Jakarta Sans.
- **Content and copy**: All placeholder text and data is fictional.
- **Number of KPI cards**: 2–6 is acceptable. Never 1 (looks incomplete) or 7+ (too cluttered).
- **Chart type**: Area, Bar, Line — choose based on the data. Area for trends, Bar for categories.

## WHAT YOU MUST NEVER OVERRIDE
- **Background values**: Never pure black. Always `#0A0A0B` minimum.
  Never more than 3 depth levels. Never a colored card background.
- **Metric font to Inter**: Geist Mono (or another monospace) is non-negotiable for metrics.
- **The 4:1 ratio**: Metric at 4× the label size. Any smaller ratio destroys the hierarchy.
- **Semantic color rules**: Blue for interactive. Emerald for positive. Rose for negative.
  These rules break the moment color is used decoratively.
- **Recharts default colors**: Always override. No exceptions.
- **Vertical gridlines**: Never. Horizontal only, at 4% opacity max.
- **Sidebar text at content brightness**: Sidebar text must be visually subordinate.

---

## AGENT BEHAVIOR RULES

- Read `philosophy.md` before generating any dashboard page. The principle (data is the hero)
  must inform every decision, not just the token choices.
- When generating a KPI section, always use 3–4 cards. Fewer feels sparse. More feels cluttered.
  Never make all 4 cards identical in layout — vary them: 2 with delta arrows, 1 with sparkline, 1 with a progress bar.
- Every chart must have a custom tooltip. If you use the Recharts default tooltip, you have not followed the skill.
- When generating a data table, always include: sorting on the primary column, row hover state,
  status badges (not text), and a pagination footer. Tables without these feel unfinished.
- The sidebar nav active state uses a blue dot + `--text-primary`, not a highlighted background.
  This is intentional — a full blue background is too heavy.
- Never add a shadow to cards. The background depth system (`#0A0A0B` → `#111113`) provides
  the separation. Shadows on dark cards look muddy and generic.
- The page title (`text-[24px] font-semibold`) appears at the top of the content area,
  not in the sidebar. It is the entry point for the current section.
- Empty states must be designed. An empty table is not a blank table — it has an icon,
  a title ("No customers yet"), a description, and optionally a CTA button.

---

## LAYOUT TEMPLATE

Every dashboard page follows this exact structure:

```jsx
function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#0A0A0B]">
      {/* Sidebar: fixed, 240px */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-auto">
        {/* Top bar (optional) */}
        <TopBar />

        {/* Page content */}
        <div className="flex-1 p-8">
          {/* Page title */}
          <div className="mb-6">
            <h1 className="text-[24px] font-semibold text-[#F4F4F5] tracking-[-0.02em]">
              Page Title
            </h1>
            <p className="text-[14px] text-[#71717A] mt-1">
              Supporting context or date range
            </p>
          </div>

          {/* KPI cards row — always first */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {kpiCards.map(card => <KPICard key={card.id} {...card} />)}
          </div>

          {/* Charts section */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="col-span-2"><MetricChart /></div>
            <div className="col-span-1"><SecondaryStat /></div>
          </div>

          {/* Data table — always last */}
          <DataTable />
        </div>
      </main>
    </div>
  );
}
```

**Section order is always:** KPI cards → Charts → Tables. This is the information
pyramid: overview magnitude → trends → detail. Never reverse this order.

---

## STACK REQUIREMENTS

- React 18+
- Tailwind CSS 3+
- Recharts 2+ (for charts)
- Lucide React (strokeWidth 1.5 for all icons — never default 2)
- Geist Mono via Google Fonts or next/font (`font-['Geist_Mono']`)
- Inter via Google Fonts or next/font (`font-['Inter']`)
