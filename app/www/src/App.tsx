import { HereMap } from "@toyamarodrigo/react-here-maps"

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <HereMap
        mapOptions={{
          center: {
            lat: -34.603722,
            lng: -58.381592,
          },
          zoom: 14,
        }}
        apiKey={import.meta.env.VITE_HERE_MAPS_APIKEY}
        layerOptions={{
          style: "normal",
          ppi: 72,
        }}
      />
    </div>
  )
}

export default App
