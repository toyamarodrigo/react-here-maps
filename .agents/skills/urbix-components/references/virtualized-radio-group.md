# VirtualizedRadioGroup

## Status

- Scope: Public Component (deprecated)
- Replacement: use `BaseSelectRadio` from
  `@urbetrack/urbix/internals` (see [base-select.md](./base-select.md)).
- Lifecycle: deprecated

`VirtualizedRadioGroup` predates the `BaseSelectRadio` virtualization
stack. New code MUST use `BaseSelectRadio`, which integrates with the
rest of the dropdown ecosystem (filter input, sort-selected-to-top,
generic option types). For dropdown surfaces use `Dropdown` (see
[dropdown.md](./dropdown.md)) instead of composing the radio list
directly.

## Imports

Migration:

```tsx
// Replace this
import { VirtualizedRadioGroup } from "@urbetrack/urbix";

// With this
import { BaseSelectRadio } from "@urbetrack/urbix/internals";
```

## Usage

Minimal example sufficient to recognize legacy call sites; do not
extend it for new features.

```tsx
<VirtualizedRadioGroup
  value={value}
  onValueChange={setValue}
  items={items}
/>
```

## API

`VirtualizedRadioGroup` accepts the legacy props that existing call
sites pass: `value`, `onValueChange`, `items` (each
`{ value, label }`), `estimatedItemSize`, `overscan`, `className`,
`containerHeight`, `itemVariant`, `appliedValue`, and
`moveSelectedToTop`. Any prop not currently exercised by an existing
call site is out of scope; do not extend the API.

## Patterns

None. Migrate call sites instead of extending behavior here.

## Mistakes

- **Adopting `VirtualizedRadioGroup` in new code.** It is deprecated.
  Use `BaseSelectRadio`.
- **Building a new dropdown around it.** Use `Dropdown`, which already
  composes `BaseSelectRadio` with a popover and trigger.

## Related references

- [base-select.md](./base-select.md) — supported replacement.
- [dropdown.md](./dropdown.md) — preferred dropdown surface.
- [radio-group.md](./radio-group.md) — non-virtualized radio.

## Source files

- `packages/urbix/src/ui/molecules/virtualized-radio-group/virtualized-radio-group.tsx`
