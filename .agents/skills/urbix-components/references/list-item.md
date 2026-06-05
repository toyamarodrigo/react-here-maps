# ListItem

Single row used in lists, menus, and selection panels. Renders an optional checkbox, optional left/right icons, a primary label, and up to two description lines. Hover and click handling are built in.

## Status

- Scope: Public Component
- Lifecycle: not declared

## Imports

```tsx
import { ListItem } from "@urbetrack/urbix";
```

## Usage

```tsx
<ListItem
  description="Última conexión hace 5 min"
  leftIcon={<UserIcon />}
  rightIcon={<ChevronRightIcon />}
  onClick={() => navigate(`/users/${user.id}`)}
>
  {user.name}
</ListItem>
```

With checkbox:

```tsx
<ListItem
  checkbox
  checked={selected}
  onChecked={setSelected}
  checkOnClick
  description="Vehículos"
>
  Camiones
</ListItem>
```

## API

| Prop | Type | Default |
|---|---|---|
| `children` | `ReactNode` | required (primary label) |
| `description` | `string` | -- |
| `secondaryDescription` | `string` | -- |
| `leftIcon` | `ReactNode` | -- |
| `rightIcon` | `ReactNode` | -- |
| `checkbox` | `boolean` | `false` |
| `checked` | `CheckedState` (`boolean \| "indeterminate"`) | -- |
| `onChecked` | `(checked: boolean) => void` | -- |
| `checkOnClick` | `boolean` | `false` (when `true`, clicking the row toggles the checkbox) |
| `onClick` | `() => void` | -- |
| `disabled` | `boolean` | `false` |
| `className` | `string` | -- (applied to the primary label `<span>`) |

The whole row is hover-highlighted (`hover:bg-neutral-100`) and uses `cursor-pointer`. The label area is a `<button type="button">`; `leftIcon` and `rightIcon` are rendered outside the button.

## Patterns

### Click-to-toggle

```tsx
const [checked, setChecked] = useState(false);

<ListItem
  checkbox
  checkOnClick
  checked={checked}
  onChecked={setChecked}
>
  Activar notificaciones
</ListItem>;
```

`checkOnClick` makes the row toggle the checkbox when clicked anywhere — useful inside selection menus.

### Disabled row

```tsx
<ListItem disabled checkbox checked={false}>
  Plan empresarial
</ListItem>
```

`disabled` greys out the labels and disables the checkbox; the click handler still fires unless you guard it.

## Mistakes

- **Using `className` to style the row.** `className` only applies to the primary label `<span>`. For row layout, wrap `ListItem` or extend the component.
- **Calling `onChecked` without `checkbox`.** `onChecked` is wired only when `checkbox` is `true`.
- **Forgetting `checkOnClick` and being surprised the row click does not toggle.** Without it, only clicking the checkbox toggles selection.

## Related references

- [menu.md](./menu.md) — hierarchical menu that internally renders rows similar to `ListItem`.
- [checkbox.md](./checkbox.md) — primitive used by the row when `checkbox` is set.

## Source files

- `packages/urbix/src/ui/molecules/list-item/list-item.tsx`
- `packages/urbix/src/ui/molecules/list-item/list-item.stories.tsx`
