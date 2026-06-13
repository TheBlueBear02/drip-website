# getDRIP Site

Marketing site for [getDRIP](https://thebluebear02.github.io/) — cure the default AI look of your project with one line.

## Stack

- **Vite + React 18** — fast dev server and static build
- **React Router** — client-side routing (GitHub Pages compatible)
- **CSS custom properties** — runtime skill theme swapping via `:root` tokens
- **Framer Motion** — section animations

## Quick start

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview production build
npm run lint     # ESLint (src/)
npm run format   # Prettier format
```

## Deploy

```bash
npm run deploy   # builds and publishes dist/ to gh-pages
```

## Project structure

```
src/
├── components/
│   ├── sections/     # Homepage sections (Hero, FAQ, etc.)
│   ├── heroes/       # Skill-themed hero previews per project type
│   ├── layout/       # Nav, Footer
│   ├── ui/           # Reusable UI (SkillSwitcherStrip, CopyCommand, etc.)
│   └── diagrams/     # SVG diagrams
├── context/          # SkillContext — global active/preview skill state
├── hooks/            # useSkillTheme, URL sync, scroll, animations
├── data/             # Static content (heroTypes, userRecommendations)
├── skills/           # Registered skill themes + metadata
├── pages/            # Route pages (Home)
├── styles/           # Global base CSS
└── utils/            # resolveSkill helpers
```

## Skill theme system

Each skill in `src/skills/registered/` exports a `theme.js` (CSS token map) and `meta.js` (display metadata). When a user selects a skill:

1. `SkillContext` updates `activeSkill`
2. `useSkillTheme` writes tokens to `document.documentElement`
3. All components using `--site-*` CSS vars transform instantly

**Site-only brand:** `getdrip-brand` is the default marketing skin (not installable via npx).

**Shareable URLs:** `?skill=<id>` and `?project=<type>` query params sync via `SkillUrlSync`.

## Path aliases

Imports use `@/` as an alias for `src/` (configured in `vite.config.js` and `jsconfig.json`).

## Agent documentation

Detailed architecture and phase flows live in `Agent instructions/GETDRIP_SITE_STRUCTURE.md`.
