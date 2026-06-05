# Alert

Variant-driven alert/banner. The variant is shared via context so that
`AlertIndicator` can auto-select an icon based on it.

## Status

- Scope: Internal Component
- Lifecycle: dev

`Alert` is not part of the supported public surface. Consumers should
prefer the public notification surface (`useNotification`, `useToast`)
documented in [notifications.md](./notifications.md).

## Imports

`Alert` is not exported from `@urbetrack/urbix`. Internal callers import
from the source path:

```tsx
import {
  Alert,
  AlertIndicator,
  AlertContent,
  AlertTitle,
  AlertDescription,
} from "@urbix/ui/atoms/alert";
```

## Usage

```tsx
<Alert variant="info">
  <AlertIndicator />
  <AlertContent>
    <AlertTitle>System notification</AlertTitle>
    <AlertDescription>Informational message for the user.</AlertDescription>
  </AlertContent>
</Alert>
```

## API

### Alert (Root)

| Prop | Type | Default |
|---|---|---|
| `variant` | `"error" \| "warning" \| "success" \| "info" \| "loading"` | `"info"` |
| `className` | `string` | — |

### AlertIndicator

Renders a default icon based on the variant from context (`Info`,
`AlertTriangle`, `AlertCircle`, `CheckCircle2`, `Loader2`). Pass `icon`
to override.

| Prop | Type | Default |
|---|---|---|
| `icon` | `ReactNode` | variant-default |

### AlertContent / AlertTitle / AlertDescription

Layout slots. `AlertTitle` styles as the leading line; `AlertDescription`
styles as muted secondary text.

## Patterns

- Always pair `AlertIndicator` with `AlertContent`; the indicator reads
  the variant from the root context, so omitting the root or splitting
  it across multiple roots breaks icon selection.

## Mistakes

- **Adopting `Alert` in product code.** It is internal; reach for the
  notification system instead so toast/confirm semantics stay consistent.
- **Overriding the icon for every variant.** If a custom icon is needed
  every time, the wrong variant is being chosen — pick the variant whose
  default already fits.

## Related references

- [notifications.md](./notifications.md) — public toast/confirm system.

## Source files

- `packages/urbix/src/ui/atoms/alert/`
- `packages/urbix/src/ui/atoms/alert/status.json`
