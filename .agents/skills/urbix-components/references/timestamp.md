# Timestamp

Formatted date/time display backed by `date-fns`. Renders as an
inline-flex bordered badge with a leading label (good for "última
actualización" indicators).

## Status

- Scope: Internal Component
- Lifecycle: dev

## Imports

```tsx
import {
  Timestamp,
  timestampFormatPresets,
  type TimestampPreset,
  type TimestampFormat,
} from "@urbix/ui/atoms/timestamp";
import { es } from "date-fns/locale";
```

## Usage

```tsx
<Timestamp
  value={updatedAt}
  preset="dateTimeMedium"
  label="Updated:"
  locale={es}
/>
```

## API

| Prop | Type | Default |
|---|---|---|
| `value` | `Date \| string \| number` | required |
| `preset` | `TimestampPreset` | `"default"` |
| `format` | `string` (date-fns pattern) | — |
| `label` | `ReactNode` | `"Últ. actualización:"` |
| `hideLabel` | `boolean` | `false` |
| `fallback` | `ReactNode` | `"--"` |
| `locale` | `Locale` (date-fns) | — |

`format` overrides `preset` when both are provided. `value` accepts any
input parseable by `date-fns`.

### Presets

`timestampFormatPresets` provides named presets covering date-only,
time-only, and combined date+time formats (short/medium/long/full,
12h/24h, with/without seconds, ISO local). Common values:
`"dateShort"`, `"dateMedium"`, `"dateLong"`, `"time24Short"`,
`"time12WithMeridiem"`, `"dateTimeShort"`, `"dateTimeMedium"`,
`"dateTimeLong"`, `"isoLocalDateTime"`, `"default"`.

## Patterns

- Pass `locale={es}` (or another `date-fns` locale) explicitly so
  formatting matches the rest of the UI; the component does not infer
  locale from the document.
- Use `hideLabel` when the label is provided by surrounding UI (e.g.,
  a column header) but you still want the badge styling.

## Mistakes

- **Adopting `Timestamp` from product code.** It is internal — render
  the formatted string with `date-fns` directly until a public
  surface exists.

## Related references

- None.

## Source files

- `packages/urbix/src/ui/atoms/timestamp/`
- `packages/urbix/src/ui/atoms/timestamp/status.json`
