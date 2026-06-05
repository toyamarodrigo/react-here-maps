# Tooltip

Hover/focus tooltip built on `@radix-ui/react-tooltip`. The root
auto-wraps itself in a `TooltipProvider` with `delayDuration=0`.

## Status

- Scope: Public Component
- Lifecycle: rc

## Imports

```tsx
import { Tooltip, TooltipTrigger, TooltipContent } from "@urbetrack/urbix";
```

## Usage

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="link">Hover me</Button>
  </TooltipTrigger>
  <TooltipContent arrowPosition="top-center">
    Tooltip text here
  </TooltipContent>
</Tooltip>
```

## API

### TooltipContent

| Prop | Type | Default |
|---|---|---|
| `showArrow` | `boolean` | `true` |
| `arrowPosition` | `ArrowPosition` | `"top-center"` |
| `sideOffset` | `number` | `0` |

`ArrowPosition` values: `"top-left"`, `"top-center"`, `"top-right"`,
`"bottom-left"`, `"bottom-center"`, `"bottom-right"`, `"side-left"`,
`"side-right"`.

## Patterns

- Always pass `asChild` to `TooltipTrigger` when wrapping a
  `Button`/`Link` so two nested interactive elements aren't rendered.
- Pick the `arrowPosition` that matches where the trigger sits
  relative to the content; mismatched arrows look detached.

## Mistakes

- **Wrapping every icon button in its own `TooltipProvider`.** The
  Tooltip component already injects one — extra providers re-set
  `delayDuration` and cause inconsistent open timings.

## Related references

- [popover.md](./popover.md) — click-triggered floating panel.

## Source files

- `packages/urbix/src/ui/atoms/tooltip/`
- `packages/urbix/src/ui/atoms/tooltip/status.json`
