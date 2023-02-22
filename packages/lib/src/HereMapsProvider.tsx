import H from "@here/maps-api-for-javascript";
import { createContext, useState, useEffect } from "react";
import { useWindowSize } from "./hooks/useWindowSize";
import { DefaultLayer } from "./models/default-layer.type";


interface HereMapsProviderProps {
  apiKey: string;
  options?: H.Map.Options;
  mapContainer: HTMLElement | null;
  children: React.ReactNode;
};

export const HereMapsContext = createContext<H.Map | undefined>(undefined);

export const HereMapsProvider = ({
  apiKey,
  options,
  mapContainer,
  children,
}: HereMapsProviderProps) => {
  const [map, setMap] = useState<H.Map>();
  const size = useWindowSize();

  const platform = new H.service.Platform({
    apikey: apiKey,
  });

  // @ts-ignore
  const defaultLayers: DefaultLayer = platform.createDefaultLayers({
    ppi: 320,
  });

  useEffect(() => {
    if (mapContainer) {
      const map = new H.Map(mapContainer, defaultLayers.vector.normal.map, {
        autoColor: options?.autoColor || true,
        bounds: options?.bounds || undefined,
        center: options?.center || { lat: 52.5, lng: 13.4 },
        engineType: options?.engineType || H.Map.EngineType.WEBGL,
        imprint: options?.imprint || undefined,
        layers: options?.layers || undefined,
        margin: options?.margin || undefined,
        padding: options?.padding || undefined,
        pixelRatio: options?.pixelRatio || window.devicePixelRatio || 1,
        renderBaseBackground: options?.renderBaseBackground,
        zoom: options?.zoom || 10,
      });

      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      H.ui.UI.createDefault(map, defaultLayers, "es-ES");

      setMap(map);
    }

    return () => {
      map?.dispose();
    };

  }, [mapContainer]);

  useEffect(() => {
    if (map) map.getViewPort().resize();
  }, [size]);

  return (
    <HereMapsContext.Provider value={map}>{children}</HereMapsContext.Provider>
  );
};
