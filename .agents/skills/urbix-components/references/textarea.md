# Textarea

Multi-line text input.

## Status

- Scope: Public Component
- Lifecycle: dev

## Imports

```tsx
import { Textarea } from "@urbetrack/urbix";
```

## Usage

```tsx
<Textarea
  size="md"
  placeholder="Observaciones"
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
/>
```

## API

| Prop | Type | Default |
|---|---|---|
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` |
| `invalid` | `boolean` | — |
| `readOnly` | `boolean` | — |
| `disabled` | `boolean` | — |
| `className` | `string` | — |

Plus all `ComponentProps<"textarea">`.

### Sizes (`textareaStyles`)

Same size scale as Input (without fixed heights — textarea grows
vertically). Boolean variants: `readOnly`, `disabled`, `invalid`.

## Patterns

- Pair with `FieldLabel` / `FieldError` from [field.md](./field.md) for
  standalone use, or wrap inside `Forms.Textarea` for form integration.
- Use `invalid` to drive the error border without changing layout —
  preferred over toggling a custom `className`.

## Mistakes

- **Setting native `rows` to control height.** Prefer the `size`
  variant; if a specific row count is required, set `rows` and let the
  textarea grow from there rather than locking height in CSS.

## Related references

- [forms.md](./forms.md) — `Forms.Textarea` for form integration.
- [input.md](./input.md) — single-line counterpart.

## Source files

- `packages/urbix/src/ui/atoms/textarea/`
- `packages/urbix/src/ui/atoms/textarea/status.json`
