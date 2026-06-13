# aurora-soft — Colors

## The rule before the tokens

Color in this system communicates exactly one of three things: **surface depth**, **interactivity**, or **data meaning** (semantic state or a chart series). If a color does not serve one of those three jobs, it does not belong on the screen.

The hard line that defines this skill: **saturated color is permitted only inside data visualizations.** The frame — canvas, cards, sidebar, borders, text, icons — is neutral. The accent indigo is the single exception in the chrome, reserved strictly for interactivity.

---

## 1. Background surfaces (depth ceiling: 3 levels)

```
--canvas:          #F3F4F7;  /* The app background, behind everything. Cool light grey, NOT white.
                                White cards sit on it and gain edge from the contrast.
                                Never put content directly on the canvas — content lives on a surface. */

--surface:         #FFFFFF;  /* Cards, panels, the sidebar, the topbar. The one surface for all real content.
                                Always flat white. Never tinted, never gradient-filled. */

--surface-sunken:  #F8F9FB;  /* Recessed areas INSIDE a surface: table header rows, input fields,
                                inactive bar-chart tracks, the donut/gauge track, segmented-control wells.
                                Signals "this is a container, not content." */
```

There is no fourth level. Dropdowns, popovers, and modals use `--surface` (#FFFFFF) lifted by the elevation shadow (see motion/spacing), **not** a new background color. Never invent `--bg-deeper` or a tinted card.

---

## 2. Text colors (3 tiers)

```
--text-primary:    #16181F;  /* Near-black, slightly cool. Metric values, page titles, the answer.
                                Highest contrast on screen — reserved for what the user came to read. */

--text-secondary:  #5B6171;  /* Slate grey. Card titles ("Sales Overview"), KPI labels, body copy,
                                active nav label. The supporting layer. */

--text-tertiary:   #9AA1B1;  /* Light grey. Column headers, chart axis labels, captions, helper text,
                                placeholders, sidebar SECTION labels, inactive nav text, "increased" suffix. */
```

Rule: a metric value is always `--text-primary`; its label is always `--text-secondary` or lighter. They are **never** the same color. Tertiary is the floor — nothing readable goes below it.

---

## 3. Accent color — the ONE interactive color

```
--accent:          #5347CE;  /* Indigo. The brand and the only interactive color in the chrome. */
--accent-hover:    #4439B8;  /* One shade darker. Pressed/hover on filled accent controls. */
--accent-soft:     #EDEBFB;  /* Lavender tint. Fill for the ACTIVE nav item and selected rows only. */
--accent-ring:     rgba(83, 71, 206, 0.32); /* Focus ring. 2px, offset from the element. */
```

`--accent` IS used for: the active/focused state of nav items, primary buttons, text links ("See All"), focus rings, the brand mark, selected checkboxes, the filled portion of progress/rate bars.

`--accent` is NEVER used for: card backgrounds, section headers, body text, icon default color, decorative fills, borders on neutral elements, or as a chart series color outside the defined viz spectrum. It does not appear "for variety." There is no second interactive color.

---

## 4. Data-visualization spectrum (charts ONLY)

These four hues exist **only inside charts** — funnel segments, stacked bars, the focal bar, donut/gauge arcs, category legends. They never touch a button, a label, a border, or a background.

```
--viz-1:  #5347CE;  /* Indigo  — series 1 / primary category */
--viz-2:  #887CFD;  /* Violet  — series 2 */
--viz-3:  #4896FE;  /* Blue    — series 3 */
--viz-4:  #16C8C7;  /* Teal    — series 4 */
```

Gradients are built by adjacent stops, applied as a fill:
```
--grad-cool:  linear-gradient(180deg, #4896FE 0%, #16C8C7 100%);  /* blue → teal, e.g. funnel segment */
--grad-warm:  linear-gradient(180deg, #887CFD 0%, #5347CE 100%);  /* violet → indigo, e.g. focal bar */
```

Rules for the spectrum:
- Assign hues by **series order**, deterministically (series 0 → viz-1, series 1 → viz-2 …). Never random, never re-colored per render.
- Non-focal bars/segments fall back to `--surface-sunken` (#F8F9FB) so the gradient-filled element reads as the focus.
- Never use the Recharts/Chart.js default palette. Never introduce a 5th chart hue — recycle the four with reduced opacity if more series are needed.

---

## 5. Semantic state colors

Each semantic color appears **only** for its designated meaning. Green is never decorative; rose is never a "delete" accent applied to neutral UI.

```
--positive:        #15A66A;  /* Emerald. Up-trend text + arrow glyph. ONLY for positive change. */
--positive-soft:   #E4F6ED;  /* Pill background behind a positive delta. */

--negative:        #E5484D;  /* Rose. Down-trend text + arrow glyph. ONLY for negative change. */
--negative-soft:   #FCEAEA;  /* Pill background behind a negative delta. */

--warning:         #E0962B;  /* Amber. Caution states / approaching-limit only. [INFER: not in screenshots;
                                chosen to harmonize with the spectrum without overlapping accent indigo.] */
--warning-soft:    #FBF0DD;  /* Pill background behind a warning. */

--neutral:         #9AA1B1;  /* Falls back to --text-tertiary. Used for "no change" / 0% deltas. */
```

Delta values always render as a tinted **pill** (soft background + colored text + arrow glyph), never as bare colored text floating next to the metric. Green and rose are never used for chart series — semantic and categorical color are kept separate so a green bar never implies "good."

---

## 6. Borders & dividers

```
--border:          #ECEEF2;  /* Hairline. Card edges, table row dividers, sidebar separator, input rest border.
                                The default way to separate two white surfaces. */
--border-strong:   #D4D7E0;  /* Slightly darker. Input hover/focus border, segmented-control outline.
                                [INFER: derived one step down from --border.] */
```

When to use a border vs. depth alone: between two `--surface` (white) elements, always use a 1px `--border` hairline. Between a surface and the `--canvas`, the contrast alone defines the edge but a 1px `--border` is still applied to cards for crispness. Never use the accent indigo as a border on a neutral element. Never use a 2px+ heavy border anywhere.
