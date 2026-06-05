---
name: urbix-components
description: Reference for using Urbix component library (atoms, molecules, organisms). Use when building UI with Urbix components, needing component API/props, composition patterns, or usage examples. Triggers on importing from @urbix/ui or @urbetrack/urbix, using DataTable/SideFilterPanel/Dropdown/Dialog/Tabs/Button/Checkbox/BottomSheet/UploadFile, file upload, dropzone, bottom sheet, snap points, tab navigation, Vaul drawer, building pages or features that need UI components, or asking about Urbix component APIs.
user-invocable: false
---

# Urbix Component Library

A component library following atomic design: **atoms** → **molecules** → **organisms**. Components live in `packages/urbix/src/ui/`.

## Quick start

When building UI with Urbix, pick the component from the index below and load only that component reference. Each component reference contains status, imports, usage, API, patterns, mistakes, related references, and source files.

Published package: **`@urbetrack/urbix`** (barrel export from package root). Path-style imports (`@urbix/ui/...`) match monorepo/tsconfig aliases when consuming from source.

```ts
import { Button, BottomSheet, useBottomSheet } from "@urbetrack/urbix"
import { DataTable } from "@urbix/ui/molecules/data-table"
import { Forms } from "@urbix/ui/organisms/forms"
```

Prefer `@urbetrack/urbix` for Public Components. Use `@urbix/ui/...` only for source-level work inside this repository or when a reference explicitly marks an API as internal.

## Workflows

- **Use a component** — open its linked reference, check `## Status`, copy the import from `## Imports`, then follow `## Usage` and `## Patterns`.
- **Choose between related components** — start from the index description, then follow `## Related references` for alternatives and workflow neighbors.
- **Document a component** — follow [references/_contract.md](./references/_contract.md), keep details in a one-level-deep reference file, link it from this index, and run `pnpm run check:skill-refs`.

## Shared Patterns

- **`cn()` utility** — combines `clsx` + `twMerge` for Tailwind class merging. Import from `@urbix/ui` internals or use inline.
- **CVA variants** — styling via `class-variance-authority`. Variant props are type-safe via `VariantProps<typeof xVariants>`.
- **Compound components** — dot notation (e.g., `DataTable.Toolbar`, `Button.Icon`, `Forms.InputText`). Root provides context, children consume it.
- **`data-slot` attributes** — every component renders a `data-slot="component-name"` for targeting in tests/styles.
- **`forwardRef`** — stateless atoms wrap HTML elements with `React.forwardRef`.
- **No useEffect setters** — state sync uses ref-based render-time diffing, not `useEffect`. Follow this pattern.

## Component Index

### Atoms (20)

Status markers mirror source intent. `(internal)` discourages consumer use, `(incubator)` means public but still incubating, and `(dev)` means lifecycle metadata is `dev`.

| Component | Description |
| ----------- | ------------- |
| `accordion` | Collapsible content sections (Radix). **→ [references/accordion.md](./references/accordion.md)** |
| `alert` *(internal, dev)* | Variant-driven alert with auto-icon (`AlertIndicator`/`Title`/`Description`). **→ [references/alert.md](./references/alert.md)** |
| `badge` | Small status labels. **→ [references/badge.md](./references/badge.md)** |
| `button` | Primary action element with `Button.Icon` sub-component. **→ [references/button.md](./references/button.md)** |
| `checkbox` *(internal)* | Controlled/uncontrolled checkbox with indeterminate state. **→ [references/checkbox.md](./references/checkbox.md)** |
| `chip` | Removable tag/filter chips (`Chip.Icon`/`Text`/`Close`). **→ [references/chip.md](./references/chip.md)** |
| `empty` | Empty state primitive (`EmptyHeader`/`Media`/`Title`/`Description`/`Content`). **→ [references/empty.md](./references/empty.md)** |
| `field` *(internal, dev)* | Form field primitives (`Field`, `FieldSet`, `FieldGroup`, `FieldLabel`, `FieldContent`, `FieldError`, ...). **→ [references/field.md](./references/field.md)** |
| `input` *(internal, dev)* | Low-level text input — prefer `Forms` or molecule `InputGroup`. **→ [references/input-atom.md](./references/input-atom.md)** |
| `label` *(internal, dev)* | Form label (Radix) — prefer `Forms` field labels. **→ [references/label.md](./references/label.md)** |
| `popover` | Floating content panel (Radix). **→ [references/popover.md](./references/popover.md)** |
| `separator` | Visual divider. **→ [references/separator.md](./references/separator.md)** |
| `spinner` | Loading indicator. **→ [references/spinner.md](./references/spinner.md)** |
| `status` | Status dot/badge (`Status.Icon`/`Text`). **→ [references/status.md](./references/status.md)** |
| `switch` | Toggle switch with optional inline label. **→ [references/switch.md](./references/switch.md)** |
| `table` | Low-level table primitives (`Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`). **→ [references/table.md](./references/table.md)** |
| `textarea` *(dev)* | Multi-line text input. **→ [references/textarea.md](./references/textarea.md)** |
| `tile` *(internal, dev)* | Selectable choice card (`Tile`, `TileGroup`, `TileContent`, `TileTitle`, `TileDescription`, `TileIndicator`, `TileSkeleton`). **→ [references/tile.md](./references/tile.md)** |
| `timestamp` *(internal, dev)* | Formatted date/time display with date-fns presets. **→ [references/timestamp.md](./references/timestamp.md)** |
| `tooltip` | Hover tooltip (Radix) with arrow positioning. **→ [references/tooltip.md](./references/tooltip.md)** |

### Molecules (26)

| Component | Description |
| ----------- | ------------- |
| `base-select` *(internal)* | Internal select primitive (`BaseSelectRadio`, `BaseSelectMultiple`) used by `Dropdown`/`DropdownMultiple`. **→ [references/base-select.md](./references/base-select.md)** |
| `bottom-sheet` | Vaul-based bottom drawer with snap points, handle chevrons, optional section grid. **→ [references/bottom-sheet.md](./references/bottom-sheet.md)** |
| `calendar` | Date picker calendar with configurable `locale` and `weekStartsOn`. **→ [references/calendar.md](./references/calendar.md)** |
| `command` *(source-only)* | cmdk wrapper used by Map search internals. **→ [references/command.md](./references/command.md)** |
| `confirm-modal` *(dev)* | Confirmation dialog with provider/hook API. **→ [references/confirm-modal.md](./references/confirm-modal.md)** |
| `data-table` | Full-featured data table with toolbar, pagination, sorting, selection. **→ [references/data-table.md](./references/data-table.md)** |
| `dialog` *(internal)* | Radix-based modal dialog. **→ [references/dialog.md](./references/dialog.md)** |
| `drawer` | Slide-out panel with compound API (`Header`, `Body`, `Footer`), size variants, and legacy wrapper compatibility. **→ [references/drawer.md](./references/drawer.md)** |
| `dropdown` | Single-select dropdown. **→ [references/dropdown.md](./references/dropdown.md)** |
| `dropdown-multiple` | Multi-select dropdown. **→ [references/dropdown-multiple.md](./references/dropdown-multiple.md)** |
| `dropdown-trigger` *(internal)* | Internal trigger used by `Dropdown`/`DropdownMultiple`. **→ [references/dropdown-trigger.md](./references/dropdown-trigger.md)** |
| `empty-state` *(dev)* | Hybrid compound empty state with shorthand props, `card`/`plain` surfaces, customizable root/media sizing, help contact, and composed action/content slots. **→ [references/empty-state.md](./references/empty-state.md)** |
| `input` | Enhanced input with optional left/right icons (built on `InputGroup`). **→ [references/input.md](./references/input.md)** |
| `input-group` *(internal, dev)* | Grouped input compound (`Addon`, `Button`, `Input`, `Textarea`). **→ [references/input-group.md](./references/input-group.md)** |
| `list-item` | List row with optional checkbox, icons, descriptions. **→ [references/list-item.md](./references/list-item.md)** |
| `menu` | Context/action menu with hierarchical items, search, multi-select. **→ [references/menu.md](./references/menu.md)** |
| `module-header` | Page/section header with optional back button. **→ [references/module-header.md](./references/module-header.md)** |
| `navigation-menu` *(dev)* | Sidebar navigation with collapsible mode, sections, and floating indicator. **→ [references/navigation-menu.md](./references/navigation-menu.md)** |
| `nested-select` | Hierarchical single/multi-select with generic typing (`DropdownNestedRadio`, `DropdownNestedMultiple`). **→ [references/nested-select.md](./references/nested-select.md)** |
| `numeric-input` | Numeric input with optional stepper buttons, precision/step control. **→ [references/numeric-input.md](./references/numeric-input.md)** |
| `radio-group` *(internal, dev)* | Radix-backed radio group (`RadioGroup`, `RadioGroup.Item`). **→ [references/radio-group.md](./references/radio-group.md)** |
| `search-bar` | Debounced search input with clear button, accessible labels, and controlled value API. **→ [references/search-bar.md](./references/search-bar.md)** |
| `tabs` | Declarative and compound tab navigation with `items`, `Root/List/Trigger/Content`, size variants, optional icons, and disabled tabs. **→ [references/tabs.md](./references/tabs.md)** |
| `toast` | Notification toasts via `useToast` hook. **→ [references/toast.md](./references/toast.md)** |
| `toggle-group` | Segmented button group (Radix-backed) with size variants and orientation. **→ [references/toggle-group.md](./references/toggle-group.md)** |
| `upload-file` *(incubator)* | Dropzone with instant handoff or deferred queue/start semantics. **→ [references/upload-file.md](./references/upload-file.md)** |

### Organisms (4)

| Component | Description |
| ----------- | ------------- |
| `forms` | Form system with React Hook Form (`Forms.Form`, `Forms.InputText`, `Forms.Dropdown`, `Forms.DropdownMultiple`, `Forms.DropdownNestedRadio`, `Forms.DropdownNestedMultiple`, `Forms.NumericInput`, `Forms.Switch`, `Forms.Textarea`, `Forms.UploadFile`). **→ [references/forms.md](./references/forms.md)** |
| `map` | Leaflet-based map with compound API (`Map.TileLayer`, `Markers`, `ZoomControls`, `LayerSelector`, `Search`, ...) and helpers. **→ [references/map.md](./references/map.md)** |
| `side-filter-panel` | Side filter panel with radio, multi-select, date, and date-range filters; supports custom triggers, compact input triggers, footer clear-all behavior (`clearAllBehavior`), calendar localization (`locale`, `weekStartsOn`), and optional `dismissGuard` (`ConfirmModal`). **→ [references/side-filter-panel.md](./references/side-filter-panel.md)** |
| `urbix-notification` | App notification provider exposing `useNotification()` (combines toast + confirm). **→ [references/notifications.md](./references/notifications.md)** |

## Advanced features

Detailed setup, theming, contribution, and component-reference authoring guidance live in the reference files. Keep `SKILL.md` as the quick-start and navigation surface.

| Reference | Description |
|-----------|-------------|
| [getting-started.md](./references/getting-started.md) | Installation, registry, CSS imports, provider setup |
| [theming.md](./references/theming.md) | Design tokens, color scales, cn(), CVA patterns |
| [\_contract.md](./references/_contract.md) | Component reference contract: vocabulary, required headings, lifecycle/deprecation rules |
| [contributing.md](./references/contributing.md) | Creating new components, folder structure, testing, Storybook |
| [foundation.md](./references/foundation.md) | Atoms & molecules overview and package boundaries |
| [data-table.md](./references/data-table.md) | DataTable compound component reference |
| [drawer.md](./references/drawer.md) | Drawer compound component reference |
| [dropdown.md](./references/dropdown.md) | Dropdown & DropdownMultiple reference |
| [forms.md](./references/forms.md) | Forms system with react-hook-form + Zod |
| [side-filter-panel.md](./references/side-filter-panel.md) | SideFilterPanel reference |
| [search-bar.md](./references/search-bar.md) | SearchBar reference |
| [tabs.md](./references/tabs.md) | Tabs molecule reference |
| [empty-state.md](./references/empty-state.md) | EmptyState molecule reference |
| [upload-file.md](./references/upload-file.md) | UploadFile dropzone with instant and deferred modes |
| [nested-select.md](./references/nested-select.md) | DropdownNestedRadio & DropdownNestedMultiple reference |
| [map.md](./references/map.md) | Map compound component with Leaflet |
| [notifications.md](./references/notifications.md) | Toast & confirmation dialog system |

## Anti-Patterns

- **Never use `useEffect` to sync derived state.** Use ref-based render-time comparison instead.
- **Never set state inside `useEffect`.** Prefer computed values or event handlers.
- **Prefer composition over prop drilling.** Use compound component slots, not deep prop chains.
- **Don't override component internal styles.** Use the `styles` prop when available, or `className` for layout only.
