import { HereMap, HereMarker } from "@toyamarodrigo/react-here-maps";
import { Routing } from "./Routing";

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
  { lat: -34.612722, lng: -58.421592 },
  { lat: -34.622722, lng: -58.391592 },
  { lat: -34.632722, lng: -58.381592 },
];

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <HereMap
        apiKey={import.meta.env.VITE_HERE_MAPS_APIKEY}
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
        <Routing />
      </HereMap>
    </div>
  );
}

export default App;
