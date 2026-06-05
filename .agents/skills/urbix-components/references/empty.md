# Empty

Low-level empty-state primitive (header, media, title, description,
content slots) plus a `SimpleEmpty` convenience component.

## Status

- Scope: Source-only Component
- Lifecycle: not declared

`Empty` is not re-exported from `@urbetrack/urbix` or `internals`.
Product code should reach for the molecule
[empty-state](./empty-state.md) first; this primitive exists for
contributor context inside the package.

## Imports

```tsx
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  SimpleEmpty,
} from "@urbix/ui/atoms/empty";
```

## Usage

```tsx
<Empty surface="card" variant="default">
  <EmptyHeader>
    <EmptyMedia variant="icon"><MdOutlineLayersClear size={32} /></EmptyMedia>
    <EmptyTitle>Sin resultados</EmptyTitle>
    <EmptyDescription>No se encontraron datos para mostrar.</EmptyDescription>
  </EmptyHeader>
</Empty>
```

## API

### Empty (Root)

| Prop | Type | Default |
|---|---|---|
| `surface` | `"card" \| "plain"` | `"card"` |
| `variant` | `"default" \| "destructive" \| "muted"` | `"default"` |
| `className` | `string` | — |

`surface="card"` renders the dashed container shell. `surface="plain"`
keeps the layout structure without border, background, padding, or
radius.

### Sub-components

- **EmptyHeader** — flex column container for icon + title + description.
- **EmptyMedia** — icon/image container. `variant?: "icon" | "image"`.
- **EmptyTitle** — `<h2>` styled heading.
- **EmptyDescription** — `<p>` styled text.
- **EmptyContent** — additional content area below header.

### SimpleEmpty

| Prop | Type | Default |
|---|---|---|
| `icon` | `ReactNode` | `<MdOutlineLayersClear size={32} />` |
| `title` | `string` | `"Sin resultados"` |
| `description` | `string` | `"No se encontraron datos para mostrar."` |
| `surface` | `"card" \| "plain"` | `"card"` |
| `variant` | `"default" \| "destructive" \| "muted"` | `"default"` |
| `children` | `ReactNode` | — |

## Patterns

- Use `SimpleEmpty` when the standard "icon + Sin resultados + texto"
  shape is enough.
- Drop down to the compound (`Empty` + slots) only when an additional
  CTA, custom media, or non-default copy is required.

## Mistakes

- **Reaching for `Empty` from product code.** It is source-only — use
  the [empty-state molecule](./empty-state.md) so caller code stays on a
  supported import path.

## Related references

- [empty-state.md](./empty-state.md) — public empty-state molecule with
  shorthand props and help-contact slot.

## Source files

- `packages/urbix/src/ui/atoms/empty/empty.tsx`
- `packages/urbix/src/ui/atoms/empty/index.ts`
