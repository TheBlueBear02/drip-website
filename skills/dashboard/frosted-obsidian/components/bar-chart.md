# Component: Activity Bar Chart

## What It Is

Weekly activity column chart inside an inner glass section. Vertical bars with fully rounded tops, percentage values centered inside each bar, day abbreviations below. Primary data visualization for the wide left column.

---

## Anatomy (exact visual order, top to bottom)

```
┌──────────────────────────────────────────────────┐
│  Activity                    [Weekly ▾]          │  ← Section title + period dropdown
│                                                  │
│     75%                                          │
│    ┌──┐      62%                                 │
│    │  │     ┌──┐                                 │
│    │  │    ┌┤  ├──┐                              │  ← Bars: rounded top caps, value inside
│    └──┘    └──┘  └──┘                            │
│    Mon  Tue  Wed  Thu  Fri  Sat  Sun             │  ← Day labels centered under bars
└──────────────────────────────────────────────────┘
```

**Order:** Header row → Chart plot → Day axis labels. No Y-axis line. No vertical gridlines.

---

## Implementation

```jsx
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const DATA_PALETTE = {
  active: '#FACC15',
  inactive: 'rgba(255, 255, 255, 0.15)',
};

function ActivityBarChart({ data, highlightIndex = 0 }) {
  return (
    <div
      className="
        rounded-[20px]
        bg-[rgba(0,0,0,0.35)]
        p-5
        backdrop-blur-[24px]
      "
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-white">Activity</h3>
        <button
          type="button"
          className="flex items-center gap-1 text-[12px] text-[#A0A0A0]"
        >
          Weekly
          {/* WHY: Chevron-only dropdown — no solid button chrome */}
        </button>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="20%">
          <YAxis hide domain={[0, 100]} />
          {/* WHY: Y-axis hidden — values render inside bars; axis line is clutter on glass */}

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#A0A0A0', fontSize: 12 }}
          />

          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              return (
                <div className="rounded-[16px] border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.12)] px-3 py-2 backdrop-blur-[32px]">
                  <span className="text-[14px] font-medium text-white">
                    {payload[0].value}%
                  </span>
                </div>
              );
            }}
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
          />
          {/* WHY: Custom glass tooltip — Recharts default white box breaks frosted context */}

          <Bar
            dataKey="value"
            radius={[12, 12, 0, 0]}
            /* WHY: Fully rounded top caps — signature bar shape; square tops read as generic */
            label={{
              position: 'insideTop',
              fill: '#FFFFFF',
              fontSize: 12,
              formatter: (v) => `${v}%`,
            }}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={index === highlightIndex ? DATA_PALETTE.active : DATA_PALETTE.inactive}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Example data
const weekData = [
  { day: 'Mon', value: 75 },
  { day: 'Tue', value: 62 },
  { day: 'Wed', value: 48 },
  { day: 'Thu', value: 55 },
  { day: 'Fri', value: 80 },
  { day: 'Sat', value: 40 },
  { day: 'Sun', value: 35 },
];
```

---

## Skeleton Loading State

```jsx
function ActivityBarChartSkeleton() {
  const barHeights = [75, 62, 48, 55, 80, 40, 35];
  return (
    <div className="rounded-[20px] bg-[rgba(0,0,0,0.35)] p-5 backdrop-blur-[24px] animate-pulse">
      <div className="mb-4 flex justify-between">
        <div className="h-4 w-20 rounded bg-[rgba(255,255,255,0.08)]" />
        <div className="h-4 w-16 rounded bg-[rgba(255,255,255,0.06)]" />
      </div>
      <div className="flex h-[220px] items-end justify-between gap-3 px-2">
        {barHeights.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-t-[12px] bg-[rgba(255,255,255,0.08)]"
              style={{ height: `${h * 2}px` }}
            />
            <div className="h-3 w-8 rounded bg-[rgba(255,255,255,0.06)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Common Mistakes to Avoid

- ❌ **Recharts default multi-color palette** — only yellow highlight + grey inactive bars
- ❌ **Vertical gridlines** — forbidden; glass charts stay minimal
- ❌ **Square or slightly rounded bar tops** — radius must be `[12, 12, 0, 0]` minimum
- ❌ **Values floating above bars in default Recharts style** — percentages sit inside the bar top
- ❌ **Opaque chart container** — chart lives inside `--bg-glass-section`, never solid `#1F2937`
