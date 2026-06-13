# Color Tokens — frosted-obsidian

## The Rule Before the Tokens

Color communicates exactly one of four things in this system: **surface depth** (how close glass is to the viewer), **interactivity** (what can be tapped or is selected), **semantic state** (progress, success, warning), or **data category** (chart segment identity). If a color does not serve one of these four roles, it does not belong. Decorative gradients, tinted card backgrounds, and rainbow accents are forbidden.

---

## Background Surfaces (4 layers — glass depth system)

| Token | Value | Rule |
|---|---|---|
| `--bg-scene` | Full-bleed photograph or cool dark gradient (`#0F1B2D` → `#1A2744`) | The only opaque layer. Sits behind all UI. Never place text directly on `--bg-scene` without a glass panel. |
| `--bg-glass-shell` | `rgba(255, 255, 255, 0.08)` + `backdrop-filter: blur(40px)` | Main dashboard panel only. Largest rounded rectangle. Always has `--border-glass-rim`. Never used for inner cards. |
| `--bg-glass-section` | `rgba(0, 0, 0, 0.35)` + `backdrop-filter: blur(24px)` | Inner section cards (charts, lists, metric stacks). Darker tint than shell — reads as inset glass. Never fully opaque. |
| `--bg-glass-elevated` | `rgba(255, 255, 255, 0.12)` + `backdrop-filter: blur(32px)` | Dropdowns, tooltips, hover lift on interactive glass. Never a solid `#1F1F1F`. |

**Ceiling:** Four depth layers only. Never invent a fifth. Never replace glass with solid `#111` or `#1A1A1A` cards.

---

## Text Colors

| Token | Value | Rule |
|---|---|---|
| `--text-primary` | `#FFFFFF` | Page titles, hero metrics, active nav icons on white pill, selected calendar date on white pill. Never for labels or metadata. |
| `--text-secondary` | `#A0A0A0` | Metric labels, chart axis labels, list descriptions, inactive nav icons. Never for primary data values. |
| `--text-tertiary` | `#6B7280` | Timestamps, disabled text, placeholder copy, legend footnotes. Never for anything the user must read at a glance. |
| `--text-on-active` | `#1A1A2E` | Text/icons sitting on solid white active circles only. Never on glass backgrounds. |

**Forbidden:** Pure black `#000000` for any UI text. Black-on-glass fails contrast and breaks the aesthetic.

---

## Accent Color (Interactive — white, not blue)

| Token | Value | Rule |
|---|---|---|
| `--accent-interactive` | `#FFFFFF` | Active sidebar icon background, selected calendar day circle, primary toggle "on" state. Solid fill circles/pills only. |
| `--accent-interactive-hover` | `rgba(255, 255, 255, 0.85)` | Hover on white interactive fills. Never used as text color. |

**Accent is NEVER used for:**
- Card or section backgrounds
- Chart bar fills (use data palette)
- Status pills (use semantic colors)
- Body text or headings
- Gradient endpoints
- Link text on glass (links use `--text-primary` + underline on hover)

This skill deliberately avoids the AI-default blue primary button. Interaction reads as a white specular highlight on glass.

---

## Semantic State Colors (meaning only)

| Token | Value | Meaning | Rule |
|---|---|---|---|
| `--state-success` | `#4ADE80` | Complete, achieved, healthy | Status pill text/background, check icons. ONLY for success/completion. |
| `--state-progress` | `#FACC15` | Ongoing, in-progress, calories-burn emphasis | "On Going" pills, active challenge emphasis. ONLY for in-progress states. |
| `--state-neutral` | `#6B7280` | Inactive, paused, carbs/neutral category | Inactive chart segments, neutral badges. ONLY when no positive/negative/progress applies. |

**Semantic colors appear ONLY for their designated meaning.** Never use green decoratively on a card header. Never use yellow as a page background tint.

---

## Data Visualization Palette (charts only — separate from interactive accent)

| Token | Value | Use |
|---|---|---|
| `--data-yellow` | `#FACC15` | Primary bar emphasis, donut segment, calories series |
| `--data-blue` | `#60A5FA` | Secondary series, protein/category segment |
| `--data-green` | `#4ADE80` | Tertiary series, completion share |
| `--data-grey` | `rgba(255, 255, 255, 0.15)` | Inactive bars, background ring, de-emphasized series |

Chart colors are **never** reused for buttons, nav, or card backgrounds. Recharts defaults are always overridden with this palette.

---

## Border / Divider / Rim

| Token | Value | Rule |
|---|---|---|
| `--border-glass-rim` | `1px solid rgba(255, 255, 255, 0.18)` | Outer edge of main glass shell and floating sidebar pill. Catches light. Not used between inner sections. |
| `--border-glass-subtle` | `1px solid rgba(255, 255, 255, 0.08)` | Optional on elevated dropdowns only. Never between every card in a grid. |

**Prefer background tint contrast over borders.** Inner sections separate by `--bg-glass-section` vs shell tint, not divider lines.

---

## Shadows

| Token | Value | Rule |
|---|---|---|
| `--shadow-shell` | `0 24px 80px rgba(0, 0, 0, 0.45)` | Main glass panel only — floats above scene. |
| `--shadow-none` | `none` | Inner section cards, metric cards, chart containers. **Default for all inner elements.** |

Inner cards with `box-shadow` are an AI tell. Blur and tint define edges.
