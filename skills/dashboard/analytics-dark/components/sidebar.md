# Component: Sidebar Navigation

## The Core Rule: The Sidebar Should Disappear

When a user is reading data on the dashboard, they should not be aware of the sidebar.
The sidebar is a tool for navigation — once navigation is complete, it should recede
visually so the content takes full attention.

This means the sidebar has intentionally LOWER contrast than the main content.

---

## Anatomy

```
┌─────────────────────────┐
│  [Logo]  AppName        │  ← Brand area: 56px height
│                         │
│  MAIN                   │  ← Section label: 10px, #52525B, uppercase
│  ○  Overview            │  ← Nav item: active state
│     Analytics           │  ← Nav item: default state
│     Reports             │  ← Nav item: default state
│                         │
│  DATA                   │  ← Section label
│     Customers           │
│     Revenue             │
│     Funnels             │
│                         │
│  ─────────────────────  │  ← Divider before bottom items
│     Settings            │
│     [Avatar] Amir       │  ← User item: always at bottom
└─────────────────────────┘
```

---

## Implementation

```jsx
// WHY: Background is --bg-surface (#111113) — same as cards.
// This means the sidebar does NOT have a unique color.
// It is separated from the page background (#0A0A0B) by +1 depth level,
// and separated from the content area by a subtle border ONLY.

function Sidebar() {
  return (
    <aside className="
      w-[240px] min-h-screen
      bg-[#111113]
      border-r border-[#1F1F23]   /* Very subtle border — barely visible */
      flex flex-col
      px-3 py-4
    ">
      {/* Brand area */}
      <div className="flex items-center gap-2.5 px-3 py-3 mb-4">
        <div className="w-6 h-6 rounded bg-[#3B82F6]" />  {/* Logo placeholder */}
        <span className="text-[14px] font-semibold text-[#F4F4F5]">AppName</span>
      </div>

      {/* Nav sections */}
      <nav className="flex flex-col gap-6 flex-1">
        <NavSection label="Main" items={mainItems} />
        <NavSection label="Data" items={dataItems} />
      </nav>

      {/* Bottom: settings + user */}
      <div className="border-t border-[#1F1F23] pt-3 flex flex-col gap-1">
        <NavItem label="Settings" icon={Settings} />
        <UserItem />
      </div>
    </aside>
  );
}

function NavSection({ label, items }) {
  return (
    <div>
      {/* Section label */}
      <span className="
        text-[10px] font-medium
        text-[#52525B]          /* --text-tertiary — intentionally faint */
        tracking-[0.08em] uppercase
        px-3 mb-1 block
      ">
        {label}
      </span>

      {/* Items */}
      <div className="flex flex-col gap-0.5">
        {items.map(item => <NavItem key={item.label} {...item} />)}
      </div>
    </div>
  );
}

function NavItem({ label, icon: Icon, active }) {
  return (
    <a className={`
      flex items-center gap-2.5
      px-3 py-2
      rounded-lg
      text-[13px] font-medium
      transition-colors duration-100
      cursor-pointer

      /* WHY: Active item gets --accent-subtle background + --text-primary text
         Default item stays at --text-secondary (60% opacity feel)
         This is the sidebar "disappearing" in practice */
      ${active
        ? 'bg-[rgba(59,130,246,0.10)] text-[#F4F4F5]'
        : 'text-[#71717A] hover:text-[#A1A1AA] hover:bg-[#1A1A1F]'
      }
    `}>
      {/* Active item: accent-colored dot indicator */}
      {active
        ? <div className="w-1 h-1 rounded-full bg-[#3B82F6] ml-[-2px] mr-[2px]" />
        : <Icon size={14} strokeWidth={1.5} className="shrink-0" />
      }
      {label}
    </a>
  );
}
```

---

## Text Opacity Rationale

| State | Color | Perceived Opacity vs Content |
|---|---|---|
| Active nav item | `#F4F4F5` | 100% — matches content text |
| Default nav item | `#71717A` | ~45% — intentionally recedes |
| Section label | `#52525B` | ~30% — almost invisible |
| Sidebar border | `#1F1F23` | ~15% — barely there |

The content area uses `--text-primary` (`#F4F4F5`). The sidebar default nav item
at `#71717A` is literally half the luminance. This is intentional. When the user
is reading the dashboard, their eye stays in the content area. The sidebar is visible
but does not compete.

---

## Rules

- **Width is fixed at 240px.** Never fluid, never collapsible by default (add collapse as an optional enhancement only).
- **No sidebar background color that differs from cards.** Sidebar = `--bg-surface`, same as cards. They are the same depth.
- **Section labels must be clearly fainter than nav items.** If they are the same weight/color, they compete.
- **Active indicator is a blue dot, not a full blue background.** Full colored backgrounds are too heavy.
- **No icons on active nav items.** The dot replaces the icon in active state — the icon is for identification when scanning, not needed when you're already there.
- **User item always at the very bottom.** Never in the nav list.
- **No hover tooltips.** The sidebar is wide enough to show full labels. Tooltips are for collapsed sidebars.
