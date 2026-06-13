# Motion Tokens — analytics-dark

## Philosophy: Motion Serves Data, Not Delight

Dashboard animations exist for one reason: to help users track change. A number
updating, a chart loading, a row being added — these transitions help the eye
follow what changed. Animations that exist purely for "feel" have no place here.

---

## Timing

```css
--duration-instant:  100ms;   /* Hover state color changes. Feels immediate. */
--duration-fast:     150ms;   /* Button presses, toggle switches. */
--duration-base:     200ms;   /* Most transitions. The default. */
--duration-slow:     300ms;   /* Modal open/close, panel expand. */
--duration-chart:    400ms;   /* Chart initial render animation. */
```

**Rule:** Nothing in a dashboard should take more than 400ms to animate. Longer
animations feel broken. If it takes 500ms for a chart to load, that is a loading
state problem, not an animation opportunity.

---

## Easing

```css
--ease-default:   cubic-bezier(0.16, 1, 0.3, 1);   /* Expo-out. All enters and reveals. */
--ease-in-out:    cubic-bezier(0.4, 0, 0.2, 1);    /* Panel slides, drawer open/close. */
--ease-linear:    linear;                           /* Number counters ONLY. */
```

**Expo-out rule:** Use `--ease-default` for anything entering or appearing. It starts
fast and decelerates — exactly like a physical object placed on a surface. It is
confident, not bouncy.

**Never use:** spring physics, bounce easing, or elastic easing. Those communicate
playfulness. This dashboard communicates precision.

---

## Specific Animation Patterns

### Number Counter (when a metric value updates)
```jsx
// Animate from old value to new value over 800ms with linear easing.
// 800ms is slow enough to be readable, fast enough to feel responsive.
// Never animate decimals — only whole numbers or round to 0 decimal places during animation.
const CountUp = ({ from, to, duration = 800 }) => {
  // Use requestAnimationFrame with linear interpolation
  // Display final value immediately on completion, never leave intermediate state
}
```

### KPI Card Load (on initial page render)
```css
/* Stagger cards: 0ms, 50ms, 100ms, 150ms delays */
/* Each card fades in with translateY(-4px) → translateY(0) */
/* Duration: 200ms, ease: expo-out */
/* Never stagger more than 200ms total between first and last card */
animation: fadeSlideIn 200ms var(--ease-default) forwards;

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### Chart Line Draw (Recharts)
```jsx
// Use Recharts built-in animationDuration={400} animationEasing="ease-out"
// Apply to LineChart, BarChart, AreaChart
// Turn OFF animation on subsequent data updates (only animate on initial render)
```

### Row Highlight (when a table row updates)
```css
/* Flash the row background to --accent-subtle for 600ms, then fade back */
/* This is the only way to communicate "this row changed" without visual noise */
@keyframes rowFlash {
  0%   { background: rgba(59, 130, 246, 0.08); }
  100% { background: transparent; }
}
animation: rowFlash 600ms ease-out;
```

### Skeleton Loading
```css
/* Pulse opacity between 0.4 and 0.7 — NOT a shimmer gradient */
/* Shimmer gradients look decorative. Opacity pulse looks like a system state. */
@keyframes skeletonPulse {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 0.7; }
}
animation: skeletonPulse 1.5s ease-in-out infinite;
```

---

## What to Animate

✅ DO animate:
- Metric values counting up/down on update
- Cards fading in on initial page load (staggered, max 200ms total)
- Chart initial render
- Row update flash
- Hover state transitions (background color, border color)
- Modal/panel open-close
- Sidebar collapse/expand

❌ NEVER animate:
- Page transitions / route changes
- Table sort (instant, no animation)
- Filter application (instant)
- Scrolling (browser native, never intercept)
- Loading spinners that rotate indefinitely (use skeleton placeholders instead)
- Parallax or scroll-triggered effects
