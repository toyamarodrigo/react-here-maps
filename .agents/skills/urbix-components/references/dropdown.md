# Dropdown

Single-select dropdown built on `BaseSelectRadio`. Generic over the
option shape; supports `optionValue` for primitive selections,
custom `itemTemplate`, and an optional filter input inside the
popover.

For multi-select see [dropdown-multiple.md](./dropdown-multiple.md);
for tree-shaped options see [nested-select.md](./nested-select.md).
`Dropdown` is the supported single-select API for option-list use cases.

## Status

- Scope: Public Component
- Lifecycle: beta

## Imports

```tsx
import { Dropdown } from "@urbetrack/urbix";
import type { IDefaultOption } from "@urbetrack/urbix";
```

For form integration:

```tsx
import { Forms } from "@urbetrack/urbix";
// Forms.Dropdown
```

## Usage

```tsx
import type { IDefaultOption } from "@urbetrack/urbix";
import { Dropdown } from "@urbetrack/urbix";
import { useState } from "react";

const options: IDefaultOption[] = [
  { label: "Argentina", value: 1 },
  { label: "Brasil", value: 2 },
  { label: "Chile", value: 3 },
];

function CountryPicker() {
  const [selected, setSelected] = useState<IDefaultOption | undefined>(undefined);

  return (
    <Dropdown
      dataKey="value"
      options={options}
      value={selected}
      onChange={setSelected}
    />
  );
}
```

When no `optionValue` is set, `onChange` receives the full option
object; the state type is `IDefaultOption | undefined`.

## API

| Prop | Type | Default |
|---|---|---|
| `dataKey` | `keyof T` | required |
| `options` | `T[]` | required |
| `optionLabel` | `keyof T` | `"label"` |
| `optionValue` | `keyof T` | -- |
| `value` | `T \| undefined` or `T[Key] \| undefined` when `optionValue` is set | -- |
| `onChange` | `(value: T \| undefined) => void` (matches `value`) | -- |
| `filter` | `boolean` | `true` |
| `filterCustom` | `(opt: T, query: string) => boolean` | -- |
| `filterEmptyMessage` | `string` | `"No se encontraron resultados"` |
| `moveSelectedToTop` | `boolean` | `true` |
| `itemTemplate` | `(option: T) => ReactNode` | -- |
| `loading` | `boolean` | `false` |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` |
| `placeholder` | `string` | `"Seleccionar"` |
| `filterPlaceholder` | `string` | -- |
| `invalid` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

### Generic typing with `optionValue`

```tsx
type IPais = { code: string; name: string };

const [code, setCode] = useState<string | undefined>(undefined);

<Dropdown<IPais, "code">
  dataKey="code"
  optionLabel="name"
  optionValue="code"
  options={paises}
  value={code}
  onChange={setCode}
/>
```

`Dropdown<T, Key>` makes `value` and `onChange` operate on `T[Key]`
(e.g. `string`) instead of the full `T`.

## Patterns

### Custom item template

```tsx
<Dropdown
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

`itemTemplate` replaces only label rendering — the radio control and
selection logic remain in `BaseSelectRadio`.

### Custom filter

```tsx
<Dropdown
  dataKey="id"
  optionLabel="name"
  options={users}
  filterCustom={(user, query) =>
    user.name.toLowerCase().includes(query.toLowerCase())
    || user.email.toLowerCase().includes(query.toLowerCase())}
  value={selected}
  onChange={setSelected}
/>
```

### Forms integration

```tsx
<Forms.Dropdown<IPais>
  name="country"
  label="Country"
  required
  dataKey="code"
  optionLabel="name"
  options={paises}
/>
```

`Forms.Dropdown` adds React Hook Form `Controller` wiring plus
`label`, `helpText`, `helpTooltip`, `required`, and automatic error
display from validation state.

## Mistakes

- **Reintroducing removed legacy select APIs.** Use `Dropdown` for
  single-select and `DropdownMultiple` for multi-select workflows.
- **Missing `dataKey`.** Required for stable virtualized identity and
  selection tracking. Without it, `getValueKey` cannot resolve a
  unique key.
- **Wrong `value` type with `optionValue`.** When
  `optionValue="code"`, state must be `string | undefined` (the type
  of `T["code"]`), not `T | undefined`. Match the second generic
  parameter to the `optionValue` field.
- **Forgetting `optionLabel` when items lack a `label` field.**
  Defaults to `"label"`. Otherwise rows render `"unknown field"`
  because `option["label"]` is undefined.

## Related references

- [dropdown-multiple.md](./dropdown-multiple.md) — multi-select.
- [nested-select.md](./nested-select.md) — tree-shaped options.
- [base-select.md](./base-select.md) — internal list primitive.
- [dropdown-trigger.md](./dropdown-trigger.md) — trigger styling.
- [forms.md](./forms.md) — form-bound wrappers.

## Source files

- `packages/urbix/src/ui/molecules/dropdown/dropdown.tsx`
- `packages/urbix/src/ui/molecules/dropdown/status.json`
- `packages/urbix/src/ui/molecules/dropdown/dropdown.stories.tsx`
