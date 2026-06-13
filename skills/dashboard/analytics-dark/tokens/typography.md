# Typography Tokens — analytics-dark

## The Two-Font System

```
Geist Mono  → All numeric metric values
Inter       → All UI text (labels, nav, buttons, table cells, body copy)
```

**Why Geist Mono for numbers:** Monospaced digits (tabular figures) prevent layout shift
when values update live. In a dashboard refreshing every 30 seconds, a proportional font
will cause metric cards to shift width as numbers change. Geist Mono eliminates this.
It also signals "precision" — this number has been measured, not estimated.

**Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
```

---

## Scale

### Metric Values (Geist Mono)

```css
/* Hero metric — the one number on a KPI card */
--metric-hero:    font-size: 48px; font-weight: 600; letter-spacing: -0.02em; line-height: 1;

/* Large metric — secondary KPI, chart callout */
--metric-large:   font-size: 32px; font-weight: 600; letter-spacing: -0.02em; line-height: 1;

/* Medium metric — table cell value, badge count */
--metric-medium:  font-size: 20px; font-weight: 500; letter-spacing: -0.01em; line-height: 1.2;

/* Small metric — inline value, delta number */
--metric-small:   font-size: 14px; font-weight: 500; letter-spacing: 0;        line-height: 1.4;
```

### UI Text (Inter)

```css
/* Page title */
--text-xl:     font-size: 24px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.2;

/* Section heading */
--text-lg:     font-size: 16px; font-weight: 600; letter-spacing: -0.01em; line-height: 1.4;

/* Card label / column header */
--text-sm:     font-size: 12px; font-weight: 500; letter-spacing: 0.02em;  line-height: 1.4;
              /* Note: 0.02em tracking on small labels improves readability */

/* Body / table cell / helper text */
--text-base:   font-size: 14px; font-weight: 400; letter-spacing: 0;        line-height: 1.5;

/* Caption / metadata / timestamp */
--text-xs:     font-size: 11px; font-weight: 400; letter-spacing: 0.01em;  line-height: 1.4;
```

---

## The 4:1 Hierarchy Rule

The most important number on a KPI card must be visually dominant by a ratio of at
least 4:1 compared to its label. This is not aesthetic preference — it is readability:
a user scanning 8 KPI cards needs to read the numbers first, labels second.

```
✅ CORRECT:
  MRR                    ← 12px, --text-secondary, Inter
  $124,300               ← 48px, --text-primary, Geist Mono
  ↑ 12.4% vs last month  ← 13px, --positive, Inter

❌ WRONG:
  Monthly Recurring Revenue  ← 16px, --text-primary
  $124,300                   ← 24px, --text-primary
  +12.4%                     ← 14px, --text-primary
```

The wrong version has three elements competing for equal attention. The eye has nowhere
to go. The correct version creates an immediate visual hierarchy.

---

## Number Formatting Rules

These are design decisions, not just code decisions:

- **Large numbers**: Always abbreviated above 1,000. `1,247` not `$1,247`. `$124K` not `$124,000` in cards.
  Show full number on hover tooltip.
- **Percentages**: Always include the `%` sign. Never `12.4` alone — always `12.4%`.
- **Currency**: Currency symbol is `--text-tertiary` at 70% of the number size. `$` is decorative.
- **Decimals**: Maximum 1 decimal place in card metrics. Maximum 2 in tables. Never more.
- **Zero state**: Show `—` (em dash), not `0` or `$0.00` for absent/empty data.
- **Negative values**: Prefixed with `−` (minus sign, not hyphen) and colored `--negative`.

---

## What You Must Never Do

- Never use the same font weight for a metric and its label in the same card
- Never apply Inter to metric numbers — Geist Mono only
- Never use `font-weight: 700` (bold) — use `600` (semibold) as the maximum
- Never use `font-size` below `11px` — illegible at any screen density
- Never omit `letter-spacing: -0.02em` on sizes 32px and above — headings look tighter with it
- Never use uppercase/all-caps labels — `font-size: 12px` + `letter-spacing: 0.02em` achieves the same
  readability without the visual aggression
