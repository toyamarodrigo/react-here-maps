# React HERE Maps

This package provides a React hooks and components for HERE Maps.

## HERE Maps Provider Example

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
