# Checkbox

Controlled/uncontrolled checkbox with indeterminate support, built on
`@radix-ui/react-checkbox`.

## Status

- Scope: Internal Component
- Lifecycle: beta

Product code should prefer `Forms.*` field components or `ListItem`'s
built-in checkbox row. Import this atom only from the internals entrypoint.

## Imports

For internal Urbix work:

```tsx
import { Checkbox } from "@urbetrack/urbix/internals";
```

Source path (when consuming directly inside the package):

```tsx
import { Checkbox } from "@urbix/ui/atoms/checkbox";
```

## Usage

```tsx
<Checkbox
  checked={isSelected}
  onCheckedChange={setIsSelected}
  aria-label="Seleccionar fila"
/>
```

## API

| Prop | Type | Default |
|---|---|---|
| `checked` | `boolean \| "indeterminate"` | — |
| `partialChecked` | `boolean` | — |
| `onCheckedChange` | `(checked: boolean) => void` | — |
| `disabled` | `boolean` | — |
| `className` | `string` | — |

Renders a `Check` icon when `checked === true` and a `Minus` icon when
`checked === "indeterminate"` or `partialChecked` is true.

## Patterns

- Wire `partialChecked` from a parent that tracks "some children
  selected" to display the mixed-state indicator without forcing the
  caller to manage `checked === "indeterminate"` explicitly.
- For form fields with labels, errors, and validation, prefer the
  `Forms` system in [forms.md](./forms.md) over composing this atom by
  hand.

## Mistakes

- **Importing `Checkbox` from the public root.** The root compatibility
  export was removed; use `Forms`, `ListItem`, or the internals entrypoint.

## Related references

- [forms.md](./forms.md) — form-aware checkbox fields.
- [list-item](./foundation.md) — `ListItem` row with built-in checkbox.

## Source files

- `packages/urbix/src/ui/atoms/checkbox/`
- `packages/urbix/src/ui/atoms/checkbox/status.json`
