# DataTable

Compound data grid built on `@tanstack/react-table` v8. Provides root setup, an optional toolbar slot, table content with virtualization and sticky header support, paginated and standalone-skeleton variants, and a `useDataTable` hook for context access from arbitrary children.

This reference is the single authoritative skill page for DataTable. Other guides may show how DataTable participates in a workflow, but DataTable API details live here.

## Status

- Scope: Public Component
- Lifecycle: not declared

## Imports

```tsx
import { DataTable, useDataTable } from "@urbetrack/urbix";
import type {
  DataTableRootProps,
  DataTableToolbarProps,
  DataTableContentProps,
  DataTablePaginationProps,
  DataTableSkeletonProps,
  DataTableLabels,
  DataTableStyles,
  DataTableContextValue,
} from "@urbetrack/urbix";
import type { ColumnDef, RowSelectionState, PaginationState } from "@tanstack/react-table";

// Internal alias (workspace consumers only):
import { DataTable } from "@urbix/ui/molecules/data-table";
```

## Usage

```tsx
const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Rol" },
];

function UsersTable({ users }: { users: User[] }) {
  return (
    <DataTable data={users} columns={columns}>
      <DataTable.Toolbar>
        <h2>Users</h2>
        <button>Export</button>
      </DataTable.Toolbar>
      <DataTable.Content />
      <DataTable.Pagination type="client" />
    </DataTable>
  );
}
```

## API

### Sub-components

| Component | Purpose | Key props |
|---|---|---|
| `DataTable` (root) | Provider + TanStack table setup | `data`, `columns`, `enableRowSelection`, `isLoading`, `labels`, `styles`, `tableConfig` |
| `DataTable.Toolbar` | Layout slot for custom toolbar content | `children`, `className` |
| `DataTable.Content` | Table rendering (standard or virtualized) | `virtualized`, `maxHeight`, `stickyHeader`, `customRowsRender` |
| `DataTable.Pagination` | Pagination footer | `type`, `pageSizeOptions`, `pageSize`, `onPaginationChange`, `useUrlPagination` |
| `DataTable.Skeleton` | Standalone loading skeleton (no context required) | `rows`, `cols`, `headers` |

### DataTable (root) — `DataTableRootProps<TData>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `TData[]` | required | Dataset array |
| `columns` | `ColumnDef<TData, any>[]` | required | TanStack column definitions |
| `getRowId` | `(row: TData) => string` | `row => row.id` | Custom row id extractor |
| `enableRowSelection` | `boolean` | `false` | Adds checkbox column + selection state |
| `rowSelection` | `RowSelectionState` | internal `{}` | Controlled selection (`{ [rowId]: true }`) |
| `onRowSelectionChange` | `(selection: RowSelectionState) => void` | -- | Controlled mode callback |
| `labels` | `Partial<DataTableLabels>` | see defaults | i18n string overrides |
| `styles` | `Partial<DataTableStyles>` | see defaults | Tailwind class overrides |
| `tableConfig` | `Partial<TableOptions<TData>>` | `{}` | Pass-through to `useReactTable` (e.g. `manualPagination`, `rowCount`) |
| `initialColumnPinning` | `ColumnPinningState` | `{ left: [], right: [] }` | Pinned column ids |
| `rowClickHandler` | `(row: Row<TData>) => void` | -- | Row click callback (adds `cursor-pointer`) |
| `isLoading` | `boolean` | `false` | Renders shimmer skeleton rows inside the table structure |

Default `labels`:

```ts
{
  empty: "No hay resultados.",
  rowsPerPage: "Filas por página:",
  of: "de",
  results: "resultados",
}
```

Default `styles`:

```ts
{
  headerBackground: "bg-primary-50",
  headerText: "text-primary-600",
  rowHover: "hover:bg-primary-50",
  selectedRow: "bg-primary-50",
}
```

### DataTable.Toolbar — `DataTableToolbarProps`

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | -- | Custom toolbar content |
| `className` | `string` | -- | Wrapper class |

Layout-only slot: renders children inside a styled wrapper. Place search, filters, action buttons, and tab strips as children.

### DataTable.Content — `DataTableContentProps<TData>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `virtualized` | `boolean` | `false` | Use `react-virtuoso` for large datasets |
| `maxHeight` | `string` | -- (`"600px"` if virtualized) | CSS height for the scroll container |
| `stickyHeader` | `boolean` | `false` | Pin header on scroll (requires `maxHeight`) |
| `className` | `string` | -- | Applied to `<table>` |
| `customRowsRender` | `(rows: Row<TData>[], hasSelectColumn: boolean) => JSX.Element` | -- | Override row rendering |

### DataTable.Pagination — `DataTablePaginationProps`

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `"client" \| "server" \| "none"` | -- | Pagination mode. Omit or `"none"` to hide |
| `pageSizeOptions` | `number[]` | `[5, 10, 15]` | Rows-per-page options |
| `pageSize` | `number` | `10` | Initial page size |
| `rowCount` | `number` | -- | Total rows for server mode display |
| `pagination` | `PaginationState` | -- | Controlled pagination `{ pageIndex, pageSize }` |
| `onPaginationChange` | `(pagination: PaginationState) => void` | -- | Server mode change callback |
| `useUrlPagination` | `boolean` | `false` | Sync `pageIndex` / `pageSize` to URL search params |
| `urlParamPrefix` | `string` | `""` | URL param prefix (e.g., `"users"` → `usersPage`) |
| `renderCustomFooter` | `(table, pagination) => JSX.Element` | -- | Replace pagination UI entirely |
| `className` | `string` | -- | Wrapper class |

### DataTable.Skeleton — `DataTableSkeletonProps`

| Prop | Type | Default | Description |
|---|---|---|---|
| `rows` | `number` | `10` | Number of skeleton rows |
| `cols` | `number` | `6` | Number of columns |
| `headers` | `string[]` | `[]` | Column header labels |
| `className` | `string` | -- | Applied to `<Table>` |

`DataTable.Skeleton` is **standalone** -- it does not need to be inside a `<DataTable>` root.

### `useDataTable<TData>()`

Access the DataTable context from any descendant. Returns the full `DataTableContextValue<TData>` including the TanStack `table` instance, `styles`, `labels`, `isLoading`, etc. Throws if used outside a `<DataTable>` provider.

```tsx
function ToolbarSelectionCount() {
  const { table } = useDataTable<User>();
  return <span>{table.getSelectedRowModel().rows.length} selected</span>;
}
```

## Patterns

### Row selection (controlled)

```tsx
const [selected, setSelected] = useState<RowSelectionState>({});

<DataTable
  data={users}
  columns={columns}
  enableRowSelection
  getRowId={(row) => row.userId}
  rowSelection={selected}
  onRowSelectionChange={setSelected}
>
  <DataTable.Content />
  <DataTable.Pagination type="client" />
</DataTable>;
```

### Server pagination

```tsx
<DataTable
  data={pageData}
  columns={columns}
  tableConfig={{ manualPagination: true, rowCount: totalCount }}
>
  <DataTable.Content />
  <DataTable.Pagination
    type="server"
    rowCount={totalCount}
    pagination={pagination}
    onPaginationChange={setPagination}
  />
</DataTable>
```

### Client pagination

```tsx
<DataTable data={users} columns={columns}>
  <DataTable.Content />
  <DataTable.Pagination type="client" pageSizeOptions={[10, 25, 50]} />
</DataTable>
```

### Virtualized with sticky header

```tsx
<DataTable data={largeDataset} columns={columns}>
  <DataTable.Content virtualized stickyHeader maxHeight="500px" />
</DataTable>
```

Pick virtualization OR pagination, not both -- see Mistakes.

### Loading state

```tsx
// Option A: shimmer rows inside the existing table structure
<DataTable data={[]} columns={columns} isLoading={isLoading}>
  <DataTable.Content />
</DataTable>

// Option B: standalone skeleton (no data/columns required)
<DataTable.Skeleton rows={8} cols={4} headers={["Nombre", "Email", "Rol", "Acciones"]} />
```

### Empty state

When `data` is `[]` and `isLoading` is `false`, the configured `labels.empty` is rendered inside the table. Override per-table:

```tsx
<DataTable data={[]} columns={columns} labels={{ empty: "No users found" }}>
  <DataTable.Content />
</DataTable>
```

### Column pinning

```tsx
<DataTable
  data={users}
  columns={columns}
  initialColumnPinning={{ left: ["name"], right: ["actions"] }}
>
  <DataTable.Content />
</DataTable>
```

### Sortable columns

Sorting is enabled per-column via `enableSorting: true` (default `true`). To force enable across a column set:

```tsx
const sortableColumns: ColumnDef<User>[] = columns.map((col) => ({
  ...col,
  enableSorting: true,
}));
```

### Row click handler

```tsx
<DataTable
  data={users}
  columns={columns}
  rowClickHandler={(row) => navigate(`/users/${row.original.id}`)}
>
  <DataTable.Content />
</DataTable>
```

### Custom labels and styles

```tsx
<DataTable
  data={users}
  columns={columns}
  labels={{ empty: "No users found", rowsPerPage: "Rows per page:" }}
  styles={{
    headerBackground: "bg-blue-50",
    headerText: "text-blue-700",
    rowHover: "hover:bg-blue-50",
  }}
>
  <DataTable.Content />
  <DataTable.Pagination type="client" />
</DataTable>
```

### Toolbar with custom content

```tsx
<DataTable data={users} columns={columns}>
  <DataTable.Toolbar className="flex items-center justify-between">
    <h2 className="text-lg font-semibold">Users</h2>
    <div className="flex gap-2">
      <SearchInput onSearch={handleSearch} />
      <button>Export CSV</button>
      <button>Add User</button>
    </div>
  </DataTable.Toolbar>
  <DataTable.Content />
  <DataTable.Pagination type="client" />
</DataTable>
```

### URL-synced pagination

```tsx
<DataTable.Pagination type="client" useUrlPagination urlParamPrefix="users" />
{/* URL: ?usersPage=2&usersPageSize=10 */}
```

### Accessing table state from children

Compose toolbar widgets that depend on table state by reading `useDataTable()` rather than threading props through the root.

## Mistakes

### CRITICAL: Missing compound children

```tsx
// Wrong
<DataTable data={data} columns={columns} />

// Correct
<DataTable data={data} columns={columns}>
  <DataTable.Content />
  <DataTable.Pagination type="client" />
</DataTable>
```

The root renders only `{children}`. Without `DataTable.Content`, no table appears. Without `DataTable.Pagination`, no pagination controls appear.

Source: `data-table.tsx`.

### CRITICAL: Using the pre-v0.7 pagination prop API

```tsx
// Wrong (legacy)
<DataTable
  data={data}
  columns={columns}
  enablePagination
  serverSide
  onPageChange={handlePageChange}
/>

// Correct
<DataTable data={data} columns={columns}>
  <DataTable.Content />
  <DataTable.Pagination
    type="server"
    rowCount={totalCount}
    pagination={pagination}
    onPaginationChange={setPagination}
  />
</DataTable>
```

The current API uses the compound `DataTable.Pagination` sub-component with `type="client" | "server" | "none"`.

Source: `data-table.types.ts` -- `DataTablePaginationProps`.

### HIGH: Server pagination without `rowCount`

```tsx
// Wrong
<DataTable
  data={pageData}
  columns={columns}
  tableConfig={{ manualPagination: true }}
>
  <DataTable.Content />
  <DataTable.Pagination type="server" onPaginationChange={setPagination} />
</DataTable>

// Correct
<DataTable
  data={pageData}
  columns={columns}
  tableConfig={{ manualPagination: true, rowCount: totalCount }}
>
  <DataTable.Content />
  <DataTable.Pagination
    type="server"
    rowCount={totalCount}
    pagination={pagination}
    onPaginationChange={setPagination}
  />
</DataTable>
```

Without `rowCount` in `tableConfig`, TanStack Table cannot calculate total pages, so navigation breaks.

Source: `data-table-pagination.tsx` (`table.getRowCount()` / `table.getPageCount()`).

### HIGH: Not providing `getRowId` for selection

```tsx
// Wrong
<DataTable data={users} columns={columns} enableRowSelection>

// Correct
<DataTable
  data={users}
  columns={columns}
  enableRowSelection
  getRowId={(row) => row.userId}
>
```

The default `getRowId` falls back to `row.id`. When data refreshes (e.g. after re-fetch) and the underlying objects do not have a stable `id`, selected rows shift or disappear. Always supply `getRowId` pointing at a stable unique key when enabling selection.

Source: `data-table.tsx` -- `getRowId: getRowId ?? ((row: any) => row.id)`.

### MEDIUM: Mixing virtualization with client pagination

```tsx
// Avoid
<DataTable.Content virtualized maxHeight="500px" />
<DataTable.Pagination type="client" />
```

Virtualized mode renders all rows in a virtual scroll container. Adding `<DataTable.Pagination type="client" />` is redundant -- the paginator only paginates the already-visible dataset and the UI becomes confusing. Pick virtualization for very large lists, or pagination otherwise.

### MEDIUM: `stickyHeader` without `maxHeight`

```tsx
// Wrong
<DataTable.Content stickyHeader />

// Correct
<DataTable.Content stickyHeader maxHeight="400px" />
```

`stickyHeader` requires a scrollable container, which only exists when `maxHeight` is set.

Source: `data-table-content.tsx` -- `StandardTable` checks `stickyHeader && maxHeight`.

### LOW: Re-implementing the auto-select column

If your `columns` already include an `id: "select"` column, the auto-generated checkbox column is skipped. Don't define both -- pick one.

## Related references

- [table.md](./table.md) -- low-level `Table` atom for hand-built tables that don't need DataTable's toolbar/pagination/virtualization.
- [tabs.md](./tabs.md) -- pattern for embedding `Tabs` inside `DataTable.Toolbar`.
- [side-filter-panel.md](./side-filter-panel.md) -- common host alongside DataTable for filtering workflows.

## Source files

- `packages/urbix/src/ui/molecules/data-table/data-table.tsx`
- `packages/urbix/src/ui/molecules/data-table/data-table.context.ts`
- `packages/urbix/src/ui/molecules/data-table/data-table.types.ts`
- `packages/urbix/src/ui/molecules/data-table/components/` (`data-table-content.tsx`, `data-table-pagination.tsx`, `data-table-toolbar.tsx`, `data-table-skeleton.tsx`)
- `packages/urbix/src/ui/molecules/data-table/hooks/` (`use-page-input.ts`, `use-server-pagination-sync.ts`)
- `packages/urbix/src/ui/molecules/data-table/index.ts`
- `packages/urbix/src/ui/molecules/data-table/data-table.stories.tsx`
