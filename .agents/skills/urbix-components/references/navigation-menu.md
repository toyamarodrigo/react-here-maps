# NavigationMenu

Compound sidebar navigation with collapsible mode, pinned sections, and a floating active indicator that animates between items. Items can be flat or grouped into pinned/scrollable sections.

## Status

- Scope: Public Component
- Lifecycle: dev

## Imports

```tsx
import { NavigationMenu, useNavigationMenu } from "@urbetrack/urbix";
import type {
  NavigationMenuRootProps,
  NavigationMenuItemProps,
  NavigationMenuSectionProps,
  NavigationMenuSeparatorProps,
} from "@urbetrack/urbix";
```

## Usage

```tsx
const [active, setActive] = useState("dashboard");

<NavigationMenu value={active} onValueChange={setActive}>
  <NavigationMenu.Item value="dashboard" icon={<DashboardIcon />}>Dashboard</NavigationMenu.Item>
  <NavigationMenu.Item value="users" icon={<UsersIcon />}>Usuarios</NavigationMenu.Item>
  <NavigationMenu.Item value="reports" icon={<ReportsIcon />}>Reportes</NavigationMenu.Item>
</NavigationMenu>;
```

## API

### NavigationMenu (root) — `NavigationMenuRootProps`

| Prop | Type | Default |
|---|---|---|
| `value` | `string` | required |
| `onValueChange` | `(value: string) => void` | required |
| `collapsed` | `boolean` | `false` (collapses to icon-only mode, ~60px) |
| `className` | `string` | -- |
| `children` | `ReactNode` | required |

When `children` contain at least one `NavigationMenu.Section`, the root delegates layout to those sections. Otherwise it wraps children in a single `<ul role="list">`.

### NavigationMenu.Item — `NavigationMenuItemProps`

| Prop | Type | Default |
|---|---|---|
| `value` | `string` | required |
| `icon` | `ReactNode` | -- |
| `disabled` | `boolean` | `false` (no click, `opacity-50`) |
| `label` | `string` | -- (used for `title` attribute; defaults to text content) |
| `className` | `string` | -- |
| `children` | `ReactNode` | required (label) |

Active item gets `aria-current="page"`.

### NavigationMenu.Section — `NavigationMenuSectionProps`

| Prop | Type | Default |
|---|---|---|
| `pin` | `"top" \| "bottom"` | -- (omit for the scrollable middle section) |
| `className` | `string` | -- |
| `children` | `ReactNode` | required |

The unpinned middle section uses `overflow-y-auto flex-1 min-h-0`; pinned sections do not scroll.

### NavigationMenu.Separator — `NavigationMenuSeparatorProps`

| Prop | Type | Default |
|---|---|---|
| `className` | `string` | -- |

Renders `role="separator"`.

### useNavigationMenu()

Returns `NavigationMenuContextValue`: `activeValue`, `onValueChange`, `collapsed`, `registerItem`, `navRef`, `updateIndicator`. Throws when used outside `<NavigationMenu>`.

## Patterns

### Pinned top + scrollable middle + pinned bottom

```tsx
<NavigationMenu value={active} onValueChange={setActive}>
  <NavigationMenu.Section pin="top">
    <NavigationMenu.Item value="home" icon={<HomeIcon />}>Inicio</NavigationMenu.Item>
  </NavigationMenu.Section>

  <NavigationMenu.Section>
    <NavigationMenu.Item value="users" icon={<UsersIcon />}>Usuarios</NavigationMenu.Item>
    <NavigationMenu.Item value="reports" icon={<ReportsIcon />}>Reportes</NavigationMenu.Item>
  </NavigationMenu.Section>

  <NavigationMenu.Section pin="bottom">
    <NavigationMenu.Separator />
    <NavigationMenu.Item value="settings" icon={<SettingsIcon />}>Configuración</NavigationMenu.Item>
  </NavigationMenu.Section>
</NavigationMenu>
```

### Collapsible sidebar

```tsx
const [collapsed, setCollapsed] = useState(false);

<NavigationMenu value={active} onValueChange={setActive} collapsed={collapsed}>
  <NavigationMenu.Item value="dashboard" icon={<DashboardIcon />}>Dashboard</NavigationMenu.Item>
</NavigationMenu>;
```

The component listens for the `<nav>` `transitionend` event and re-positions the floating indicator only after the width transition completes, so the indicator does not lag mid-collapse.

### React Router integration

```tsx
const location = useLocation();
const navigate = useNavigate();

<NavigationMenu value={location.pathname} onValueChange={navigate}>
  <NavigationMenu.Item value="/dashboard" icon={<DashboardIcon />}>Dashboard</NavigationMenu.Item>
  <NavigationMenu.Item value="/users" icon={<UsersIcon />}>Usuarios</NavigationMenu.Item>
</NavigationMenu>;
```

### Disabled item

```tsx
<NavigationMenu.Item value="billing" icon={<BillingIcon />} disabled>
  Facturación
</NavigationMenu.Item>
```

## Mistakes

- **Mixing flat items with `Section` siblings.** Either all children are sections (each rendering its own `<ul>`) or none are (root wraps in a single `<ul>`). Mixing produces inconsistent layout.
- **Expecting the indicator to follow scroll.** The indicator hides itself when the active item scrolls out of the visible nav area or out of its scrollable section bounds.
- **Forgetting `min-h-0` on the parent flex container.** Without it, the unpinned middle section cannot scroll because the flex item refuses to shrink below content height.
- **Driving `value` from a transient state during navigation transitions.** The indicator updates synchronously on `value` change; pass the resolved active value (e.g., `location.pathname`) rather than an intermediate.

## Related references

- [drawer.md](./drawer.md) — for off-canvas navigation on smaller screens.

## Source files

- `packages/urbix/src/ui/molecules/navigation-menu/navigation-menu.tsx`
- `packages/urbix/src/ui/molecules/navigation-menu/navigation-menu.types.ts`
- `packages/urbix/src/ui/molecules/navigation-menu/components/navigation-menu-item.tsx`
- `packages/urbix/src/ui/molecules/navigation-menu/components/navigation-menu-section.tsx`
- `packages/urbix/src/ui/molecules/navigation-menu/components/navigation-menu-separator.tsx`
- `packages/urbix/src/ui/molecules/navigation-menu/status.json`
- `packages/urbix/src/ui/molecules/navigation-menu/navigation-menu.stories.tsx`
