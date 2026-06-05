# RadioGroup

Radix-backed radio group with a compound `RadioGroup.Item` API and
two visual variants (`default`, `hover`). The supported import path
is `@urbetrack/urbix/internals`.

For virtualized radio lists (large option sets), use `BaseSelectRadio`
from [base-select.md](./base-select.md).

## Status

- Scope: Internal Component
- Lifecycle: dev

## Imports

```tsx
import { RadioGroup, RadioGroupItem } from "@urbetrack/urbix/internals";
```

## Usage

```tsx
import { RadioGroup } from "@urbetrack/urbix/internals";
import { useState } from "react";

function VehicleTypePicker() {
  const [type, setType] = useState("auto");

  return (
    <RadioGroup value={type} onValueChange={setType} variant="hover">
      <RadioGroup.Item value="auto" label="Auto" />
      <RadioGroup.Item value="moto" label="Moto" />
      <RadioGroup.Item value="camion" label="Camión" />
    </RadioGroup>
  );
}
```

## API

### `RadioGroup` (root)

| Prop | Type | Default |
|---|---|---|
| `variant` | `"default" \| "hover"` | `"default"` |

Plus all `@radix-ui/react-radio-group` `Root` props (`value`,
`defaultValue`, `onValueChange`, `disabled`, `name`, `required`,
`orientation`, `loop`).

### `RadioGroup.Item` / `RadioGroupItem`

| Prop | Type | Default |
|---|---|---|
| `label` | `ReactNode` | -- |
| `labelPosition` | `"left" \| "right"` | `"right"` |
| `disabled` | `boolean` | -- |
| `id` | `string` | auto-generated via `useId` |
| `variant` | `"default" \| "hover"` | inherited from root |

Plus all Radix `Item` props.

The `variant` prop on `RadioGroupItem` is `@deprecated` — set
`variant` on the root `RadioGroup` instead, which propagates via
`group-data-[variant=…]` selectors.

`RadioGroup.Item` is the recommended access pattern; the named
`RadioGroupItem` export remains for callers that prefer the flat
form.

## Patterns

- Use `variant="hover"` for stacked option layouts where the entire
  row should highlight on hover — adds padding and a hover
  background to each labelled item.
- Omit `label` to render only the radio circle (e.g. inside a custom
  layout where the label lives outside the item).
- For form integration, prefer `Forms` field wrappers (see
  [forms.md](./forms.md)) — they handle Controller wiring and error
  display.

## Mistakes

- **Importing from `@urbetrack/urbix`.** The public compatibility export
  was removed. Use `@urbetrack/urbix/internals`.
- **Setting `variant` on `RadioGroup.Item`.** Deprecated — set it on
  the root and let the data-attribute cascade do the work.

## Related references

- [base-select.md](./base-select.md) — virtualized radio list.
- [forms.md](./forms.md) — form-bound radio fields.

## Source files

- `packages/urbix/src/ui/molecules/radio-group/radio-group.tsx`
- `packages/urbix/src/ui/molecules/radio-group/index.ts`
- `packages/urbix/src/ui/molecules/radio-group/status.json`
- `packages/urbix/src/ui/molecules/radio-group/radio-group.stories.tsx`
