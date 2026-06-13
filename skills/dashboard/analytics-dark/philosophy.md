# analytics-dark — Design Philosophy

## The Core Principle: Data Is the Hero

A dashboard exists to help a person make a decision faster than they could without it.
Every visual element either helps that person read data faster, or it is noise.
There is no third option.

This is not a landing page. There are no gradients to create mood. No animations to
create delight. No decorative borders to create "polish." Every pixel in this design
system earns its place by serving the data or the person reading it.

---

## The Three Enemies of Good Dashboard Design

### 1. Equal Visual Weight
When everything looks equally important, nothing is. Most AI-generated dashboards
give cards, labels, numbers, and charts the same visual weight. The eye has nowhere
to go. The designer's job is to create a hierarchy so clear that the user's eye moves
from most important → supporting context → detail, in that exact order, every time.

**The fix:** 4:1 metric-to-label size ratio. Accent color reserved for one purpose only.
Background depth that naturally separates primary from secondary from tertiary.

### 2. Decorative Color
AI tools default to blue-purple gradients and rainbow chart palettes because those
are the most common patterns in training data. They look "designed" without being
designed for anything. Color in a dashboard means something — or it means nothing and
should be removed.

**The fix:** One accent color, used only for interactive elements. Positive, negative,
and warning states each get one color, used only for those states. Charts use a
deliberate 6-color palette where each series color is distinguishable and meaningful.

### 3. Uniform Density
A card with 40px padding and a table with 40px padding look like they were generated
by the same machine — because they were. Real dashboards have density gradients:
hero KPIs breathe with generous spacing, supporting tables are tighter, detail rows
are compact. The density communicates importance.

**The fix:** Spacing scales with importance. KPI cards: 24px internal padding.
Data tables: 12px row padding. Detail metadata: 8px. These are not arbitrary —
they create a visual reading order that guides the eye without labels or arrows.

---

## Aesthetic Reference Points

- **Vercel Analytics** — Clean dark surfaces, monospaced metrics, minimal chrome
- **Segment** — Tight typographic hierarchy, semantic color, data-first layout
- **Linear** — Precision and restraint, no decoration, confident whitespace
- **Bloomberg Terminal** — Information density done right (without the green text)

What these have in common: they look like a senior product designer worked on them,
not because they are "beautiful," but because every decision is intentional and nothing
is there by accident.

---

## What This Skill Is Not

- Not a landing page — no hero sections, no gradient blobs, no "above the fold" thinking
- Not a mobile-first design — dashboards are information-dense; desktop is primary
- Not decorative dark mode — dark because dark reduces eye strain during extended data review, not for aesthetics
- Not chart-forward — charts support data understanding, they are not the main event

---

## The Professional Tell

The difference between an AI-generated dashboard and a professionally designed one
is not the color palette or the component library. It is the presence of *restraint*.

A professional designer knows what NOT to include. The sidebar is intentionally low
contrast — not because it is less important, but because it should fade when you are
reading data. The metric is oversized not because it looks impressive, but because
it needs to be readable at a glance. The delta indicator is colored because the
direction of change is the most decision-relevant piece of information on the card.

This skill encodes restraint. The AI should follow these rules even when a "normal"
implementation would be flashier. Especially then.
