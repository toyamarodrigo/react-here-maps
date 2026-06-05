# Field

Form field primitives (`Field`, `FieldSet`, `FieldLegend`, `FieldGroup`,
`FieldContent`, `FieldLabel`, `FieldTitle`, `FieldDescription`,
`FieldSeparator`, `FieldError`).

## Status

- Scope: Internal Component
- Lifecycle: dev

Product code should compose forms through [forms.md](./forms.md). Import
these primitives only from the internals entrypoint.

## Imports

For internal Urbix work:

```tsx
import {
  Field,
  FieldSet,
  FieldLegend,
  FieldGroup,
  FieldContent,
  FieldLabel,
  FieldTitle,
  FieldDescription,
  FieldSeparator,
  FieldError,
} from "@urbetrack/urbix/internals";
```

## Usage

```tsx
<FieldSet>
  <FieldLegend>Account</FieldLegend>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <FieldContent>
        <Input id="email" type="email" />
        <FieldDescription>We'll never share it.</FieldDescription>
        <FieldError errors={errors} />
      </FieldContent>
    </Field>
  </FieldGroup>
</FieldSet>
```

## API

### Field

| Prop | Type | Default |
|---|---|---|
| `orientation` | `"vertical" \| "horizontal" \| "responsive"` | `"vertical"` |
| `className` | `string` | — |

### FieldError

| Prop | Type | Default |
|---|---|---|
| `errors` | `Array<{ message?: string }>` | — |
| `children` | `ReactNode` | — |

Renders as `role="alert"`. Accepts either an `errors` array or direct
children.

### FieldSet / FieldLegend / FieldGroup / FieldContent

- `FieldSet` — `<fieldset>` wrapper with default vertical gap.
- `FieldLegend` — `<legend>` with `variant: "legend" | "label"`.
- `FieldGroup` — flex container that groups multiple `Field`s with
  consistent gap.
- `FieldContent` — wraps the input area inside a `Field` (sits next to
  `FieldLabel`).

### FieldLabel / FieldTitle / FieldDescription / FieldSeparator

- `FieldLabel` — wraps Radix Label; associates via `htmlFor`.
- `FieldTitle` — heading-style label for grouped fields.
- `FieldDescription` — muted helper text.
- `FieldSeparator` — divider between field groups.

## Patterns

- Use `FieldGroup` to gather logically related fields under a single
  `FieldLegend`; the gap stays consistent without extra layout CSS.
- `FieldError` accepts the React Hook Form errors array shape directly,
  so it composes cleanly with `Forms.*` callers.

## Mistakes

- **Adopting `Field` directly in product code.** Use the `Forms` system
  so labels, errors, and validation wire up through React Hook Form.
- **Skipping `htmlFor` on `FieldLabel`.** Labels must reference the
  input `id` for accessibility — a missing association breaks screen
  reader navigation.

## Related references

- [forms.md](./forms.md) — public form system that wraps these primitives.
- [input.md](./input.md) — internal text input commonly placed in
  `FieldContent`.

## Source files

- `packages/urbix/src/ui/atoms/field/`
- `packages/urbix/src/ui/atoms/field/status.json`
