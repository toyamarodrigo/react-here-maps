# EmptyState

Hybrid empty-state molecule for zero-data, zero-results, and fallback screens. Supports a **shorthand API** for quick usage and a **compound API** for richer layouts. Built on the `Empty` atom family.

## Status

- Scope: Public Component
- Lifecycle: dev

## Imports

```tsx
import { EmptyState } from "@urbetrack/urbix";
import type {
  EmptyStateProps,
  EmptyStateRootProps,
  EmptyStateMediaProps,
  HelpConfig,
} from "@urbetrack/urbix";
```

## Usage

```tsx
import searchLogoUrl from "@/assets/empty-state/logo-1.svg";

<EmptyState
  media={<img src={searchLogoUrl} alt="sin resultados" style={{ width: 80, height: 80 }} />}
  mediaVariant="image"
  title="Sin resultados"
  description="No hay elementos que coincidan con tus criterios."
  actionLabel="Limpiar filtros"
  onAction={clearFilters}
/>;
```

## API

### EmptyState — `EmptyStateProps` (shorthand)

| Prop | Type | Default |
|---|---|---|
| `media` | `ReactNode` | -- (takes priority over `icon`) |
| `mediaVariant` | `"icon" \| "image"` | `"icon"` |
| `icon` | `ReactNode` | -- (legacy alias for `media`) |
| `title` | `string` | `"No se encontró la página"` |
| `description` | `string` | `"Disculpa, la página que buscas ya no está disponible."` |
| `actionLabel` | `string` | -- (renders only with `onAction`) |
| `onAction` | `() => void` | -- |
| `showHelp` | `boolean` | `false` |
| `helpConfig` | `HelpConfig` | Urbetrack support defaults |
| `children` | `ReactNode` | -- |
| `surface` | `"card" \| "plain"` | `"card"` |
| `rootProps` | `ComponentPropsWithoutRef<typeof Empty>` | -- |
| `mediaProps` | `ComponentPropsWithoutRef<typeof EmptyMedia>` | -- |

```ts
type HelpConfig = {
  phone?: string;
  email?: string;
  text?: string;
};
```

Defaults: `phone: "+54 9 11 6437 0298"`, `email: "mesadeayuda@urbettrack.com"`, `text: "¿Necesitas ayuda? Comunicate con soporte al"`. Partial overrides merge with defaults.

### Compound parts

All compound parts forward props to their `Empty` atom counterparts.

#### EmptyState.Root

`ComponentPropsWithoutRef<typeof Empty>` — including `surface: "card" \| "plain"`, `className`, `style`, `variant`.

#### EmptyState.Header

Layout wrapper. `ComponentPropsWithoutRef<typeof EmptyHeader>`.

#### EmptyState.Media

`ComponentPropsWithoutRef<typeof EmptyMedia>`. Pass `variant="icon" | "image"` and `style` for explicit width/height.

#### EmptyState.Title / EmptyState.Description

Props from `EmptyTitle` and `EmptyDescription` atoms.

#### EmptyState.Content

`ComponentPropsWithoutRef<typeof EmptyContent>`. Container for actions and help.

#### EmptyState.Actions

`HTMLAttributes<HTMLDivElement>`. Default layout: `flex w-full flex-col items-center gap-2`.

#### EmptyState.Help

`HTMLAttributes<HTMLDivElement> & { helpConfig?: HelpConfig }`. Renders the support contact line.

## Patterns

### Plain surface

```tsx
<EmptyState
  surface="plain"
  title="Todavía no hay ubicaciones"
  description="Agregá un punto al mapa para empezar."
/>
```

### Custom sizing in shorthand mode

```tsx
<EmptyState
  media={<img src={searchLogoUrl} alt="sin actividad" />}
  mediaVariant="image"
  title="Todavía no hay actividad"
  description="Cuando aparezcan nuevos registros, los vas a ver acá."
  rootProps={{ style: { width: 360, minHeight: 320 } }}
  mediaProps={{ style: { width: 120, height: 120 } }}
/>
```

### Compound composition

```tsx
<EmptyState.Root surface="plain" style={{ width: 360, minHeight: 280 }}>
  <EmptyState.Header>
    <EmptyState.Media variant="image" style={{ width: 120, height: 120 }}>
      <img src={searchLogoUrl} alt="sin actividad" />
    </EmptyState.Media>
    <EmptyState.Title>Sin actividad reciente</EmptyState.Title>
    <EmptyState.Description>
      Cuando alguien cargue novedades, las vas a ver acá.
    </EmptyState.Description>
  </EmptyState.Header>

  <EmptyState.Content>
    <EmptyState.Actions>
      <Button>Empezar ahora</Button>
      <Button variant="secondary">Ver guía</Button>
    </EmptyState.Actions>
    <EmptyState.Help helpConfig={{ email: "soporte@example.com" }} />
  </EmptyState.Content>
</EmptyState.Root>
```

### Help block in compound mode

```tsx
<EmptyState.Content>
  <EmptyState.Help
    helpConfig={{
      text: "¿Necesitas ayuda? Contactanos en",
      email: "soporte@example.com",
    }}
  />
</EmptyState.Content>
```

## Mistakes

- **Adding boolean props like `hideBorder` or `isCard={false}`.** Use `surface="plain"` instead.
- **Ignoring `media` and using only `icon`.** `media` takes priority and is the supported field; `icon` exists for legacy compatibility.
- **Adding one-off sizing props.** Use `rootProps={{ style: ... }}` and `mediaProps={{ style: ... }}` for width/height overrides — or switch to the compound API.
- **Building a card-wrapper around shorthand mode.** It's already a card by default; either set `surface="plain"` or compose with the compound parts.

## Related references

- [empty.md](./empty.md) — underlying atom family.
- [button.md](./button.md) — used internally for the primary action.

## Source files

- `packages/urbix/src/ui/molecules/empty-state/empty-state.tsx`
- `packages/urbix/src/ui/molecules/empty-state/status.json`
- `packages/urbix/src/ui/molecules/empty-state/empty-state.stories.tsx`
