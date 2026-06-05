# NestedSelect

Hierarchical select with arbitrary tree depth and generic typing for
level and id types. Two flavors:

- **`DropdownNestedRadio`** — single-selection along the tree.
- **`DropdownNestedMultiple`** — multi-selection with indeterminate
  state and optional select-all.

Both render a `Dropdown`-style trigger that opens a tree-list with
expand/collapse, optional filter, and customizable item rendering.

## Status

- Scope: Public Component
- Lifecycle: not declared

## Imports

```tsx
import {
  DropdownNestedRadio,
  DropdownNestedMultiple,
} from "@urbetrack/urbix";
import type {
  NestedSelectNode,
  NestedSelectSelection,
} from "@urbetrack/urbix";
```

For the form-integrated wrappers, see `Forms.DropdownNestedRadio` /
`Forms.DropdownNestedMultiple` in [forms.md](./forms.md).

## Usage

```tsx
type ServiceLevel = "group" | "type";

const options: NestedSelectNode<ServiceLevel, number>[] = [
  {
    id: 1,
    level: "group",
    label: "Alumbrado",
    children: [
      { id: 11, level: "type", label: "Lámpara" },
      { id: 12, level: "type", label: "Columna" },
    ],
  },
  {
    id: 2,
    level: "group",
    label: "Limpieza",
    children: [{ id: 21, level: "type", label: "Barrido" }],
  },
];

const [selected, setSelected] = useState<NestedSelectSelection<ServiceLevel, number>>([]);

<DropdownNestedRadio
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="Seleccionar servicio"
  filter
/>;
```

Multi-select with select-all:

```tsx
<DropdownNestedMultiple
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="Seleccionar servicios"
  showSelectAll
  filter
/>
```

## API

### Data shape

Trees are arrays of `NestedSelectNode<TLevel, TId>`. Each node has an
`id`, a `level` (any string union you choose), and an optional
`children` array.

### Selection shape

`NestedSelectSelection<TLevel, TId>` is an array of selection items.
Each item is `{ id, key, level }` where `key` is an internal,
path-based node key.

```ts
type NestedSelectSelectionItem<TLevel, TId> = {
  id: TId;
  key: string; // internal path key
  level: TLevel;
};

type NestedSelectSelection<TLevel, TId> = NestedSelectSelectionItem<TLevel, TId>[];
```

### `DropdownNestedRadio`

| Prop | Type | Default |
|---|---|---|
| `options` | `NestedSelectNode<TLevel, TId>[]` | required |
| `value` | `NestedSelectSelection<TLevel, TId> \| null` | -- |
| `onChange` | `(value: NestedSelectSelection<TLevel, TId>) => void` | -- |
| `placeholder` | `string` | -- |
| `summaryFormatter` | `NestedSelectSummaryFormatter<TLevel, TId>` | default label |
| `filter` | `boolean` | `false` |
| `filterPlaceholder` | `string` | -- |
| `filterEmptyMessage` | `string` | -- |
| `itemTemplate` | `NestedSelectItemTemplate<TLevel, TId>` | -- |
| `invalid` | `boolean` | -- |
| `disabled` | `boolean` | -- |
| `ariaLabel` | `string` | -- |
| `className` | `string` | -- |
| `controlClassName` | `string` | -- |
| `listClassName` | `string` | -- |
| `rowClassName` | `string` | -- |

### `DropdownNestedMultiple`

Same as `DropdownNestedRadio` plus:

| Prop | Type | Default |
|---|---|---|
| `showSelectAll` | `boolean` | `false` |

Toggling a parent toggles all descendants; partial children selection
renders the parent as indeterminate.

### `BaseNestedSelectRadio` / `BaseNestedSelectMultiple`

Lower-level building blocks exported for cases where you need the
tree list without dropdown chrome (e.g. embedded inside a side
panel). They share `BaseNestedSelectProps` minus the trigger and
`placeholder` / `summaryFormatter` / `invalid` props.

## Patterns

### `summaryFormatter`

Customize the trigger label given the current selection and a
summary object.

```ts
type NestedSelectSummary<TLevel, TId> = {
  allSelected: boolean;
  count: number;
  label: string | null;
  selectedNodes: NestedSelectNode<TLevel, TId>[];
  selection: NestedSelectSelection<TLevel, TId>;
};
```

```tsx
<DropdownNestedMultiple
  options={options}
  value={selected}
  onChange={setSelected}
  summaryFormatter={(_selection, { count, allSelected }) =>
    allSelected ? "Todos" : count === 0 ? "Ninguno" : `${count} seleccionados`}
/>
```

### `itemTemplate`

Customize each row. Receives the node plus a meta object describing
depth, expansion, and selection state.

```ts
type NestedSelectItemMeta<TLevel, TId> = {
  depth: number;
  hasChildren: boolean;
  isExpanded: boolean;
  isIndeterminate: boolean;
  isSelected: boolean;
  node: NestedSelectNode<TLevel, TId>;
  nodeKey: string;
};
```

```tsx
<DropdownNestedRadio
  options={options}
  value={selected}
  onChange={setSelected}
  itemTemplate={(node, { depth, isSelected }) => (
    <div className={cn("flex items-center gap-2", isSelected && "font-semibold")}>
      <span style={{ width: depth * 16 }} />
      <span>{node.label}</span>
    </div>
  )}
/>
```

## Mistakes

- **Matching selection identity by `id` alone.** Selections may
  repeat the same `id` at different levels of the tree; match by
  the path-based `key` instead (e.g. for `Set`s).
- **Treating disabled nodes as selectable.** Nodes with
  `disabled: true` are excluded from `onChange`, select-all, and
  indeterminate calculations — do not rebuild that gating in the
  caller.
- **Expecting `filter` to alter `value`.** Filtering only narrows
  the visible tree; `value` is unchanged.

## Related references

- [dropdown.md](./dropdown.md) — flat single-select.
- [dropdown-multiple.md](./dropdown-multiple.md) — flat multi-select.
- [forms.md](./forms.md) — form-bound nested selects.

## Source files

- `packages/urbix/src/ui/molecules/nested-select/`
