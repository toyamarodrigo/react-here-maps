import {
  HereMap,
  Marker,
  Polyline,
  ScaleBar,
  ZoomControl,
} from "@toyamarodrigo/react-here-maps";

const customIcon = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
  <rect stroke="white" fill="#1b468d" x="1" y="1" width="22" height="22" />
  <text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold" text-anchor="middle" fill="white">
    H
  </text>
</svg>`;

const customIcon2 = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
  <rect stroke="white" fill="#bb468d" x="1" y="1" width="22" height="22" />
  <text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold" text-anchor="middle" fill="white">
    H
  </text>
</svg>`;

const positions = [
  { lat: -34.603722, lng: -58.401592 },
  { lat: -34.602722, lng: -58.411592, icon: customIcon2, stickHeight: 60 },
  { lat: -34.601722, lng: -58.421592 },
  { lat: -34.632722, lng: -58.381592 },
];

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <HereMap
        apikey={import.meta.env.VITE_HERE_MAPS_APIKEY}
        options={{
          center: { lat: -34.603722, lng: -58.401592 },
          zoom: 12,
          engineType: "webgl",
        }}
      >
        <ZoomControl />
        <ScaleBar />
        <Marker
          position={{
            lat: -34.613724,
            lng: -58.421592,
          }}
          label="Custom Icon"
          icon="https://static.vecteezy.com/system/resources/thumbnails/019/897/155/small/location-pin-icon-map-pin-place-marker-png.png"
          stickHeight={60}
        />
        <Marker
          draggable
          position={{
            lat: -34.623724,
            lng: -58.441592,
          }}
          label="Custom Icon"
          icon={customIcon}
          stickHeight={60}
        />
        <Marker
          draggable
          position={{
            lat: -34.623724,
            lng: -58.431592,
          }}
          label="Default Icon"
        />
        {positions.map((position) => (
          <Marker
            key={`${position.lat}-${position.lng}`}
            position={{
              lat: position.lat,
              lng: position.lng,
            }}
            icon={position.icon || null}
            stickHeight={position.stickHeight || 0}
          />
        ))}
        <Polyline
          points={[
            { lat: -34.603722, lng: -58.401592 },
            { lat: -34.632722, lng: -58.381592 },
            { lat: -34.642724, lng: -58.391592 },
            { lat: -34.672730, lng: -58.421592 },
            { lat: -34.682730, lng: -58.381592 },
          ]}
          options={{ style: { lineWidth: 4 } }}
        />
      </HereMap>
    </div>
  );
}

export default App;
