# Motion Tokens — frosted-obsidian

## Philosophy

Motion in this dashboard exists to reinforce **materiality** — glass panels settle into place, bars grow to their values, active states snap with precision. It does not exist to entertain. A frosted UI that bounces, parallax-scrolls, or animates every filter change feels like a demo, not a tool someone lives in.

Dashboard operations (sort, filter, paginate, tab switch) are **instant**. Perceived quality comes from restrained entrance motion and subtle hover brightening on glass — not from continuous animation.

---

## Timing

| Name | Duration | Use |
|---|---|---|
| `instant` | `0ms` | Table sort, filter toggle, pagination, dropdown selection |
| `fast` | `150ms` | Hover background brighten on glass, icon scale |
| `base` | `250ms` | Panel entrance fade, sidebar active state crossfade |
| `slow` | `400ms` | Bar chart first-render grow, donut stroke draw |

Maximum four named durations. No `1000ms` ease-ins.

---

## Easing

| Name | Curve | Use |
|---|---|---|
| `ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Elements entering view — decelerate into rest |
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Hover state color/opacity changes on glass |
| `linear` | `linear` | Bar height grow only — predictable data read |

No spring/bounce easing. Glass is rigid, not rubber.

---

## What to Animate

| Element | Pattern |
|---|---|
| Main glass shell on route load | `opacity 0→1` + `translateY(8px→0)`, `base` + `ease-out` |
| Inner sections (staggered) | Same fade, `50ms` stagger per section |
| Bar chart bars (first render) | Height `0→value`, `slow`, `linear` |
| Donut ring (first render) | Stroke offset draw, `slow`, `ease-out` |
| Sidebar active indicator | White circle crossfade, `fast` |
| Glass section hover | `background` alpha `+0.04`, `fast` |
| Metric value update | Optional opacity pulse `0.6→1`, `fast` — no slot-machine counters |

---

## What to NEVER Animate

| Element | Why |
|---|---|
| Table column sort | Reads as lag/bug |
| Filter / date range change | Data must feel immediate |
| Pagination | Instant state swap |
| Chart data refresh after filter | Replace data, do not morph bars |
| Scroll-triggered parallax on background scene | Landing-page pattern; forbidden on dashboards |
| `backdrop-filter` blur amount | Expensive and disorienting |
| Gradient border rotation on hover | AI slop — never |
| Continuous pulsing on status pills | Distracting; static color only |
| Layout reflow on sidebar hover | Sidebar width is fixed `64px` |

---

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Respect system preference. Glass opacity transitions may remain; positional animation must not.
