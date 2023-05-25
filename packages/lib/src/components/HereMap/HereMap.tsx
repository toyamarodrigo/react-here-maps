import { useEffect, useState } from "react";
import H from "@here/maps-api-for-javascript";
import { useCreateMap } from "../../hooks/useCreateMap";
import useWindowSize from "../../hooks/useWindowSize";
import { HereMapsContext } from "./HereMap.provider";
import type { HereMapProps } from "./HereMap.types";

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
  } as { map: H.Map; platform: H.service.Platform };

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
