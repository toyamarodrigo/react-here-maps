# Table

Low-level HTML table primitives with Urbix styling. For data grids
(sorting, pagination, virtualization, selection) reach for
[data-table.md](./data-table.md) instead.

## Status

- Scope: Public Component
- Lifecycle: not declared

## Imports

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@urbetrack/urbix";
```

## Usage

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Patente</TableHead>
      <TableHead>Estado</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {vehiculos.map((v) => (
      <TableRow key={v.id}>
        <TableCell>{v.patente}</TableCell>
        <TableCell>{v.estado}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## API

| Component | HTML Element | Key Styles |
|---|---|---|
| `Table` | `<table>` | `w-full caption-bottom text-sm`, wrapped in scrollable div |
| `TableHeader` | `<thead>` | `font-semibold text-sm` |
| `TableBody` | `<tbody>` | — |
| `TableFooter` | `<tfoot>` | `bg-muted/50` |
| `TableRow` | `<tr>` | `border-b hover:bg-muted/50` |
| `TableHead` | `<th>` | `h-12 px-4 font-semibold` |
| `TableCell` | `<td>` | `p-4 align-middle` |
| `TableCaption` | `<caption>` | `mt-4 text-sm text-muted-foreground` |

## Patterns

- Use these primitives only for static or low-volume tables (read-only
  summaries, printable views). For anything interactive, use
  `DataTable`.

## Mistakes

- **Reaching for `Table` to build a sortable list.** Reimplements
  things `DataTable` already has (toolbar, sorting, pagination,
  selection, virtualization).

## Related references

- [data-table.md](./data-table.md) — full-featured data grid molecule.

## Source files

- `packages/urbix/src/ui/atoms/table/`
