# aurora-soft — Philosophy

## The core principle

**Color lives in the data, not the chrome.** Everything that frames the data — the canvas, the cards, the sidebar, the buttons, the borders — is kept neutral and quiet on purpose. The only place saturated color is allowed to bloom is inside the visualizations themselves, where it carries meaning: a funnel segment, a category, a focal bar, a share of revenue. The interface is a white gallery wall, and the charts are the paintings.

This is why the dashboard reads as energetic without looking busy. A generic AI spreads a blue-to-purple gradient across a hero header, tints every card, and colors the buttons to match — and the result is loud everywhere and informative nowhere. aurora-soft does the opposite: it spends its entire color budget on the four-stop spectrum (indigo → violet → blue → teal) and spends it only where a reader's eye is trying to compare quantities.

## What problem this solves for the end user

A SaaS operator opens this dashboard to answer a question — is revenue up, which integration earns the most, which day spiked. The design's job is to make the *answer* the brightest thing on screen. Numbers get the most contrast and the most space. A single bar is pulled into full gradient while its neighbors fall back to grey, so the eye lands on Tuesday before it reads the word "Tuesday." Trend pills are tinted green or rose so direction is legible at a glance, before any digit is parsed. The chrome recedes so the data can lead.

## The enemies

1. **The gradient hero.** The full-width indigo-to-purple banner with a faint mesh blob behind the title. It is the single most common AI tell. aurora-soft has no colored page background and no colored card backgrounds — the canvas is a cool light grey (#F3F4F7) and every card is flat white. Gradient appears only as a fill inside a chart.
2. **Decoration masquerading as hierarchy.** Drop shadows under every element, ornamental dividers, a second and third accent color introduced "for variety," icons sized like buttons. These add visual weight without adding information. Here, separation comes from a hairline border and one barely-there shadow; importance comes from size and space, not ornament.
3. **The flat template.** Uniform 16px padding on everything, labels and values at the same weight, every bar the same color. This is what "uniform = clean" produces, and it reads as a wireframe. aurora-soft graduates spacing by importance and graduates color by focus.

## The products that share this DNA

- **Stripe Dashboard** — indigo as the one interactive color, a light cool surface, restrained chrome, data that leads.
- **Mixpanel / analytics tooling** — multi-hue gradient series used to distinguish categories, never to decorate.
- **Revolut** — a vibrant violet-to-teal spectrum applied with discipline on bright surfaces, plus tinted trend indicators.

The reference set is the quality bar: output should look like it shipped from one of these teams, not like it came from a prompt.

## What this skill is NOT

It is not a dark dashboard with neon. It is not a flat monochrome admin panel. It is not a marketing page — there is no hero, no testimonial, no gradient CTA. It is a working analytics surface where the brightest pixels are always the ones that answer a question, and everything else knows to stay out of the way.
