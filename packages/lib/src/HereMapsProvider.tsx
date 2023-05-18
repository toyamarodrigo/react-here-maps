import type React from "react";
import { createContext, useEffect } from "react";
import H from "@here/maps-api-for-javascript";
import { useCreateMap } from "./hooks/useCreateMap";
import useWindowSize from "./hooks/useWindowSize";

interface HereMapsProviderProps {
  apiKey: string;
  mapOptions?: H.Map.Options;
  layerOptions?: H.service.Platform.DefaultLayersOptions;
  mapContainer: HTMLElement | null;
  children: React.ReactNode;
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
  zoomAlign = H.ui.LayoutAlignment.BOTTOM_RIGHT,
  zoomVisible = true,
  zoomDisabled = false,
  mapSettingsAlign = H.ui.LayoutAlignment.BOTTOM_RIGHT,
  mapSettingsVisible = true,
  mapSettingsDisabled = false,
  scaleBarAlign = H.ui.LayoutAlignment.BOTTOM_RIGHT,
  scaleBarVisible = true,
  scaleBarDisabled = false,
}: HereMapsProviderProps) => {
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
  }, [size]);

  return <HereMapsContext.Provider value={value}>{children}</HereMapsContext.Provider>;
};
