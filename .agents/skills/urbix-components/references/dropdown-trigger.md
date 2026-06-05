# DropdownTrigger

Internal styled trigger surface used by `Dropdown`,
`DropdownMultiple`, and the nested-select variants. Renders the
chevron icon, focus/hover/error/disabled states, and forwards a
`ref` to the wrapping `<div>` for use as a Radix Popover anchor.

Consumers must not import this directly; reach for `Dropdown`
(see [dropdown.md](./dropdown.md)) or `DropdownMultiple` (see
[dropdown-multiple.md](./dropdown-multiple.md)) instead.

## Status

- Scope: Internal Component
- Lifecycle: beta

## Imports

```tsx
import { DropdownTrigger } from "@urbix/ui/molecules/dropdown-trigger";
```

`DropdownTrigger` is not re-exported from `@urbetrack/urbix` or
`@urbetrack/urbix/internals`; only intra-package callers reach for it.

## Usage

Internal pattern used inside `Dropdown` / `DropdownMultiple`:

```tsx
<PopoverTrigger asChild>
  <DropdownTrigger
    open={open}
    placeholder={placeholder}
    hasSelection={hasSelected}
    hasError={invalid}
    disabled={disabled}
    size={size}
  >
    {children}
  </DropdownTrigger>
</PopoverTrigger>
```

## API

| Prop | Type | Default |
|---|---|---|
| `open` | `boolean` | -- |
| `hasSelection` | `boolean` | -- |
| `hasError` | `boolean` | -- |
| `disabled` | `boolean` | -- |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | -- |
| `placeholder` | `string` | -- |
| `tabIndex` | `number` | `0` (or `-1` when `disabled`) |
| `onClick` | `MouseEventHandler<HTMLDivElement>` | -- |

Plus all `ComponentProps<"div">`. `ref` is forwarded to the root
`<div>`.

## Patterns

- Pair with Radix `PopoverTrigger asChild` to make the trigger the
  popover anchor without nesting button-in-button.
- Disabled triggers automatically receive `tabIndex={-1}` and skip
  the `onClick` callback — do not duplicate that gating in callers.

## Mistakes

- **Importing from `@urbetrack/urbix`.** Not part of any public
  surface. Internal callers use the relative path within the package.
- **Reimplementing chevron / focus styles.** Use this component so
  `Dropdown` and any new dropdown-shaped molecule share consistent
  visuals, including `hasError` and `hasSelection` states.

## Related references

- [dropdown.md](./dropdown.md)
- [dropdown-multiple.md](./dropdown-multiple.md)
- [popover.md](./popover.md)

## Source files

- `packages/urbix/src/ui/molecules/dropdown-trigger/dropdown-trigger.tsx`
- `packages/urbix/src/ui/molecules/dropdown-trigger/dropdown-trigger.styles.ts`
- `packages/urbix/src/ui/molecules/dropdown-trigger/status.json`
- `packages/urbix/src/ui/molecules/dropdown-trigger/dropdown-trigger.stories.tsx`
