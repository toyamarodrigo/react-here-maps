# ToggleGroup

Segmented control built on `@radix-ui/react-toggle-group`. Compound API with `ToggleGroup.Item` and `ToggleGroup.Icon`. Supports horizontal or vertical orientation, single or multiple selection (forwarded to Radix), and three sizes.

## Status

- Scope: Public Component
- Lifecycle: beta

## Imports

```tsx
import { ToggleGroup } from "@urbetrack/urbix";
```

Type-only re-exports also available: `ToggleGroupRootProps`, `ToggleGroupItemProps`, `ToggleGroupIconProps`.

## Usage

```tsx
const [view, setView] = useState("list");

<ToggleGroup type="single" value={view} onValueChange={setView}>
  <ToggleGroup.Item value="list">Lista</ToggleGroup.Item>
  <ToggleGroup.Item value="grid">Grilla</ToggleGroup.Item>
  <ToggleGroup.Item value="map">Mapa</ToggleGroup.Item>
</ToggleGroup>;
```

## API

### ToggleGroup (root) — `ToggleGroupRootProps`

Extends `Radix.ToggleGroup.Root`.

| Prop | Type | Default |
|---|---|---|
| `type` | `"single" \| "multiple"` | required (Radix) |
| `value` / `defaultValue` | `string \| string[]` | -- (depends on `type`) |
| `onValueChange` | Radix callback | -- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `variant` | `"segmented"` | `"segmented"` |
| `disabled` | `boolean` | -- |
| `className` | `string` | -- |

The root provides a context that forwards `size` and `variant` to every `Item`.

### ToggleGroup.Item — `ToggleGroupItemProps`

Extends `Radix.ToggleGroup.Item`. Visual sizing comes from the parent context — do not pass `size` here.

| Prop | Type | Default |
|---|---|---|
| `value` | `string` | required |
| `disabled` | `boolean` | -- |
| `aria-label` | `string` | recommended for icon-only items |
| ...Radix item props | -- | -- |

Active items render with `data-state="on"` (primary background) and stack borders inset (`-ml-px` horizontal / `-mt-px` vertical) so adjacent borders collapse into a clean segmented look. First and last items get rounded corners on the outside edges.

### ToggleGroup.Icon — `ToggleGroupIconProps`

A `<span data-slot="toggle-group-icon">` for wrapping a single SVG inside an item. Sized to `size-4`. When it is the only child of the item, the item collapses to a square (`size-8` / `size-9` / `size-10` based on group `size`) with no padding.

## Patterns

### Icon-only segmented control

```tsx
<ToggleGroup type="single" value={align} onValueChange={setAlign} size="sm">
  <ToggleGroup.Item value="left" aria-label="Alinear a la izquierda">
    <ToggleGroup.Icon><AlignLeft /></ToggleGroup.Icon>
  </ToggleGroup.Item>
  <ToggleGroup.Item value="center" aria-label="Centrar">
    <ToggleGroup.Icon><AlignCenter /></ToggleGroup.Icon>
  </ToggleGroup.Item>
  <ToggleGroup.Item value="right" aria-label="Alinear a la derecha">
    <ToggleGroup.Icon><AlignRight /></ToggleGroup.Icon>
  </ToggleGroup.Item>
</ToggleGroup>
```

### Multi-select

```tsx
<ToggleGroup type="multiple" value={features} onValueChange={setFeatures}>
  <ToggleGroup.Item value="bold">Negrita</ToggleGroup.Item>
  <ToggleGroup.Item value="italic">Itálica</ToggleGroup.Item>
  <ToggleGroup.Item value="underline">Subrayado</ToggleGroup.Item>
</ToggleGroup>
```

### Vertical orientation

```tsx
<ToggleGroup type="single" orientation="vertical" value={mode} onValueChange={setMode}>
  <ToggleGroup.Item value="day">Día</ToggleGroup.Item>
  <ToggleGroup.Item value="week">Semana</ToggleGroup.Item>
  <ToggleGroup.Item value="month">Mes</ToggleGroup.Item>
</ToggleGroup>
```

## Mistakes

- **Setting `size` on `ToggleGroup.Item` directly.** Sizing is read from the root context — passing it on the item has no effect on the variant classes.
- **Forgetting `aria-label` on icon-only items.** With only an icon, screen readers have no accessible name. Always pass `aria-label` to icon-only items.
- **Mixing `type="single"` with array `value`.** Match `type` and value shape (`string` for single, `string[]` for multiple) — Radix will warn otherwise.

## Related references

- [button.md](./button.md) — for non-segmented action buttons.
- [tabs.md](./tabs.md) — when a control switches between content panels rather than picking a value.

## Source files

- `packages/urbix/src/ui/molecules/toggle-group/toggle-group.tsx`
- `packages/urbix/src/ui/molecules/toggle-group/status.json`
- `packages/urbix/src/ui/molecules/toggle-group/toggle-group.stories.tsx`
