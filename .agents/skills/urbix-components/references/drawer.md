# Drawer

Compound side drawer built on **Vaul**. Default direction is `right`. Provides a structured layout (`Trigger` → `Content` → `Header` + `Body` + `Footer`) and a legacy `UrbeDrawer` wrapper for older call sites.

## Status

- Scope: Public Component
- Lifecycle: review

## Imports

```tsx
import { Drawer, UrbeDrawer } from "@urbetrack/urbix";
import type {
  DrawerContentProps,
  DrawerHeaderProps,
  DrawerSize,
  UrbeDrawerProps,
} from "@urbetrack/urbix";
```

## Usage

```tsx
const [open, setOpen] = useState(false);

<Drawer open={open} onOpenChange={setOpen}>
  <Drawer.Trigger asChild>
    <Button>Filtros</Button>
  </Drawer.Trigger>

  <Drawer.Content size="md">
    <Drawer.Header
      title="Editar filtros"
      subtitle="Ajustá el panel antes de confirmar."
    />
    <Drawer.Body className="p-6">{/* form */}</Drawer.Body>
    <Drawer.Footer>
      <Drawer.Close asChild>
        <Button variant="link">Cancelar</Button>
      </Drawer.Close>
      <Button onClick={() => setOpen(false)}>Aplicar</Button>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer>;
```

## API

### Drawer (root)

Thin wrapper over Vaul `Drawer.Root` with `direction="right"` as the default. Forwards every Vaul prop.

| Prop | Type | Default |
|---|---|---|
| `open` | `boolean` | -- |
| `onOpenChange` | `(open: boolean) => void` | -- |
| `direction` | `"top" \| "bottom" \| "left" \| "right"` | `"right"` |
| `dismissible` | `boolean` | `true` |
| `modal` | `boolean` | Vaul default |
| `container` | `HTMLElement \| null` | -- (custom portal target) |
| `children` | `ReactNode` | required |

### Drawer.Trigger / Drawer.Close

Aliases of `Vaul.Drawer.Trigger` and `Vaul.Drawer.Close`. Use `asChild` to project a custom button.

### Drawer.Content — `DrawerContentProps`

Renders inside `DrawerPortal` with a styled overlay.

| Prop | Type | Default |
|---|---|---|
| `size` | `"sm" \| "md" \| "lg" \| "full"` | `"sm"` |
| `subpanelContainerRef` | `Ref<HTMLDivElement>` | -- (mount point for nested side panels) |
| `className` | `string` | -- |
| ...Vaul `Drawer.Content` props | -- | -- |

Size widths: `sm = 21.625rem`, `md = 32rem`, `lg = 40rem`, `full = 100vw`.

### Drawer.Header — `DrawerHeaderProps`

| Prop | Type | Default |
|---|---|---|
| `title` | `ReactNode` | -- |
| `subtitle` | `ReactNode` | -- |
| `closeLabel` | `string` | `"Close"` (used as `aria-label` and `sr-only` text) |
| `onClose` | `() => void` | -- (when set, renders a manual close button instead of `Drawer.Close`) |
| `showCloseButton` | `boolean` | `true` |
| `children` | `ReactNode` | -- |
| `className` | `string` | -- |
| ...`HTMLAttributes<HTMLDivElement>` (minus `title`) | -- | -- |

### Drawer.Body / Drawer.Footer

Plain `div` wrappers. `Body` is the scrollable region (`flex min-h-0 flex-1 overflow-y-auto`); `Footer` pins to the bottom with `mt-auto`. Both accept all `div` props.

### Drawer.Title / Drawer.Description / Drawer.Overlay / Drawer.Portal / Drawer.NestedRoot

Aliases re-exported from Vaul; useful when composing custom headers or nested drawers.

### UrbeDrawer — `UrbeDrawerProps` (legacy wrapper)

| Prop | Type | Default |
|---|---|---|
| `trigger` | `ReactNode` | -- |
| `title` | `ReactNode` | required |
| `description` | `ReactNode` | -- |
| `footer` | `ReactNode` | -- |
| `children` | `ReactNode` | -- (body) |
| `open` | `boolean` | -- |
| `onOpenChange` | `(open: boolean) => void` | -- |
| `size` | `DrawerSize` | `"sm"` |
| `dismissible` | `boolean` | `true` |
| `container` | `HTMLElement \| null` | -- |

Use only to keep older call sites working while migrating to the compound API.

## Patterns

### Non-dismissible flow

```tsx
<Drawer open={open} onOpenChange={setOpen} dismissible={false}>
  <Drawer.Content size="md">
    <Drawer.Header
      title="Cambios pendientes"
      subtitle="Tenés que confirmar o cancelar."
    />
    <Drawer.Body className="p-6">{/* form */}</Drawer.Body>
    <Drawer.Footer>
      <Button variant="link" onClick={() => setOpen(false)}>Cancelar</Button>
      <Button onClick={handleSubmit}>Guardar</Button>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer>
```

### Full-screen drawer

```tsx
<Drawer.Content size="full">
  <Drawer.Header title="Detalle" />
  <Drawer.Body className="p-6">{/* content */}</Drawer.Body>
</Drawer.Content>
```

### Custom close handler in the header

```tsx
<Drawer.Header
  title="Editar"
  onClose={() => {
    if (formDirty) askToDiscard();
    else setOpen(false);
  }}
/>
```

When `onClose` is provided, the X button is rendered as a manual `Button` rather than wrapped in `Drawer.Close`.

## Mistakes

- **Using `Drawer.Body` without `min-h-0`.** It's already there in the wrapper. The mistake is wrapping it in another flex container without `min-h-0`, which breaks scrolling.
- **Adopting `UrbeDrawer` in new code.** Prefer the compound API. `UrbeDrawer` exists only for migration.
- **Querying drawer DOM from the local canvas.** `Drawer.Content` renders through a portal; tests and Storybook play functions must use `screen` / `document.body` rather than `within(canvasElement)`.
- **Setting `direction="left"` and expecting Urbix sizing.** The size tokens (`sm`/`md`/`lg`/`full`) are tuned for right-side drawers; left-side direction works but visual polish is not validated.

## Related references

- [bottom-sheet.md](./bottom-sheet.md) — Vaul-based bottom sheet for snap-point UIs.
- [dialog.md](./dialog.md) — internal modal primitive.

## Source files

- `packages/urbix/src/ui/molecules/drawer/drawer.tsx`
- `packages/urbix/src/ui/molecules/drawer/drawer-primitives.tsx`
- `packages/urbix/src/ui/molecules/drawer/status.json`
- `packages/urbix/src/ui/molecules/drawer/drawer.stories.tsx`
