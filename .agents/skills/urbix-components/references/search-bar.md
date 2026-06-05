# SearchBar

## Status

- Scope: Public Component
- Lifecycle: not declared

## Imports

```ts
import { SearchBar } from "@urbetrack/urbix"
```

## Usage

```tsx
import { SearchBar } from "@urbetrack/urbix"
import { useState } from "react"

function UsersToolbar() {
  const [query, setQuery] = useState("")

  return (
    <SearchBar
      value={query}
      onChange={setQuery}
      placeholder="Buscar usuarios"
    />
  )
}
```

## API

### `SearchBarProps`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | **required** | Controlled search value |
| `onChange` | `(value: string) => void` | **required** | Called with the next search value |
| `placeholder` | `string` | `"Buscar..."` | Input placeholder |
| `className` | `string` | — | Applied to the outer wrapper |
| `debounceMs` | `number` | `300` | Debounce delay for typing before `onChange` fires |
| `clearLabel` | `string` | `"Limpiar búsqueda"` | Accessible label for the clear button |
| `searchLabel` | `string` | `"Buscar"` | Accessible label for the text input |

### Behavior

- Controlled component: the rendered input stays synced with the external `value` prop.
- Typing updates the local input immediately and calls `onChange` after `debounceMs`.
- Clicking the clear button clears immediately, calls `onChange("")`, and returns focus to the input.
- Pressing `Escape` clears immediately, calls `onChange("")`, and blurs the input.
- The clear button only appears when the input currently has a value.
- The search icon is always visible and is decorative (`aria-hidden`).

## Patterns

### Custom debounce for remote search

```tsx
<SearchBar
  value={query}
  onChange={setQuery}
  debounceMs={500}
  placeholder="Buscar vehículos"
/>
```

### Custom accessibility labels

```tsx
<SearchBar
  value={query}
  onChange={setQuery}
  placeholder="Find users..."
  searchLabel="Find users"
  clearLabel="Clear search"
/>
```

## Mistakes

### HIGH: Treating SearchBar as uncontrolled

Wrong:

```tsx
<SearchBar value="" onChange={() => {}} />
```

Correct:

```tsx
const [query, setQuery] = useState("")

<SearchBar value={query} onChange={setQuery} />
```

`SearchBar` is controlled. If `value` never updates in response to `onChange`, the UI will snap back to the old value.

### MEDIUM: Expecting debounced typing and clear actions to behave the same

Typing is debounced, but clear interactions are immediate. `handleClear` and `Escape` both call `onChange("")` right away.

### LOW: Using `className` to style the inner input

`className` applies to the outer wrapper (`data-slot="search-bar"`). If you need deeper visual changes, prefer updating the component implementation instead of assuming `className` reaches the inner `InputGroupInput`.

## Related references

- [input-group.md](./input-group.md) — `InputGroup` primitive that SearchBar is built on

## Source files

- `packages/urbix/src/ui/molecules/search-bar/search-bar.tsx`
- `packages/urbix/src/ui/molecules/search-bar/use-search-bar.ts`
- `packages/urbix/src/ui/molecules/search-bar/search-bar.stories.tsx`
- `packages/urbix/src/ui/molecules/search-bar/index.ts`
