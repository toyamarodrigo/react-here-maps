# Badge

Small status label. Two variants: a rounded rectangle with text, or a
plain colored dot.

## Status

- Scope: Public Component
- Lifecycle: beta

## Imports

```tsx
import { Badge } from "@urbetrack/urbix";
```

## Usage

```tsx
<Badge variant="default" size="md">3</Badge>

<Badge variant="dot" size="lg" aria-label="Estado activo" />
```

## API

| Prop | Type | Default |
|---|---|---|
| `variant` | `"default" \| "dot"` | `"default"` |
| `size` | `"md" \| "lg"` | `"md"` |
| `asChild` | `boolean` | `false` |
| `className` | `string` | — |

`badgeVariants` is also exported for callers that need the raw CVA
function.

### Variants

- **`default`** — rounded rectangle with `bg-primary-100 text-primary`.
  Renders children.
- **`dot`** — circle with no text. Children are automatically cleared.
  Sizes: `md` = 8×8px, `lg` = 10×10px.

## Patterns

- Use `asChild` to render the badge as a link or button while keeping
  the badge styling.
- Pair `variant="dot"` with `aria-label` so screen readers can describe
  the status the dot represents.

## Mistakes

- **Putting children inside `variant="dot"`.** They are stripped at
  render — switch to `variant="default"` if text is required.

## Related references

- [status.md](./status.md) — status pill with icon + text slots.
- [chip.md](./chip.md) — interactive tag/filter chip.

## Source files

- `packages/urbix/src/ui/atoms/badge/`
- `packages/urbix/src/ui/atoms/badge/status.json`
