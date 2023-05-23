import {
  useRoutingService,
  HerePolyline,
} from "@toyamarodrigo/react-here-maps";

export const Routing = () => {
  const { route, clearRoute, calculateRoute } = useRoutingService({
    apiKey: import.meta.env.VITE_HERE_MAPS_APIKEY,
  });

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
      }}
    >
      <button
        onClick={() =>
          calculateRoute({
            origin: { lat: -34.603722, lng: -58.401592 },
            destination: { lat: -34.601722, lng: -58.421592 },
            vias: [
              {
                lat: -34.612722,
                lng: -58.421592,
              },
              {
                lat: -34.622722,
                lng: -58.391592,
              },
              {
                lat: -34.632722,
                lng: -58.381592,
              },
            ],
            transportMode: "car",
            returns: ["polyline"],
          })
        }
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
      {route && <HerePolyline route={route} />}
    </div>
  );
};
