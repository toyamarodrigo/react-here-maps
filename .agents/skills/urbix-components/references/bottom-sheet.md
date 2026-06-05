# BottomSheet

Compound bottom sheet built on **Vaul** `Drawer` (`direction="bottom"`). Provides a snap-points API, a built-in handle with up/down snap navigation, and an optional CSS-grid layout when `BottomSheet.Section` children are used.

## Status

- Scope: Public Component
- Lifecycle: beta

## Imports

```tsx
import { BottomSheet, useBottomSheet } from "@urbetrack/urbix";
import type {
  BottomSheetContentProps,
  BottomSheetHandleProps,
  BottomSheetRootProps,
  BottomSheetSectionProps,
} from "@urbetrack/urbix";
```

## Usage

```tsx
<BottomSheet snapPoints={[0.08, 0.25, 0.5, 0.8]} defaultSnapIndex={1}>
  <BottomSheet.Handle />
  <BottomSheet.Content title="Servicios">
    <p className="p-4">Contenido del panel</p>
  </BottomSheet.Content>
</BottomSheet>
```

## API

### BottomSheet (root) — `BottomSheetRootProps`

| Prop | Type | Default |
|---|---|---|
| `snapPoints` | `(number \| string)[]` | required |
| `defaultSnapIndex` | `number` | `0` |
| `activeSnapPoint` | `number \| string \| null` | -- (controlled) |
| `onSnapPointChange` | `(snap: number \| string \| null) => void` | -- |
| `open` | `boolean` | `true` |
| `onOpenChange` | `(open: boolean) => void` | -- |
| `modal` | `boolean` | `false` |
| `fadeFromIndex` | `number` | -- |
| `className` | `string` | -- |
| `children` | `ReactNode` | required |

Vaul is invoked with `dismissible={false}` and `noBodyStyles` — drag-to-dismiss is intentionally off.

### BottomSheet.Handle — `BottomSheetHandleProps`

| Prop | Type | Default |
|---|---|---|
| `className` | `string` | -- |
| `children` | `ReactNode` | -- (renders next to chevrons) |
| `showDragThumb` | `boolean` | typed but **not implemented** in source |

Renders chevron up/down buttons that call `goUp` / `goDown` from context with `aria-label="Expand"` / `"Collapse"`.

### BottomSheet.Content — `BottomSheetContentProps`

| Prop | Type | Default |
|---|---|---|
| `children` | `ReactNode` | required |
| `title` | `string` | `"Bottom sheet"` (passed to `Drawer.Title`, `sr-only`) |
| `description` | `string` | -- (`Drawer.Description`, `sr-only`) |
| `className` | `string` | -- |

Children are flattened (including `React.Fragment`). When **every** direct child is `BottomSheet.Section`, the wrapper switches to `display: grid` with `gridTemplateColumns` from each section's `size`. Otherwise it lays out as a column flex stack.

### BottomSheet.Section — `BottomSheetSectionProps`

| Prop | Type | Default |
|---|---|---|
| `children` | `ReactNode` | required |
| `size` | `string` | `"1fr"` (CSS grid track value) |
| `className` | `string` | -- |

### useBottomSheet()

Returns `BottomSheetContextValue`: `snapPoints`, `activeSnapPoint`, `setActiveSnapPoint`, `currentIndex`, `canGoUp`, `canGoDown`, `goUp`, `goDown`, `goToIndex`. Throws when used outside `<BottomSheet>`.

### useSnapNavigation(snapPoints, activeSnapPoint)

Pure helper exported alongside the component. Returns `{ currentIndex, canGoUp, canGoDown }`; clamps `currentIndex` to `0` when `activeSnapPoint` is not in `snapPoints`.

## Patterns

### Controlled snap

```tsx
const [snap, setSnap] = useState<number | string | null>(0.25);

<BottomSheet
  snapPoints={[0.08, 0.25, 0.5, 0.8]}
  activeSnapPoint={snap}
  onSnapPointChange={setSnap}
>
  <BottomSheet.Handle />
  <BottomSheet.Content title="Controlado">
    <p className="p-4">Snap actual: {String(snap)}</p>
  </BottomSheet.Content>
</BottomSheet>;
```

### Two-column section grid

```tsx
<BottomSheet snapPoints={[0.08, 0.25, 0.5]} defaultSnapIndex={1}>
  <BottomSheet.Handle />
  <BottomSheet.Content title="Split">
    <BottomSheet.Section size="1fr">…</BottomSheet.Section>
    <BottomSheet.Section size="280px">…</BottomSheet.Section>
  </BottomSheet.Content>
</BottomSheet>
```

### Reading snap state from a child

```tsx
function Body() {
  const { currentIndex } = useBottomSheet();
  return <p className="p-4">Snap index: {currentIndex}</p>;
}
```

## Mistakes

- **Assuming drag-to-dismiss works.** The root sets `dismissible={false}`. Closing must be driven by `open`/`onOpenChange`.
- **Setting `activeSnapPoint` to a value not in `snapPoints`.** Snap navigation math falls back to index `0`.
- **Using `showDragThumb` on the handle.** It is in the type but not wired in `bottom-sheet-handle.tsx` — do not rely on it.
- **Mixing `Section` children with non-`Section` siblings and expecting a grid.** The grid layout activates only when **every** flattened direct child is `BottomSheet.Section`.

## Related references

- [drawer.md](./drawer.md) — side drawer built on Vaul.
- [dialog.md](./dialog.md) — internal modal primitive.

## Source files

- `packages/urbix/src/ui/molecules/bottom-sheet/bottom-sheet.tsx`
- `packages/urbix/src/ui/molecules/bottom-sheet/bottom-sheet.types.ts`
- `packages/urbix/src/ui/molecules/bottom-sheet/components/bottom-sheet-handle.tsx`
- `packages/urbix/src/ui/molecules/bottom-sheet/components/bottom-sheet-content.tsx`
- `packages/urbix/src/ui/molecules/bottom-sheet/components/bottom-sheet-section.tsx`
- `packages/urbix/src/ui/molecules/bottom-sheet/hooks/`
- `packages/urbix/src/ui/molecules/bottom-sheet/status.json`
- `packages/urbix/src/ui/molecules/bottom-sheet/bottom-sheet.stories.tsx`
