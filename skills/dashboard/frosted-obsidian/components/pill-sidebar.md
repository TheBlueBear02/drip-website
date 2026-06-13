# Component: Pill Sidebar (Floating Navigation)

## What It Is

A detached vertical pill floating left of the main glass shell — not edge-docked. Icon-only navigation with white circular active state. Recedes until the user needs wayfinding.

---

## Anatomy (exact visual order, top to bottom)

```
     ┌──────┐
     │ (●)  │  ← Active item: white circle + dark icon
     │  ○   │  ← Inactive: grey icon on transparent glass
     │  ○   │
     │  ○   │
     │      │
     │  ○   │  ← Settings at bottom
     └──────┘
```

**Structure:** Vertical stack of icon buttons inside frosted pill. Active = solid white circle background. Inactive = icon only at secondary color. No text labels in default state.

---

## Implementation

```jsx
import { Home, BarChart2, Calendar, Settings } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', icon: Home },
  { id: 'analytics', icon: BarChart2 },
  { id: 'calendar', icon: Calendar },
];

function PillSidebar({ activeId, onNavigate }) {
  return (
    <aside
      className="
        fixed left-6 top-1/2 z-50 -translate-y-1/2
        flex w-16 flex-col items-center
        gap-5 rounded-full
        border border-[rgba(255,255,255,0.18)]
        bg-[rgba(255,255,255,0.08)]
        px-3 py-6
        backdrop-blur-[40px]
      "
      /* WHY: Detached pill with 24px (left-6) inset — not a full-height docked column.
         visionOS/Raycast pattern: navigation floats, content owns the canvas. */
    >
      {NAV_ITEMS.map(({ id, icon: Icon }) => {
        const isActive = activeId === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate(id)}
            aria-label={id}
            aria-current={isActive ? 'page' : undefined}
            className={`
              flex h-10 w-10 items-center justify-center rounded-full
              transition-colors duration-150
              ${isActive ? 'bg-white' : 'bg-transparent hover:bg-[rgba(255,255,255,0.06)]'}
            `}
            /* WHY: Active state is white fill, not blue — accent in this skill is specular white, not hue */
          >
            <Icon
              size={20}
              strokeWidth={1.5}
              className={isActive ? 'text-[#1A1A2E]' : 'text-[#A0A0A0]'}
            />
          </button>
        );
      })}

      <div className="mt-auto">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-[rgba(255,255,255,0.06)]"
        >
          <Settings size={20} strokeWidth={1.5} className="text-[#A0A0A0]" />
        </button>
      </div>
    </aside>
  );
}
```

---

## Skeleton Loading State

```jsx
function PillSidebarSkeleton() {
  return (
    <aside className="fixed left-6 top-1/2 z-50 flex w-16 -translate-y-1/2 flex-col items-center gap-5 rounded-full border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.08)] px-3 py-6 backdrop-blur-[40px] animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-10 w-10 rounded-full bg-[rgba(255,255,255,0.08)]" />
      ))}
    </aside>
  );
}
```

---

## Common Mistakes to Avoid

- ❌ **Full-height sidebar glued to viewport edge** — must float as pill with inset offset
- ❌ **Blue or accent-colored active background** — active is always solid white circle
- ❌ **Text labels beside every icon by default** — icon-only keeps chrome quiet; labels on hover optional
- ❌ **Border separating sidebar from content** — no vertical divider; depth separates via float + blur
- ❌ **Bright white icons on inactive items** — inactive stays `#A0A0A0` so content column leads
