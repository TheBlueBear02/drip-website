# Component: KPI Card

## What It Is

The KPI card is the most important component in any dashboard. It answers one question
in one glance: "How is this metric doing right now, and is that good or bad?"

If a user has to read a KPI card for more than 1.5 seconds, it is designed wrong.

---

## Anatomy (in exact visual order, top to bottom)

```
┌──────────────────────────────────────────┐
│  [Icon]  METRIC LABEL          [Menu ⋯]  │  ← Label row: icon (optional) + label + actions
│                                           │
│  $124,300                                 │  ← Hero metric: Geist Mono, 48px, --text-primary
│                                           │
│  ↑ 12.4%  vs. last month                  │  ← Delta row: arrow + percentage + context
└──────────────────────────────────────────┘
```

**Order is non-negotiable.** Label → Number → Delta. Never Number → Label. Never Delta → Number.

The user's eye moves top-to-bottom. They read the label to know what they're looking at,
then the number for the value, then the delta for the change. Reordering this breaks
the reading flow that every well-designed dashboard uses.

---

## Implementation

```jsx
// WHY: Background is --bg-surface (#111113), NOT a colored card.
// Color on the card background communicates status — but we don't need it.
// The delta color already communicates status. Two signals for the same info = noise.

function KPICard({ label, value, delta, deltaLabel, icon: Icon }) {
  const isPositive = delta > 0;
  const isNegative = delta < 0;

  return (
    <div className="
      bg-[#111113]
      border border-[#27272A]
      rounded-xl
      p-6                   /* 24px padding — always */
      flex flex-col
      gap-3                 /* 12px between elements */
      min-h-[140px]         /* Minimum height for consistency across the row */
    ">
      {/* Label Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={14} className="text-[#52525B]" strokeWidth={1.5} />}
          <span className="
            text-[12px] font-medium
            text-[#A1A1AA]
            tracking-[0.02em]
            uppercase
          ">
            {/* WHY uppercase: 12px labels need tracking to be readable.
                Uppercase + tracking-wide is more legible than lowercase at this size. */}
            {label}
          </span>
        </div>
        {/* Optional: kebab menu for card actions (view details, export) */}
      </div>

      {/* Hero Metric */}
      <div className="
        font-['Geist_Mono']
        text-[48px] font-semibold
        text-[#F4F4F5]
        leading-none
        tracking-[-0.02em]
      ">
        {/* WHY Geist Mono: monospaced digits prevent layout shift on live updates */}
        {formatMetric(value)}
      </div>

      {/* Delta Row — pushed to bottom */}
      <div className="mt-auto flex items-center gap-1.5">
        {/* Arrow icon */}
        {isPositive && <TrendingUp size={13} className="text-[#10B981]" />}
        {isNegative && <TrendingDown size={13} className="text-[#F43F5E]" />}
        {!isPositive && !isNegative && <Minus size={13} className="text-[#A1A1AA]" />}

        {/* Delta percentage */}
        <span className={`
          text-[13px] font-medium font-['Geist_Mono']
          ${isPositive ? 'text-[#10B981]' : ''}
          ${isNegative ? 'text-[#F43F5E]' : ''}
          ${!isPositive && !isNegative ? 'text-[#A1A1AA]' : ''}
        `}>
          {isPositive && '+'}{delta.toFixed(1)}%
        </span>

        {/* Context label */}
        <span className="text-[12px] text-[#52525B]">
          {deltaLabel}  {/* e.g. "vs. last month" or "vs. last week" */}
        </span>
      </div>
    </div>
  );
}
```

---

## Formatting Rules

```js
function formatMetric(value, type = 'number') {
  // Currency
  if (type === 'currency') {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000)     return `$${(value / 1_000).toFixed(1)}K`;
    return `$${value}`;
  }
  // Percentage
  if (type === 'percent') return `${value.toFixed(1)}%`;
  // Large numbers
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000)     return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}
```

**Why abbreviate:** A KPI card showing `$124,382.47` is harder to read at a glance
than `$124.4K`. The purpose of a KPI card is to communicate magnitude, not precision.
Precision lives in the data table below.

---

## Skeleton Loading State

```jsx
// WHY: Skeleton must match the EXACT shape of the loaded card.
// A generic grey rectangle is not a skeleton — it destroys the layout transition.

function KPICardSkeleton() {
  return (
    <div className="bg-[#111113] border border-[#27272A] rounded-xl p-6 min-h-[140px]">
      {/* Label row skeleton */}
      <div className="w-24 h-3 bg-[#27272A] rounded animate-pulse" />
      {/* Metric skeleton — must be the same height as the 48px Geist Mono text */}
      <div className="w-32 h-12 bg-[#27272A] rounded mt-3 animate-pulse" />
      {/* Delta skeleton */}
      <div className="w-20 h-3 bg-[#27272A] rounded mt-auto animate-pulse" />
    </div>
  );
}
```

---

## Common Mistakes to Avoid

❌ **Colored card backgrounds** (`bg-emerald-900`, `bg-blue-900`)
> The color already lives in the delta indicator. Repeating it on the background is redundant and visually heavy.

❌ **Label above metric at same font size** (`text-base` for both)
> Destroys the 4:1 hierarchy. The metric must dominate.

❌ **Delta without direction arrow** (`+12.4%` with no icon)
> The arrow is not decoration — it doubles as a symbol for users with color vision deficiency.

❌ **Metric without currency/unit suffix** (`124300` instead of `$124.3K`)
> Unformatted numbers in KPI cards look unfinished.

❌ **Different card heights in the same row**
> Set a `min-height` and push the delta to the bottom with `mt-auto`. Consistent height is required.
