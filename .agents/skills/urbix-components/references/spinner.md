# Spinner

SVG loading spinner using the `primary-600` token as gradient color.

## Status

- Scope: Public Component
- Lifecycle: beta

## Imports

```tsx
import { Spinner } from "@urbetrack/urbix";
```

## Usage

```tsx
<Spinner />

<Spinner className="size-4 text-primary-50" />
```

## API

All `ComponentProps<"svg">`. Default size: `size-8` (32px). Override
with `className`.

## Patterns

- Use `className="size-4"` (or other Tailwind size utilities) inside
  buttons or compact toolbars; do not wrap the spinner in a sized div.
- Pair with an accessible label (e.g., `aria-label="Cargando"` on the
  parent or a visually hidden text node) so screen readers announce
  loading state.

## Mistakes

- **Stretching the spinner with width/height props.** Use `className`
  and Tailwind size utilities so the gradient and stroke stay crisp.

## Related references

- None.

## Source files

- `packages/urbix/src/ui/atoms/spinner/`
- `packages/urbix/src/ui/atoms/spinner/status.json`
