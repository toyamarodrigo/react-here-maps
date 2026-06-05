# Separator

Visual divider built on `@radix-ui/react-separator`.

## Status

- Scope: Public Component
- Lifecycle: not declared

## Imports

```tsx
import { Separator } from "@urbetrack/urbix";
```

## Usage

```tsx
<Separator />

<Separator orientation="vertical" className="mx-2 h-6" />
```

## API

| Prop | Type | Default |
|---|---|---|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |
| `decorative` | `boolean` | `true` |
| `className` | `string` | — |

## Patterns

- Use `decorative={false}` only when the separator carries semantic
  meaning (Radix exposes it to assistive tech in that case).
- For vertical separators, give the element an explicit height via
  `className` — Radix does not assume a parent height.

## Mistakes

- **Setting `decorative={false}` on every separator.** Most dividers are
  visual filler; advertising them as semantic adds noise for screen
  reader users.

## Related references

- None.

## Source files

- `packages/urbix/src/ui/atoms/separator/`
