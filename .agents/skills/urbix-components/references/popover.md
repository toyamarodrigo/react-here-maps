# Popover

Floating content panel built on `@radix-ui/react-popover`.

## Status

- Scope: Public Component
- Lifecycle: review

## Imports

```tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from "@urbetrack/urbix";
```

`popoverContentVariants` is also exported.

## Usage

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary">Acciones</Button>
  </PopoverTrigger>
  <PopoverContent size="md" align="start">
    {/* menu items, filters, etc. */}
  </PopoverContent>
</Popover>
```

## API

`Popover`, `PopoverTrigger`, and `PopoverAnchor` accept the standard
Radix Popover props.

### PopoverContent

| Prop | Type | Default |
|---|---|---|
| `size` | `"sm" \| "md" \| "lg" \| "full"` | `"md"` |
| `align` | `"start" \| "center" \| "end"` | `"center"` |
| `sideOffset` | `number` | `4` |

| Size | Width |
|---|---|
| `sm` | w-56 (224px) |
| `md` | w-72 (288px) |
| `lg` | w-96 (384px) |
| `full` | w-full |

## Patterns

- Use `PopoverTrigger asChild` to make a `Button` (or any focusable
  element) the trigger; it preserves the button's styles and focus
  behavior.
- Use `PopoverAnchor` when the trigger is not the visual anchor (e.g.,
  triggered by a list row but anchored to a column header).
- For menu-like content, prefer the `Menu` molecule, which already
  composes Popover with item and section primitives.

## Mistakes

- **Wrapping a `Button` in `PopoverTrigger` without `asChild`.** Two
  nested buttons render and accessibility breaks; always pass
  `asChild`.

## Related references

- [dropdown.md](./dropdown.md) — selection menus built on Popover.
- [tooltip.md](./tooltip.md) — hover/focus hint variant.

## Source files

- `packages/urbix/src/ui/atoms/popover/`
- `packages/urbix/src/ui/atoms/popover/status.json`
