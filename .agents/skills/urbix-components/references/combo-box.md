# ComboBox

## Status

- Scope: Public Component (deprecated)
- Replacement: use `DropdownMultiple` (see
  [dropdown-multiple.md](./dropdown-multiple.md)) instead.
- Lifecycle: deprecated

`ComboBox` predates the virtualized base-select stack. New code MUST
use `DropdownMultiple`, which provides generic typing, virtualization,
sort-selected-to-top, and consistent trigger behavior.

## Imports

Migration:

```tsx
// Replace this
import { ComboBox } from "@urbetrack/urbix";

// With this
import { DropdownMultiple } from "@urbetrack/urbix";
```

For form integration use `Forms.DropdownMultiple` from
[forms.md](./forms.md).

## Usage

Minimal example sufficient to recognize legacy call sites; do not
extend it for new features.

```tsx
<ComboBox
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="Seleccionar"
/>
```

## API

`ComboBox` accepts the legacy props that existing call sites pass
(`options`, `value`, `onChange`, `placeholder`, label/help props from
the legacy form layer). Treat any prop not used by an existing call
site as out of scope; do not introduce new props.

## Patterns

None. Migrate call sites instead of extending behavior here.

## Mistakes

- **Adopting `ComboBox` in new code.** It is deprecated. Use
  `DropdownMultiple`.
- **Layering form behavior on top of `ComboBox`.** Use
  `Forms.DropdownMultiple` and remove the legacy wrapper at the same
  time.

## Related references

- [dropdown-multiple.md](./dropdown-multiple.md) — supported replacement.
- [dropdown.md](./dropdown.md) — single-select counterpart.
- [forms.md](./forms.md) — form-bound dropdown wrappers.

## Source files

- `packages/urbix/src/ui/molecules/combo-box/combo-box.tsx`
- `packages/urbix/src/ui/molecules/combo-box/combo-box.stories.tsx`
