# Component — KPI Card

The primary interactive unit. Three to four sit in a row at the top of the dashboard (Page Views, Total Revenue, Bounce Rate). Each answers one question with one number.

## Anatomy

```
┌─────────────────────────────────────────────┐
│  [icon]  Label …………………………………… [info ⓘ]      │  ← header row: 16px icon + 13px label, info icon far right
│                                               │
│  Value            [↗ 15.6%]                   │  ← 24px metric (tabular) + tinted delta pill, baseline-aligned
└─────────────────────────────────────────────┘
   white surface · 1px border · 16px radius · 24px padding · single soft shadow
```

Reading order is fixed: **label first, value second, delta beside the value.** The label tells you what you are about to read before you read it. The delta sits next to the number it describes, not on its own line.

## Implementation

```jsx
import { Eye, Info } from "lucide-react";

/* WHY strokeWidth 1.5: icons are scaffolding, not focal. A 1.5 stroke reads as a
   quiet outline; 2+ makes the icon compete with the metric for attention. */
function DeltaPill({ value }) {
  const up = value >= 0;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-medium tabular-nums"
      /* WHY tinted pill, not bare colored text: direction must be legible before the
         digits are parsed. The soft background carries the signal at a glance. */
      style={{
        color: up ? "var(--positive)" : "var(--negative)",
        backgroundColor: up ? "var(--positive-soft)" : "var(--negative-soft)",
      }}
    >
      {/* WHY diagonal arrow glyph, not a triangle: matches the source design and reads
          as "trend up/down" rather than "play/expand". */}
      {up ? "↗" : "↘"} {Math.abs(value).toFixed(1)}%
    </span>
  );
}

export function KpiCard({ icon: Icon = Eye, label, value, delta }) {
  return (
    <div
      className="rounded-2xl bg-white p-6"
      /* WHY 1px border AND a single soft shadow: on the cool-grey canvas the border
         gives a crisp edge and the 1px/4%-opacity shadow gives just enough lift.
         Never a heavy/dark drop shadow — that reads as AI default. */
      style={{
        border: "1px solid var(--border)",
        boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={16} strokeWidth={1.5} style={{ color: "var(--text-tertiary)" }} />
          {/* WHY label is secondary color + Medium, never primary: it must sit below
              the value in the hierarchy (2:1 size, plus weight, plus contrast). */}
          <span className="text-[13px] font-medium" style={{ color: "var(--text-secondary)" }}>
            {label}
          </span>
        </div>
        <Info size={14} strokeWidth={1.5} style={{ color: "var(--text-tertiary)" }} />
      </div>

      <div className="mt-4 flex items-end gap-3">
        {/* WHY tabular-nums + SemiBold + primary: the answer. Tabular keeps width
            stable on live update so the pill beside it never jumps. */}
        <span
          className="text-[24px] font-semibold leading-none tabular-nums"
          style={{ color: "var(--text-primary)" }}
        >
          {value}
        </span>
        {delta != null && <DeltaPill value={delta} />}
      </div>
    </div>
  );
}
```

## Skeleton loading state

Matches the exact footprint: same padding, same radius, same two-row layout. No generic grey block.

```jsx
export function KpiCardSkeleton() {
  return (
    <div
      className="rounded-2xl bg-white p-6"
      style={{ border: "1px solid var(--border)", boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* icon placeholder — 16px square to match the real icon */}
          <div className="h-4 w-4 rounded animate-pulse" style={{ background: "var(--surface-sunken)" }} />
          {/* label placeholder — ~80px wide, 13px tall */}
          <div className="h-3 w-20 rounded animate-pulse" style={{ background: "var(--surface-sunken)" }} />
        </div>
        <div className="h-3.5 w-3.5 rounded-full animate-pulse" style={{ background: "var(--surface-sunken)" }} />
      </div>
      <div className="mt-4 flex items-end gap-3">
        {/* value placeholder — 24px tall, ~96px wide to mirror a real metric */}
        <div className="h-6 w-24 rounded animate-pulse" style={{ background: "var(--surface-sunken)" }} />
        {/* delta pill placeholder — fully rounded, pill-sized */}
        <div className="h-5 w-14 rounded-full animate-pulse" style={{ background: "var(--surface-sunken)" }} />
      </div>
    </div>
  );
}
```

The shimmer uses `--surface-sunken` (#F8F9FB), not grey-300 — the skeleton lives on white, so its blocks are the sunken tone, and the animation stops the moment data arrives.

## Common mistakes to avoid

- ❌ **Tinting the card background by status** (green card for up, red for down). The delta pill already carries direction; a colored card is a second signal for one fact — noise. The card is always flat white.
- ❌ **Rendering the delta as bare colored text** (`+15.6%` in green with no pill). The source design uses tinted pills; bare text loses the at-a-glance scan and looks unfinished.
- ❌ **Equal weight for label and value** (both 16px Medium). Breaks the 2:1 hierarchy — the value must be larger, heavier, and higher-contrast than the label, all three.
- ❌ **A big colored icon in the corner** (24px+ filled indigo circle behind the icon). Icons here are 16px, 1.5 stroke, tertiary grey. A prominent icon competes with the number for the eye.
- ❌ **Proportional figures on the value.** Without `tabular-nums`, a live-updating metric shifts width and the delta pill beside it jitters.
- ❌ **A heavy drop shadow under the card.** Separation is a 1px border plus one 4%-opacity shadow — never a dark, blurred shadow that lifts the card off the page.
