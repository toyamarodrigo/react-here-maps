import { useState } from 'react'
import { HereMapsProvider } from 'react-here-maps'
import { HERE_MAPS_APIKEY } from './constants'

function App() {
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null)  

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
    }}>
    <HereMapsProvider
      apiKey={HERE_MAPS_APIKEY}
      mapContainer={mapContainer}
      options={{
        center: {
          lat: -34.603722,
          lng: -58.381592,
        },
        zoom: 12,
      }}
    >
      <div
        ref={(node) => setMapContainer(node)}
        style={{ width: "100%", height: "100vh" }}
      />
    </HereMapsProvider>
    </div>
  )
}

export default App
