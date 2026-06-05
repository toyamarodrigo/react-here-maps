# BaseSelect

Internal virtualized select primitives that power `Dropdown`,
`DropdownMultiple`, and `SideFilterPanel`. Two flavors:

- **`BaseSelectRadio`** — single-selection list backed by
  `react-virtuoso`.
- **`BaseSelectMultiple`** — multi-selection list with optional
  select-all checkbox.

These are not consumer surfaces; reach for `Dropdown` /
`DropdownMultiple` (see [dropdown.md](./dropdown.md) and
[dropdown-multiple.md](./dropdown-multiple.md)) instead. They are
exported from `@urbetrack/urbix/internals` so that other Urbix
components (e.g. side filters) can embed the bare list without the
dropdown chrome.

## Status

- Scope: Internal Component
- Lifecycle: beta

## Imports

```tsx
import {
  BaseSelectRadio,
  BaseSelectMultiple,
  type BaseSelectRadioProps,
  type BaseSelectMultipleProps,
  type Option,
} from "@urbetrack/urbix/internals";
```

## Usage

Embed a virtualized radio list in a custom container:

```tsx
<div className="h-[300px] w-full">
  <BaseSelectRadio
    dataKey="id"
    optionLabel="name"
    options={users}
    value={selected}
    onChange={setSelected}
    filter
  />
</div>
```

Multi-select variant with select-all:

```tsx
<div className="h-[300px] w-full">
  <BaseSelectMultiple
    dataKey="id"
    optionLabel="name"
    options={users}
    value={selectedUsers}
    onChange={setSelectedUsers}
    showSelectAll
  />
</div>
```

## API

Both variants share the core option-list contract used by `Dropdown`:

| Prop | Type | Default |
|---|---|---|
| `dataKey` | `keyof T` | required |
| `options` | `T[]` | required |
| `optionLabel` | `keyof T` | `"label"` |
| `optionValue` | `keyof T` | -- |
| `value` | depends on `optionValue` | -- |
| `onChange` | depends on `optionValue` | -- |
| `filter` | `boolean` | `true` |
| `filterCustom` | `(opt: T, query: string) => boolean` | -- |
| `filterEmptyMessage` | `string` | `"No se encontraron resultados"` |
| `moveSelectedToTop` | `boolean` | `true` |
| `invalidateSortCounter` | `number` | -- |
| `itemTemplate` | `(option: T) => ReactNode` | -- |
| `loading` | `boolean` | `false` |
| `placeholder` | `string` | -- |

`BaseSelectMultiple` adds:

| Prop | Type | Default |
|---|---|---|
| `showSelectAll` | `boolean` | `false` |

### Hooks (also internal)

- `useFilterOptions` — filter predicate sharing.
- `useSortSelectOnTop` — sort-selected-to-top with invalidation counter.
- `useSelectionSingle` / `useSelectionMultiple` — selection bookkeeping.
- `getValueKey(option, { dataKey, optionLabel })` — unique key resolver.

## Patterns

- Wrap the list in a fixed-height container — `Virtuoso` requires a
  bounded height to render rows.
- Pass `invalidateSortCounter` only when `moveSelectedToTop` is enabled
  and you want explicit control over re-sort moments (e.g. avoid the
  list jumping while a multi-select popover is open).

## Mistakes

- **Importing from `@urbetrack/urbix`.** These are not part of the
  public surface. Use `@urbetrack/urbix/internals`.
- **Adopting in product code instead of `Dropdown`.** Consumer features
  should use `Dropdown` / `DropdownMultiple`, which provide the popover
  trigger, accessibility wiring, and product-tested behavior.
- **Omitting the bounded-height wrapper.** Without an explicit height,
  the virtualized list renders 0px tall.

## Related references

- [dropdown.md](./dropdown.md)
- [dropdown-multiple.md](./dropdown-multiple.md)
- [side-filter-panel.md](./side-filter-panel.md)

## Source files

- `packages/urbix/src/ui/molecules/base-select/base-select-radio/`
- `packages/urbix/src/ui/molecules/base-select/base-select-multiple/`
- `packages/urbix/src/ui/molecules/base-select/base-select-radio/status.json`
- `packages/urbix/src/ui/molecules/base-select/base-select-multiple/status.json`
- `packages/urbix/src/ui/molecules/base-select/internals.ts`
