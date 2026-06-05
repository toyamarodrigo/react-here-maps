# Input (atom)

Low-level text input primitive used by `Forms.InputText` and the
`InputGroup` / `Input` molecules. Distinct from the public `Input`
molecule documented in [input.md](./input.md).

## Status

- Scope: Internal Component
- Lifecycle: dev

## Imports

For internal Urbix work:

```tsx
import { Input } from "@urbetrack/urbix/internals";
```

For forms, prefer `Forms` from [forms.md](./forms.md). For standalone
usage with addons, use the `InputGroup` molecule.

## Usage

```tsx
<Input id="patente" size="md" placeholder="ABC-123" />
```

## API

| Prop | Type | Default |
|---|---|---|
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` |
| `invalid` | `boolean` | — |
| `className` | `string` | — |

Plus all `ComponentProps<"input">` (except native `size`, which is
shadowed by the variant prop).

### Sizes (`inputVariants`)

| Size | Height |
|---|---|
| `xs` | 32px |
| `sm` | 36px |
| `md` | 40px |
| `lg` | 44px |

Boolean variants: `readOnly`, `disabled`, `invalid`.

## Patterns

- Pair with `FieldLabel`/`FieldContent`/`FieldError` from
  [field.md](./field.md) for accessible standalone inputs.
- Reach for `InputGroup` (molecule) when adornments such as left/right
  icons or trailing buttons are needed; do not stack divs around `Input`
  to fake those affordances.

## Mistakes

- **Setting native `size` on the input.** It is replaced by the variant
  prop; pass `htmlSize` via spread props if the HTML attribute is
  genuinely needed.
- **Adopting `Input` from product code.** Use `Forms.InputText` so
  validation, labels, and errors wire through React Hook Form.

## Related references

- [forms.md](./forms.md) — public form system.
- [field.md](./field.md) — label/error primitives that pair with `Input`.

## Source files

- `packages/urbix/src/ui/atoms/input/`
- `packages/urbix/src/ui/atoms/input/status.json`
