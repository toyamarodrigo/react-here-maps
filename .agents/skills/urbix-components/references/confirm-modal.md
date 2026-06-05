# ConfirmModal

Confirmation modal molecule built on the internal `Dialog` primitive. Two ways to use it: declarative JSX with controlled `open`, or imperative through the `useConfirm()` hook plus `<ConfirmProvider />` mount (typically reached via `useNotification()` from `@urbetrack/urbix`).

## Status

- Scope: Public Component
- Lifecycle: dev

## Imports

```tsx
import { ConfirmModal, ConfirmProvider, useConfirm } from "@urbetrack/urbix";
```

Most product code reaches the imperative API via the notification facade:

```tsx
import { UrbixNotification, useNotification } from "@urbetrack/urbix";
// useNotification().confirm(...)
```

## Usage

Imperative (preferred for product flows):

```tsx
function DeleteEmployeeButton() {
  const { confirm, toast } = useNotification();

  const handleClick = () => {
    confirm({
      title: "Eliminar empleado",
      description: "Se lo removerá del listado y no se podrá recrear con los mismos datos.",
      question: "¿Estás seguro?",
      onConfirm: () => {
        toast.success("Empleado eliminado");
      },
      onReject: () => {
        toast.info("Cancelado por el usuario");
      },
    });
  };

  return <Button onClick={handleClick}>Eliminar</Button>;
}
```

Declarative (when you must own `open` state):

```tsx
const [open, setOpen] = useState(false);

<ConfirmModal
  open={open}
  title="Confirmar"
  description="¿Querés continuar?"
  onConfirm={() => setOpen(false)}
  onReject={() => setOpen(false)}
/>;
```

## API

### ConfirmModal — `ConfirmModalProps`

| Prop | Type | Default |
|---|---|---|
| `open` | `boolean` | -- |
| `onConfirm` | `() => void` | required |
| `onReject` | `() => void` | -- |
| `title` | `ReactNode` | required |
| `description` | `ReactNode` | -- |
| `question` | `ReactNode` | -- |
| `loading` | `boolean` | -- (renders `Spinner` and disables buttons) |
| `confirmTextButton` | `string` | `"Confirmar"` |
| `rejectTextButton` | `string` | `"Cancelar"` |
| `hideConfirmButton` | `boolean` | `false` |
| `hideRejectButton` | `boolean` | `false` |

Renders a persistent `Dialog` (modal, no outside-click dismissal). The X close button on `DialogContent` calls `onReject`, as does Escape (`onEscapeKeyDown`).

### useConfirm()

Returns `{ confirm }`. The `confirm` function pushes a `ConfirmProps` payload onto the global confirm store, which `<ConfirmProvider />` renders.

```ts
type ConfirmProps = Omit<
  ConfirmModalProps,
  "onConfirm" | "onReject" | "children" | "loading" | "open"
> & {
  onConfirm: (handler: ConfirmHandler) => Promise<boolean | void> | boolean | void;
  onReject?: () => void;
};

type ConfirmHandler = {
  update: (props: Partial<Omit<ConfirmProps, "onReject">>) => void;
  close: () => void;
};
```

`onConfirm` semantics:

- Return `false` synchronously to keep the modal open.
- Return a `Promise<boolean | void>` to flip the modal into loading state until it resolves; resolving to `false` keeps it open, anything else closes it.
- Synchronous `void` / `true` closes the modal immediately.

### ConfirmProvider

Mount once near the application root. It subscribes to the confirm store and renders the active `Confirm` instance. Bundled into `<UrbixNotification>` from the notifications organism — most apps don't mount it directly.

## Patterns

### Async confirm with loading

```tsx
confirm({
  title: "Eliminar usuario",
  confirmTextButton: "Eliminar",
  onConfirm: async () => {
    await api.deleteUser(id);
    toast.success("Usuario eliminado");
  },
});
```

While the promise is pending, both buttons go disabled and `Spinner` appears next to the confirm label.

### In-flight update + keep-open

```tsx
confirm({
  title: "Eliminar",
  question: "¿Confirmás?",
  onConfirm: async (handler) => {
    const ok = await api.tryDelete(id);
    if (!ok) {
      handler.update({
        title: "No se pudo borrar",
        description: "El recurso ya no existe.",
        hideConfirmButton: true,
        rejectTextButton: "Cerrar",
        question: null,
      });
      return false; // keep open with the new content
    }
  },
});
```

### Hiding a button

```tsx
<ConfirmModal
  open={open}
  title="Solo informativo"
  description="No hay nada que confirmar."
  hideConfirmButton
  rejectTextButton="Cerrar"
  onConfirm={() => {}}
  onReject={() => setOpen(false)}
/>
```

## Mistakes

- **Calling `confirm()` without mounting `<UrbixNotification>` (or `<ConfirmProvider />`).** Nothing renders — the confirm store has no subscriber.
- **Returning `Promise<boolean>` when you want immediate close.** `Promise<true>` still resolves async; for instant close, return synchronously.
- **Using `Dialog` directly to roll a custom confirm.** Prefer `ConfirmModal` so the close-button + Escape semantics stay consistent with the design system.

## Related references

- [dialog.md](./dialog.md) — internal primitive `ConfirmModal` is built on.
- [notifications.md](./notifications.md) — `useNotification()` facade exposing `confirm` and `toast`.
- [toast.md](./toast.md) — toast hook used alongside confirm flows.

## Source files

- `packages/urbix/src/ui/molecules/confirm-modal/confirm-modal.tsx`
- `packages/urbix/src/ui/molecules/confirm-modal/provider/confirm-provider.tsx`
- `packages/urbix/src/ui/molecules/confirm-modal/provider/confirm.tsx`
- `packages/urbix/src/ui/molecules/confirm-modal/provider/confirm-modal.hook.ts`
- `packages/urbix/src/ui/molecules/confirm-modal/status.json`
- `packages/urbix/src/ui/molecules/confirm-modal/confirm-modal.stories.tsx`
