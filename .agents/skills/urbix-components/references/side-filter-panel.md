# SideFilterPanel

Side-drawer filter system for views that need several form-backed filters, Zod validation, and persistent Zustand state. It composes `Drawer`, `Forms`, `BaseSelect`, `NestedSelect`, `Calendar`, and `ConfirmModal`.

## Status

- Scope: Public Component
- Lifecycle: beta

## Imports

```tsx
import { Button, SideFilterPanel, createFilterStore } from "@urbetrack/urbix";
import type { SideFilterDateRangeValue } from "@urbetrack/urbix";
import { z } from "zod";
```

For advanced custom filter fields:

```tsx
import { ConnectForm } from "@urbetrack/urbix/internals";
```

## Usage

```tsx
import { Button, SideFilterPanel, createFilterStore } from "@urbetrack/urbix";
import { z } from "zod";

const schema = z.object({
  districtId: z.number().nullable(),
  neighborhoodIds: z.array(z.number()).nullable(),
});

const useFilters = createFilterStore(schema);

function AssetFilters() {
  return (
    <SideFilterPanel
      schema={schema}
      store={useFilters}
      trigger={<Button>Filters</Button>}
    >
      <SideFilterPanel.RadioSelectFilter
        name="districtId"
        title="District"
        dataKey="id"
        optionValue="id"
        optionLabel="value"
        displayLabel="value"
        placeholder="Select a district"
        options={districts}
      />
      <SideFilterPanel.MultiSelectFilter
        name="neighborhoodIds"
        title="Neighborhoods"
        dataKey="id"
        optionValue="id"
        optionLabel="value"
        displayLabel="value"
        placeholder="Select neighborhoods"
        options={neighborhoods}
      />
    </SideFilterPanel>
  );
}
```

## API

### Exports and compound parts

| Export | Purpose |
|---|---|
| `SideFilterPanel` | Root drawer plus `react-hook-form` provider, submit, clear, and dirty-dismiss behavior |
| `SideFilterPanel.RadioSelectFilter` | Single-select filter backed by `BaseSelectRadio` |
| `SideFilterPanel.SelectFilter` | Single-select list with native-select visual treatment and left checkmark |
| `SideFilterPanel.MultiSelectFilter` | Multi-select filter backed by `BaseSelectMultiple` |
| `SideFilterPanel.NestedRadioSelectFilter` | Hierarchical single-select filter |
| `SideFilterPanel.NestedMultiSelectFilter` | Hierarchical multi-select filter with optional select-all |
| `SideFilterPanel.DateFilter` | Single-date filter with optional compact input trigger |
| `SideFilterPanel.DateRangeFilter` | Date-range filter with optional compact input trigger |
| `BaseFilterPanel` | Lower-level drawer/form shell for custom filter orchestration |
| `createFilterStore(schema, initialValues?)` | Builds the Zustand store required by `SideFilterPanel` |
| `cloneFilterState(value)` | Structured clone helper used by the store and reset flow |
| `useInitialFieldValue(name)` | Reads the root's initial field value for custom clear behavior |

### `SideFilterPanelProps<TFormValues>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `store` | `FilterStore<TFormValues>` | required | Zustand store from `createFilterStore` |
| `schema` | `z.ZodType<TFormValues>` | required | Zod schema used by `zodResolver` and form typing |
| `children` | `ReactNode` | required | Filter fields rendered inside the drawer body |
| `trigger` | `ReactNode` | -- | Element that opens the drawer, usually a `Button` |
| `container` | `HTMLElement \| null` | -- | Drawer portal target for embedded layouts |
| `cancelTextButton` | `string` | `"Limpiar todos"` | Footer clear button label |
| `confirmTextButton` | `string` | `"Aplicar"` | Submit button label |
| `clearAllBehavior` | `"initial" \| "empty"` | `"initial"` | Clear footer resets to store initial values or schema-empty values |
| `dismissGuard` | `DismissGuardConfig` | -- | Confirmation modal config for dirty close attempts |

### Option filter props

`RadioSelectFilter`, `SelectFilter`, and `MultiSelectFilter` omit `value`, `onChange`, `optionValue`, and `optionLabel` from the underlying BaseSelect field because the root owns form state.

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | required | Field path; must match the Zod schema and store shape |
| `title` | `string` | required | Filter label shown in the drawer |
| `options` | `T[]` | required | Options passed to the underlying BaseSelect |
| `dataKey` | `keyof T` | required | Stable option identity |
| `optionLabel` | `keyof T` | required | Option text field |
| `optionValue` | `keyof T` | -- | Stored value field; omit to store the full option |
| `displayLabel` | `keyof T` | -- | Field used in the trigger summary |
| `placeholder` | `string` | -- | Empty trigger text |
| `disabled` | `boolean` | `false` | Disables the filter |
| `isLoading` | `boolean` | `false` | Shows loading state when supported by the filter |
| `required` | `boolean` | `false` | Shows required marker and lets schema validation enforce it |
| `clearable` | `boolean` | `false` | Adds per-field clear that restores the field initial value |
| `clearText` | `string` | -- | Label for the per-field clear action |
| `allSelectedLabel` | `string` | -- | Multi-select summary when every option is selected |

`MultiSelectFilter` also supports `showSelectAll`, `itemTemplate`, `filter`, `filterCustom`, `moveSelectedToTop`, and other `BaseSelectMultiple` options that are not form-state props.

### Nested filter props

`NestedRadioSelectFilter` and `NestedMultiSelectFilter` use `NestedSelectNode<TLevel, TId>[]` options and `NestedSelectSelection<TLevel, TId> | null` values.

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | required | Field path in the schema/store |
| `title` | `string` | required | Filter label |
| `options` | `NestedSelectNode<TLevel, TId>[]` | required | Tree-shaped options |
| `ariaLabel` | `string` | -- | Accessible label for the tree control |
| `filter` | `boolean` | inherited | Enables search in the tree |
| `filterPlaceholder` | `string` | -- | Search input placeholder |
| `filterEmptyMessage` | `string` | -- | Message when no nodes match |
| `itemTemplate` | `NestedSelectItemTemplate<TLevel, TId>` | -- | Custom row renderer |
| `size` | `ISize` | -- | Trigger/control sizing |
| `showSelectAll` | `boolean` | -- | Multi-select only; shows select-all action |
| `allSelectedLabel` | `string` | -- | Multi-select only; summary when all nodes are selected |

### Date filter props

`DateFilter` stores `string | null`. `DateRangeFilter` stores `SideFilterDateRangeValue | null`, where `SideFilterDateRangeValue` is `{ from: string | null; to: string | null }`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | required | Field path in the schema/store |
| `title` | `string` | required | Filter label |
| `placeholder` | `string` | -- | Empty trigger text |
| `disabled` | `boolean` | `false` | Disables the filter |
| `isLoading` | `boolean` | `false` | Shows loading state |
| `required` | `boolean` | `false` | Shows required marker and relies on schema validation |
| `clearText` | `string` | -- | Label for the per-field clear action |
| `disableFutureDates` | `boolean` | `true` | Prevents picking future dates |
| `triggerMode` | `"item" \| "input"` | `"item"` | Uses the normal filter row or a compact input-style trigger |
| `trigger` | `ReactElement` | -- | Custom trigger element |
| `showTriggerBadge` | `boolean` | -- | Controls badge display for custom/compact triggers |
| `locale` | `Locale` | -- | date-fns locale for calendar labels |
| `weekStartsOn` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | -- | Calendar first day of week |
| `showOutsideDays` | `boolean` | `false` | DateRangeFilter only; renders outside-month days |

### Store API

| API | Type | Description |
|---|---|---|
| `createFilterStore(schema, initialValues?)` | `(ZodType, Partial<T>?) => FilterStore<T>` | Creates a Zustand store seeded by `zod-empty` plus optional initial values |
| `store.getInitialState()` | `() => T` | Returns the initial values used for drawer open/reset |
| `store.getEmptyState()` | `() => T` | Returns the schema-empty values used by `clearAllBehavior="empty"` |
| `store.getState()` | `() => T` | Reads applied filters |
| `store.setState(next)` | Zustand API | Updates applied filters |

## Patterns

### Keep the store outside render

```tsx
const schema = z.object({
  sourceId: z.number().nullable(),
});

const useFilters = createFilterStore(schema, { sourceId: 2 });
```

Create the filter store at module scope or in a stable ref. Creating it inside render resets the baseline on every render and breaks clear/apply semantics.

### Choose explicit clear semantics

Use `clearAllBehavior="initial"` when "Limpiar todos" should restore preselected filters. Use `clearAllBehavior="empty"` when the footer button should truly clear every schema field to its `zod-empty` value.

```tsx
<SideFilterPanel
  schema={schema}
  store={useFilters}
  clearAllBehavior="empty"
  cancelTextButton="Limpiar filtros"
/>
```

### Guard dirty dismissals

`dismissGuard` opens `ConfirmModal` only when `react-hook-form` reports `isDirty`. It covers the X button, outside click, and Escape key.

```tsx
<SideFilterPanel
  schema={schema}
  store={useFilters}
  dismissGuard={{
    title: "Unsaved changes",
    description: "You have unapplied filters.",
    confirmTextButton: "Discard",
    rejectTextButton: "Keep editing",
  }}
/>
```

### Match date schemas to field values

```tsx
const schema = z.object({
  day: z.string().nullable(),
  period: z.object({
    from: z.string().nullable(),
    to: z.string().nullable(),
  }).nullable(),
});
```

Use `DateFilter` for `string | null` fields and `DateRangeFilter` for `{ from, to } | null` fields.

### Build custom fields through `ConnectForm`

```tsx
import { ConnectForm } from "@urbetrack/urbix/internals";

function MyCustomFilter() {
  return (
    <ConnectForm>
      {({ setValue }) => (
        <button type="button" onClick={() => setValue("sourceId", null)}>
          Clear source
        </button>
      )}
    </ConnectForm>
  );
}
```

Reach for this only when the provided compound filters do not cover the workflow.

## Mistakes

- **Importing repository aliases in app code.** Use `@urbetrack/urbix` for `SideFilterPanel` and `createFilterStore`; `@urbix/ui/...` is source-local.
- **Creating the store inside a component.** This recreates initial and empty baselines on every render. Move `createFilterStore` to module scope or a stable ref.
- **Omitting `schema` or passing a schema that does not match the store.** The root uses `zodResolver(schema)`, and filter `name` values must exist in both the schema and store state.
- **Using `DateFilter` with a range object or `DateRangeFilter` with a string.** Match the schema to the field value shape.
- **Expecting per-field clear to empty the value.** `clearable` restores the field's initial value. Use footer `clearAllBehavior="empty"` for schema-empty clearing.
- **Assuming `trigger` changes layout mode.** Date filters use `triggerMode="input"` for compact input styling; a custom `trigger` only changes the trigger element.

## Related references

- [drawer.md](./drawer.md) — side-panel shell used by `BaseFilterPanel`.
- [forms.md](./forms.md) — React Hook Form wrapper and `ConnectForm`.
- [base-select.md](./base-select.md) — internal select primitives used by option filters.
- [nested-select.md](./nested-select.md) — tree option shape and selection value.
- [calendar.md](./calendar.md) — date picker calendar used by date filters.
- [confirm-modal.md](./confirm-modal.md) — dismiss guard confirmation UI.

## Source files

- `packages/urbix/src/ui/organisms/side-filter-panel/side-filter-panel.tsx`
- `packages/urbix/src/ui/organisms/side-filter-panel/base-filter-panel.tsx`
- `packages/urbix/src/ui/organisms/side-filter-panel/filter-panel.types.ts`
- `packages/urbix/src/ui/organisms/side-filter-panel/store/side-filter-panel.store.ts`
- `packages/urbix/src/ui/organisms/side-filter-panel/context/filter-panel.context.ts`
- `packages/urbix/src/ui/organisms/side-filter-panel/helpers/get-display-label.ts`
- `packages/urbix/src/ui/organisms/side-filter-panel/components/filters/`
- `packages/urbix/src/ui/organisms/side-filter-panel/index.ts`
- `packages/urbix/src/ui/organisms/side-filter-panel/status.json`
- `packages/urbix/src/ui/organisms/side-filter-panel/side-filter-panel.stories.tsx`
