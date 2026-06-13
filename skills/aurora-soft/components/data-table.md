# Component — Data Table (Integration List)

A dense list inside a white panel: each row is an integration with an app logo, type, a rate shown as a thin progress bar, and a profit value. This is Tier-3 density — many rows scanned at once.

## Anatomy

```
┌──────────────────────────────────────────────────────────────────────┐
│  [≡] List of Integration                                     See All → │  ← panel title row, accent link right
├──────────────────────────────────────────────────────────────────────┤
│ ☐  APPLICATION      TYPE          RATE                 PROFIT           │  ← header: 11px UPPERCASE tertiary, sunken bg
├──────────────────────────────────────────────────────────────────────┤
│ ☐  [logo] Stripe    Finance       ▓▓▓▓░░░░░ 40%        $650.00         │  ← 44px row, hairline divider below
│ ☐  [logo] Zapier    CRM           ▓▓▓▓▓▓▓▓░ 80%        $720.50         │
│ ☐  [logo] Shopify   Marketplace   ▓▓░░░░░░░ 20%        $432.25         │
│ ☐  [logo] Zoom      Technology    ▓▓▓▓▓▓░░░ 60%        $650.00         │
└──────────────────────────────────────────────────────────────────────┘
```

Column treatment: headers are `micro` (11px uppercase tertiary). Cell values are 14px body. The app name is `--text-primary` (the row's identity); type/rate/profit support it.

## Implementation

```jsx
function RateBar({ value }) {
  return (
    <div className="flex items-center gap-2">
      {/* WHY the track is --surface-sunken and the fill is --accent (indigo):
          rate is an interactive/quantitative measure tied to the brand accent,
          NOT a chart series — so it uses the accent, not the viz spectrum. */}
      <div className="h-1.5 w-24 overflow-hidden rounded-full" style={{ background: "var(--surface-sunken)" }}>
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: "var(--accent)" }} />
      </div>
      <span className="text-[13px] tabular-nums" style={{ color: "var(--text-secondary)" }}>{value}%</span>
    </div>
  );
}

export function IntegrationTable({ rows }) {
  return (
    <div className="rounded-2xl bg-white p-5" style={{ border: "1px solid var(--border)", boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[14px] font-medium" style={{ color: "var(--text-secondary)" }}>List of Integration</h3>
        {/* WHY "See All" is the accent: links are interactive, so they carry the one accent color. */}
        <a href="#" className="text-[13px] font-medium" style={{ color: "var(--accent)" }}>See All</a>
      </div>

      <table className="w-full border-collapse">
        <thead>
          {/* WHY header row gets the sunken background + uppercase micro labels:
              it reads as a container lip, clearly not a data row. */}
          <tr style={{ background: "var(--surface-sunken)" }}>
            <th className="w-10 rounded-l-lg px-3 py-2.5"></th>
            {["Application", "Type", "Rate", "Profit"].map((h) => (
              <th
                key={h}
                className="px-3 py-2.5 text-left text-[11px] font-medium uppercase tracking-[0.06em]"
                style={{ color: "var(--text-tertiary)" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.name}
              className="transition-colors hover:bg-[var(--surface-sunken)]"
              /* WHY hairline divider, no zebra striping: alternating row colors add a
                 second pattern the eye has to filter. A 1px border is enough. */
              style={{ borderBottom: i < rows.length - 1 ? "1px solid var(--border)" : "none" }}
            >
              <td className="px-3 py-3">
                <input type="checkbox" className="h-4 w-4 rounded accent-[var(--accent)]" />
              </td>
              <td className="px-3 py-3">
                <div className="flex items-center gap-2.5">
                  <img src={r.logo} alt="" className="h-6 w-6 rounded-md" />
                  {/* WHY app name is primary: it's the row's identity, the thing you scan for. */}
                  <span className="text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>{r.name}</span>
                </div>
              </td>
              <td className="px-3 py-3 text-[14px]" style={{ color: "var(--text-secondary)" }}>{r.type}</td>
              <td className="px-3 py-3"><RateBar value={r.rate} /></td>
              <td className="px-3 py-3 text-right text-[14px] font-medium tabular-nums" style={{ color: "var(--text-primary)" }}>
                $ {r.profit.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## Skeleton loading state

Same panel, same header, same 44px rows — placeholders match each column's real width.

```jsx
export function IntegrationTableSkeleton({ rows = 4 }) {
  return (
    <div className="rounded-2xl bg-white p-5" style={{ border: "1px solid var(--border)", boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}>
      <div className="mb-4 flex items-center justify-between">
        <div className="h-3.5 w-32 rounded animate-pulse" style={{ background: "var(--surface-sunken)" }} />
        <div className="h-3 w-12 rounded animate-pulse" style={{ background: "var(--surface-sunken)" }} />
      </div>
      <div className="rounded-lg" style={{ background: "var(--surface-sunken)" }}>
        <div className="h-9" /> {/* header lip */}
      </div>
      <div className="divide-y" style={{ borderColor: "var(--border)" }}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex h-11 items-center gap-3 px-3">
            <div className="h-4 w-4 rounded animate-pulse" style={{ background: "var(--surface-sunken)" }} />
            <div className="h-6 w-6 rounded-md animate-pulse" style={{ background: "var(--surface-sunken)" }} />
            <div className="h-3 w-20 rounded animate-pulse" style={{ background: "var(--surface-sunken)" }} />
            <div className="ml-auto h-1.5 w-24 rounded-full animate-pulse" style={{ background: "var(--surface-sunken)" }} />
            <div className="h-3 w-16 rounded animate-pulse" style={{ background: "var(--surface-sunken)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Empty & error states

```jsx
// EMPTY — never a blank panel
<div className="flex flex-col items-center py-12 text-center">
  <Plug size={24} strokeWidth={1.5} style={{ color: "var(--text-tertiary)" }} />
  <p className="mt-3 text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>No integrations yet</p>
  <p className="mt-1 text-[13px]" style={{ color: "var(--text-secondary)" }}>Connect a tool to start tracking rate and profit.</p>
  <button className="mt-4 rounded-lg px-3 py-2 text-[13px] font-medium text-white" style={{ background: "var(--accent)" }}>
    Add integration
  </button>
</div>

// ERROR — never a silently hidden table
<div className="flex flex-col items-center py-12 text-center">
  <TriangleAlert size={24} strokeWidth={1.5} style={{ color: "var(--negative)" }} />
  <p className="mt-3 text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>Couldn't load integrations</p>
  <button className="mt-4 text-[13px] font-medium" style={{ color: "var(--accent)" }}>Retry</button>
</div>
```

## Common mistakes to avoid

- ❌ **Animating sort or filter.** Reordering and filtering are instant (`--dur-instant`). Animated row reordering hides which rows actually moved.
- ❌ **Zebra striping rows.** Use a 1px `--border` hairline between rows. Alternating fills add a competing visual pattern.
- ❌ **Coloring the rate bar with the viz spectrum (teal/violet).** The rate bar is a quantitative interactive measure → `--accent` indigo. The four-hue spectrum is for chart series only; mixing them implies a category that isn't there.
- ❌ **Proportional figures in the profit column.** Use `tabular-nums` so the right-aligned currency column stays in a clean vertical edge.
- ❌ **Skipping empty and error states.** A table with no rows must show the designed empty state (icon + title + description + CTA); a failed fetch must show the error state with retry — never a blank panel.
- ❌ **Right-aligning text columns or left-aligning numbers.** Numeric columns (Profit) are right-aligned; text columns (Application, Type) are left-aligned, so the eye scans clean edges.
