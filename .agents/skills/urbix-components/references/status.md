# Status

Status pill with optional icon and text slots.

## Status

- Scope: Public Component
- Lifecycle: beta

## Imports

```tsx
import { Status } from "@urbetrack/urbix";
```

`statusVariants` is also exported.

## Usage

```tsx
<Status variant="success" style="filled" size="md">
  <Status.Icon><CheckCircle2 /></Status.Icon>
  <Status.Text>Activo</Status.Text>
</Status>
```

## API

### Status (Root)

| Prop | Type | Default |
|---|---|---|
| `variant` | `"primary" \| "light-dark" \| "danger" \| "success" \| "warning"` | `"primary"` |
| `style` | `"filled" \| "outlined"` | `"filled"` |
| `size` | `"sm" \| "md"` | `"md"` |
| `className` | `string` | — |
| `children` | `ReactNode` | required |

Plus `HTMLAttributes<HTMLDivElement>` (except native `style`).

### Variants

5 color variants × 2 styles = 10 compound combinations.

| Size | Height |
|---|---|
| `sm` | h-5, text-xs, icons 12px |
| `md` | h-6, text-sm, icons 16px |

### Sub-components

- **`Status.Icon`** — icon wrapper with `flex-shrink-0`.
- **`Status.Text`** — text wrapper with `flex-1 truncate`.

## Patterns

- Always include `Status.Text`; the icon alone is rarely descriptive
  enough for assistive tech.
- For interactive filter chips, use [chip.md](./chip.md) instead —
  `Status` is non-interactive by design.

## Mistakes

- **Setting native CSS `style` on the root.** It is replaced by the
  variant prop; use `className` for inline tweaks.

## Related references

- [badge.md](./badge.md) — minimal label or dot.
- [chip.md](./chip.md) — interactive variant with close button.

## Source files

- `packages/urbix/src/ui/atoms/status/`
- `packages/urbix/src/ui/atoms/status/status.json`
