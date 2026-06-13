# Spacing Tokens — frosted-obsidian

## Base Unit

**4px.** All spacing values are multiples of 4. No arbitrary values (`13px`, `22px`).

---

## Density Gradient (3 tiers)

### Tier 1 — Generous (hero / shell)
**24–32px** — signals primary real estate.

| Element | Value |
|---|---|
| Main glass shell padding | `32px` |
| Gap between major columns | `24px` |
| Section header to chart body | `24px` |
| Metric stack card internal padding | `24px` |

### Tier 2 — Standard (sections)
**16–20px** — default card and component rhythm.

| Element | Value |
|---|---|
| Inner glass section padding | `20px` |
| Gap between stacked metric cards | `16px` |
| Chart plot area top margin | `16px` |
| Legend item gap | `16px` |
| Sidebar icon vertical gap | `20px` |

### Tier 3 — Compact (data-dense)
**8–12px** — lists, bars, calendar cells.

| Element | Value |
|---|---|
| Challenge list row gap | `12px` |
| Bar chart inter-bar gap | `12px` |
| Status pill internal padding | `8px 12px` |
| Calendar day cell gap | `8px` |
| Icon to label in metric card | `12px` |

**Rule:** More important = more air. The glass shell breathes; list rows tighten.

---

## Layout Structure (exact pixels)

| Container | Value | Notes |
|---|---|---|
| Floating sidebar width | `64px` | Pill shape, detached from main shell |
| Sidebar offset from viewport edge | `24px` | Floats independently |
| Main glass shell max-width | `1200px` | Centered or offset right of sidebar |
| Main shell border-radius | `32px` | Largest radius in system |
| Inner section border-radius | `20px` | Charts, lists, metric stacks |
| Small element radius | `16px` | Icon containers, dropdowns |
| Status pill radius | `9999px` | Full pill |
| Active nav circle | `40px` | Perfect circle behind icon |
| Icon container (metric card) | `44px` circle | Left of value stack |

---

## Grid Systems

**Primary dashboard (3 columns inside glass shell):**

```
|  wide (7/12)     | narrow (2/12) | medium (3/12) |
|  activity chart  | metric stack  | overview donut|
|  challenge list  |               | calendar strip|
|                  |               | output summary|
```

- Column gap: `24px`
- Stack gap within column: `20px`
- On `< 1024px`: collapse to single column, sidebar remains fixed pill

**Metric stack column:** three equal-height glass section cards, `16px` vertical gap.

---

## Forbidden Spacing Decisions

- **Uniform 16px everywhere** — shell must be looser than list rows
- **Tight padding on main shell** — below `24px` kills the floating premium feel
- **Sidebar flush to screen edge with no offset** — sidebar must float with `24px` inset
- **Sharp 0px radius on any container** — minimum `16px` on interactive surfaces
