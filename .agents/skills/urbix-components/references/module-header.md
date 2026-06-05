# ModuleHeader

Page-level header used at the top of a module/route. Renders a title, an optional Back button (wired to `react-router`'s `useNavigate(-1)`), and a slot for action buttons on the right.

## Status

- Scope: Public Component
- Lifecycle: not declared

## Imports

```tsx
import { ModuleHeader } from "@urbetrack/urbix";
```

The component calls `useNavigate()` from `react-router`, so it must be rendered inside a router provider.

## Usage

```tsx
<ModuleHeader title="Empleados" hasBack>
  <Button variant="link">Exportar</Button>
  <Button>Nuevo empleado</Button>
</ModuleHeader>
```

## API

| Prop | Type | Default |
|---|---|---|
| `title` | `string` | required |
| `hasBack` | `boolean` | `false` (renders a left arrow `Button` that calls `navigate(-1)`) |
| `children` | `ReactNode` | -- (rendered inside a right-aligned `<section>` with `gap-6`) |

## Patterns

### Title only

```tsx
<ModuleHeader title="Reportes" />
```

### With actions

```tsx
<ModuleHeader title="Detalle" hasBack>
  <Button variant="link">Cancelar</Button>
  <Button>Guardar</Button>
</ModuleHeader>
```

## Mistakes

- **Rendering outside a router context.** The Back button calls `react-router`'s `useNavigate`, which throws when there is no `<RouterProvider>` / `<BrowserRouter>` ancestor.
- **Passing `ReactNode` as `title`.** The prop type is `string`. For richer headings, compose a custom header instead.
- **Expecting customization of the back behavior.** `hasBack` is hard-wired to `navigate(-1)`; if you need a custom destination, render your own `Button.Icon` next to the title.

## Related references

- [button.md](./button.md) — used internally for Back and action buttons.

## Source files

- `packages/urbix/src/ui/molecules/module-header/module-header.tsx`
