# React HERE Maps

This package provides React hooks, components and examples for HERE Maps API for JavaScript.

![image](https://user-images.githubusercontent.com/41844101/221454450-4d1128e0-fb35-4385-969d-c7fae5493beb.png)

Demo: <https://react-here-maps-web.vercel.app/>

## Installation

```bash
npm install @toyamarodrigo/react-here-maps

# or
yarn add @toyamarodrigo/react-here-maps

# or
pnpm add @toyamarodrigo/react-here-maps
```

## Usage

To use `@toyamarodrigo/react-here-maps`, you will need to obtain an API key from HERE Maps. You can sign up for a free account and obtain an API key here.

<https://developer.here.com/tutorials/getting-here-credentials/>

## Examples

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
  - [x] Marker
  - [x] DOM Marker
  - [ ] Polygons
  - [x] Polyline
  - [ ] Circles
  - [ ] InfoWindows
  - [ ] Directions

- Hooks
  - [x] Map Instance - useHereMaps
  - [x] Routing - useRoutingService
  - [ ] Geocoding & Search - useGeocodingService
  - [ ] Isoline - useIsolineService
  - [ ] Waypoints - useWaypointsService
  - [ ] Matrix - useMatrixService

## HERE Maps API Docs

<https://developer.here.com/documentation/maps/3.1.38.0/dev_guide/index.html>
