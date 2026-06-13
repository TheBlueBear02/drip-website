# Integration Setup — analytics-dark

## Step 1: Install Dependencies

```bash
npm install recharts lucide-react
```

For fonts, either use Google Fonts (quickest) or next/font (Next.js projects):

**Google Fonts (add to index.html or layout head):**
```html
<link
  href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

**Next.js (add to layout.tsx):**
```tsx
import { Inter, Geist_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });
```

---

## Step 2: Add CSS Custom Properties

Add these to your global CSS file (`globals.css`, `index.css`, or `app.css`).
Every component in this skill references these variables:

```css
:root {
  /* Backgrounds */
  --bg-base:      #0A0A0B;
  --bg-surface:   #111113;
  --bg-elevated:  #1A1A1F;
  --bg-subtle:    #232328;

  /* Text */
  --text-primary:   #F4F4F5;
  --text-secondary: #A1A1AA;
  --text-tertiary:  #52525B;

  /* Borders */
  --border:        #27272A;
  --border-subtle: #1F1F23;
  --border-strong: #3F3F46;

  /* Accent (interactive only) */
  --accent:         #3B82F6;
  --accent-hover:   #2563EB;
  --accent-subtle:  rgba(59, 130, 246, 0.10);

  /* Semantic states */
  --positive:        #10B981;
  --positive-subtle: rgba(16, 185, 129, 0.10);
  --negative:        #F43F5E;
  --negative-subtle: rgba(244, 63, 94, 0.10);
  --warning:         #F59E0B;
  --warning-subtle:  rgba(245, 158, 11, 0.10);

  /* Chart series */
  --chart-1: #3B82F6;
  --chart-2: #10B981;
  --chart-3: #8B5CF6;
  --chart-4: #F59E0B;
  --chart-5: #EC4899;
  --chart-6: #06B6D4;
}
```

---

## Step 3: Set the Body Background

```css
body {
  background-color: var(--bg-base);   /* #0A0A0B */
  color: var(--text-primary);         /* #F4F4F5 */
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

**Why antialiased:** Dark text on dark backgrounds renders crisply with antialiasing.
Without it, text looks slightly blurry on macOS retina displays.

---

## Step 4: Tailwind Config (add custom values)

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        surface:  '#111113',
        elevated: '#1A1A1F',
        subtle:   '#232328',
        border:   '#27272A',
        accent:   '#3B82F6',
        positive: '#10B981',
        negative: '#F43F5E',
        warning:  '#F59E0B',
      },
      fontFamily: {
        sans:  ['Inter', 'sans-serif'],
        mono:  ['Geist Mono', 'monospace'],
      },
    },
  },
};
```

With this config, you can use:
- `bg-surface` instead of `bg-[#111113]`
- `text-accent` instead of `text-[#3B82F6]`
- `font-mono` to apply Geist Mono
- `font-sans` to apply Inter

---

## Step 5: Verify Setup

After setup, your root layout should produce:
- Dark page background (`#0A0A0B`)
- No default margins or padding on body
- Inter as the default font for all text
- Geist Mono available via `font-mono` class

If the page is white, the CSS variables or body background are not applied.
If fonts look like system fonts, the Google Fonts import is missing or blocked.
