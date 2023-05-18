import type { ReactNode } from "react";
import { createContext, useEffect } from "react";
import type H from "@here/maps-api-for-javascript";
import useWindowSize from "./hooks/useWindowSize";
import { useCreateMap } from "./hooks/useCreateMap";

interface HereMapsProviderProps {
  apiKey: string;
  mapOptions?: H.Map.Options;
  layerOptions?: H.service.Platform.DefaultLayersOptions;
  mapContainer: HTMLElement | null;
  children: ReactNode;
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
  layerOptions,
  mapContainer,
  children,
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
  }, [size, map]);

  return <HereMapsContext.Provider value={value}>{children}</HereMapsContext.Provider>;
};
