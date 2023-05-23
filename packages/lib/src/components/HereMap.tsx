import type React from "react";
import { createContext, useEffect, useState } from "react";
import H from "@here/maps-api-for-javascript";
import { useCreateMap } from "../hooks/useCreateMap";
import useWindowSize from "../hooks/useWindowSize";

export interface HereMapProps {
  apiKey: string;
  mapOptions?: H.Map.Options;
  layerOptions?: H.service.Platform.DefaultLayersOptions;
  children?: React.ReactNode;
  localization?: string | H.ui.i18n.Localization;
  zoomAlign?: H.ui.LayoutAlignment.BOTTOM_RIGHT;
  zoomVisible?: boolean;
  zoomDisabled?: boolean;
  mapSettingsAlign?: H.ui.LayoutAlignment.BOTTOM_RIGHT;
  mapSettingsVisible?: boolean;
  mapSettingsDisabled?: boolean;
  scaleBarAlign?: H.ui.LayoutAlignment.BOTTOM_RIGHT;
  scaleBarVisible?: boolean;
  scaleBarDisabled?: boolean;
}

export const HereMapsContext = createContext<{
  map: H.Map | undefined;
  platform: H.service.Platform | undefined;
}>({
  map: undefined,
  platform: undefined,
});

export const HereMap = ({
  apiKey,
  mapOptions,
  layerOptions = {
    ppi: 72,
    style: "normal",
  },
  children,
  localization = "en-US",
  zoomAlign = H.ui.LayoutAlignment.BOTTOM_RIGHT,
  zoomVisible = true,
  zoomDisabled = false,
  mapSettingsAlign = H.ui.LayoutAlignment.BOTTOM_RIGHT,
  mapSettingsVisible = true,
  mapSettingsDisabled = false,
  scaleBarAlign = H.ui.LayoutAlignment.BOTTOM_RIGHT,
  scaleBarVisible = true,
  scaleBarDisabled = false,
}: HereMapProps) => {
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);
  const { map, platform } = useCreateMap({
    apiKey,
    layerOptions,
    mapOptions,
    node: mapContainer,
    localization,
    zoomAlign,
    zoomVisible,
    zoomDisabled,
    mapSettingsAlign,
    mapSettingsVisible,
    mapSettingsDisabled,
    scaleBarAlign,
    scaleBarVisible,
    scaleBarDisabled,
  });
  const size = useWindowSize();

  const value = {
    map,
    platform,
  };

  useEffect(() => {
    if (map) map.getViewPort().resize();
  }, [size, map]);

  return (
    <HereMapsContext.Provider value={value}>
      <div ref={(node) => setMapContainer(node)} style={{ width: "100%", height: "100%" }}>
        {map ? children : null}
      </div>
    </HereMapsContext.Provider>
  );
};
