# Integration Setup — frosted-obsidian

## Step 1: Install Dependencies

```bash
npm install recharts lucide-react
```

---

## Step 2: Add Fonts

**Google Fonts (add to `index.html` or layout head):**

```html
<link
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

**Next.js (`layout.tsx`):**

```tsx
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plus-jakarta',
});
```

---

## Step 3: CSS Custom Properties

Add to `globals.css`. Every component references these:

```css
:root {
  /* Scene */
  --bg-scene: #0F1B2D;

  /* Glass surfaces */
  --bg-glass-shell: rgba(255, 255, 255, 0.08);
  --bg-glass-section: rgba(0, 0, 0, 0.35);
  --bg-glass-elevated: rgba(255, 255, 255, 0.12);
  --blur-shell: 40px;
  --blur-section: 24px;
  --blur-elevated: 32px;

  /* Text */
  --text-primary: #FFFFFF;
  --text-secondary: #A0A0A0;
  --text-tertiary: #6B7280;
  --text-on-active: #1A1A2E;

  /* Interactive (white accent) */
  --accent-interactive: #FFFFFF;
  --accent-interactive-hover: rgba(255, 255, 255, 0.85);

  /* Semantic */
  --state-success: #4ADE80;
  --state-progress: #FACC15;
  --state-neutral: #6B7280;

  /* Data viz */
  --data-yellow: #FACC15;
  --data-blue: #60A5FA;
  --data-green: #4ADE80;
  --data-grey: rgba(255, 255, 255, 0.15);

  /* Borders & shadow */
  --border-glass-rim: rgba(255, 255, 255, 0.18);
  --shadow-shell: 0 24px 80px rgba(0, 0, 0, 0.45);
}
```

---

## Step 4: Glass Utility Classes

```css
.glass-shell {
  background: var(--bg-glass-shell);
  backdrop-filter: blur(var(--blur-shell));
  -webkit-backdrop-filter: blur(var(--blur-shell));
  border: 1px solid var(--border-glass-rim);
  border-radius: 32px;
  box-shadow: var(--shadow-shell);
}

.glass-section {
  background: var(--bg-glass-section);
  backdrop-filter: blur(var(--blur-section));
  -webkit-backdrop-filter: blur(var(--blur-section));
  border-radius: 20px;
  box-shadow: none;
}

.glass-elevated {
  background: var(--bg-glass-elevated);
  backdrop-filter: blur(var(--blur-elevated));
  -webkit-backdrop-filter: blur(var(--blur-elevated));
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}
```

---

## Step 5: Scene Background

The dashboard requires a visible layer behind glass:

```css
body {
  margin: 0;
  min-height: 100vh;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  background-color: var(--bg-scene);
  background-image: url('/scene.jpg'); /* optional photograph */
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
```

If no photograph is available, use a cool gradient:

```css
body {
  background: linear-gradient(145deg, #0F1B2D 0%, #1A2744 50%, #0D1526 100%);
}
```

---

## Step 6: Tailwind Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        shell: '32px',
        section: '20px',
      },
      colors: {
        'glass-rim': 'rgba(255, 255, 255, 0.18)',
        success: '#4ADE80',
        progress: '#FACC15',
      },
    },
  },
};
```

---

## Step 7: Verify Setup

After setup, confirm:

- [ ] Background scene visible through translucent panels
- [ ] `backdrop-filter` renders (Safari needs `-webkit-backdrop-filter`)
- [ ] Plus Jakarta Sans loads — not system UI font
- [ ] Main shell has rim border and shell shadow only
- [ ] Inner cards have no box-shadow

If panels look solid grey, alpha values are too high or blur is missing.
