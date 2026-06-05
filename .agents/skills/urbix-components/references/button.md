# Button

Primary action element. Built with `class-variance-authority` and Radix
`Slot`, so `asChild` lets it adopt the styles of any child element
(typically a link).

## Status

- Scope: Public Component
- Lifecycle: beta

## Imports

```tsx
import { Button } from "@urbetrack/urbix";
```

## Usage

```tsx
<Button variant="primary" size="md" onClick={handleSave}>
  Guardar cambios
</Button>

<Button asChild variant="link" size="sm">
  <a href="/vehiculos">Ver flota</a>
</Button>
```

## API

| Prop | Type | Default |
|---|---|---|
| `variant` | `"primary" \| "secondary" \| "link"` | `"primary"` |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` |
| `asChild` | `boolean` | `false` |

Plus all `ButtonHTMLAttributes<HTMLButtonElement>`.

`buttonVariants` is also exported for direct CVA access.

### Variants

| Variant | Description |
|---|---|
| `primary` | `bg-primary-600 text-primary-50`, hover `bg-primary-700` |
| `secondary` | White bg, `border-primary-600 text-primary-600`, hover `bg-primary-50` |
| `link` | No background, `text-primary-600`, hover `bg-primary-50` |

| Size | Height |
|---|---|
| `xs` | h-8 (32px), text-xs |
| `sm` | h-9 (36px), text-xs |
| `md` | h-10 (40px), text-sm |
| `lg` | h-11 (44px), text-sm |
| `xl` | h-12 (48px), text-base |

### `Button.Icon`

Wraps an icon child in a `<span>` so spacing tokens line up with the
button's `gap`.

| Prop | Type | Default |
|---|---|---|
| `children` | `ReactNode` | required |
| `position` | `"left" \| "right"` | — |
| `className` | `string` | — |

```tsx
<Button>
  <Button.Icon position="left"><Plus /></Button.Icon>
  Crear vehículo
</Button>
```

## Patterns

- Use `asChild` to wrap a router `<Link>` while keeping button styles.
  The child is the rendered element, so HTML attributes belong on it.
- Mix `Button.Icon` with text children rather than passing inline SVGs;
  the slot keeps spacing consistent across sizes.

## Mistakes

- **Adding `<a>` inside a `<Button>` without `asChild`.** Produces
  invalid nested interactive HTML — set `asChild` and let the link be
  the rendered element.
- **Using `variant="link"` for navigation while keeping `<button>`.** A
  `link` variant *visually* reads as a link, but if it actually
  navigates use `asChild` + an anchor so semantics match appearance.

## Related references

- [foundation.md](./foundation.md) — atoms overview.

## Source files

- `packages/urbix/src/ui/atoms/button/button.tsx`
- `packages/urbix/src/ui/atoms/button/status.json`
- `packages/urbix/src/ui/atoms/button/button.stories.tsx`
