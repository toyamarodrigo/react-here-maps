# DropdownMultiple

Multi-select dropdown built on `BaseSelectMultiple`. Renders selected
items as removable chips inside a `DropdownTrigger`. Generic over the
option shape; supports `optionValue` for primitive selections and
`showSelectAll` for bulk selection.

For single-select, see [dropdown.md](./dropdown.md). For tree-shaped
options, see [nested-select.md](./nested-select.md).

## Status

- Scope: Public Component
- Lifecycle: beta

## Imports

```tsx
import { DropdownMultiple } from "@urbetrack/urbix";
import type { IDefaultOption } from "@urbetrack/urbix";
```

For form integration:

```tsx
import { Forms } from "@urbetrack/urbix";
// Forms.DropdownMultiple
```

## Usage

```tsx
import { DropdownMultiple } from "@urbetrack/urbix";
import { useState } from "react";

type IBarrio = { id: number; value: string };

const barrios: IBarrio[] = [
  { id: 1, value: "Palermo" },
  { id: 2, value: "Recoleta" },
  { id: 3, value: "Belgrano" },
];

function BarrioPicker() {
  const [selected, setSelected] = useState<IBarrio[]>([]);

  return (
    <DropdownMultiple
      dataKey="id"
      optionLabel="value"
      options={barrios}
      value={selected}
      onChange={setSelected}
      showSelectAll
    />
  );
}
```

Selected items render as `Chip`s inside the trigger; their close
buttons remove the item from `value`.

## API

Inherits the full `BaseSelectMultiple` prop surface plus:

| Prop | Type | Default |
|---|---|---|
| `placeholder` | `string` | `"Seleccionar"` |
| `filterPlaceholder` | `string` | -- |
| `invalid` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `showSelectAll` | `boolean` | `false` |

Inherited from base-select (subset; see
[base-select.md](./base-select.md) for the complete contract):

| Prop | Type | Default |
|---|---|---|
| `dataKey` | `keyof T` | required |
| `options` | `T[]` | required |
| `optionLabel` | `keyof T` | `"label"` |
| `optionValue` | `keyof T` | -- |
| `value` | `T[]` or `T[Key][]` when `optionValue` is set | -- |
| `onChange` | `(value: T[] | T[Key][]) => void` | -- |
| `filter` | `boolean` | `true` |
| `moveSelectedToTop` | `boolean` | `true` |
| `itemTemplate` | `(option: T) => ReactNode` | -- |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` |

### Generic typing with `optionValue`

```tsx
type IEtiqueta = { etiqueta: string; valor: number };

const [selected, setSelected] = useState<number[]>([]);

<DropdownMultiple<IEtiqueta, "valor">
  dataKey="valor"
  optionLabel="etiqueta"
  optionValue="valor"
  options={options}
  value={selected}
  onChange={setSelected}
/>
```

`Dropdown<T, Key>` makes `value` and `onChange` operate on `T[Key]`
rather than `T`.

## Patterns

### Forms integration

```tsx
<Forms.DropdownMultiple<IPais>
  name="visitedCountries"
  label="Visited Countries"
  dataKey="code"
  optionLabel="name"
  options={paises}
  showSelectAll
/>
```

`Forms.DropdownMultiple` adds React Hook Form `Controller` wiring
plus `label`, `helpText`, `helpTooltip`, `required`, and automatic
error display.

### Custom item template

```tsx
<DropdownMultiple
  dataKey="id"
  optionLabel="name"
  options={users}
  value={selected}
  onChange={setSelected}
  itemTemplate={user => (
    <div className="flex flex-col">
      <span className="font-medium">{user.name}</span>
      <span className="text-xs text-neutral-500">{user.email}</span>
    </div>
  )}
/>
```

## Mistakes

- **Recreating legacy ComboBox ordering by accident.** Decide whether
  `showSelectAll` and `moveSelectedToTop` apply for the feature; both
  default to `false` / `true` respectively.
- **Wrong `value` type when using `optionValue`.** When
  `optionValue="code"`, state must be `string[]`, not `T[]`. Match
  the second generic parameter to the `optionValue` field.
- **Missing `dataKey`.** Required for stable virtualized identity
  and selection tracking.
- **Forgetting `optionLabel` when items lack a `label` field.**
  Defaults to `"label"`; otherwise items render `"unknown field"`.

## Related references

- [dropdown.md](./dropdown.md) — single-select counterpart.
- [base-select.md](./base-select.md) — internal list primitive.
- [dropdown-trigger.md](./dropdown-trigger.md) — trigger styling.
- [forms.md](./forms.md) — form-bound wrappers.
- [chip.md](./chip.md) — selected-item rendering.

## Source files

- `packages/urbix/src/ui/molecules/dropdown-multiple/dropdown-multiple.tsx`
- `packages/urbix/src/ui/molecules/dropdown-multiple/status.json`
- `packages/urbix/src/ui/molecules/dropdown-multiple/dropdown-multiple.stories.tsx`
