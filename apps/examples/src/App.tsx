import { useState } from "react";
import { HereMapsProvider, HereMarker } from "react-here-maps";

import { HERE_MAPS_APIKEY } from "./constants";

function App() {
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);

  const customIcon = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
  <rect stroke="white" fill="#1b468d" x="1" y="1" width="22" height="22" />
  <text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold" text-anchor="middle" fill="white">
    H
  </text>
</svg>`;

  const positions = [
    { lat: -34.603722, lng: -58.401592 },
    { lat: -34.602722, lng: -58.411592, icon: customIcon },
    { lat: -34.601722, lng: -58.421592 },
  ];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <HereMapsProvider
        apiKey={HERE_MAPS_APIKEY}
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
          ppi: 320,
        }}
      >
        <div
          ref={(node) => setMapContainer(node)}
          style={{ width: "100%", height: "100vh" }}
        />
        {positions.map((position, index) => (
          <HereMarker
            key={index}
            positions={position}
            data={{
              title: `Marker ${index}`,
            }}
            icon={position.icon || undefined}
            iconOptions={{
              stickHeight: 80,
            }}
          />
        ))}
      </HereMapsProvider>
    </div>
  );
}

export default App;
