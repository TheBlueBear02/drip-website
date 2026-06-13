# Component: Metric Card (KPI Stack Item)

## What It Is

A vertical-stack stat tile showing one live metric — heart rate, distance, hydration. Icon in a circular glass well on the left; value and label stacked on the right. These sit in the narrow middle column, three per stack.

---

## Anatomy (exact visual order, left to right)

```
┌─────────────────────────────────────────┐
│  ( ○ )    108 bpm                       │  ← Circle icon well | hero value + inline unit
│  icon     Heart Rate                    │  ←                  | label (secondary)
└─────────────────────────────────────────┘
```

**Order:** Icon well → Value (+ unit inline) → Label below value. Never label above value.

---

## Implementation

```jsx
function MetricCard({ icon: Icon, value, unit, label }) {
  return (
    <div
      className="
        flex items-center gap-3
        rounded-[20px]
        px-5 py-6
        bg-[rgba(0,0,0,0.35)]
        backdrop-blur-[24px]
      "
      /* WHY: No box-shadow — inner glass sections use tint + blur only.
         Shadow on every card is the primary AI dashboard tell. */
    >
      {/* Icon well */}
      <div
        className="
          flex h-11 w-11 shrink-0 items-center justify-center
          rounded-full
          bg-[rgba(255,255,255,0.08)]
        "
        /* WHY: Circular well mirrors active nav white circles — shape language is consistent */
      >
        <Icon size={20} className="text-[#A0A0A0]" strokeWidth={1.5} />
      </div>

      {/* Value stack */}
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-1">
          <span
            className="
              font-['Plus_Jakarta_Sans']
              text-[36px] font-semibold leading-none
              text-white
              tabular-nums
            "
            /* WHY: 36px vs 12px label = 3:1 hierarchy. tabular-nums prevents digit jump on live updates */
          >
            {value}
          </span>
          <span className="text-[18px] font-normal text-[#A0A0A0]">
            {/* WHY: Unit inline and smaller — separates magnitude from scale without a second line */}
            {unit}
          </span>
        </div>
        <span className="text-[12px] font-medium text-[#A0A0A0]">{label}</span>
      </div>
    </div>
  );
}
```

---

## Skeleton Loading State

```jsx
function MetricCardSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-[20px] px-5 py-6 bg-[rgba(0,0,0,0.35)] backdrop-blur-[24px] animate-pulse">
      <div className="h-11 w-11 shrink-0 rounded-full bg-[rgba(255,255,255,0.08)]" />
      <div className="flex flex-col gap-2">
        <div className="h-9 w-24 rounded-md bg-[rgba(255,255,255,0.08)]" />  {/* 36px metric height */}
        <div className="h-3 w-20 rounded-md bg-[rgba(255,255,255,0.06)]" />   {/* 12px label height */}
      </div>
    </div>
  );
}
```

---

## Common Mistakes to Avoid

- ❌ **Opaque `bg-gray-800` card** — destroys glass aesthetic; must use translucent dark tint + blur
- ❌ **Unit on a separate line below the label** — breaks the inline magnitude pattern from the reference
- ❌ **Drop shadow under the card** — inner sections never carry shadow; shell float only
- ❌ **Colored card background to indicate status** — status belongs in pills elsewhere, not metric tile tint
- ❌ **Monospace font for the value** — Plus Jakarta Sans tabular nums only; mono clashes with rounded glass geometry
