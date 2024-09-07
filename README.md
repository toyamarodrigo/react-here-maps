# React HERE Maps

This package provides React hooks, components and examples for HERE Maps API for JavaScript.

![image](https://user-images.githubusercontent.com/41844101/221454450-4d1128e0-fb35-4385-969d-c7fae5493beb.png)

Demo: <https://react-here-maps.vercel.app/>

## Installation

First, you need to include the HERE Maps API for JavaScript CSS in your HTML file.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" />
  </head>
  <body>
    ...
  </body>
</html>

```

```bash
# After that, install the HERE Maps API for JavaScript with your favorite package manager
npm install --save-dev @here/maps-api-for-javascript --registry=https://repo.platform.here.com/artifactory/api/npm/maps-api-for-javascript/
```

```bash
# Then install @rodrito/react-here-maps with your favorite package manager
npm install @rodrito/react-here-maps

# or
yarn add @rodrito/react-here-maps

# or
pnpm add @rodrito/react-here-maps
```

## Usage

To use `@rodrito/react-here-maps`, you will need to obtain an API key from HERE Maps. You can sign up for a free account and obtain an API key here.

<https://developer.here.com/tutorials/getting-here-credentials/>

## Example

```jsx
import { HereMap } from '@rodrito/react-here-maps';

const App = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <HereMap 
        apikey={"YOUR_API_KEY"}
        options={{
          center: { lat: -34.603722, lng: -58.401592 },
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
  - [x] Zoom Control (Basic)
  - [x] Scale Bar (Basic)
  - [x] Map Settings (Basic)
  - [x] Polyline
  - [ ] Polygons

## HERE Maps API Docs

<https://www.here.com/docs/bundle/maps-api-for-javascript-developer-guide/page/README.html>
