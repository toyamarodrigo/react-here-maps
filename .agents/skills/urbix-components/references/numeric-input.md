# NumericInput

Controlled numeric input with optional stepper buttons, min/max
bounds, step, and precision. Generic over
`TValue extends string | number` so callers can store the value as
either a number or a string-encoded number.

## Status

- Scope: Public Component
- Lifecycle: beta

## Imports

```tsx
import { NumericInput } from "@urbetrack/urbix";
```

## Usage

```tsx
import { NumericInput } from "@urbetrack/urbix";
import { useState } from "react";

function QuantityField() {
  const [quantity, setQuantity] = useState(1);

  return (
    <NumericInput
      value={quantity}
      onChange={setQuantity}
      min={1}
      max={100}
      incremental
      size="md"
    />
  );
}
```

## API

| Prop | Type | Default |
|---|---|---|
| `value` | `TValue` (`number \| string`) | `0` |
| `onChange` | `(value: TValue) => void` | required |
| `min` | `number` | `0` |
| `max` | `number` | `Number.MAX_SAFE_INTEGER` |
| `step` | `number` | `1` |
| `precision` | `number` | `0` |
| `incremental` | `boolean` | `false` |
| `icon` | `ReactNode` | -- |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` |
| `invalid` | `boolean` | -- |
| `disabled` | `boolean` | -- |

Plus all native `<input>` attributes except `onChange`, `min`, `max`,
`value`, and `size` (those are reclaimed by the variant prop and
controlled API).

When `incremental=true`, `+` / `-` stepper buttons render alongside
the input. Keyboard: `ArrowUp` / `ArrowDown` increment/decrement by
`step`.

### Generic typing

```tsx
const [stringValue, setStringValue] = useState<string>("0");

<NumericInput<string>
  value={stringValue}
  onChange={setStringValue}
  precision={2}
/>
```

Storing the value as a string preserves trailing zeros and avoids
`number` precision loss for currency-like inputs.

## Patterns

- Use `precision` together with the string variant when the value
  feeds a back-end that expects fixed decimals.
- Keep `min`/`max` aligned with backend validation so the stepper
  cannot push state outside the accepted range.
- For form integration, prefer `Forms.NumericInput` from
  [forms.md](./forms.md) — it wires the molecule into react-hook-form
  and `BaseField` automatically.

## Mistakes

- **Using `incremental` without `step`.** Buttons step by `1` per
  the default, which surprises decimal-precision callers. Set
  `step` explicitly when `precision > 0`.
- **Bypassing `onChange` to mutate state directly.** The hook
  internally clamps to `min`/`max` and applies `precision`; mutating
  state outside the callback re-introduces invalid values.

## Related references

- [input.md](./input.md) — text-input counterpart.
- [forms.md](./forms.md) — form-bound numeric inputs.

## Source files

- `packages/urbix/src/ui/molecules/numeric-input/numeric-input.tsx`
- `packages/urbix/src/ui/molecules/numeric-input/components/`
- `packages/urbix/src/ui/molecules/numeric-input/hooks/use-numeric-input.ts`
- `packages/urbix/src/ui/molecules/numeric-input/status.json`
- `packages/urbix/src/ui/molecules/numeric-input/numeric-input.stories.tsx`
