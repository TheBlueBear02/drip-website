# Component: Charts

## The Most Abused Part of Dashboard Design

AI tools almost universally get charts wrong. They use Recharts' default color palette
(random blues/oranges/greens), show both X and Y gridlines, hide the actual data values
in tooltips that only appear on hover, and treat charts as decorative elements rather
than communication tools.

This component guide fixes all of that.

---

## Chart Color Palette (Recharts)

Never use Recharts defaults. Always override with the skill palette:

```jsx
const CHART_COLORS = {
  primary:   '#3B82F6',   // Blue — primary metric line
  secondary: '#10B981',   // Emerald — secondary metric
  tertiary:  '#8B5CF6',   // Violet — third series
  quaternary:'#F59E0B',   // Amber — fourth series
  negative:  '#F43F5E',   // Rose — used only for decline/error metrics
  neutral:   '#52525B',   // Gray — comparison or baseline
};
```

---

## Area/Line Chart (Most Common Dashboard Chart)

```jsx
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';

function MetricChart({ data, metric, comparisonMetric }) {
  return (
    <div className="bg-[#111113] border border-[#27272A] rounded-xl p-6">
      {/* Chart header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[12px] font-medium text-[#A1A1AA] tracking-[0.02em] uppercase">
            {metric.label}
          </span>
          <div className="text-[32px] font-semibold font-['Geist_Mono'] text-[#F4F4F5] leading-none tracking-[-0.02em] mt-1">
            {formatMetric(metric.current)}
          </div>
        </div>
        {/* Time range selector: Day / Week / Month / Year */}
        <TimeRangeSelector />
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
          {/* WHY left: -20: YAxis labels are often redundant when tooltip shows values.
              Pull them off-canvas if they clutter the chart. */}

          {/* Gradient fills */}
          <defs>
            <linearGradient id="gradPrimary" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
            {comparisonMetric && (
              <linearGradient id="gradSecondary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.10} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            )}
          </defs>

          {/* WHY: horizontal gridlines ONLY at very low opacity.
              Vertical gridlines make a chart look like graph paper — never use them. */}
          <CartesianGrid
            horizontal={true}
            vertical={false}
            stroke="rgba(255,255,255,0.04)"
            strokeDasharray="0"
          />

          {/* WHY: XAxis tickLine and axisLine hidden.
              The axis line is a decorative border — we don't need it.
              The tick lines add clutter with no information value. */}
          <XAxis
            dataKey="date"
            tick={{ fill: '#52525B', fontSize: 11, fontFamily: 'Inter' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatDate}
          />

          {/* YAxis often completely hidden — tooltip shows exact values */}
          <YAxis hide={true} />

          <Tooltip content={<CustomTooltip />} />

          {/* Primary area */}
          <Area
            type="monotone"
            dataKey={metric.key}
            stroke="#3B82F6"
            strokeWidth={1.5}
            fill="url(#gradPrimary)"
            dot={false}
            activeDot={{ r: 4, fill: '#3B82F6', strokeWidth: 0 }}
            animationDuration={400}
            animationEasing="ease-out"
          />

          {/* Comparison area (optional) */}
          {comparisonMetric && (
            <Area
              type="monotone"
              dataKey={comparisonMetric.key}
              stroke="#10B981"
              strokeWidth={1.5}
              fill="url(#gradSecondary)"
              dot={false}
              strokeDasharray="4 4"   /* WHY dashed: distinguishes comparison without color confusion */
              activeDot={{ r: 4, fill: '#10B981', strokeWidth: 0 }}
              animationDuration={400}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
```

## Custom Tooltip

```jsx
// WHY: Recharts default tooltip is white-background, generic.
// This custom tooltip matches the skill's dark theme exactly.

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="
      bg-[#1A1A1F]
      border border-[#27272A]
      rounded-lg
      px-3 py-2.5
      shadow-lg
      shadow-black/50
    ">
      <p className="text-[11px] text-[#52525B] mb-1.5">{formatDate(label)}</p>
      {payload.map(entry => (
        <div key={entry.dataKey} className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-[12px] text-[#A1A1AA]">{entry.name}</span>
          <span className="text-[13px] font-medium font-['Geist_Mono'] text-[#F4F4F5] ml-auto pl-4">
            {formatMetric(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}
```

---

## Bar Chart

```jsx
// For categorical comparisons (revenue by channel, users by country)
// WHY: Rounded bar corners (radius={4}) look intentional, not like a stock chart.

<BarChart data={data} barSize={28}>
  <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
  <XAxis
    dataKey="name"
    tick={{ fill: '#52525B', fontSize: 11 }}
    tickLine={false}
    axisLine={false}
  />
  <YAxis hide={true} />
  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
  <Bar
    dataKey="value"
    fill="#3B82F6"
    radius={[4, 4, 0, 0]}   /* WHY: Top corners only — bottom sits on axis */
    animationDuration={400}
  />
</BarChart>
```

---

## Chart Rules

- **Never use Recharts default colors.** Always specify `stroke` and `fill` explicitly.
- **Gradient fills are preferred over solid fills for area charts.** They show volume without visual weight.
- **No vertical gridlines.** Horizontal only, at 4% opacity max.
- **Hide the YAxis if a tooltip exists.** Duplicate information = visual clutter.
- **Bar width fixed at 28-32px.** Auto-width bars look different at different data densities.
- **Tooltip always shows the exact value with formatting.** The chart shows the shape; the tooltip shows the number.
- **No chart title inside the chart area.** Title lives in the card header above.
- **Animation on initial load only.** Subsequent data updates: no animation, instant update.
- **Maximum 4 series.** More than 4 is unreadable. Add a "show more" toggle instead.
