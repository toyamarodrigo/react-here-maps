# React HERE Maps

Modern React components and hooks for HERE Maps Platform integration.

![image](https://user-images.githubusercontent.com/41844101/221454450-4d1128e0-fb35-4385-969d-c7fae5493beb.png)

**[Documentation](https://github.com/toyamarodrigo/react-here-maps/tree/main/apps/docs)** | **[Demo](https://react-here-maps.vercel.app/)** | **[npm](https://www.npmjs.com/package/@rodrito/react-here-maps)**

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
# First add to .npmrc
@here:registry=https://repo.platform.here.com/artifactory/api/npm/maps-api-for-javascript/
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

## Documentation

For detailed documentation, visit the [docs directory](./apps/docs) or run the documentation locally:

```bash
pnpm run:docs
```

The documentation is built with [Mintlify](https://mintlify.com/) and includes:
- Component API reference
- Usage guides and examples
- TypeScript support guide
- Interactive examples

## Components

- ✅ **HereMap** - Main map container
- ✅ **Marker** - Map markers with drag support
- ✅ **Polyline** - Draw lines on the map
- ✅ **Polygon** - Draw polygons with holes
- ✅ **ZoomControl** - Zoom controls
- ✅ **ScaleBar** - Distance scale
- ✅ **MapSettings** - Map configuration controls

## Contributing

See [TODO.md](./TODO.md) for planned features and improvements.

## Resources

- [HERE Maps API Documentation](https://www.here.com/docs/bundle/maps-api-for-javascript-developer-guide/page/README.html)
- [Get HERE API Key](https://developer.here.com/)
