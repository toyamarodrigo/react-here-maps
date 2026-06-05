# Map

## Status

- Scope: Public Component
- Lifecycle: beta

## Imports

```typescript
import {
  Map,
  createMarkerIcon,
  createDivMarkerIcon,
  createClusterIcon,
  createLayerSelectorStore,
  createSearchStore,
  fitBoundsWithOffset,
  flyToWithOffset,
  useMapZoom,
} from "@urbetrack/urbix";
```

The map requires a dedicated stylesheet in addition to the base styles. Without it, tiles overlap, markers misalign, and popups are unstyled.

```css
@import "tailwindcss";
@import "@urbetrack/urbix/styles.css";
@import "@urbetrack/urbix/map.css";
```

## Usage

```typescript
import { Map } from "@urbetrack/urbix";

function BasicMap() {
  return (
    <Map center={[-34.6037, -58.3816]} zoom={13}>
      <Map.TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Map.ZoomControls position="bottom-right" />
    </Map>
  );
}
```

## API

### Map (root)

`Map` wraps react-leaflet's `MapContainer` and exposes a `MapContext` for imperative access via `onMapReady`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `center` | `[number, number]` | **required** | Initial map center `[lat, lng]` |
| `zoom` | `number` | `13` | Initial zoom level |
| `minZoom` | `number` | `4` | Minimum allowed zoom |
| `maxZoom` | `number` | — | Maximum allowed zoom |
| `scrollWheelZoom` | `boolean` | `true` | Enable scroll-wheel zoom |
| `zoomControl` | `boolean` | `false` | Show Leaflet default zoom control (use `Map.ZoomControls` instead) |
| `className` | `string` | — | Applied to the outer wrapper div |
| `children` | `ReactNode` | **required** | Sub-components |
| `onMapReady` | `(map: LeafletMap) => void` | — | Called once the Leaflet map instance is ready |

### Map.TileLayer

Renders a tile layer. Pass the tile URL template with `{z}/{y}/{x}` placeholders.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `url` | `string` | **required** | Tile URL template |

### Map.Markers

Renders a collection of markers with optional clustering.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `MarkerData[]` | **required** | Array of `{ id, position, icon }` |
| `clustering` | `boolean` | `false` | Enable react-leaflet-cluster |
| `clusterOptions` | `ClusterOptions` | — | `maxClusterRadius`, `spiderfyOnMaxZoom`, `showCoverageOnHover`, `chunkedLoading`, `iconCreateFunction` |
| `onMarkerClick` | `(id: string \| number) => void` | — | Called when a marker is clicked |

`MarkerData`: `{ id: string | number; position: [number, number]; icon: L.Icon | L.DivIcon }`.

### Map.Marker

Single marker. Use when rendering markers individually rather than through `Map.Markers`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string \| number` | **required** | Marker identifier |
| `position` | `[number, number]` | **required** | `[lat, lng]` |
| `icon` | `L.Icon \| L.DivIcon` | **required** | Leaflet icon instance |
| `onClick` | `(id: string \| number) => void` | — | Click handler |

### Map.Polygons

Renders filled polygons. When `selectedId` is set, the selected polygon renders on top at `selectedOpacity` (0.6); others dim to `dimmedOpacity` (0.1). When null, all render at `defaultOpacity` (0.3).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `PolygonData[]` | **required** | Array of `{ id, positions, color, fillOpacity?, weight? }` |
| `selectedId` | `string \| null` | — | ID of the currently selected polygon |

`PolygonData`: `{ id; positions: [number, number][]; color; fillOpacity?; weight? }`.

### Map.Circles

Renders circles.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `CircleData[]` | **required** | Array of `{ id, center, radius, color, fillOpacity?, weight?, markerIcon? }` |

`CircleData`: `{ id; center: [number, number]; radius: number (meters); color; fillOpacity? (0.2); weight? (2); markerIcon?: L.Icon }`.

### Map.ZoomControls

Custom zoom in/out buttons. Preferred over the Leaflet default (`zoomControl` prop on root).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `position` | `"top-right" \| "top-left" \| "bottom-right" \| "bottom-left"` | **required** | Corner to render in |
| `className` | `string` | — | Additional CSS class |
| `offset` | `{ bottom?; right?; left?; top? }` | — | Pixel offset from the corner |

### Map.Popover

Renders a popover anchored to a lat/lng position.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `position` | `[number, number]` | **required** | `[lat, lng]` anchor |
| `onClose` | `() => void` | **required** | Called when the popover is closed |
| `children` | `ReactNode` | **required** | Popover body |
| `maxWidth` | `number` | `320` | Max width in pixels |
| `offset` | `[number, number]` | — | Pixel offset |
| `closeOnClick` | `boolean` | `true` | Close when the map is clicked |

### Map.Controls

Prevents click and scroll-wheel propagation to the map. Used to embed UI controls (buttons, panels) on top of the map.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `position` | `"top-right" \| "top-left" \| "bottom-right" \| "bottom-left"` | **required** | Corner to render in |
| `children` | `ReactNode` | **required** | Control content |

### Map.LayerSelector

Compound component for switching tile layers and toggling overlay groups. Requires a Zustand store created with `createLayerSelectorStore`.

```
Map.LayerSelector (store, meta?, children)
  ├── Map.LayerSelector.Trigger (asChild?, children)
  └── Map.LayerSelector.Content (side?, children)
        ├── Map.LayerSelector.TilePanelTrigger (title?, subtitle?)
        ├── Map.LayerSelector.TilePanel (heading?)
        ├── Map.LayerSelector.Group (groupId)
        ├── Map.LayerSelector.Toggle (groupId, itemId)
        └── Map.LayerSelector.TileOption (tileId)
```

#### createLayerSelectorStore config

```typescript
type LayerSelectorStoreConfig = {
  tileOptions: { id: string; label: string; imagePreviewUrl?: string }[];
  defaultTileId: string;
  toggleGroups: {
    id: string;
    label: string;
    showDivider?: boolean;
    items: { id: string; label: string; defaultChecked?: boolean; badge?: ReactNode; disabled?: boolean }[];
  }[];
};
```

Always wrap the store in `useRef(...).current` to prevent re-creation on every render.

#### Reading store state

```typescript
const selectedTileId = layerStore((s) => s.selectedTileId);
const isVisible = layerStore((s) =>
  s.toggleGroups.find(g => g.id === "routes")?.items.find(i => i.id === "in-progress")?.checked
);
```

### Map.Search

Compound component for a cmdk-powered search overlay with recent-search history. Requires a Zustand store created with `createSearchStore`.

```
Map.Search (store, onSelect, meta?, children)
  ├── Map.Search.Trigger
  └── Map.Search.Content (width?, side?)
        ├── Map.Search.Input (placeholder?)
        └── Map.Search.List (maxHeight?)
              ├── Map.Search.Group (heading)
              │     ├── Map.Search.Item (value, label, entry, icon?, sublabel?)
              │     └── Map.Search.Empty
              └── Map.Search.RecentList (heading?, emptyState?)
```

When `onSelect` fires, the store automatically adds the entry to recent searches.

#### createSearchStore config

```typescript
type SearchStoreConfig = {
  maxRecentSearches?: number; // default: 5
  initialRecentSearches?: RecentSearchEntry[];
};

type RecentSearchEntry = {
  id: string;
  label: string;
  sublabel?: string;
  icon?: ReactNode;
  data: Record<string, unknown>;
};
```

### Utility functions

#### createMarkerIcon

Creates a standard Leaflet `L.Icon` from a URL. Defaults: `size` [48, 48], `anchor` center of size.

```typescript
const icon = createMarkerIcon({ iconUrl: "/assets/marker.png", size: [25, 41], anchor: [12, 41] });
```

#### createDivMarkerIcon

Creates a `L.DivIcon` that renders an image with an optional label above it. Returns `L.DivIcon`.

```typescript
const icon = createDivMarkerIcon({ iconUrl: "/assets/vehicle.png", label: "Truck 42", size: [48, 48] });
```

#### createClusterIcon

Default cluster icon factory. Pass to `clusterOptions.iconCreateFunction`. Renders a circular badge sized by count.

#### fitBoundsWithOffset

Fits the map to bounds with a left pixel offset (useful when a side panel is open).

```typescript
fitBoundsWithOffset(map, bounds, { leftOffset: 400, maxZoom: 16, paddingTop: 50 });
```

Defaults: `leftOffset: 0`, `maxZoom: 16`, `paddingTop: 50`.

#### flyToWithOffset

Animates the map to a position and zoom level with a left pixel offset.

```typescript
flyToWithOffset(map, [-34.6037, -58.3816], 15, { leftOffset: 400, animate: true });
```

Defaults: `leftOffset: 0`, `animate: true`.

### useMapZoom

Returns the current zoom level reactively. Must be used inside a child of `<Map>`.

```typescript
function ZoomDisplay() {
  const zoom = useMapZoom();
  return <span>Zoom: {zoom}</span>;
}
```

## Patterns

### Markers with clustering

```typescript
import { Map, createMarkerIcon, createClusterIcon } from "@urbetrack/urbix";

const markerIcon = createMarkerIcon({
  iconUrl: "/assets/marker.png",
  size: [25, 41],
  anchor: [12, 41],
});

const markers = [
  { id: "loc-1", position: [-34.6037, -58.3816] as [number, number], icon: markerIcon },
  { id: "loc-2", position: [-34.6099, -58.3924] as [number, number], icon: markerIcon },
];

<Map center={[-34.6037, -58.3816]} zoom={12}>
  <Map.TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
  <Map.Markers
    data={markers}
    clustering
    clusterOptions={{ iconCreateFunction: createClusterIcon }}
    onMarkerClick={(id) => console.log("Clicked:", id)}
  />
  <Map.ZoomControls position="bottom-right" />
</Map>
```

### Polygons with selection highlighting

```typescript
import { Map } from "@urbetrack/urbix";
import { useState } from "react";

function PolygonsMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const polygons = [
    { id: "zone-a", positions: [[-34.595, -58.39], [-34.595, -58.37], [-34.605, -58.37], [-34.605, -58.39]] as [number, number][], color: "#3b82f6" },
    { id: "zone-b", positions: [[-34.608, -58.395], [-34.608, -58.375], [-34.618, -58.375], [-34.618, -58.395]] as [number, number][], color: "#ef4444" },
  ];

  return (
    <Map center={[-34.6037, -58.3816]} zoom={13}>
      <Map.TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Map.Polygons data={polygons} selectedId={selectedId} />
      <Map.ZoomControls position="bottom-right" />
    </Map>
  );
}
```

### Circles

```typescript
const circles = [
  { id: "c1", center: [-34.603, -58.381] as [number, number], radius: 500, color: "#8b5cf6" },
  { id: "c2", center: [-34.612, -58.395] as [number, number], radius: 300, color: "#f59e0b" },
];

<Map.Circles data={circles} />
```

### LayerSelector with Zustand store

```typescript
import { Map, createLayerSelectorStore } from "@urbetrack/urbix";
import { Layers } from "lucide-react";
import { useRef } from "react";

const TILE_URLS: Record<string, string> = {
  osm: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
};

function MapWithLayers() {
  const layerStore = useRef(createLayerSelectorStore({
    tileOptions: [
      { id: "osm", label: "OpenStreetMap" },
      { id: "satellite", label: "Satellite" },
    ],
    defaultTileId: "osm",
    toggleGroups: [
      {
        id: "routes",
        label: "Routes",
        items: [
          { id: "in-progress", label: "In progress", defaultChecked: true },
          { id: "finished", label: "Finished", defaultChecked: true },
        ],
      },
    ],
  })).current;

  const selectedTileId = layerStore((s) => s.selectedTileId);
  const tileUrl = TILE_URLS[selectedTileId] ?? TILE_URLS.osm;

  return (
    <Map center={[-34.6037, -58.3816]} zoom={13}>
      <Map.TileLayer url={tileUrl} />
      <Map.ZoomControls position="bottom-right" />
      <Map.Controls position="top-right">
        <Map.LayerSelector store={layerStore}>
          <Map.LayerSelector.Trigger>
            <Layers className="size-4" />
          </Map.LayerSelector.Trigger>
          <Map.LayerSelector.Content>
            <Map.LayerSelector.TilePanelTrigger title="Map details" />
            <Map.LayerSelector.TilePanel />
            <Map.LayerSelector.Group groupId="routes" />
          </Map.LayerSelector.Content>
        </Map.LayerSelector>
      </Map.Controls>
    </Map>
  );
}
```

### Map Search with recent searches

```typescript
import { Map, createSearchStore } from "@urbetrack/urbix";
import type { RecentSearchEntry } from "@urbetrack/urbix";
import { MapPin, Search } from "lucide-react";
import { useMemo, useRef } from "react";

function MapWithSearch() {
  const searchStore = useRef(createSearchStore({ maxRecentSearches: 5 })).current;
  const query = searchStore((s) => s.query);

  const results: RecentSearchEntry[] = useMemo(() => {
    if (!query) return [];
    return [
      { id: "res-1", label: `Result for "${query}"`, sublabel: "Address 1", data: { lat: -34.60 } },
    ];
  }, [query]);

  return (
    <Map center={[-34.6037, -58.3816]} zoom={13}>
      <Map.TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Map.Controls position="top-left">
        <Map.Search store={searchStore} onSelect={(entry) => console.log(entry)}>
          <Map.Search.Trigger>
            <Search className="size-4" />
          </Map.Search.Trigger>
          <Map.Search.Content>
            <Map.Search.Input placeholder="Search locations..." />
            <Map.Search.List>
              {query ? (
                <>
                  <Map.Search.Group heading="Results">
                    {results.map((r) => (
                      <Map.Search.Item key={r.id} value={r.id} label={r.label} entry={r} icon={<MapPin className="size-4" />} />
                    ))}
                  </Map.Search.Group>
                  <Map.Search.Empty>No results found.</Map.Search.Empty>
                </>
              ) : (
                <Map.Search.RecentList />
              )}
            </Map.Search.List>
          </Map.Search.Content>
        </Map.Search>
      </Map.Controls>
    </Map>
  );
}
```

### Popover on marker click

```typescript
const [popoverPosition, setPopoverPosition] = useState<[number, number] | null>(null);

{popoverPosition && (
  <Map.Popover position={popoverPosition} onClose={() => setPopoverPosition(null)} maxWidth={320} offset={[0, -20]}>
    <div className="p-2">
      <h3 className="text-sm font-semibold">Location details</h3>
    </div>
  </Map.Popover>
)}
```

### onMapReady for imperative operations

```typescript
const mapRef = useRef<LeafletMap | null>(null);

<Map center={[-34.6037, -58.3816]} zoom={13} onMapReady={(map) => { mapRef.current = map; }}>
  ...
</Map>
```

Use `mapRef.current` after `onMapReady` fires to attach event listeners, call `fitBoundsWithOffset`, `flyToWithOffset`, etc.

## Mistakes

### CRITICAL: Missing map.css import

Wrong:

```css
@import "tailwindcss";
@import "@urbetrack/urbix/styles.css";
```

Correct:

```css
@import "tailwindcss";
@import "@urbetrack/urbix/styles.css";
@import "@urbetrack/urbix/map.css";
```

Without `map.css`, tiles overlap, markers misalign, and popups are unstyled.

### HIGH: Not wrapping the store in useRef

Wrong:

```typescript
function MapPage() {
  const layerStore = createLayerSelectorStore({ ... }); // re-created on every render
  return <Map.LayerSelector store={layerStore}>...</Map.LayerSelector>;
}
```

Correct:

```typescript
const layerStore = useRef(createLayerSelectorStore({ ... })).current;
```

The store must be stable across renders. Wrapping in `useRef(...).current` ensures it is created once.

### HIGH: Using Map sub-components outside Map root

Wrong:

```typescript
<div>
  <Map.TileLayer url="..." />
</div>
```

Correct:

```typescript
<Map center={[-34.6037, -58.3816]} zoom={13}>
  <Map.TileLayer url="..." />
</Map>
```

All `Map.*` sub-components require react-leaflet's `MapContainer` context provided by the `Map` root.

## Related references

None known.

## Source files

- `packages/urbix/src/ui/organisms/map/map.ts` — compound component assembly
- `packages/urbix/src/ui/organisms/map/components/map-root.tsx` — `Map` root, `MapProps`, `MapContext`
- `packages/urbix/src/ui/organisms/map/components/map-tile-layer.tsx`
- `packages/urbix/src/ui/organisms/map/components/map-markers.tsx`
- `packages/urbix/src/ui/organisms/map/components/map-marker.tsx`
- `packages/urbix/src/ui/organisms/map/components/map-polygons.tsx`
- `packages/urbix/src/ui/organisms/map/components/map-circles.tsx`
- `packages/urbix/src/ui/organisms/map/components/map-zoom-controls.tsx`
- `packages/urbix/src/ui/organisms/map/components/map-popover.tsx`
- `packages/urbix/src/ui/organisms/map/components/map-controls.tsx`
- `packages/urbix/src/ui/organisms/map/components/layer-selector/` — `Map.LayerSelector` and sub-components, `createLayerSelectorStore`
- `packages/urbix/src/ui/organisms/map/components/search/` — `Map.Search` and sub-components, `createSearchStore`
- `packages/urbix/src/ui/organisms/map/hooks/use-map-zoom.ts`
- `packages/urbix/src/ui/organisms/map/utils/create-marker-icon.ts`
- `packages/urbix/src/ui/organisms/map/utils/create-div-marker-icon.ts`
- `packages/urbix/src/ui/organisms/map/utils/create-cluster-icon.ts`
- `packages/urbix/src/ui/organisms/map/utils/fit-bounds-with-offset.ts`
- `packages/urbix/src/ui/organisms/map/utils/fly-to-with-offset.ts`
- `packages/urbix/src/ui/organisms/map/map.css` — required stylesheet
- `packages/urbix/src/ui/organisms/map/status.json`
- `packages/urbix/src/ui/organisms/map/map.stories.tsx`
