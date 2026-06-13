# GETDRIP.DEV — Full Site Structure & Architecture Plan (v2)
## Vite + React | GitHub Pages | Skill-Transforming UI

> **This is the v2 site** in `new drip-site/`. The legacy site in `drip-site/` is frozen and unchanged.

---

## THE CORE CONCEPT

The site IS the demo. When a user previews a skill, the entire site transforms
into that design world — fonts, colors, shadows, radius, motion. Everything.
This is not a modal preview. It is a full live environment swap.

The homepage defaults to the **getDRIP brand theme** (`getdrip-brand`) — a light,
clean marketing skin that is **not** installable via npx. When a user selects
a library skill from the switcher, they enter that design world live.

**getDRIP brand typography** (`src/skills/registered/getdrip-brand/theme.js`):
- Body uses **DM Sans** (simple, readable sans-serif)
- Section titles (`--site-font-section-title`): **Geist**, Geist Fallback
- Other headings (`--site-font-head`): **DM Sans**
- Section titles: `--site-head-weight: 600`
- Hero headline: `--site-hero-headline-weight: 600`
- Mono labels: JetBrains Mono

### Site-only vs library skills

| Type | ID | In switcher | In skillList / carousel | npx command |
|---|---|---|---|---|
| Site brand | `getdrip-brand` | First chip (house icon only; black on light themes, white on `darkBackground` skills) | No | No (`siteOnly: true`) |
| Library skill | e.g. `linear-modern` | Yes | Yes | Yes |

Resolved theme: `previewSkill ?? activeSkill ?? getdrip-brand` (see `src/utils/resolveSkill.js`).

**Shareable design URL:** When a library skill is locked (`activeSkill`), the query string updates to `?skill=<id>` (e.g. `?skill=neo-brutalism`). Resetting to getDRIP brand removes the param. Hover/preview does not change the URL. When a project type is selected (`hasSelectedProjectType`), the query string updates to `?project=<id>` (e.g. `?project=landing`); both params can appear together (`?skill=neo-brutalism&project=saas`). Clearing project type selection removes `project`. `SkillUrlSync` in `App.jsx` + `useSkillUrlSync.js` / `useHeroTypeUrlSync.js` handle bidirectional sync (including browser back/forward).

---

## STACK

| Layer | Choice | Why |
|---|---|---|
| Framework | Vite + React | Fast HMR, simple static output, easy GitHub Pages deploy |
| Routing | React Router (hash mode) | Works on GitHub Pages without server config |
| Styling | CSS custom properties + vanilla CSS | Enables real-time token swapping via `:root` |
| State | React Context | Global active skill state shared across all components |
| Animation | CSS transitions on `:root` | Smooth cross-site transformations without JS overhead |
| Deployment | GitHub Actions → `gh-pages` branch | Auto-deploy on push to `main` |

**Why not Tailwind for the site itself?**
Tailwind generates static classes at build time. CSS custom properties are
runtime-mutable — essential for swapping the entire design system live.
The site uses CSS vars everywhere; skill tokens map directly onto those vars.

---

## THE SKILL THEME SYSTEM

### How It Works

Each skill defines a "site theme" — a flat map of CSS custom properties
that override the site's base token set. When a skill becomes active:

1. The `SkillContext` updates `activeSkill`
2. A `useSkillTheme` hook writes the skill's token map to `document.documentElement.style`
3. All CSS vars on `:root` update instantly
4. CSS `transition` on `:root` animates the swap smoothly
5. The font changes via a dynamically injected `<link>` tag

### Site Token Contract

Every component on the site uses only these CSS vars (never hardcoded values):

```css
:root {
  /* Backgrounds — Linear Modern default */
  --site-bg:          #050506;   /* Primary page canvas (near-black, never pure black) */
  --site-surface:     rgba(255,255,255,0.05);   /* Card/panel (glass surface) */
  --site-surface-2:   #0a0a0c;   /* Elevated surface */

  /* Text */
  --site-text:        #EDEDEF;   /* Primary text (bright but not pure white) */
  --site-text-muted:  #8A8F98;   /* Secondary text */
  --site-text-accent: #EDEDEF;   /* Emphasized text */

  /* Accent (indigo) */
  --site-accent:      #5E6AD2;   /* Primary accent color */
  --site-accent-2:    #6872D9;   /* Hover/pressed accent */
  --site-accent-fg:   #ffffff;   /* Text on accent background */

  /* Borders */
  --site-border:         rgba(255,255,255,0.06);  /* Default border */
  --site-border-strong:  rgba(94,106,210,0.30);   /* Emphasized border */

  /* Shadows */
  --site-shadow-sm:   0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4);
  --site-shadow-md:   0 0 0 1px rgba(255,255,255,0.08), 0 8px 40px rgba(0,0,0,0.5);
  --site-shadow-lg:   0 0 0 1px rgba(255,255,255,0.08), 0 16px 70px rgba(0,0,0,0.7);
  --site-shadow-glow: 0 0 0 1px rgba(94,106,210,0.5), 0 4px 12px rgba(94,106,210,0.3), 0 0 40px rgba(94,106,210,0.2);

  /* Radius */
  --site-radius-sm:   6px;
  --site-radius-md:   8px;
  --site-radius-lg:   16px;
  --site-radius-full: 9999px;

  /* Typography */
  --site-font-head:   "Inter", "Geist Sans", system-ui, sans-serif;
  --site-font-body:   "Inter", "Geist Sans", system-ui, sans-serif;
  --site-font-mono:   "JetBrains Mono", monospace;

  /* Motion (expo-out) */
  --site-ease:        cubic-bezier(0.16, 1, 0.3, 1);
  --site-duration-sm: 200ms;
  --site-duration-md: 300ms;
  --site-duration-lg: 600ms;
}

/* The root transition — makes ALL var changes animate */
:root {
  transition:
    background-color var(--site-duration-md) var(--site-ease),
    color var(--site-duration-md) var(--site-ease);
}
```

### Skill Theme Object Shape

Each skill in the registry exports a theme object:

```js
// skills/retro-terminal/theme.js
export const retroTerminalTheme = {
  id: 'retro-terminal',
  name: 'Retro Terminal',
  fontUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap',
  tokens: {
    '--site-bg':           '#000000',
    '--site-surface':      '#0a0a0a',
    '--site-surface-2':    '#111111',
    '--site-text':         '#00ff41',
    '--site-text-muted':   '#00aa2b',
    '--site-text-accent':  '#00ff41',
    '--site-accent':       '#00ff41',
    '--site-accent-2':     '#00cc33',
    '--site-accent-fg':    '#000000',
    '--site-border':       '#003311',
    '--site-border-strong':'#00ff41',
    '--site-shadow-sm':    '0 0 8px rgba(0,255,65,0.2)',
    '--site-shadow-md':    '0 0 20px rgba(0,255,65,0.3)',
    '--site-shadow-lg':    '0 0 40px rgba(0,255,65,0.4)',
    '--site-shadow-glow':  '0 0 30px rgba(0,255,65,0.6)',
    '--site-radius-sm':    '0px',
    '--site-radius-md':    '0px',
    '--site-radius-lg':    '0px',
    '--site-radius-full':  '0px',
    '--site-font-head':    '"JetBrains Mono", monospace',
    '--site-font-body':    '"JetBrains Mono", monospace',
    '--site-font-mono':    '"JetBrains Mono", monospace',
    '--site-ease':         'steps(8)',
    '--site-duration-sm':  '0ms',
    '--site-duration-md':  '0ms',
  },
};
```

---

## PROJECT FOLDER STRUCTURE

```
getdrip-site/
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── main.jsx                    ← Vite entry point
│   ├── App.jsx                     ← Router + SkillProvider
│   │
│   ├── context/
│   │   └── SkillContext.jsx        ← Global active skill state
│   │
│   ├── hooks/
│   │   ├── useSkillTheme.js        ← Writes tokens to :root
│   │   ├── useSkillUrlSync.js      ← Syncs activeSkill ↔ ?skill= query param
│   │   ├── useHeroTypeUrlSync.js   ← Syncs activeHeroType ↔ ?project= query param
│   │   ├── useSwitcherAnimations.js← SkillSwitcherStrip enter/stagger animations
│   │   ├── useScrollCollapse.js    ← Collapse skill strip on scroll down
│   │   └── useInView.js            ← Intersection observer for section reveals
│   │
│   ├── skills/                     ← THE SKILL REGISTRY
│   │   ├── index.js                ← Exports all skills as array
│   │   ├── registered/
│   │   │   ├── linear-modern/      ← Site default style (Linear/Vercel-style dark, indigo, layered shadows)
│   │   │   │   ├── theme.js
│   │   │   │   └── meta.js
│   │   │   ├── minimalist-monochrome/
│   │   │   │   ├── theme.js        ← Token overrides
│   │   │   │   └── meta.js         ← Name, tags, description, components list
│   │   │   ├── playful-geometric/
│   │   │   │   ├── theme.js
│   │   │   │   └── meta.js
│   │   │   ├── clay-premium/
│   │   │   │   ├── theme.js
│   │   │   │   └── meta.js
│   │   │   ├── neo-brutalism/       ← Cream canvas, hard shadows, Space Grotesk, bordered card hero
│   │   │   │   ├── theme.js
│   │   │   │   └── meta.js
│   │   │   ├── hand-drawn/          ← Wobbly radius, hard shadows, Kalam + Patrick Hand, dot-grid, hero card
│   │   │   │   ├── theme.js
│   │   │   │   └── meta.js
│   │   │   └── art-deco/            ← Obsidian + gold, Marcellus + Josefin Sans, crosshatch body, gold glows, 0px radius
│   │   │       ├── theme.js
│   │   │       └── meta.js
│   │
│   ├── components/                 ← Site UI components (all use CSS vars)
│   │   ├── SkillUrlSync.jsx        ← Composes useSkillUrlSync + useHeroTypeUrlSync
│   │   ├── ErrorBoundary.jsx       ← Top-level error boundary around Routes
│   │   ├── diagrams/
│   │   │   └── SkillWorkflowDiagram.jsx  ← Inline SVG skill architecture flow for LivePreviewCallout
│   │   ├── layout/
│   │   │   ├── Nav.jsx
│   │   │   └── Footer.jsx
│   │   ├── ui/
│   │   │   ├── CopyCommand.jsx     ← The npx command pill with copy button
│   │   │   ├── FloatingTab.jsx     ← Bottom-right floating tab: getDRIP / current design + copy command
│   │   │   ├── SkillSwitcherStrip.jsx
│   │   │   │   ├── SkillSwitcherProjectTypeRow.jsx
│   │   │   │   ├── SkillSwitcherStylesRow.jsx
│   │   │   │   ├── SkillSwitcherTypeMenu.jsx
│   │   │   │   └── skill-switcher/*.css
│   │   │   ├── icons/ChevronIcon.jsx
│   │   │   └── MiniPreview.jsx
│   │   ├── heroes/
│   │   │   ├── SkillHeroShell.jsx      ← Per-skill decorative wrapper (blobs, shapes, cards)
│   │   │   ├── LegacySkillHero.jsx     ← Preserved centered hero (not active by default)
│   │   │   ├── HeroPreviewHeader.jsx   ← Eyebrow + CopyCommand strip
│   │   │   ├── SaasSiteHero.jsx        ← Active default archetype
│   │   │   ├── DashboardHero.jsx
│   │   │   ├── LandingPageHero.jsx
│   │   │   ├── PortfolioHero.jsx
│   │   │   ├── heroes.css          ← Aggregator importing styles/*.css
│   │   │   ├── styles/             ← Split hero preview CSS (preview, mocks, responsive)
│   │   │   └── mock/                   ← MockBrowserChrome, MockKpi, MockBarChart, MockProjectTile
│   │   └── sections/
│   │       ├── Hero.jsx
│   │       ├── hero/               ← Split Hero CSS (base, variants, responsive)
│   │       ├── HowItWorks.jsx
│   │       ├── SkillsPreview.jsx
│   │       ├── PlatformSupport.jsx
│   │       ├── FAQ.jsx
│   │       ├── HeroVideo.jsx
│   │       ├── LivePreviewCallout.jsx
│   │       ├── BeforeAfter.jsx
│   │       └── UserRecommendations.jsx
│   │
│   ├── pages/
│   │   └── Home.jsx                ← Single-page app (lazy-loads below-fold sections)
│   │
│   └── styles/
│       ├── base.css                ← :root tokens, resets, base typography
│       └── sectionReveal.css       ← Section scroll-reveal animations
│
├── eslint.config.js                ← ESLint 9 flat config (src/ only; skills/ ignored)
├── jsconfig.json                   ← Path alias @/* → src/*
├── .prettierrc                     ← Code formatting
├── README.md                       ← Dev/build/deploy docs
├── index.html                      ← Meta tags (description, og:, twitter:), theme-color, social preview image URL
├── vite.config.js                  ← @ alias, manualChunks, GitHub Pages base
├── .github/
│   └── workflows/
│       └── deploy.yml              ← Auto-deploy to gh-pages on push
└── package.json
```

---

## PAGES

---

### 1. Home (/)

The entry point. Default state uses **getDRIP brand** (light, DM Sans typography). The skill switcher strip transforms the full site when a library skill is previewed or selected.

**Section order:**

```
Nav
  └── Logo (GETDRIP + Beta) — links to `/`, resets to getDRIP brand default (`setActiveSkill(null)`, `setPreviewSkill(null)`), scrolls to top | How it works | Skills | Platforms | Q&A | GitHub stars | "Browse all designs" CTA

SkillSwitcherStrip
  └── Step 1 (project type): `"I'm building:"` label + row of 4 chips from `heroTypeList` in `src/data/heroTypes.js` — Dashboard, Landing page, SaaS site, Portfolio; click → `selectProjectType(id)` and advance to step 2
  └── Step 2 (styles): type anchor (accent outline + chevron, transparent background, `--site-radius-md` corners); dropdown portaled to `document.body` with fixed positioning so it renders over the hero (not clipped by `site-header` / strip `overflow`); lists all 4 types to switch without leaving styles view (`selectProjectType` only); changing type scrolls smoothly to `#home` hero
  └── Style chips (step 2 only): first chip house icon (resets to brand default; siteOnly) + installable library skills from `skillList` in `src/skills/index.js`: clay-premium → linear-modern → neo-brutalism → minimalist-monochrome → playful-geometric → art-deco → hand-drawn
  └── All styles shown for every project type (no per-type filtering yet)
  └── Step 1 → 2 transition: hero chips call `selectProjectTypeFromHero` → one frame on step 1 (active chip highlighted) then `SkillSwitcherStrip` advances to step 2 with anchor slide-in + style-chip stagger; navbar step 1 chips use the same animation via `handleTypeSelect`; already on step 2, hero type change replays chip stagger only; `?project=` URL loads on step 2 without replaying hero animation
  └── Scroll: collapses upward when scrolling down (`useScrollCollapse`); drops back in with slight bounce when scrolling up or near top; `html.skill-strip-collapsed` tightens anchor scroll-margin

Hero
  └── Brand default (getdrip-brand): split layout — copy left, HeroVideo right
      ├── Eyebrow: "Design systems for AI-built apps"
      ├── Headline: "Your AI app works / now give it character" — `HeroCharacterWord` cycles library skills every 7s (`skillList` order): accent color + heading font from each theme; slide-up enter animation on change; preloads skill font URLs; fixed-width slot (max measured width) + `white-space: nowrap` on second line to prevent wrap on font change
      ├── `"I'm building:"` label + `HeroProjectTypes` — same 4 chips as navbar step 1; click → `selectProjectTypeFromHero(id)` syncs type, highlights chip, then animates navbar to step 2 (designs)
      └── HeroVideo: `VITE_DEMO_VIDEO_URL` in `.env` (not `.env.example`); YouTube/Vimeo embed or file under `public/` (path must match filename exactly, e.g. `proof/getDrip-example-video.mp4`); local paths resolved with `import.meta.env.BASE_URL`; wrong path may return SPA HTML (200) instead of 404 — video shows blank; `onError` shows load hint; restart dev server after env change; poster/thumbnail uses `public/proof/after.png` (same as Before/After “with skill” panel); dark scrim + centered circular play button overlay until first play (embeds lazy-load on click with autoplay); overlay returns when direct video ends
  └── Library skill active: project-type hero archetypes via `SkillHeroShell` + `src/data/heroTypes.js`
      ├── Two axes: **skill** (theme tokens + `hero--{skill}` modifiers) × **hero type** (layout + mock UI)
      ├── Registry (`heroTypeList`): `dashboard`, `landing`, `saas`, `portfolio` — each maps to a component in `src/components/heroes/`
      ├── `DEFAULT_HERO_TYPE = 'dashboard'`; `SkillContext.activeHeroType` set via hero project-type chips or navbar type dropdown (`selectProjectType`)
      ├── Shared preview copy (`HeroPreviewCopy.jsx`): title "This Is How Your Project Could Look Like"; subtitle names active skill + install-command CTA
      ├── Active now: `DashboardHero` — split layout (copy left, KPIs + bar chart + activity mock right) + `HeroPreviewHeader` (eyebrow + install command)
      ├── Built, dormant: `SaasSiteHero` (browser mock + feature cards), `LandingPageHero` (centered + logo strip), `PortfolioHero` (project grid mock)
      ├── `LegacySkillHero.jsx` preserved ("See how your app could look") — swap in via `heroTypes.js` for comparison, not wired by default
      ├── Mobile/tablet (≤900px): preview split stacks; install `CopyCommand` and mock CTA buttons (`hero-preview-cta-row`) span full width with ellipsis on long commands; no horizontal overflow
      └── Per-skill shell decorations unchanged: clay blobs, playful shapes, neo/hand-drawn cards (`SkillHeroShell.jsx`); mock widgets use `--site-*` tokens

LivePreviewCallout
  └── Title only: "A full design skill, not a one time prompt" (no subtitle)
  └── Asymmetric comparison grid (max-width ~980px): narrow prompt card (~260px) + wider skill card (min ~560px); inward 3D tilt (face each other); scroll-triggered entrance via `useInView` + `skill-explainer--visible`; hover lifts/straightens active card, dims the other; mobile stacks flat (no hover)
  └── In-card eyebrows above titles: "The Competitors Way:" (prompt) / "The 2026 Way:" (skill, accent)
  └── Left: muted "Single prompt" cons + `public/proof/single-prompt.svg` at bottom
  └── Right: nav-style `brand-get` / `brand-drip` + larger accent-colored “Design Skills” suffix (`--site-accent`), pros, 100% score + `SkillWorkflowDiagram` (`src/components/diagrams/SkillWorkflowDiagram.jsx`) in `.skill-explainer-diagram` panel — single-column repo stack (`SKILL.md entry`, `philosophy.md`, `tokens/*.md`, `components/*.jsx`, `examples/LandingPage.jsx`, `skill.json`); entry loop over repo top ↔ AI Agent; 4 orthogonal agent paths (progressive read ×2, reference, quality benchmark); `skill.json` → `getdrip CLI` → `Developer project`; light theme via site CSS vars; horizontal scroll on mobile

BeforeAfter
  └── Side-by-side proof panels using `public/proof/before.png` and `public/proof/after.png`
  └── Scroll-triggered entrance via `useInView` + `before-after--visible`; panels stagger in (320ms / 520ms); entrance ~1.2s, image reveal ~1.1s
  └── Screenshot frames show shimmer while loading; images fade/scale in on `load` (cached images handled via ref check)
  └── Fallback: MiniPreview generic vs styled (or style preview PNG)
  └── Below the grid: single `ImageCompare` block (`src/components/ui/ImageCompare.jsx`) — before/after screenshots stacked in one frame with a draggable vertical divider (pointer drag + keyboard slider); same proof images and fallbacks as the panels; gated by `SHOW_INTERACTIVE_COMPARE` in `BeforeAfter.jsx` (currently `false`, hidden on site)

HowItWorks          ← heading: "How it works"; interactive 5-step selector (left nav + right detail panel)
  └── Subtitle: "Pick a design system, paste one command, and your agent builds in that world."
  └── Two-column layout (max-width ~980px): left step nav (~240–300px) + right detail panel (featured accent card)
  └── `activeStep` state (`useState(0)`); step buttons use `aria-pressed`; panel uses `aria-live="polite"` and re-mounts on step change for light fade-in
  └── Step 01 — Pick Design System: skill accent swatches from first 6 `skillList` items (`bgColor`), "Browse designs →" scrolls to `#skills`
  └── Step 02 — Copy the Design Command: live `CopyCommand` (`npx getdrip add linear-modern` via `FEATURED_SKILL_ID`)
  └── Step 03 — Paste the command in Claude/Cursor/Codex: text-only (Cursor, Claude Code, Codex, Lovable, etc.)
  └── Step 04 — Ask the AI Agent to Apply the Design: inline SVG mini browser (generic wireframe → styled UI with accent)
  └── Step 05 — Make Your Own Adjustments: text-only (user edits tokens, components, rules)
  └── Scroll entrance: `useInView` + `site-reveal-section`; title/subtitle + layout block use `site-reveal`
  └── Mobile (≤900px): single column — nav stacks above panel; buttons remain full-width vertical stack; ≤768px title/subtitle left-aligned

SkillsPreview       ← carousel / gallery of library skills
  └── Scroll entrance on title, cards (staggered), and show-more button

UserRecommendations ← user quotes from src/data/userRecommendations.js
  └── Scroll entrance on title, subtitle, cards (or empty state)

PlatformSupport     ← compatibility framing (not implied partnerships)
  └── Scroll entrance on title, subtitle, logo strip items (staggered)

FAQ                 ← accordion with subtitle
  └── Scroll entrance on title, subtitle, accordion items (staggered)

Footer              ← GitHub, npm, anchors, GitHub Issues contact
  └── Scroll entrance on footer content block
```

**Section scroll reveals (shared):**
- CSS: `src/styles/sectionReveal.css` — `.site-reveal-section` + `.site-reveal` + `.is-visible` (1.2s fade/up; `--site-reveal-delay` for stagger)
- Hook: `useInView({ threshold: 0.18, rootMargin: '0px 0px -6% 0px' })` on section root
- Used by: HowItWorks, SkillsPreview, UserRecommendations, PlatformSupport, FAQ, Footer
- Custom per-section: LivePreviewCallout (`skill-explainer--visible`), BeforeAfter (`before-after--visible` + image load shimmer)
- Hero: above-the-fold; uses its own motion (float/clay), not scroll reveal

**Messaging guidelines (v2):**
- Use "design systems" and "agents" — avoid "vibe coders", fake metrics, ALL-CAPS eyebrows
- UserRecommendations reads from `src/data/userRecommendations.js`; empty array shows placeholder copy until quotes are added
- Platform copy: "Works in any React project" — no "seamlessly with your favorite platforms"

**The SkillSwitcherStrip** — key UX detail:
- **Step 1:** pick project type (dashboard / landing / SaaS / portfolio) from `heroTypeList`; advances to step 2 with slide-to-left animation; `"I'm building:"` label uses `--site-text` at 14px/600; project-type chips (`.skill-chip--project-type`) use `--site-radius-md`, `--site-surface` background, darker border, and light shadow so they read clearly against the strip; on mobile (≤768px) the label stacks above a full-width horizontally scrollable chip row (strip `max-height` increases to ~108px); chips use a right-edge fade mask to hint overflow
- **Step 2:** type anchor on the left (dropdown to change type; transparent background with accent border, `--site-radius-md` corners); horizontally scrollable style chips on the right — shows default (Home) chip plus first 6 library skills from `skillList` (`SKILL_STRIP_VISIBLE_COUNT` in `src/skills/index.js`); remaining skills reachable via "See more"; short vertical dividers (`--site-border`, 14px) between style chips via `.skill-chip + .skill-chip::before`; Home chip (`.skill-chip--brand`) is borderless and transparent with a hover underline via `.skill-chip-icon-wrap::after` below the icon; other style chips (`.skill-switcher-scroll .skill-chip`) are borderless and transparent, with hover underline on the label (`.skill-chip-name`) instead of a background change; active chip uses accent text color; on first transition from step 1, the type anchor slides in from center; style chips stagger-slide in left-to-right (`.skill-switcher-scroll--enter`) on first transition and again whenever the user picks a different type from the dropdown
- Click default chip = `setActiveSkill(null)` (brand default)
- Click library chip = `setActiveSkill(id)` (switches full-site design)
- All library styles visible for every project type until per-type filtering is added
- Scroll down from top: strip collapses up under the nav; scroll up or return to top: strip drops back in
- FloatingTab hides copy button on brand default; shows command for library skills

---

### Removed pages (legacy — not in v2 SPA)

The standalone `/skills`, `/skills/:id`, and `/docs` routes and their page components were removed during structure modernization. Skills browsing lives in the **SkillsPreview** section on Home (`#skills` anchor). See `src/components/sections/SkillsPreview.jsx` for the inline `SkillCard` implementation.

---

## KEY COMPONENTS

### `SkillContext.jsx`

```jsx
// What it manages:
// - activeSkill (the locked skill)
// - previewSkill (temporary hover state — null when not hovering)
// - setActiveSkill(skill)
// - setPreviewSkill(skill | null)
//
// The rendered skill = previewSkill ?? activeSkill ?? getdrip-brand (site default)
// null activeSkill = brand. Hover preview wins over locked skill.
```

### `useSkillUrlSync.js`

```js
// Mounted via SkillUrlSync inside the Router (App.jsx).
// URL → state: when ?skill= changes (load, back/forward), set activeSkill.
// State → URL: when activeSkill changes (switcher, preview cards, logo reset),
//   set or remove ?skill=<id> with replaceState (no history spam).
// Invalid or getdrip-brand values are treated as brand default (param removed).
// previewSkill is not synced to the URL.
```

### `useHeroTypeUrlSync.js`

```js
// Mounted via SkillUrlSync inside the Router (App.jsx).
// URL → state: when ?project= changes (load, back/forward), applyHeroTypeFromUrl.
// State → URL: when hasSelectedProjectType / activeHeroType changes (hero chips,
//   navbar type picker), set or remove ?project=<id> with replaceState.
// Invalid values are ignored (default dashboard, hasSelectedProjectType false).
```

### `useSkillTheme.js`

```js
// Watches the resolved active theme
// On change: iterates token map, writes each to document.documentElement.style
// Also handles font URL injection/removal via <link> tag
// Runs on every render where theme changes — fast, no flicker
```

### `SkillSwitcherStrip.jsx`

```jsx
// Two-step switcher: project type → styles
// Step 1: heroTypeList chips (Dashboard, Landing page, SaaS site, Portfolio)
//   - onClick → selectProjectType(id) + setNavbarSwitcherStep('styles')
// Step 2: left type anchor (dropdown to change activeHeroType) + scrollable style chips
//   - default chip → setActiveSkill(null)
//   - library chips → setActiveSkill(id); active chip uses --site-accent text color
// Hero chips → selectProjectTypeFromHero(id) → step 1 flash + animated advance to step 2
// navbarSwitcherStep: 'project-type' | 'styles' (context; URL ?project= loads 'styles')
// Local state: typeMenuOpen, anchorEntering (type anchor), stylesEntering (style chip stagger)
// Collapses on scroll down via useScrollCollapse; z-index: 40
```

### `CopyCommand.jsx`

```jsx
// Props: command (string), size ('sm' | 'md' | 'lg')
// Shows: $ npx getdrip add retro-terminal
// Right side: copy icon button
// On click: copies to clipboard, icon swaps to checkmark for 2s
// Styled entirely with CSS vars — transforms with skill
```

### `FloatingTab.jsx`

```jsx
// Global floating tab: position fixed, bottom-right.
// Left: label "getDRIP / Design Skills" on brand default; "getDRIP / {meta.name}" when a library design is active or previewed.
// Right: "Copy command" button — copies meta.command for the active skill to clipboard.
// Uses useSkillContext() for activeSkill; resolves meta from skillMetas.
// Styled entirely with CSS vars (--site-surface, --site-border, etc.) so it is
// applied by the active skill's theme like the rest of the site.
// Rendered in App.jsx so it appears on all routes.
```

### `SkillsPreview.jsx` (inline SkillCard)

```jsx
// Inline SkillCard function inside SkillsPreview.jsx (not a separate file)
// Contains MiniPreview, name, tags, CopyCommand (sm), preview/lock behavior
// onMouseEnter/Leave → preview behavior via context
```

### `PlatformSupport.jsx`

```jsx
// Resolves active/preview skill from SkillContext; looks up meta from skillMetas.
// Logo variant: meta.darkBackground === true → light/white logos (for dark themes);
// meta.darkBackground === false (or unset) → dark/black logos (for light themes).
// Assets live in public/platforms logos/ (two sets). When adding a new skill,
// set darkBackground in meta.js from the skill's primary background so logos stay readable.
```

---

## ROUTING SETUP (BrowserRouter + GitHub Pages basename)

```jsx
// App.jsx — single route; ErrorBoundary wraps Routes
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Routes:
// /  → Home (all sections on one page)
// Shareable state via query params: ?skill=<id>&project=<type>
```

`BrowserRouter` uses `basename={import.meta.env.BASE_URL}` for GitHub Pages subpath deploys.
`SkillUrlSync` keeps `?skill=` and `?project=` in sync with context (including back/forward).

---

## REMOVED LEGACY FILES (v2 cleanup)

The following were unreachable dead code and have been deleted:

- `src/styles.css` (642 lines, never imported)
- `src/pages/Skills.jsx`, `SkillDetail.jsx`, `Docs.jsx` (no routes registered)
- `src/components/Navigation.jsx`, `Footer.jsx`, `SkillCard.jsx`, `CopyButton.jsx`
- `src/data/skills.js` (legacy data; site uses `src/skills/index.js`)
- `src/App.css` (Vite boilerplate, never imported)
- Empty dirs: `src/skills/registered/botanical-organic/`, `default/`

---

## GITHUB PAGES DEPLOYMENT

### `vite.config.js`
```js
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-motion': ['framer-motion'],
          'vendor-router': ['react-router-dom'],
        },
      },
    },
  },
})
```

Site assets use the default Vite `base` of `/` (root). `import.meta.env.BASE_URL` and React Router `basename` stay in sync automatically.

### `.github/workflows/deploy.yml`
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: { node-version: 18 }
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Push to `main` → auto-builds → deploys to `gh-pages` branch → live at the site root
(e.g. `https://yourusername.github.io/` for a user/org Pages repo, or your custom domain).

---

## ADDING A NEW SKILL (The Pattern)

When a new skill is added to the Drip library, adding it to the site is 2 files:

1. **`src/skills/registered/[skill-name]/theme.js`** — token map (CSS vars)
2. **`src/skills/registered/[skill-name]/meta.js`** — name, category, mood, components list, description, and **`darkBackground`** (boolean). Set `darkBackground: true` for dark themes (primary background dark, e.g. black/charcoal) so the Platform Support section uses light/white logos; set `darkBackground: false` for light themes so it uses dark/black logos. This keeps platform logos readable on every style.

Then import and register it in `src/skills/index.js`. Some skills (e.g. playful-geometric, clay-premium, neo-brutalism, hand-drawn) have optional Hero shell variants: add a conditional in `SkillHeroShell.jsx` and matching styles in `Hero.css` when the skill needs blobs, cards, texture, or other layout-specific treatment. Skills that require a global body treatment (e.g. hand-drawn’s dot-grid paper) can use a `data-skill` attribute set by `useSkillTheme` on `document.documentElement` and target it in `base.css` (e.g. `html[data-skill="hand-drawn"] body { background-image: ... }`). Hero archetype content lives in `src/components/heroes/` and inherits tokens automatically.

The skill card, the detail page, the switcher strip — all generated automatically.

---

## PHASE 1 BUILD PLAN (Home page first)

In order:

1. `base.css` — all CSS vars, reset, root transition
2. `SkillContext.jsx` + `useSkillTheme.js` — the engine
3. `src/skills/` — register linear-modern (default) + minimalist-monochrome + playful-geometric
4. `Nav.jsx` + `Footer.jsx`
5. `SkillSwitcherStrip.jsx` — the signature interaction
6. `Hero.jsx`
7. `CopyCommand.jsx`
8. `HowItWorks.jsx`
9. `SkillsPreview.jsx` (3 cards, simplified — links to /skills)
10. `UserRecommendations.jsx` + `BeforeAfter.jsx` + `LivePreviewCallout.jsx`
11. Wire it all in `Home.jsx`
12. `vite.config.js` + GitHub Actions deploy config
