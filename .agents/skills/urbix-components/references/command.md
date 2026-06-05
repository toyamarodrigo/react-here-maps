# Command

`Command` is a thin cmdk wrapper used by Urbix source modules that need command-list behavior, currently Map search.

## Status

- Scope: Source-only Component
- Lifecycle: not declared

## Imports

```tsx
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@urbix/ui/molecules/command";
```

Use this import only inside the Urbix repository. `Command` is not exported from `@urbetrack/urbix`.

## Usage

```tsx
<Command>
  <CommandInput placeholder="Buscar..." />
  <CommandList>
    <CommandEmpty>Sin resultados</CommandEmpty>
    <CommandGroup>
      <CommandItem value="vehicles">Vehiculos</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

## API

`Command` re-exports source-only wrappers around cmdk primitives:

| Export | Description |
|---|---|
| `Command` | Root command container |
| `CommandDialog` | Command inside an Urbix `Dialog` |
| `CommandInput` | Search input with search icon |
| `CommandList` | Scrollable results container |
| `CommandEmpty` | Empty-results state |
| `CommandGroup` | Grouped results section |
| `CommandItem` | Selectable command row |
| `CommandSeparator` | Visual separator |
| `CommandShortcut` | Right-aligned shortcut text |

## Patterns

- Use `Command` when an existing Urbix source module needs cmdk behavior behind its own public interface.
- Keep product-facing selection APIs on public modules such as `Dropdown`, `DropdownMultiple`, or `Map.Search`.

## Mistakes

- **Importing `Command` from product code.** It is source-only; product code should use public Urbix modules or own its custom command UI.
- **Adding `Command` to the public barrel by default.** Keep it source-only until there is a supported public API and docs.

## Related references

- [map.md](./map.md) — Map search composes `Command` internally.

## Source files

- `packages/urbix/src/ui/molecules/command/command.tsx`
- `packages/urbix/src/ui/molecules/command/index.ts`
