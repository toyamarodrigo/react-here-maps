import { HereMapsProvider } from "@toyamarodrigo/react-here-maps";
import { useState } from "react";

function App() {
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <HereMapsProvider
        apiKey="n1nKN-IRXE0oQUMkkfD_47KZzXRDKS0C51lt1BtRo-k"
        mapContainer={mapContainer}
        mapOptions={{
          center: {
            lat: -34.603722,
            lng: -58.381592,
          },
          zoom: 12,
        }}
        layerOptions={{
          style: "normal",
          ppi: 72,
        }}
      >
        <div
          ref={(node) => setMapContainer(node)}
          style={{ width: "100%", height: "100%" }}
        />
      </HereMapsProvider>
    </div>
  );
}

export default App;
