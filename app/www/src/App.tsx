import {
  useRoutingService,
  useGeocoding,
  HereMap,
  HerePolyline,
  HereMarker,
} from "@toyamarodrigo/react-here-maps";
import AsyncSelect from "react-select/async";

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
      <HereMap apiKey={import.meta.env.VITE_HERE_MAPS_APIKEY} mapOptions={{
        center: { lat: -34.603722, lng: -58.401592 },
        zoom: 12,
        style: "map"
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
        <Geocoding />
      </HereMap>
    </div>
  );
}

export default App;

const Routing = () => {
  const { calculateRoute, clearRoute, data, isFetching } = useRoutingService();

  const handleCalculateRoute = async () => {
    await calculateRoute({
      origin: { lat: -34.603722, lng: -58.401592 },
      destination: { lat: -34.632722, lng: -58.381592 },
      vias: [
        { lat: -34.601722, lng: -58.421592 },
        { lat: -34.612722, lng: -58.421592 },
        { lat: -34.622722, lng: -58.391592 },
      ],
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        zIndex: 1,
      }}
    >
      {isFetching && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      )}

      <button
        onClick={() => handleCalculateRoute()}
        style={{
          padding: "10px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Calculate Route
      </button>
      <button
        onClick={() => clearRoute()}
        style={{
          padding: "10px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Clear Route
      </button>
      {data && <HerePolyline route={data} />}
    </div>
  );
};

const Geocoding = () => {
  const { geocode, clearGeocoding, addMarker } = useGeocoding();

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        display: "flex",
        flexDirection: "row",
        zIndex: 1,
      }}
    >
      <AsyncSelect
        isClearable
        isSearchable
        placeholder="Search"
        styles={{
          container: (provided) => ({
            ...provided,
            width: "300px",
          }),
        }}
        loadOptions={(inputValue, callback) => {
          if (!inputValue) return callback([]);

          geocode(inputValue).then((res) => {
            const options = res?.items.map((item) => ({
              label: item.address.label,
              value: item.position,
            }));

            return callback(options);
          });
        }}
        onChange={(option: {
          label: string;
          value: { lat: number; lng: number };
        } | null
        ) => {
          if (!option?.label) return clearGeocoding();
          addMarker({
            label: option.label,
            value: option.value,
          });
        }}
      />
    </div>
  );
};
