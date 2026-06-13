# frosted-obsidian — Philosophy

## The Core Principle: Float Above Context

This dashboard does not sit on a flat canvas. It hovers above one — a photographic or atmospheric scene visible through every panel. Depth is not painted with shadows and borders; it is built from stacked translucency. Each layer is frosted glass: light passes through, detail blurs, and the eye reads proximity by how much of the world behind bleeds through.

The interface is not trying to disappear into the background. It is trying to feel physically present — a lens the user looks through, not a sheet of ink on a screen. That is why the main shell has a hairline white rim, why the sidebar is a detached pill rather than a docked column, and why inner sections are darker glass inserts instead of opaque cards. The product shares DNA with spatial computing interfaces where UI is furniture in a room, not wallpaper on a wall.

---

## What Problem This Solves for the End User

Someone monitoring health, fitness, or personal metrics opens this dashboard dozens of times a day. They need numbers at a glance, status at a glance, and a sense that the tool is premium without visual noise competing with the data. Translucent surfaces reduce the "boxed-in spreadsheet" feeling. High-contrast white metrics on dark glass remain readable over any background. Semantic color — yellow for in-progress, green for complete, blue for a data category — appears only on the element it describes, never as atmosphere.

---

## The Three Enemies

### 1. Opaque Card Stacks
Generic AI dashboards use solid `#1A1A1A` rectangles with drop shadows. That reads as a template, not glass. Opaque cards kill the single defining trait of this aesthetic: you should always sense depth behind the UI. Solid fills turn a spatial interface into a flat admin panel.

**The fix:** Every panel uses `background` with alpha plus `backdrop-filter: blur()`. Inner sections are darker translucent tints, not solid hex fills. Separation comes from tint shift and blur strength, not `#000` cards.

### 2. Decorative Color and Gradient Atmosphere
AI defaults spread blue-purple gradients across headers and tint every card a different hue "for visual interest." Here, color is earned. Yellow marks ongoing effort or a chart series. Green marks completion. Blue marks a categorical slice. White marks interaction (active nav, selected date). If color does not answer a question, it is removed.

**The fix:** No gradient backgrounds. No colored card shells. Chart palette is fixed and semantic. Interactive emphasis is white-on-glass, not another accent hue.

### 3. Heavy Chrome That Competes With Data
Sidebars with bright icons, thick borders between every section, shadows under every inner card — these make navigation louder than metrics. In this system, the floating pill sidebar is intentionally small and muted until an item is active. Active state is a solid white circle behind the icon: unmistakable, but localized. Content columns carry the visual weight.

**The fix:** Detached pill navigation at reduced contrast. No divider lines between internal sections. No box-shadow on inner cards. Generous padding on the main glass shell; tighter rhythm inside lists and charts.

---

## Aesthetic Reference Points

- **Apple visionOS** — frosted panels, specular rim light, UI as physical layers over environment
- **Raycast** — dark translucent command surfaces, restrained iconography, white active states
- **Linear** — typographic hierarchy, semantic color discipline, no ornamental chrome

What these share: the interface feels engineered and expensive because restraint is visible. Nothing is there to fill space.

---

## What This Skill Is NOT

- Not a flat dark theme with `bg-gray-900` cards — translucency is non-negotiable
- Not a landing page — no hero, no marketing copy blocks, no scroll storytelling
- Not claymorphism or neumorphism — no soft extruded blobs, no inset shadows simulating plastic
- Not a photo gallery — the background scene is context for glass, not content

---

## The Professional Tell

A generic prompt produces solid cards, blue primary buttons, and a sidebar glued to the left edge. A designer building glassmorphism asks: what is behind the UI, how thick is each pane, and does this element need its own shadow or does blur already separate it? This skill encodes those questions as rules. The AI should prefer one more layer of translucency over one more border, and white active pills over colored highlight bars — even when a "normal" dashboard would do the opposite.
