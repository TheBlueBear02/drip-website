# aurora-soft — Motion

## The philosophy

Motion exists to help the user track change — a value arriving, a state switching, a chart drawing itself the first time. It is feedback, not decoration. Because the surface is bright and calm, motion must stay subtle: a fast fade, a short rise, a gradient sweeping into a bar. Anything that loops, pulses, or draws attention to itself works against the principle that *the data leads, the chrome recedes*.

If an animation does not answer "what changed?" it does not ship.

---

## Timing

Five named durations, capped at 320ms. Nothing in this UI animates longer than that.

```
--dur-instant:  0ms;     /* State that must feel immediate: nav switch, sort, filter, tab change. */
--dur-fast:     120ms;   /* Hover fills, button press, checkbox, focus ring. */
--dur-base:     200ms;   /* Card entrance, dropdown open, pill appearance. */
--dur-slow:     320ms;   /* First-render chart draw, count-up, donut/gauge sweep. */
```

## Easing

```
--ease-standard:  cubic-bezier(0.4, 0, 0.2, 1);    /* Default for fills, opacity, color. */
--ease-out:       cubic-bezier(0.16, 1, 0.3, 1);   /* Entrances: card rise, chart draw. Decelerates into place. */
```

There is no bouncy/overshoot easing. The design is friendly but precise — springs and `back` curves read as toy-like here.

---

## What to animate

- **Card entrance:** fade in + rise 8px, `--dur-base` / `--ease-out`, staggered 40ms per card across a row. Runs once on mount.
- **Chart first render:** bars grow from baseline, donut/gauge arc sweeps, funnel segments fade up — `--dur-slow` / `--ease-out`. Once, on first data load only.
- **Metric count-up:** KPI values count from 0 to final on first mount, `--dur-slow`. Tabular-nums prevents width jitter during the count.
- **Focal-bar gradient:** when a bar becomes the focus (hover or selection), its fill transitions from `--surface-sunken` to the gradient over `--dur-fast`.
- **Hover/press feedback:** background-fill and color shifts on nav items, buttons, table rows, checkboxes — `--dur-fast`.
- **Dropdown / popover:** fade + 4px rise, `--dur-base`.
- **Focus ring:** appears `--dur-fast`, no animation on the ring itself.

---

## What to NEVER animate

- ❌ **Table sorts** — instant (`--dur-instant`). Rows reorder immediately; animating a sort hides which rows moved.
- ❌ **Filter changes** — instant. The dataset swaps without a transition.
- ❌ **Pagination / page changes** — instant.
- ❌ **Sidebar nav switching** — the active state moves instantly; the page content does not slide or cross-fade.
- ❌ **Number updates after first render** — live KPI updates snap to the new value (tabular-nums holds the width). Only the *first* mount counts up.
- ❌ **Gradient borders, animated/shifting gradients, glow pulses** — the gradients are static fills inside charts and never move.
- ❌ **Looping or infinite animations** of any kind (no shimmer that never stops, no breathing cards). The only "shimmer" allowed is the skeleton loader, which stops when data arrives.
- ❌ **Hover-scale / lift transforms on cards** — cards do not grow or jump on hover; this is a data surface, not a marketing grid.

## Reduced motion

Honor `prefers-reduced-motion: reduce`: skip all entrance, count-up, and chart-draw animations; render final state immediately. Hover/focus feedback may remain (it is functional, not decorative).
