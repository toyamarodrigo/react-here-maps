# Menu

Hierarchical, optionally-searchable, optionally-virtualized menu used inside dropdowns, popovers, and side filter panels for category/filter selection. Items can nest arbitrarily through `MenuItem.items`.

## Status

- Scope: Public Component
- Lifecycle: not declared

## Imports

```tsx
import { Menu } from "@urbetrack/urbix";
import type { MenuItem } from "@urbetrack/urbix";
```

The package barrel also re-exports `Submenu` and `VirtualizedMenu` from the same module for advanced compositions.

## Usage

```tsx
const items: MenuItem[] = [
  {
    value: "vehicles",
    label: "Vehículos",
    items: [
      { value: "cars", label: "Automóviles" },
      { value: "trucks", label: "Camiones" },
    ],
  },
  {
    value: "electronics",
    label: "Electrónica",
    items: [
      { value: "phones", label: "Teléfonos" },
      { value: "laptops", label: "Computadoras" },
    ],
  },
];

function Filter() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Menu
      searchable
      items={items}
      selectedItems={selected}
      onSelectedItemsChange={setSelected}
      inputPlaceholder="Buscar categoría..."
    />
  );
}
```

## API

### Menu — `MenuProps`

| Prop | Type | Default |
|---|---|---|
| `items` | `MenuItem[]` | required |
| `searchable` | `boolean` | `false` |
| `inputPlaceholder` | `string` | `"Buscar"` |
| `selectedItems` | `string[]` | -- (controlled selection by `value`) |
| `onSelectedItemsChange` | `(items: string[]) => void` | -- |
| `appliedSelectedItems` | `string[]` | `[]` (drives separator + sort behavior) |
| `moveSelectedToTop` | `boolean` | `false` |

### MenuItem

```ts
type MenuItem = {
  value: string;
  label: string;
  items?: MenuItem[];
};
```

Leaf nodes are checkable; nodes with `items` expand into a submenu.

### Submenu and VirtualizedMenu

Both are re-exported from `@urbetrack/urbix` (via `./components/submenu` and `./components/virtualized-menu`). `Submenu` is the recursive node renderer used internally by `Menu`. `VirtualizedMenu` is a virtualized variant for very large flat lists. See source for their exact prop shapes.

## Patterns

### Two-stage selection (pending vs applied)

`appliedSelectedItems` represents the last "applied" snapshot — typically what's been confirmed via an Apply button. Passing it lets the menu render a separator between applied selections at the top and the rest, and (with `moveSelectedToTop`) keeps applied entries pinned.

```tsx
<Menu
  items={items}
  selectedItems={pending}
  onSelectedItemsChange={setPending}
  appliedSelectedItems={applied}
  moveSelectedToTop
/>
```

### Search with auto-expand

When `searchable` is set and the user types into the input, every parent of a matching leaf is expanded automatically — manual `expandedItems` state is ignored while there is an active query.

## Mistakes

- **Treating `appliedSelectedItems` as the controlled selection.** Selection is `selectedItems` / `onSelectedItemsChange`. `appliedSelectedItems` only affects sort and separator rendering.
- **Mutating items inline.** `items` should be a stable reference; the hierarchical filter recomputes on every change.
- **Reaching for `VirtualizedMenu` for nested data.** Virtualization is intended for flat lists; nested trees should use `Menu` (which delegates to `Submenu`).

## Related references

- [side-filter-panel.md](./side-filter-panel.md) — common host for `Menu`.
- [dropdown.md](./dropdown.md) — alternative for single-select option lists.
- [dropdown-multiple.md](./dropdown-multiple.md) — alternative for flat multi-select.

## Source files

- `packages/urbix/src/ui/molecules/menu/menu.tsx`
- `packages/urbix/src/ui/molecules/menu/components/submenu/submenu.tsx`
- `packages/urbix/src/ui/molecules/menu/components/virtualized-menu/virtualized-menu.tsx`
- `packages/urbix/src/ui/molecules/menu/components/menu-search-input.tsx`
- `packages/urbix/src/ui/molecules/menu/menu.stories.tsx`
