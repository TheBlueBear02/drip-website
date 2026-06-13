# aurora-soft — Setup

How to install dependencies and wire the design system into a React project.

## 1. Dependencies

```bash
npm install recharts framer-motion lucide-react
```

- **recharts** — charts (funnel/stacked bars, the focal-bar bar chart, donut/gauge). Defaults are always overridden (see SKILL.md Rule 5).
- **framer-motion** — entrance and count-up animations only (see `tokens/motion.md`).
- **lucide-react** — the icon set. Stroke icons at `strokeWidth={1.5}`.

Tailwind CSS is assumed. If not present:

```bash
npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p
```

## 2. Fonts — SF Pro Display

SF Pro is system-native on Apple platforms; load the webfont so non-Apple users (Windows/Android) get the same face. Add to your document head, or self-host the woff2 files and `@font-face` them:

```html
<!-- Apple's SF Pro is licensed for Apple platforms; for the web, self-host SF Pro Display
     woff2 from your licensed copy, or substitute a near-match like "Inter Tight" / "General Sans"
     ONLY as a fallback. The token chain degrades gracefully to the OS UI font. -->
<style>
  @font-face {
    font-family: "SF Pro Display";
    src: url("/fonts/SF-Pro-Display-Regular.woff2") format("woff2");
    font-weight: 400; font-display: swap;
  }
  /* repeat @font-face for 500, 600, 700 */
</style>
```

## 3. Design tokens

Drop the token values into your global CSS as variables. These mirror `tokens/colors.md`, `spacing.md`, `motion.md`.

```css
:root {
  /* surfaces */
  --canvas: #F3F4F7;
  --surface: #FFFFFF;
  --surface-sunken: #F8F9FB;

  /* text */
  --text-primary: #16181F;
  --text-secondary: #5B6171;
  --text-tertiary: #9AA1B1;

  /* accent (interactive only) */
  --accent: #5347CE;
  --accent-hover: #4439B8;
  --accent-soft: #EDEBFB;
  --accent-ring: rgba(83, 71, 206, 0.32);

  /* data-viz spectrum (charts only) */
  --viz-1: #5347CE; --viz-2: #887CFD; --viz-3: #4896FE; --viz-4: #16C8C7;
  --grad-cool: linear-gradient(180deg, #4896FE 0%, #16C8C7 100%);
  --grad-warm: linear-gradient(180deg, #887CFD 0%, #5347CE 100%);

  /* semantic */
  --positive: #15A66A; --positive-soft: #E4F6ED;
  --negative: #E5484D; --negative-soft: #FCEAEA;
  --warning:  #E0962B; --warning-soft:  #FBF0DD;

  /* borders */
  --border: #ECEEF2;
  --border-strong: #D4D7E0;

  /* motion */
  --dur-instant: 0ms; --dur-fast: 120ms; --dur-base: 200ms; --dur-slow: 320ms;
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}

html, body { background: var(--canvas); color: var(--text-primary);
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", sans-serif; }

/* tabular figures everywhere a number can change */
.tabular-nums, [data-numeric] { font-variant-numeric: tabular-nums; }
```

Optionally expose the same values to Tailwind via `tailwind.config.js → theme.extend.colors` so utilities like `bg-surface` and `text-text-secondary` work.

## 4. Recharts defaults — override on every chart

Recharts ships its own palette, tooltip, and gridlines. None of them belong in this skill. The minimum override per chart:

```jsx
// gradient defs — reuse the spectrum, never Recharts auto-colors
<defs>
  <linearGradient id="grad-warm" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stopColor="#887CFD" /><stop offset="100%" stopColor="#5347CE" />
  </linearGradient>
</defs>

<CartesianGrid horizontal vertical={false} stroke="var(--border)" />  {/* horizontal only, never vertical */}
<XAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--text-tertiary)" }} />
<YAxis hide />  {/* the custom tooltip carries exact values; the axis adds clutter */}
<Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--surface-sunken)" }} />
<Bar dataKey="v" radius={[6, 6, 6, 6]} />  {/* focal bar = url(#grad-warm); others = var(--surface-sunken) */}
```

The custom tooltip is a white `--surface` card, 12px radius, 1px `--border`, 8px padding, with a label in `--text-tertiary` and the value in `--text-primary` tabular-nums.

## 5. Page scaffold

```jsx
<div className="flex min-h-screen" style={{ background: "var(--canvas)" }}>
  <Sidebar />
  <div className="flex-1">
    <Topbar />
    <main className="space-y-6 p-6 xl:p-8">
      <h1 className="text-[20px] font-semibold" style={{ color: "var(--text-primary)" }}>Dashboard</h1>
      <section className="grid grid-cols-3 gap-4">{/* 3 KPI cards */}</section>
      <section className="grid grid-cols-12 gap-4">{/* 7 / 5 split: main chart + side chart */}</section>
      <section className="grid grid-cols-12 gap-4">{/* 5 / 7 split: distribution + table */}</section>
    </main>
  </div>
</div>
```

## 6. Verify

Before shipping, confirm against `SKILL.md`: no colored card/page backgrounds, indigo is the only chrome accent, charts use the four-hue spectrum (not Recharts defaults), every data component has skeleton + empty + error states, and no emojis anywhere in the UI.
