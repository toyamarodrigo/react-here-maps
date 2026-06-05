# Accordion

Collapsible content sections built on `@radix-ui/react-accordion`.

## Status

- Scope: Public Component
- Lifecycle: not declared

## Imports

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@urbetrack/urbix";
```

## Usage

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="vehicle-1">
    <AccordionTrigger>ABC-123</AccordionTrigger>
    <AccordionContent>Detalle del vehículo seleccionado.</AccordionContent>
  </AccordionItem>
</Accordion>
```

## API

### Accordion (Root)

Wraps `AccordionPrimitive.Root`. Accepts all Radix Accordion root props
(`type="single" | "multiple"`, `collapsible`, `value`, `onValueChange`,
`defaultValue`).

### AccordionItem

Wraps `AccordionPrimitive.Item`. Requires `value: string`.

### AccordionTrigger

| Prop | Type | Default |
|---|---|---|
| `chevronPosition` | `"left" \| "right"` | `"left"` |
| `className` | `string` | — |

Renders a chevron icon that rotates on open.

### AccordionContent

Standard Radix content with built-in open/close animations.

## Patterns

- Use `type="single" collapsible` for FAQ-style lists where only one item
  may be open at a time.
- Use `type="multiple"` for filter/section panels where users may keep
  several sections open.
- Place an `AccordionTrigger` inside every `AccordionItem`; Radix relies on
  it to toggle state.

## Mistakes

- **Setting `chevronPosition` per item to mix orientations.** The chevron
  position should stay consistent within a single accordion to keep the
  affordance learnable.
- **Forgetting a unique `value` on `AccordionItem`.** Radix uses `value` to
  drive open state; duplicates break controlled mode.

## Related references

- [foundation.md](./foundation.md) — atoms overview.

## Source files

- `packages/urbix/src/ui/atoms/accordion/accordion.tsx`
- `packages/urbix/src/ui/atoms/accordion/index.ts`
