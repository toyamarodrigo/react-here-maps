# Chip

Removable tag/filter chip with five color variants × two styles ×
selected/unselected.

## Status

- Scope: Public Component
- Lifecycle: review

## Imports

```tsx
import { Chip } from "@urbetrack/urbix";
```

## Usage

```tsx
<Chip variant="primary" style="filled" size="md" selected>
  <Chip.Icon><Check /></Chip.Icon>
  <Chip.Text>Activos</Chip.Text>
  <Chip.Close onClose={removeFilter} />
</Chip>
```

## API

### Chip (Root)

| Prop | Type | Default |
|---|---|---|
| `variant` | `"primary" \| "danger" \| "success" \| "warning" \| "light-dark"` | `"primary"` |
| `style` | `"filled" \| "outlined"` | `"filled"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `selected` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `className` | `string` | — |
| `children` | `ReactNode` | required |

Plus `HTMLAttributes<HTMLDivElement>` (except native `style`, which is
shadowed by the variant prop).

`chipVariants` is also exported.

### Variants

5 color variants × 2 styles × selected/unselected = 20 compound variant
combinations. When `selected=true`, filled variants invert (e.g.,
`bg-primary-600 text-white`); outlined variants gain a ring.

| Size | Height | Text |
|---|---|---|
| `sm` | h-5 (20px) | text-xs, icons 12px |
| `md` | h-6 (24px) | text-sm, icons 16px |
| `lg` | h-7 (28px) | text-base, icons 20px |

### `Chip.Icon`

Icon wrapper with `flex-shrink-0`.

| Prop | Type |
|---|---|
| `children` | `ReactNode` |
| `className` | `string` |

### `Chip.Text`

Text wrapper with `flex-1 truncate`.

| Prop | Type |
|---|---|
| `children` | `ReactNode` |
| `className` | `string` |

### `Chip.Close`

Close button. Renders an `X` icon by default.

| Prop | Type |
|---|---|
| `onClose` | `(e: MouseEvent) => void` |
| `children` | `ReactNode` (custom icon) |
| `className` | `string` |

## Patterns

- For active filter rows, render a `Chip.Close` and call back into the
  filter state setter — the chip itself only fires the click event.
- For toggleable categories, treat `selected` as the chip's "is on"
  state; do not wrap in an extra button.

## Mistakes

- **Stuffing native CSS `style` on the root.** The prop is replaced by
  the variant prop of the same name. Use `className` for inline tweaks.
- **Re-implementing the close affordance with a plain `<button>`.**
  Using `Chip.Close` keeps icon sizing and focus styles aligned with
  the chip size.

## Related references

- [badge.md](./badge.md) — non-interactive label.
- [status.md](./status.md) — non-interactive status pill with icon.

## Source files

- `packages/urbix/src/ui/atoms/chip/`
- `packages/urbix/src/ui/atoms/chip/status.json`
