# Dialog

Internal Radix-backed modal primitive used by `ConfirmModal` and other Urbix overlay molecules. Exposes Radix `Dialog` parts (`Root`, `Trigger`, `Portal`, `Overlay`, `Content`, `Close`, `Title`, `Description`, `Header`, `Footer`) styled with Urbix tokens. Not re-exported from any package barrel, so only repository-local callers should import it.

## Status

- Scope: Internal Component
- Lifecycle: beta

## Imports

```tsx
// Internal monorepo path only — Dialog is not re-exported from
// `@urbetrack/urbix` or `@urbetrack/urbix/internals`.
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@urbix/ui/molecules/dialog";
```

Consumers building dialog flows should reach for `ConfirmModal` (see [confirm-modal.md](./confirm-modal.md)) or `Drawer` (see [drawer.md](./drawer.md)) instead.

## Usage

```tsx
<Dialog open={open} onOpenChange={setOpen} modal>
  <DialogContent persistent className="p-4 sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Confirmar acción</DialogTitle>
      <DialogDescription>
        Esta acción no se puede deshacer.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="link">Cancelar</Button>
      </DialogClose>
      <Button onClick={handleConfirm}>Confirmar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## API

`Dialog`, `DialogTrigger`, `DialogPortal`, `DialogClose`, `DialogOverlay`, `DialogTitle`, `DialogDescription` are thin wrappers over their `@radix-ui/react-dialog` counterparts. Each forwards every Radix prop and adds a `data-slot` attribute (`dialog`, `dialog-trigger`, `dialog-portal`, `dialog-close`, `dialog-overlay`, `dialog-title`, `dialog-description`).

### DialogContent

Wraps Radix `Dialog.Content` and renders inside `DialogPortal` with a styled overlay.

| Prop | Type | Default |
|---|---|---|
| `showCloseButton` | `boolean` | `true` |
| `persistent` | `boolean` | `false` (calls `e.preventDefault()` in `onInteractOutside` when `true`) |
| `onCloseButton` | `MouseEventHandler<HTMLButtonElement>` | -- |
| ...Radix `Dialog.Content` props | -- | -- |

### DialogHeader / DialogFooter

Plain `div` wrappers with default flex layout classes. Accept all `div` props; rely on `data-slot="dialog-header"` / `dialog-footer` for styling hooks.

## Patterns

### Persistent dialogs

`persistent` blocks outside-click dismissal at the Radix level. Combine with `onEscapeKeyDown` if you also want to block Escape:

```tsx
<DialogContent
  persistent
  onEscapeKeyDown={e => e.preventDefault()}
>
  ...
</DialogContent>
```

### Custom close behavior

Pass `onCloseButton` to intercept the X button without replacing the close icon:

```tsx
<DialogContent onCloseButton={() => analytics.track("dialog.close")}>
  ...
</DialogContent>
```

## Mistakes

- **Importing `Dialog` from `@urbetrack/urbix` or `@urbetrack/urbix/internals`.** Neither barrel re-exports it. Consumer code should use `ConfirmModal` for confirmations or `Drawer` for side panels.
- **Using `Dialog` as the public modal API.** It is an internal source primitive; teams should not standardize on it from product code.

## Related references

- [confirm-modal.md](./confirm-modal.md) — public confirmation modal built on `Dialog`.
- [drawer.md](./drawer.md) — public side drawer.
- [bottom-sheet.md](./bottom-sheet.md) — public bottom sheet.

## Source files

- `packages/urbix/src/ui/molecules/dialog/dialog.tsx`
- `packages/urbix/src/ui/molecules/dialog/status.json`
- `packages/urbix/src/ui/molecules/dialog/dialog.stories.tsx`
