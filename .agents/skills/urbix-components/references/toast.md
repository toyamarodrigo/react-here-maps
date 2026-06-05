# Toast

Toast notification system built on `react-toastify`. Public surface is the `useToast()` hook. The container component (`ToastContainer`) is exposed under `@urbetrack/urbix/internals` so apps can mount it once at the root.

## Status

- Scope: Public Component
- Lifecycle: beta

## Imports

```tsx
import { useToast } from "@urbetrack/urbix";
```

App-root container (mount once):

```tsx
import { ToastContainer } from "@urbetrack/urbix/internals";
```

Most apps reach toast through `useNotification()` from the notifications organism, which already mounts the container.

## Usage

```tsx
import { ToastContainer } from "@urbetrack/urbix/internals";
import { useToast } from "@urbetrack/urbix";

function App() {
  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  );
}

function SaveButton() {
  const toast = useToast();

  const handleSave = async () => {
    const id = toast.loading("Guardando...");
    try {
      await api.save();
      toast.update(id, { title: "Guardado", type: "success" });
    } catch (err) {
      toast.update(id, { title: "Error al guardar", type: "error" });
    }
  };

  return <Button onClick={handleSave}>Guardar</Button>;
}
```

## API

### useToast()

Returns helpers backed by `react-toastify`. Every helper returns a toast `Id` that can be passed to `update` or `dismiss`.

| Method | Signature | Notes |
|---|---|---|
| `show(options)` | `(options: ToastOptions) => Id` | Generic entry point. |
| `success(message, options?)` | `(string, SimplifiedToastOptions?) => Id` | -- |
| `error(message, options?)` | same | -- |
| `info(message, options?)` | same | -- |
| `warning(message, options?)` | same | -- |
| `maintenance(message, options?)` | same | -- |
| `neutral(message, options?)` | same | Maps to `type: "default"`. |
| `loading(message, options?)` | same | Sets `isLoading: true`, `autoClose: false`, hides close button. |
| `update(id, options)` | `(Id, ToastOptions) => Id` | Replace title/description/type/icon/`isLoading`/`autoClose`. |
| `dismiss(id?)` | `(Id?) => void` | Dismisses one or all. |
| `isActive` | `react-toastify`'s `toast.isActive` | -- |
| `toast(options)` | alias of `show` | **Deprecated** — use `show`. |
| `promise(promise, opts, toastOpts?)` | see source | **Deprecated** — use `loading` + `update`. |

### ToastOptions

```ts
type ToastUrbixTypes
  = "success" | "error" | "info" | "warning"
  | "maintenance" | "neutral" | "default";

type ToastOptions = Omit<ReactToastifyOptions, "type" | "className"> & {
  title: string;
  description?: string;
  type?: ToastUrbixTypes;
  /** @deprecated use `autoClose` directly */
  duration?: number | false;
  action?: { label: string; onClick: () => void; className?: string };
  className?: string;
};
```

All `react-toastify` options (`autoClose`, `position`, `closeOnClick`, `pauseOnHover`, etc.) flow through except `type` and `className`, which Urbix overrides.

### ToastContainer (internal export)

Re-exported from `@urbetrack/urbix/internals`. Wraps `react-toastify`'s `ToastContainer` with Urbix iconography and styling.

| Prop | Type | Default |
|---|---|---|
| `customPosition` | `{ top?, right?, bottom?, left?, zIndex? }` | -- |
| `style` | `CSSProperties` | -- |
| `className` | `string` | -- |
| `offset` | `number` | `0` |
| `transitionDuration` | `number` (ms) | `300` |
| `position` | `react-toastify` position | `"top-right"` |
| `autoClose` | `number \| false` | `3000` |
| `limit` | `number` | `4` |
| ...rest | `Omit<ReactToastifyContainerProps, "style">` | -- |

Mount once. `ToastContainer` is intentionally internal; product apps normally mount `<UrbixNotification>` instead.

## Patterns

### Loading → update on resolve

```tsx
const id = toast.loading("Procesando...");
const result = await api.run();
toast.update(id, {
  title: result.ok ? "Listo" : "Falló",
  type: result.ok ? "success" : "error",
  autoClose: 3000,
});
```

### Action button

```tsx
toast.success("Eliminado", {
  action: {
    label: "Deshacer",
    onClick: () => api.undo(),
  },
});
```

### Repositioning the container

```tsx
<ToastContainer
  position="bottom-right"
  customPosition={{ bottom: 24, right: 24, zIndex: 1000 }}
  offset={16}
/>
```

## Mistakes

- **Forgetting to mount `ToastContainer`.** `useToast()` will queue toasts but nothing renders. If you already mount `<UrbixNotification>` (notifications organism), the container is included.
- **Passing `duration`.** Use `autoClose` (number ms or `false`); `duration` is kept for migration only.
- **Calling `promise(...)`.** Deprecated; build the same flow with `loading` + `update`.

## Related references

- [notifications.md](./notifications.md) — `useNotification()` facade and `<UrbixNotification>` provider.
- [confirm-modal.md](./confirm-modal.md) — companion confirmation flow.

## Source files

- `packages/urbix/src/ui/molecules/toast/use-toast.tsx`
- `packages/urbix/src/ui/molecules/toast/index.ts`
- `packages/urbix/src/ui/molecules/toast/internal.ts`
- `packages/urbix/src/ui/molecules/toast/components/toast-container/toast-container.tsx`
- `packages/urbix/src/ui/molecules/toast/components/base-toast-urbix/base-toast-urbix.tsx`
- `packages/urbix/src/ui/molecules/toast/status.json`
- `packages/urbix/src/ui/molecules/toast/toast.stories.tsx`
