# Component — Sidebar

Fixed 240px navigation on a white surface, separated from the canvas by a hairline border. Grouped into labelled sections (GENERAL / TOOLS / SUPPORT). It is chrome: it must recede so the data leads.

## Anatomy

```
┌────────────────────────────┐
│  [logo]  Nexus        [«]   │  ← brand row: 56px tall, accent mark + wordmark
├────────────────────────────┤
│  GENERAL                    │  ← section label: 11px UPPERCASE, tertiary, +0.06em
│  [ic] Dashboard      ●active│  ← active item: --accent-soft fill, accent icon, primary text
│  [ic] Payment               │  ← inactive: tertiary icon, secondary text, no fill
│  [ic] Customers             │
│  [ic] Message            8  │  ← optional trailing count
│                             │
│  TOOLS                      │
│  [ic] Product               │
│  [ic] Analytics             │
│  [ic] Automation     [BETA] │  ← optional pill badge, accent-soft
│                             │
│  SUPPORT                    │
│  [ic] Settings              │
│  ...                        │
├────────────────────────────┤
│  ┌────────────────────────┐ │  ← team card (sunken, 12px radius)
│  │ [av] Team / Marketing  │ │
│  └────────────────────────┘ │
│  [ Upgrade Plan ]           │  ← white bordered button
└────────────────────────────┘
```

## Implementation

```jsx
import { LayoutDashboard, CreditCard, Users, MessageSquare } from "lucide-react";

const SECTIONS = [
  { label: "General", items: [
    { icon: LayoutDashboard, name: "Dashboard", href: "/" },
    { icon: CreditCard, name: "Payment", href: "/payment" },
    { icon: Users, name: "Customers", href: "/customers" },
    { icon: MessageSquare, name: "Message", href: "/message", count: 8 },
  ]},
  // TOOLS, SUPPORT …
];

function NavItem({ icon: Icon, name, count, badge, active }) {
  return (
    <a
      href="#"
      className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors"
      style={{
        /* WHY active fill is --accent-soft (lavender tint), NOT solid indigo:
           a solid accent block would shout louder than the content. The soft fill
           marks "you are here" while staying quieter than the data. */
        backgroundColor: active ? "var(--accent-soft)" : "transparent",
        /* WHY active text is primary, inactive is secondary, icon goes accent only when active:
           the contrast jump signals location without a loud background. */
        color: active ? "var(--text-primary)" : "var(--text-secondary)",
      }}
    >
      <Icon
        size={18}
        strokeWidth={1.5}
        /* WHY icon recedes to tertiary when inactive: the whole sidebar sits a tier
           below content in contrast. Only the active icon earns the accent. */
        style={{ color: active ? "var(--accent)" : "var(--text-tertiary)" }}
      />
      <span className="flex-1">{name}</span>
      {count != null && (
        <span className="text-[12px] tabular-nums" style={{ color: "var(--text-tertiary)" }}>
          {count}
        </span>
      )}
      {badge && (
        <span
          className="rounded-full px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide"
          style={{ color: "var(--accent)", backgroundColor: "var(--accent-soft)" }}
        >
          {badge}
        </span>
      )}
    </a>
  );
}

export function Sidebar() {
  return (
    <aside
      className="flex h-screen w-60 flex-col bg-white p-4"
      /* WHY a hairline border, not a shadow, divides nav from content:
         a shadow would lift the chrome; a 1px border keeps it flush and quiet. */
      style={{ borderRight: "1px solid var(--border)" }}
    >
      {/* brand row */}
      <div className="flex h-14 items-center gap-2 px-1">
        <span className="grid h-7 w-7 place-items-center rounded-lg" style={{ background: "var(--accent)" }}>
          {/* WHY the ONLY solid-accent block in the sidebar is the logo mark:
              the brand may carry the accent at full strength; navigation may not. */}
          <span className="text-white font-bold">✕</span>
        </span>
        <span className="text-[15px] font-semibold" style={{ color: "var(--text-primary)" }}>Nexus</span>
      </div>

      <nav className="mt-4 flex-1 space-y-6 overflow-y-auto">
        {SECTIONS.map((section) => (
          <div key={section.label} className="space-y-0.5">
            {/* WHY section label is 11px uppercase tertiary: it organizes without
                competing — barely visible until you look for it. */}
            <p
              className="px-2.5 pb-1 text-[11px] font-medium uppercase tracking-[0.06em]"
              style={{ color: "var(--text-tertiary)" }}
            >
              {section.label}
            </p>
            {section.items.map((it) => (
              <NavItem key={it.name} {...it} active={it.name === "Dashboard"} />
            ))}
          </div>
        ))}
      </nav>

      {/* footer: team card + upgrade button */}
      <div className="space-y-3 pt-3">
        <div className="flex items-center gap-2 rounded-xl p-3" style={{ background: "var(--surface-sunken)" }}>
          <div className="h-8 w-8 rounded-lg" style={{ background: "var(--grad-warm)" }} />
          <div className="leading-tight">
            <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>Team</p>
            <p className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>Marketing</p>
          </div>
        </div>
        <button
          className="w-full rounded-lg border bg-white py-2 text-[13px] font-medium transition-colors"
          /* WHY upgrade is a white bordered button, not a solid indigo CTA:
             a filled accent button here would pull the eye out of the content.
             The accent is saved for in-content actions (Export) and links. */
          style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
        >
          Upgrade Plan
        </button>
      </div>
    </aside>
  );
}
```

## Skeleton loading state

The sidebar structure is static (it doesn't depend on async data), so it renders immediately — only async badges/counts skeleton in. If the whole nav is gated on a session fetch, mirror the exact item rows:

```jsx
export function SidebarSkeleton() {
  return (
    <aside className="flex h-screen w-60 flex-col bg-white p-4" style={{ borderRight: "1px solid var(--border)" }}>
      <div className="flex h-14 items-center gap-2 px-1">
        <div className="h-7 w-7 rounded-lg animate-pulse" style={{ background: "var(--surface-sunken)" }} />
        <div className="h-3.5 w-16 rounded animate-pulse" style={{ background: "var(--surface-sunken)" }} />
      </div>
      <div className="mt-4 space-y-6">
        {[4, 3, 3].map((count, s) => (
          <div key={s} className="space-y-1">
            <div className="ml-2.5 h-2.5 w-16 rounded animate-pulse" style={{ background: "var(--surface-sunken)" }} />
            {Array.from({ length: count }).map((_, i) => (
              /* each row matches the real 36px nav-item height: 18px icon + 13px label */
              <div key={i} className="flex items-center gap-2.5 px-2.5 py-2">
                <div className="h-[18px] w-[18px] rounded animate-pulse" style={{ background: "var(--surface-sunken)" }} />
                <div className="h-3 w-24 rounded animate-pulse" style={{ background: "var(--surface-sunken)" }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}
```

## Empty / error note
The sidebar has no empty state (navigation is always present). If a section's items fail to load, show that section's label with a single inline tertiary line "Couldn't load" + a small retry link — never hide the section silently.

## Common mistakes to avoid

- ❌ **Solid indigo fill on the active nav item.** The active state is `--accent-soft` (lavender tint) with primary text. A solid accent block makes the chrome louder than the content — the opposite of the principle.
- ❌ **Equal contrast between active and inactive items.** Inactive text is `--text-secondary`, inactive icons are `--text-tertiary`; active jumps to primary text + accent icon. Without that gap the sidebar competes with the data.
- ❌ **A drop shadow dividing sidebar from content.** Use a 1px `--border` hairline. A shadow lifts the chrome forward.
- ❌ **Coloring every nav icon with the accent.** Only the active icon is accent. All others are tertiary grey — they are wayfinding, not focal points.
- ❌ **A filled accent "Upgrade" CTA.** The footer button is white with a border. The accent is reserved for in-content actions and links so the nav stays quiet.
