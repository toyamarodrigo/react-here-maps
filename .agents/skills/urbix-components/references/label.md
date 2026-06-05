# Label

Form label built on `@radix-ui/react-label`.

## Status

- Scope: Internal Component
- Lifecycle: dev

Product code should use the field labels exposed through the `Forms`
system. Import this atom only from the internals entrypoint.

## Imports

```tsx
import { Label } from "@urbetrack/urbix/internals";
```

## Usage

```tsx
<Label htmlFor="patente">Patente</Label>
<Input id="patente" />
```

## API

Wraps `LabelPrimitive.Root`. Accepts all native label props plus
`className`. Base styles: `text-sm font-medium cursor-pointer`.

`labelVariants` is also exported for callers that need the raw CVA
function.

## Patterns

- Always pair with the input's `id` via `htmlFor` so click and
  assistive-tech focus reach the right control.
- For form fields with errors, prefer `FieldLabel` from
  [field.md](./field.md) so the label sits inside the same field
  primitive that owns the error slot.

## Mistakes

- **Importing `Label` from the public root.** The root compatibility export
  was removed; use `Forms.*` field labels or the internals entrypoint.

## Related references

- [field.md](./field.md) — `FieldLabel` for error-aware fields.
- [forms.md](./forms.md) — public form system.

## Source files

- `packages/urbix/src/ui/atoms/label/`
- `packages/urbix/src/ui/atoms/label/status.json`
