# React HERE Maps

This package provides a React hooks and components for HERE Maps.

## Installation

```bash
npm install @toyamarodrigo/react-here-maps

# or
yarn add @toyamarodrigo/react-here-maps

# or
pnpm add @toyamarodrigo/react-here-maps
```

## Usage

```jsx
import React from 'react';
import { HereMapsProvider } from '@toyamarodrigo/react-here-maps';


const App = () => {
  const [mapContainer, setMapContainer] = React.useState(null);

  return (
    <HereMapsProvider
      apiKey={HERE_MAPS_APIKEY}
      mapContainer={mapContainer}
    >
      <div
        ref={(node) => setMapContainer(node)}
        style={{ width: "100%", height: "100vh" }}
      />
    </HereMapsProvider>
  );
};
```

## TODO

- Components
  - [x] Map Provider
  - [x] Markers
  - [ ] Polygons
  - [ ] Polyline
  - [ ] Circles
  - [ ] InfoWindows
  - [ ] Directions

- Hooks
  - [x] Map Instance - useHereMaps
  - [ ] Routing - useHereMapsRouting
  - [ ] Geocoding & Search - useHereMapsGeocoding
  - [ ] Isoline - useHereMapsIsoline
  - [ ] Waypoints - useHereMapsWaypoints
  - [ ] Matrix - useHereMapsMatrix
