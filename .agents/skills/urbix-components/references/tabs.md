# Tabs

Declarative tab navigation built on `@radix-ui/react-tabs`. Two APIs in one export: a high-level declarative `Tabs` that takes an `items` array, and a Radix-style compound `Tabs.Root / Tabs.List / Tabs.Trigger / Tabs.Content` for layouts that need to split triggers and content (e.g., toolbar tabs).

## Status

- Scope: Public Component
- Lifecycle: rc

## Imports

```tsx
import { Tabs } from "@urbetrack/urbix";
import type { TabItem, TabsProps, TabsRootProps } from "@urbetrack/urbix";
```

## Usage

```tsx
<Tabs
  defaultValue="profile"
  items={[
    { value: "profile", label: "Perfil", content: <ProfilePanel /> },
    { value: "notifications", label: "Notificaciones", content: <NotifPanel /> },
  ]}
/>;
```

## API

### Tabs (declarative) — `TabsProps`

Extends `Radix.Tabs.Root` props.

| Prop | Type | Default |
|---|---|---|
| `items` | `TabItem[]` | required |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `defaultValue` | `string` | -- (uncontrolled) |
| `value` | `string` | -- (controlled) |
| `onValueChange` | `(value: string) => void` | -- |
| `className` | `string` | -- (root container is `w-full`) |

```ts
type TabItem = {
  value: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
};
```

### Tabs.Root — `TabsRootProps`

Radix `Tabs.Root` props. Adds a `data-transition-direction` attribute (`"initial" | "forward" | "backward"`) used by `Tabs.Content` for the swipe-in animation.

### Tabs.List

Radix `Tabs.List` props plus `size`. Renders the trigger row.

### Tabs.Trigger

Radix `Tabs.Trigger` props plus `size`. Active triggers render with `text-neutral-800` and a neutral underline; inactive with `text-neutral-500`.

### Tabs.Content

Radix `Tabs.Content` props (including `forceMount`). Only the active panel is mounted by default.

## Patterns

### Controlled

```tsx
const [tab, setTab] = useState("all-users");

<Tabs
  value={tab}
  onValueChange={setTab}
  items={[
    { value: "all-users", label: "Todos", content: <AllTable /> },
    { value: "invited", label: "Invitados", content: <InvitedTable /> },
  ]}
/>;
```

### Tabs with icons

```tsx
<Tabs
  defaultValue="home"
  items={[
    { value: "home", label: "Inicio", icon: <Home />, content: <HomePanel /> },
    { value: "settings", label: "Configuración", icon: <Settings />, content: <SettingsPanel /> },
  ]}
/>
```

### Compound API for DataTable toolbar

When triggers must sit on the toolbar row and content fills the rest:

```tsx
<Tabs.Root value={statusFilter} onValueChange={setStatusFilter}>
  <DataTable data={filteredUsers} columns={columns}>
    <DataTable.Toolbar className="justify-between">
      <Tabs.List size="sm" className="w-auto">
        <Tabs.Trigger value="all" size="sm">Todos</Tabs.Trigger>
        <Tabs.Trigger value="active" size="sm">Activos</Tabs.Trigger>
        <Tabs.Trigger value="inactive" size="sm">Inactivos</Tabs.Trigger>
      </Tabs.List>
      <Button variant="link">Exportar</Button>
    </DataTable.Toolbar>

    {["all", "active", "inactive"].map(status => (
      <Tabs.Content key={status} value={status} className="mt-0">
        <DataTable.Content />
        <DataTable.Pagination type="client" />
      </Tabs.Content>
    ))}
  </DataTable>
</Tabs.Root>
```

### Disabled tab

```tsx
<Tabs
  defaultValue="active"
  items={[
    { value: "active", label: "Activo", content: <Active /> },
    { value: "soon", label: "Próximamente", disabled: true, content: <Soon /> },
  ]}
/>
```

### Force-mount inactive panels

```tsx
<Tabs.Content value="profile" forceMount>{...}</Tabs.Content>
```

## Mistakes

- **Omitting both `defaultValue` and `value`.** Radix Tabs requires one of them; otherwise no tab is active and content stays hidden.
- **Assuming a polished vertical layout.** Radix supports `orientation="vertical"`, but the Urbix wrapper only ships horizontal styling. Vertical use will look unstyled.
- **Expecting inactive panels to remain mounted.** They do not by default. Use `forceMount` on `Tabs.Content` (compound API) when state must persist across tab switches.
- **Setting `size` only on the root with the compound API.** `Tabs.Root` does not propagate `size` to `Tabs.List` / `Tabs.Trigger`; pass `size` on those components directly.

## Related references

- [data-table.md](./data-table.md) — common host for compound tab usage.
- [toggle-group.md](./toggle-group.md) — for picking a value rather than switching panels.

## Source files

- `packages/urbix/src/ui/molecules/tabs/tabs.tsx`
- `packages/urbix/src/ui/molecules/tabs/tabs.context.ts`
- `packages/urbix/src/ui/molecules/tabs/components/tabs-list/`
- `packages/urbix/src/ui/molecules/tabs/components/tabs-trigger/`
- `packages/urbix/src/ui/molecules/tabs/components/tabs-content/`
- `packages/urbix/src/ui/molecules/tabs/status.json`
- `packages/urbix/src/ui/molecules/tabs/tabs.stories.tsx`
