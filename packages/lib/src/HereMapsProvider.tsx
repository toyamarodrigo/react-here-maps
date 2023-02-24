import React, { createContext, useState, useEffect } from "react";
import H from "@here/maps-api-for-javascript";
import { useWindowSize } from "./hooks/useWindowSize";
import { DefaultLayer } from "./models/default-layer.type";
import { getMapStyles } from "./utils/getMapStyles";
import { MapStyle } from "./models/map-style";

interface HereMapsProviderProps {
  apiKey: string;
  mapOptions?: H.Map.Options;
  layerOptions?: H.service.Platform.DefaultLayersOptions;
  mapContainer: HTMLElement | null;
  children: React.ReactNode;
  localization?: string | H.ui.i18n.Localization;
}

export const HereMapsContext = createContext<H.Map | undefined>(undefined);

export const HereMapsProvider = ({
  apiKey,
  mapOptions,
  layerOptions = {
    ppi: 72,
    style: "normal",
  },
  mapContainer,
  children,
  localization = "en-US",
}: HereMapsProviderProps) => {
  const [map, setMap] = useState<H.Map>();
  const size = useWindowSize();

  const platform = new H.service.Platform({
    apikey: apiKey,
  });

  // @ts-ignore
  const defaultLayer: DefaultLayer = platform.createDefaultLayers({
    ...layerOptions,
  });

  useEffect(() => {
    if (mapContainer) {
      const map = new H.Map(
        mapContainer,
        getMapStyles({
          map: { style: layerOptions?.style || "normal" },
          defaultLayer,
        }),
        {
          autoColor: mapOptions?.autoColor || true,
          bounds: mapOptions?.bounds || undefined,
          center: mapOptions?.center || { lat: 52.5, lng: 13.4 },
          engineType: mapOptions?.engineType || H.Map.EngineType.WEBGL,
          imprint: mapOptions?.imprint || undefined,
          layers: mapOptions?.layers || undefined,
          margin: mapOptions?.margin || undefined,
          padding: mapOptions?.padding || undefined,
          pixelRatio: mapOptions?.pixelRatio || window.devicePixelRatio || 1,
          renderBaseBackground: mapOptions?.renderBaseBackground,
          zoom: mapOptions?.zoom || 10,
        }
      );

      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      H.ui.UI.createDefault(map, defaultLayer, localization);

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
