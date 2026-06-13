# Typography Tokens — frosted-obsidian

## Font Choices

| Role | Font | Why |
|---|---|---|
| UI & headings | **Plus Jakarta Sans** | Geometric sans with slightly rounded terminals — matches frosted, friendly-premium glass UIs. More character than Inter without becoming decorative. |
| Metrics & fractions | **Plus Jakarta Sans** (tabular nums) | Same family keeps glass UI cohesive. `font-variant-numeric: tabular-nums` prevents layout shift. No separate mono — numbers stay humanist, not terminal. |

**Why not Inter:** Inter is the AI default for every dark dashboard. Plus Jakarta Sans shares readability at 12px but avoids the "generated SaaS" silhouette.

**Why not a monospace for metrics:** This aesthetic pairs large rounded numerals with inline unit suffixes (`bpm`, `km`, `l`). Monospace would clash with the soft glass geometry.

---

## Type Scale

| Name | Size | Weight | Color | Use |
|---|---|---|---|---|
| `display-title` | 28px | 600 | `--text-primary` | Dashboard page title inside glass shell |
| `metric-hero` | 36px | 600 | `--text-primary` | Primary stat values (heart rate, distance) |
| `metric-inline-unit` | 18px | 400 | `--text-secondary` | Units immediately after hero number on same line |
| `section-title` | 16px | 600 | `--text-primary` | Chart/list section headers |
| `body` | 14px | 400 | `--text-secondary` | Challenge descriptions, legend labels |
| `label` | 12px | 500 | `--text-secondary` | Metric labels below values, axis day labels |
| `caption` | 11px | 400 | `--text-tertiary` | Date ranges, dropdown hints, metadata |

---

## Hierarchy Rule: 3:1 (enforced)

**Hero metric at 3× the label size.** `metric-hero` (36px) vs `label` (12px) = 3:1.

If the metric and its label feel equally scannable, the hierarchy is wrong. The number dominates; the label is context. Section titles (16px) sit between metric and label — they organize, they do not compete with metrics.

---

## Formatting Rules

**Numbers**
- Primary metrics: no unnecessary decimals (`108` not `108.00`)
- Percentages in charts: whole numbers inside bars (`75%`), one decimal in legends if showing delta (`+1.27%`)
- Progress fractions: comma-separated thousands (`12,540/15,000`)
- Units: always inline after the number, smaller size, secondary color — `108` + `bpm` not a second line

**Zero states**
- Display `0` with unit, never em dash alone
- Empty chart: centered `caption` text, not a blank canvas

**Labels**
- Sentence case for section titles and challenge text — **never uppercase headings**
- Day-of-week chart labels: three-letter abbreviations (`Mon`, `Tue`)

**Tracking**
- `display-title`: `-0.02em` letter-spacing
- `label` at 12px: `0.01em` — never `tracking-widest`

---

## Forbidden Typography Choices

- **Inter as the default font** — use Plus Jakarta Sans
- **Geist Mono / JetBrains Mono for metrics** — wrong personality for glass UI
- **Equal weight on metric and label** — metric is 600, label is 500 at half the size
- **Bold 700+ anywhere** — maximum weight is 600; heavier reads harsh on translucent surfaces
- **Uppercase section headings** — this design uses sentence case; uppercase is an AI dashboard tell
- **Black `#000` text** — use `--text-on-active` on white pills only
- **Stacked unit on a separate line** — units stay inline immediately after the value
