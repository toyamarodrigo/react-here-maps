# Switch

Toggle switch with optional inline label, built on
`@radix-ui/react-switch`.

## Status

- Scope: Public Component
- Lifecycle: beta

## Imports

```tsx
import { Switch } from "@urbetrack/urbix";
```

## Usage

```tsx
<Switch
  text="Notificaciones por email"
  checked={enabled}
  onCheckedChange={setEnabled}
/>
```

## API

| Prop | Type | Default |
|---|---|---|
| `text` | `string` | required |
| `position` | `"left" \| "right"` | `"right"` |
| `checked` | `boolean` | — |
| `onCheckedChange` | `(checked: boolean) => void` | — |
| `disabled` | `boolean` | — |
| `id` | `string` | auto-generated |

Renders a `<label>` wrapping the switch and text. Auto-generates an `id`
via `useId()` when none is provided.

## Patterns

- Use `position="left"` when the label sits in a vertical settings list
  so the control aligns to the right edge.
- For form integration with validation, prefer `Forms.Switch` from
  [forms.md](./forms.md).

## Mistakes

- **Omitting `text`.** It is required and provides the accessible
  label; passing an empty string defeats screen reader support.

## Related references

- [forms.md](./forms.md) — form-aware switch field.

## Source files

- `packages/urbix/src/ui/atoms/switch/`
- `packages/urbix/src/ui/atoms/switch/status.json`
