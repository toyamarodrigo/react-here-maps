# UrbixNotification

## Status

- Scope: Public Component
- Lifecycle: not declared

## Imports

```typescript
import { UrbixNotification, useNotification } from "@urbetrack/urbix";

// Individual hooks are also exported directly:
import { useToast, useConfirm } from "@urbetrack/urbix";
```

## Usage

Mount `UrbixNotification` once at the app root. It renders both `ToastContainer` and `ConfirmProvider` internally.

```tsx
import { UrbixNotification } from "@urbetrack/urbix";

export default function App() {
  return (
    <UrbixNotification
      toastProps={{
        position: "bottom-right",
        autoClose: 5000,
      }}
    >
      <RouterProvider router={router} />
    </UrbixNotification>
  );
}
```

Then use `useNotification()`, `useToast()`, or `useConfirm()` anywhere in the tree.

## API

### UrbixNotification

Provider component that wraps the app. It must be present for `useToast` and `useConfirm` to produce visible output.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | App content to wrap |
| `toastProps` | `Partial<ToastContainerProps>` | — | Options forwarded to `ToastContainer` |

#### toastProps

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `position` | `string` | `"top-right"` | Toast position on screen |
| `autoClose` | `number \| false` | `3000` | Auto-dismiss delay in ms, or `false` to disable |
| `limit` | `number` | `4` | Maximum visible toasts at once |
| `offset` | `number` | `0` | Pixel offset from default position |
| `customPosition` | `ToastPosition` | — | Override top/right/bottom/left/zIndex |
| `transitionDuration` | `number` | `300` | Position transition in ms |

### useNotification()

Combined hook. Returns both the toast API and the `confirm` function so components that need both can use a single hook call.

```tsx
import { useNotification } from "@urbetrack/urbix";

function MyComponent() {
  const { toast, confirm } = useNotification();

  const handleDelete = () => {
    confirm({
      title: "Delete record",
      description: "This action cannot be undone.",
      question: "Are you sure?",
      confirmTextButton: "Delete",
      onConfirm: async () => {
        await deleteRecord();
        toast.success("Record deleted");
      },
    });
  };

  return <Button onClick={handleDelete}>Delete</Button>;
}
```

`toast` is the full `useToast()` return value. `confirm` is the `showConfirm` function from `useConfirm()`. See [toast.md](./toast.md) and [confirm-modal.md](./confirm-modal.md) for the complete toast and confirm APIs.

### useToast()

Returns the toast notification API. See [toast.md](./toast.md) for the full API reference.

### useConfirm()

Returns `{ confirm }`. See [confirm-modal.md](./confirm-modal.md) for the full API reference.

## Patterns

### Setup at app root

```tsx
import { UrbixNotification } from "@urbetrack/urbix";

export default function App() {
  return (
    <UrbixNotification>
      <YourApp />
    </UrbixNotification>
  );
}
```

`toastProps` is optional. Defaults: `position: "top-right"`, `autoClose: 3000`, `limit: 4`.

### Combined toast and confirm

```tsx
import { useNotification } from "@urbetrack/urbix";

function UserActions({ userId }: { userId: string }) {
  const { toast, confirm } = useNotification();

  const handleDelete = () => {
    confirm({
      title: "Delete user",
      description: "The user will be removed from the system.",
      question: "Are you sure?",
      confirmTextButton: "Delete",
      onConfirm: async () => {
        await deleteUser(userId);
        toast.success("User deleted successfully");
      },
      onReject: () => {
        toast.info("Cancelled by user");
      },
    });
  };

  return <Button onClick={handleDelete}>Delete user</Button>;
}
```

### Separate hooks when only one is needed

```tsx
import { useToast } from "@urbetrack/urbix";

function SaveButton() {
  const toast = useToast();

  return (
    <Button onClick={async () => {
      await save();
      toast.success("Saved");
    }}>
      Save
    </Button>
  );
}
```

Use `useToast()` or `useConfirm()` directly when the component only needs one notification type. Reserve `useNotification()` for components that need both.

## Mistakes

### CRITICAL: Missing UrbixNotification provider

Toasts silently fail to appear and confirmation dialogs never open if `UrbixNotification` is not mounted in the component tree. Hooks do not throw — calls to `toast.success()` or `confirm()` produce no visible result.

Wrong:

```tsx
export default function App() {
  return <RouterProvider router={router} />;
}
```

Correct:

```tsx
export default function App() {
  return (
    <UrbixNotification>
      <RouterProvider router={router} />
    </UrbixNotification>
  );
}
```

### HIGH: Using react-toastify directly

Importing `toast` from `react-toastify` directly bypasses Urbix styling (custom icons, colors, progress bar variants, and the `BaseToastUrbix` wrapper).

Wrong:

```tsx
import { toast } from "react-toastify";
toast("Hello");
```

Correct:

```tsx
import { useToast } from "@urbetrack/urbix";
const toast = useToast();
toast.success("Hello");
```

## Related references

- [toast.md](./toast.md) — full `useToast()` API: shorthand methods, `show()`, `loading()`, `update()`, `dismiss()`
- [confirm-modal.md](./confirm-modal.md) — full `useConfirm()` API and `ConfirmModal` JSX component

## Source files

- `packages/urbix/src/ui/organisms/urbix-notification/urbix-notification.tsx` — `UrbixNotification`, `useNotification`
- `packages/urbix/src/ui/organisms/urbix-notification/index.ts`
