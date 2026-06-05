# Input

Public input molecule with optional left/right icon adornments. Built on
top of the `InputGroup` molecule and the atom `Input` primitive. For form
integration, prefer `Forms.InputText`.

## Status

- Scope: Public Component
- Lifecycle: beta

## Imports

```tsx
import { Input } from "@urbetrack/urbix";
```

For the underlying internal primitive, see
[input-atom.md](./input-atom.md). For form-bound usage, see
[forms.md](./forms.md).

## Usage

```tsx
import { MdEmail } from "react-icons/md";

<Input placeholder="Email" iconRight={<MdEmail />} />
```

## API

| Prop | Type | Default |
|---|---|---|
| `iconLeft` | `ReactNode` | -- |
| `iconRight` | `ReactNode` | -- |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` |

Plus all atom `Input` props (`invalid`, `disabled`, `readOnly`, etc.)
and standard `<input>` HTML attributes.

## Patterns

- Prefer `Forms.InputText` (see [forms.md](./forms.md)) inside
  React Hook Form contexts so labels, errors, and validation wire up
  automatically.
- For more than one trailing/leading element (e.g. icon + button),
  drop down to `InputGroup` directly — see
  [input-group.md](./input-group.md).

## Mistakes

- **Stacking divs around `Input` to fake adornments.** Use `iconLeft` /
  `iconRight` here, or `InputGroup` for richer layouts.
- **Using inside a form without `Forms.InputText`.** `Input` does not
  register with React Hook Form on its own.

## Related references

- [input-atom.md](./input-atom.md) — internal atom primitive.
- [input-group.md](./input-group.md) — composable wrapper used internally.
- [forms.md](./forms.md) — form-bound text inputs.

## Source files

- `packages/urbix/src/ui/molecules/input/input.tsx`
- `packages/urbix/src/ui/molecules/input/status.json`
- `packages/urbix/src/ui/molecules/input/input.stories.tsx`
