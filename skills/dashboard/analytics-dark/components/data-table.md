# Component: Data Table

## Purpose

The data table is where precision lives. KPI cards show magnitude. Charts show trends.
The table shows the exact numbers for every row. It is the most dense component in the
dashboard and must be legible at high density without visual clutter.

---

## Anatomy

```
┌──────────────────────────────────────────────────────────────┐
│  Customers                      [Search ____]  [Filter ▾]   │ ← Table header
├─────────┬──────────┬──────────┬──────────┬───────────────────┤
│  NAME ↑ │  PLAN    │  MRR     │  STATUS  │  JOINED           │ ← Column headers
├─────────┼──────────┼──────────┼──────────┼───────────────────┤
│  Acme   │  Pro     │  $299    │  ● Active│  Jan 12, 2026     │ ← Row: hover bg
│  Beta   │  Starter │  $49     │  ● Active│  Mar 8, 2026      │
│  Gamma  │  Pro     │  $299    │  ◌ Paused│  Nov 3, 2025      │
│  Delta  │  Enterprise│ $2,400 │  ● Active│  Sep 1, 2025      │
└─────────┴──────────┴──────────┴──────────┴───────────────────┘
│  Showing 4 of 248 customers                    ← →            │ ← Pagination
└──────────────────────────────────────────────────────────────┘
```

---

## Implementation

```jsx
function DataTable({ columns, rows, title, searchable, filterable }) {
  return (
    <div className="bg-[#111113] border border-[#27272A] rounded-xl overflow-hidden">

      {/* Table header (outside the scroll area) */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1F1F23]">
        <h3 className="text-[14px] font-semibold text-[#F4F4F5]">{title}</h3>
        <div className="flex items-center gap-2">
          {searchable && <SearchInput />}
          {filterable && <FilterButton />}
        </div>
      </div>

      {/* Scrollable table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1F1F23]">
              {columns.map(col => (
                <th key={col.key} className="
                  px-4 py-3
                  text-left
                  text-[11px] font-medium
                  text-[#52525B]           /* --text-tertiary: column headers are faint */
                  tracking-[0.08em] uppercase
                  whitespace-nowrap
                  cursor-pointer
                  hover:text-[#A1A1AA]
                  select-none
                ">
                  {col.label}
                  {col.sortable && <SortIcon direction={col.sortDirection} />}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.id}
                className="
                  border-b border-[#1F1F23] last:border-b-0
                  hover:bg-[#1A1A1F]
                  transition-colors duration-100
                  cursor-pointer
                "
              >
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3 whitespace-nowrap">
                    {renderCell(row[col.key], col.type)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-[#1F1F23]">
        <span className="text-[12px] text-[#52525B]">
          Showing {rows.length} of {total}
        </span>
        <div className="flex items-center gap-1">
          <PaginationButton direction="prev" />
          <PaginationButton direction="next" />
        </div>
      </div>
    </div>
  );
}
```

## Cell Renderers

```jsx
function renderCell(value, type) {
  switch (type) {
    case 'text':
      return (
        <span className="text-[13px] text-[#F4F4F5]">{value}</span>
      );

    case 'currency':
      return (
        <span className="text-[13px] font-medium font-['Geist_Mono'] text-[#F4F4F5]">
          {formatCurrency(value)}
        </span>
      );

    case 'status':
      // WHY: Status badge uses semantic color with --subtle background.
      // A full solid-color badge is too heavy for a dense table.
      const statusConfig = {
        active:   { color: '#10B981', bg: 'rgba(16,185,129,0.10)', label: 'Active' },
        paused:   { color: '#F59E0B', bg: 'rgba(245,158,11,0.10)',  label: 'Paused' },
        churned:  { color: '#F43F5E', bg: 'rgba(244,63,94,0.10)',   label: 'Churned' },
        trial:    { color: '#A1A1AA', bg: 'rgba(161,161,170,0.10)', label: 'Trial' },
      };
      const s = statusConfig[value];
      return (
        <span
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium"
          style={{ color: s.color, background: s.bg }}
        >
          <span className="w-1 h-1 rounded-full" style={{ background: s.color }} />
          {s.label}
        </span>
      );

    case 'date':
      return (
        <span className="text-[13px] text-[#A1A1AA] font-['Geist_Mono']">
          {formatDate(value)}
        </span>
      );

    case 'delta':
      const isPositive = value > 0;
      const isNegative = value < 0;
      return (
        <span className={`
          text-[13px] font-medium font-['Geist_Mono'] flex items-center gap-1
          ${isPositive ? 'text-[#10B981]' : ''}
          ${isNegative ? 'text-[#F43F5E]' : ''}
          ${!isPositive && !isNegative ? 'text-[#A1A1AA]' : ''}
        `}>
          {isPositive ? '↑' : isNegative ? '↓' : '—'}
          {Math.abs(value).toFixed(1)}%
        </span>
      );

    case 'avatar-text':
      // Name cell with avatar initials
      return (
        <div className="flex items-center gap-2.5">
          <div className="
            w-7 h-7 rounded-full
            bg-[#1A1A1F] border border-[#27272A]
            flex items-center justify-center
            text-[11px] font-semibold text-[#A1A1AA]
            shrink-0
          ">
            {getInitials(value)}
          </div>
          <span className="text-[13px] text-[#F4F4F5]">{value}</span>
        </div>
      );
  }
}
```

---

## Table Rules

- **Column headers: `--text-tertiary` (`#52525B`), 11px, uppercase, wide tracking.** They should recede.
- **Cell text: `--text-primary` for values, `--text-secondary` for metadata (dates, IDs).**
- **Numeric cells: Geist Mono.** Monospace alignment in tables is critical when values vary in digit count.
- **Row dividers: `border-[#1F1F23]` (--border-subtle).** Barely visible — table relies on row hover for separation.
- **Hover state: `bg-[#1A1A1F]`.** One step up from the surface. Subtle.
- **No zebra striping.** Alternating row colors add visual noise without adding information.
- **Status badges: small, muted background, colored text + dot.** Never solid colored badges in dense tables.
- **Sort arrows: show only the active sort direction.** Showing arrows on all columns is clutter.
- **Pagination text: `--text-tertiary`.** Informational, not navigational. The buttons are the navigation.
