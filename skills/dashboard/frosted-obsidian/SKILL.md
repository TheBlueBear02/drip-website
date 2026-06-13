---
name: frosted-obsidian
description: >-
  Applies glassmorphism dashboard aesthetics — frosted translucent panels over
  atmospheric scenes, white active states, semantic chart colors. The visionOS/Raycast
  health-analytics look. Use when building wellness dashboards, fitness trackers,
  personal stats apps, or any UI the user describes as glass, frosted, or translucent.
version: 1.0.0
metadata:
  stack: React + Tailwind CSS + Recharts + Lucide React
  category: dark
  projectType: dashboard
  mood: [glassmorphism, translucent, futuristic, high-contrast, sophisticated]
  signature_element: Frosted rgba panels with backdrop-blur over a visible scene layer
paths:
  - "skills/frosted-obsidian/**"
  - "**/skills/frosted-obsidian/**"
---

# FROSTED OBSIDIAN SKILL

A complete design system for glassmorphism dashboards. Built on the principle that UI
floats above context — depth comes from translucency and blur, not opaque cards and
drop shadows. Every panel is frosted glass; every color answers a question; navigation
is a detached pill that recedes until needed.

Three things to internalize before writing code: (1) no opaque card backgrounds —
`rgba` + `backdrop-filter` always; (2) white circles mark interaction, not blue buttons;
(3) chart yellow/green/blue are data categories and status, never atmosphere.

Reference DNA: Apple visionOS (spatial glass layers), Raycast (dark translucent chrome),
Linear (typographic hierarchy and restraint).

---

## HOW TO USE THIS SKILL

### Tier A (always — read first)
1. `philosophy.md`              ← Float above context. Translucency is the identity.
2. `tokens/colors.md`           ← Four glass depth layers. White interactive accent.
3. `tokens/typography.md`       ← Plus Jakarta Sans. 3:1 metric hierarchy.

### Tier B (before building any page)
4. `tokens/spacing.md`          ← Shell breathes; lists tighten. Floating sidebar inset.
5. `tokens/motion.md`           ← Material entrance only. Filters instant.

### Tier C (before each component)
6. `components/metric-card.md`  ← Icon well + inline unit pattern.
7. `components/pill-sidebar.md` ← Detached pill, white active circles.
8. `components/bar-chart.md`    ← Rounded bar tops, values inside bars.

### Setup
9. `integration/setup.md`       ← Scene background + glass utilities required first.

---

## THE ANTI-AI-SLOP RULES

### Rule 1: No generic font defaults
Use **Plus Jakarta Sans** for all UI text and metrics. Never default to Inter for
everything. Never use Geist Mono or JetBrains Mono for metrics — this aesthetic uses
humanist tabular numerals (`font-variant-numeric: tabular-nums`), not monospace.
Maximum font weight is 600 — never 700+.

### Rule 2: The hierarchy ratio is explicit and enforced
**3:1 ratio:** metric at 36px, label at 12px. Units inline at 18px secondary color.
If the metric and label compete for attention, the hierarchy is wrong. Section titles
at 16px organize — they do not replace the metric as focal point.

### Rule 3: Color only means something
White = interactive selection (active nav circle, selected calendar day).
Yellow (`#FACC15`) = in-progress / primary data emphasis only.
Green (`#4ADE80`) = complete / success only.
Blue (`#60A5FA`) = categorical chart segment only.
Grey (`rgba(255,255,255,0.15)`) = de-emphasized chart/data only.
If color decorates a card background, header gradient, or button for "visual interest," remove it.

### Rule 4: The background depth system has a ceiling
**Four layers only:** scene → glass shell → glass section → glass elevated.
Shell: `rgba(255,255,255,0.08)` + `blur(40px)`.
Section: `rgba(0,0,0,0.35)` + `blur(24px)`.
Never invent a fifth layer. Never replace glass with solid `#111`, `#1A1A1A`, or `bg-gray-900` cards.

### Rule 5: Third-party library defaults are always overridden
Recharts: override all bar/segment colors with `--data-yellow`, `--data-blue`,
`--data-green`, `--data-grey`. Custom glass tooltip required — never default white box.
Hide Y-axis on bar charts. No vertical gridlines. Bar `radius={[12,12,0,0]}`.
Lucide: `strokeWidth={1.5}` always — never default 2.

### Rule 6: Loading states must match content shape
Skeleton loaders replicate exact dimensions: 36px metric block, 12px label block,
44px icon circle, bar heights matching final chart proportions. Generic grey rectangles
on opaque backgrounds are forbidden — skeletons use `rgba(255,255,255,0.08)` on glass.

### Rule 7: Motion must serve function
Animate: shell entrance fade, first bar render grow, sidebar active crossfade, glass hover brighten.
Never animate: table sort, filter change, pagination, date range swap, backdrop-filter blur amount.
No scroll-triggered parallax on the scene background.

### Rule 8: Spacing signals importance
Shell padding: 32px. Column gaps: 24px. Inner section padding: 20px.
List/chart compact gaps: 8–12px. Uniform 16px on everything is forbidden —
the glass shell must breathe more than challenge list rows.

### Rule 9: Navigation recedes by design
Floating pill sidebar: inactive icons `#A0A0A0`, no text labels by default.
Active item: white circle only — not brighter icon alone, not blue fill.
Sidebar is detached `64px` pill at `left: 24px` — not full-height edge-docked chrome
at content brightness.

### Rule 10: Empty and error states are designed, not blank
Empty chart: glass section with Lucide icon (24px, tertiary), 16px semibold title,
14px secondary description. Error: same container, retry button as white-outline on glass.
Never a blank div. Never undifferentiated "No data" plain text.

### Rule 11: No emojis in UI
No emojis in headings, labels, buttons, nav, status pills, empty states, or tooltips.
Use Lucide icons (`strokeWidth={1.5}`) for all symbolic meaning. User-generated content
may contain emojis — never inject them from code.

---

## SKILL-SPECIFIC RULES (most distinctive decisions)

### Rule 12: Translucency is non-negotiable — never opaque inner cards
Every container above the scene layer uses `background` with alpha AND `backdrop-filter`.
An AI will default to `bg-gray-800` or `bg-zinc-900`. That single choice destroys the skill.
If blur is unsupported, reduce alpha — do not switch to solid fill.

### Rule 13: Inner sections never carry box-shadow
Only the main glass shell gets `--shadow-shell`. Inner metric cards, charts, and lists
use tint shift + blur for separation. Shadow on every card is the fastest AI tell to avoid.

### Rule 14: Active states are white specular circles — not blue primary buttons
This skill deliberately rejects the AI-default blue CTA. Navigation active state =
`bg-white` circle + `#1A1A2E` icon. Calendar selected day = same pattern.
Do not introduce `#3B82F6` primary buttons for " consistency."

### Rule 15: Bar chart values render inside rounded bars
Percentages centered inside the bar top — not floating above in Recharts default style.
Bar tops fully rounded `[12, 12, 0, 0]`. One bar highlighted yellow; others grey translucent.

---

## WHAT YOU CAN OVERRIDE

- **Scene background:** photograph, gradient, or video — must remain visible through glass
- **Data palette hues:** yellow/blue/green shades may shift for brand — semantic roles stay fixed
- **Number of metric stack items:** 2–4 acceptable in the narrow column
- **Chart type:** donut for overview, bar for activity — keep glass container pattern
- **Font:** Plus Jakarta Sans may swap to DM Sans if needed — never Inter, never mono metrics

## WHAT YOU MUST NEVER OVERRIDE

- **Glass over opacity:** rgba + backdrop-filter on all panels above scene
- **White interactive accent:** active nav and selected dates stay white circles
- **No inner card shadows:** separation by tint only
- **Detached pill sidebar:** not edge-docked full-height column
- **3:1 metric hierarchy:** 36px value, 12px label, inline unit
- **Recharts default colors and tooltip:** always custom
- **No blue-purple gradients anywhere**
- **No emojis in UI chrome**

---

## AGENT BEHAVIOR RULES

- Read `philosophy.md` before any page — if the output does not look like glass over a scene, stop and fix foundation first.
- Layout order inside shell: wide column (chart + list) | narrow metric stack | medium column (donut + calendar + summary).
- Metric stack column: three `MetricCard` components with distinct icons — heart, distance, water pattern.
- Challenge/progress lists use status pills: yellow "In progress", green "Complete" — full pill radius, white text.
- Donut chart: thick ring, center percentage large white, legend with color dots and delta caption.
- Calendar strip: horizontal day cells; selected day = white circle + dark numeral.
- Dropdown triggers are text + chevron on glass — not solid filled buttons.
- Every chart gets a custom glass tooltip. Recharts default = skill violation.
- When adding tables, use glass section container, no vertical gridlines, row hover `rgba(255,255,255,0.04)`.

---

## LAYOUT TEMPLATE

```jsx
function DashboardLayout() {
  return (
    <div className="relative min-h-screen">
      {/* Scene is on body — see integration/setup.md */}

      <PillSidebar activeId="home" onNavigate={() => {}} />

      <main className="ml-24 flex min-h-screen items-center justify-center p-8">
        <div
          className="
            w-full max-w-[1200px]
            rounded-[32px]
            border border-[rgba(255,255,255,0.18)]
            bg-[rgba(255,255,255,0.08)]
            p-8
            shadow-[0_24px_80px_rgba(0,0,0,0.45)]
            backdrop-blur-[40px]
          "
        >
          <header className="mb-6">
            <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-white">
              Overview
            </h1>
          </header>

          <div className="grid grid-cols-12 gap-6">
            {/* Wide column */}
            <div className="col-span-12 flex flex-col gap-5 lg:col-span-7">
              <ActivityBarChart data={weekData} />
              {/* Challenge list glass section below */}
            </div>

            {/* Metric stack */}
            <div className="col-span-12 flex flex-col gap-4 lg:col-span-2">
              <MetricCard icon={Heart} value={108} unit="bpm" label="Heart Rate" />
              <MetricCard icon={Footprints} value={3.37} unit="km" label="Distance" />
              <MetricCard icon={Droplets} value={2.5} unit="l" label="Water" />
            </div>

            {/* Overview column */}
            <div className="col-span-12 flex flex-col gap-5 lg:col-span-3">
              {/* Donut chart, calendar strip, output summary — each in glass-section */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
```

**Section order:** activity visualization → supporting lists → metric stack → overview summaries.
Metrics stay in the narrow column, not a full-width KPI row — this layout matches the reference.

---

## STACK REQUIREMENTS

- React 18+
- Tailwind CSS 3+
- Recharts 2+
- Lucide React (`strokeWidth={1.5}`)
- Plus Jakarta Sans via Google Fonts or `next/font`
