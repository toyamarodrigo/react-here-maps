# Tile

Selectable choice card built on top of `Field`/`FieldLabel` for native
form integration via `htmlFor`. Pairs with `RadioGroup` or `Checkbox`
(the selected style activates from `data-state=checked` on a contained
input) but can also be controlled via the `selected` prop.

## Status

- Scope: Internal Component
- Lifecycle: dev

## Imports

```tsx
import {
  Tile,
  TileGroup,
  TileContent,
  TileTitle,
  TileDescription,
  TileIndicator,
  TileSkeleton,
} from "@urbix/ui/atoms/tile";
```

## Usage

```tsx
<TileGroup>
  <Tile size="md" orientation="horizontal" htmlFor="tile-a">
    <TileIndicator className="bg-primary-600" />
    <TileContent>
      <TileTitle>Option A</TileTitle>
      <TileDescription>Description of option A</TileDescription>
    </TileContent>
  </Tile>
</TileGroup>
```

## API

### Tile (Root)

| Prop | Type | Default |
|---|---|---|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` |
| `selected` | `boolean` | — |
| `disabled` | `boolean` | — |
| `htmlFor` | `string` | — |

### TileGroup / TileContent / TileTitle / TileDescription

Layout slots. `TileContent`, `TileTitle`, and `TileDescription` map onto
`FieldContent` / `FieldTitle` / `FieldDescription` styling.

### TileIndicator / TileSkeleton

- `TileIndicator` — visual marker (color swatch, status dot).
- `TileSkeleton` — placeholder for loading states.

## Patterns

- Wrap a `RadioGroup.Item` (or `Checkbox`) inside a tile and set
  `htmlFor` to the input id; the tile picks up `data-state=checked`
  automatically and the entire card becomes the click target.
- Use `TileSkeleton` instead of a generic skeleton so the placeholder
  matches the tile's exact dimensions.

## Mistakes

- **Adopting `Tile` directly in product code.** It is internal — wait
  for a public composition or compose through the existing forms /
  list-item molecules.

## Related references

- [field.md](./field.md) — underlying field primitives.

## Source files

- `packages/urbix/src/ui/atoms/tile/`
- `packages/urbix/src/ui/atoms/tile/status.json`
