import { useState } from 'react'
import { HereMapsProvider, HereMarker } from 'react-here-maps'

import { HERE_MAPS_APIKEY } from './constants'

function App() {
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null)  

  const positions = [
    { lat: -34.603722, lng: -58.381592 },
    { lat: -34.602722, lng: -58.381592 },
    { lat: -34.601722, lng: -58.381592 },
  ]

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
    }}>
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
        ppi: 72,
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
          />
      ))}
    </HereMapsProvider>
    </div>
  )
}

export default App
