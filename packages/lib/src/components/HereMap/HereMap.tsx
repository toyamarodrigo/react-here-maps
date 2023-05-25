import { useEffect, useState } from "react";
import H from "@here/maps-api-for-javascript";
import { useCreateMap } from "../../hooks/useCreateMap";
import useWindowSize from "../../hooks/useWindowSize";
import { HereMapsContext } from "./HereMap.provider";
import type { HereMapProps } from "./HereMap.types";

/**
 * @name HereMap
 * @description A component that renders a HERE map.
 * @param {string} apiKey - The API key for the HERE Maps API.
 * @param {H.Map.Options} mapOptions - The options for the map.
 * @param {H.service.Platform.DefaultLayersOptions} layerOptions - The options for the map layers.
 * @param {React.ReactNode} children - The children to render on the map.
 * @param {string | H.ui.i18n.Localization} localization - The localization for the map.
 * @param {H.ui.LayoutAlignment} zoomAlign - The alignment for the zoom control.
 * @param {boolean} zoomVisible - Whether the zoom control is visible.
 * @param {boolean} zoomDisabled - Whether the zoom control is disabled.
 * @param {H.ui.LayoutAlignment} mapSettingsAlign - The alignment for the map settings control.
 * @param {boolean} mapSettingsVisible - Whether the map settings control is visible.
 * @param {boolean} mapSettingsDisabled - Whether the map settings control is disabled.
 * @param {H.ui.LayoutAlignment} scaleBarAlign - The alignment for the scale bar.
 * @param {boolean} scaleBarVisible - Whether the scale bar is visible.
 * @param {boolean} scaleBarDisabled - Whether the scale bar is disabled.
 * @returns The rendered map.
 */
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
