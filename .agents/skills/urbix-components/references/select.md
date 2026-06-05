# Select (deprecated)

Native-style select wrapper built on `@radix-ui/react-select`.

## Status

- Scope: Public Component (deprecated)
- Replacement: use [`Dropdown` / `DropdownMultiple`](./dropdown.md), or
  `Forms.Dropdown` from [forms.md](./forms.md), instead.
- Lifecycle: deprecated

## Imports

```tsx
// @deprecated — use Dropdown or Forms.Dropdown instead
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@urbetrack/urbix";
```

## Usage

Minimal example, only for understanding existing call sites:

```tsx
<Select value={status} onValueChange={setStatus}>
  <SelectTrigger size="default">
    <SelectValue placeholder="Estado" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="active">Activos</SelectItem>
    <SelectItem value="inactive">Inactivos</SelectItem>
  </SelectContent>
</Select>
```

## API

Only the props that legacy callers actually pass are documented. All
other Radix Select props still work but should not anchor new code.

### SelectTrigger extras

| Prop | Type | Default |
|---|---|---|
| `size` | `"sm" \| "default"` | `"default"` |
| `hideIcon` | `boolean` | `false` |

### Other exports

`SelectGroup`, `SelectLabel`, `SelectSeparator`, `SelectScrollUpButton`,
and `SelectScrollDownButton` are re-exports of the Radix primitives
unchanged.

## Patterns

When migrating to the replacement:

- Single-value `Select` → `Dropdown` (or `Forms.Dropdown` inside a form).
- Multi-value patterns built around hidden inputs → `DropdownMultiple`.

## Mistakes

- **Adopting `Select` in new code.** It is deprecated; reach for
  `Dropdown` or `Forms.Dropdown` so future API changes do not require
  rework.

## Related references

- [dropdown.md](./dropdown.md) — replacement single/multi select.
- [forms.md](./forms.md) — form-aware dropdown fields.

## Source files

- `packages/urbix/src/ui/atoms/select/`
