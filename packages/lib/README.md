# React HERE Maps

This package provides React hooks, components and examples for HERE Maps API for JavaScript.

![image](https://user-images.githubusercontent.com/41844101/221454450-4d1128e0-fb35-4385-969d-c7fae5493beb.png)

Demo: <https://react-here-maps.vercel.app/>

## Installation

```bash
# First Install you need to install @here/@here/maps-api-for-javascript
npm install --save-dev @here/maps-api-for-javascript --registry=https://repo.platform.here.com/artifactory/api/npm/maps-api-for-javascript/
```

```bash
# Then install @toyamarodrigo/react-here-maps with your favorite package manager
npm install @toyamarodrigo/react-here-maps

# or
yarn add @toyamarodrigo/react-here-maps

# or
pnpm add @toyamarodrigo/react-here-maps
```

## Usage

To use `@toyamarodrigo/react-here-maps`, you will need to obtain an API key from HERE Maps. You can sign up for a free account and obtain an API key here.

<https://developer.here.com/tutorials/getting-here-credentials/>

## Example

```jsx
import React from 'react';
import { HereMap } from '@toyamarodrigo/react-here-maps';

const App = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <HereMap
        apiKey={"YOUR_API_KEY"}
        mapOptions={{
          center: {
            lat: -34.6083,
            lng: -58.3712,
          },
          zoom: 12,
        }}
      >
      {/* Markers, Polylines and stuff */}
      </HereMap>
    </div>
  );
};
```

## TODO

- Components
  - [x] Map
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
