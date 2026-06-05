# InputGroup

Composable input wrapper that supports addons (icons, buttons, text)
on all four sides. Powers the public `Input` molecule and `SearchBar`,
and is the right primitive whenever a single text input needs more
than one adornment.

Although `status.json` marks `InputGroup` as internal scope, the
package barrel re-exports it from `@urbetrack/urbix`. Treat it as
the supported building block for adornment-rich inputs; do not
reimplement focus/error layouts around the atom `Input`.

## Status

- Scope: Internal Component
- Lifecycle: dev

## Imports

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@urbetrack/urbix";
```

## Usage

```tsx
import { MdClose, MdSearch } from "react-icons/md";

<InputGroup>
  <InputGroupAddon align="inline-start">
    <MdSearch className="size-5 text-neutral-400" />
  </InputGroupAddon>
  <InputGroupInput placeholder="Buscar vehiculo..." />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="icon-xs" onClick={handleClear}>
      <MdClose />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

`InputGroup` propagates focus, error, disabled, and read-only states
via CSS `has-[]` selectors keyed on child `data-slot` attributes.

## API

### `InputGroup` (root)

| Prop | Type | Default |
|---|---|---|
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` |
| `className` | `string` | -- |

### `InputGroupAddon`

| Prop | Type | Default |
|---|---|---|
| `align` | `"inline-start" \| "inline-end" \| "block-start" \| "block-end"` | `"inline-start"` |

### `InputGroupButton`

| Prop | Type | Default |
|---|---|---|
| `size` | `"xs" \| "sm" \| "icon-xs" \| "icon-sm"` | `"xs"` |
| `variant` | Button variants | `"link"` |

Plus all `Button` props (see [button.md](./button.md)).

### `InputGroupInput`

Renders the atom `Input` with border/shadow removed for seamless
embedding inside the group. Forwards every native `<input>` prop.

### `InputGroupTextarea`

Renders the atom `Textarea` with border/shadow removed. Forwards every
native `<textarea>` prop.

### `InputGroupText`

Static text addon (e.g. unit labels). Forwards `<span>` props.

## Patterns

- For a single icon adornment, prefer the `Input` molecule (see
  [input.md](./input.md)) over assembling `InputGroup` directly.
- For debounced search-with-clear, use `SearchBar` (see
  [search-bar.md](./search-bar.md)); it already composes
  `InputGroup`.
- Place `block-start` / `block-end` addons when stacking helper text
  or unit toggles above/below the input row.

## Mistakes

- **Wrapping atom `Input` in `<div>`s to add icons.** Use
  `InputGroupAddon` so focus/error/disabled state propagation works.
- **Nesting buttons in addons without `InputGroupButton`.** The
  styles assume the button reports the right `data-slot`, otherwise
  spacing and focus rings drift.
- **Mixing `size` between `InputGroup` and `InputGroupButton` /
  `InputGroupInput`.** The root `size` already cascades; do not
  override it on children unless intentionally diverging.

## Related references

- [input.md](./input.md) — single-icon convenience wrapper.
- [input-atom.md](./input-atom.md) — internal atom primitive.
- [search-bar.md](./search-bar.md) — debounced search built on this.
- [textarea.md](./textarea.md) — multi-line counterpart.
- [button.md](./button.md) — variants accepted by `InputGroupButton`.

## Source files

- `packages/urbix/src/ui/molecules/input-group/input-group.tsx`
- `packages/urbix/src/ui/molecules/input-group/status.json`
- `packages/urbix/src/ui/molecules/input-group/input-group.stories.tsx`
