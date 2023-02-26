import H from "@here/maps-api-for-javascript";
import { useState, useCallback, useEffect } from "react";
import { DefaultLayer } from "../models/default-layer.type";
import { getMapStyles } from "../utils/getMapStyles";
import { getMapOptions } from "../utils/getMapOptions";

interface UseCreateMapProps {
  apiKey: string;
  mapOptions?: H.Map.Options;
  layerOptions?: H.service.Platform.DefaultLayersOptions;
  localization?: string | H.ui.i18n.Localization;
  zoomAlign?: H.ui.LayoutAlignment;
  zoomVisible?: boolean;
  zoomDisabled?: boolean;
  mapSettingsAlign?: H.ui.LayoutAlignment;
  mapSettingsVisible?: boolean;
  mapSettingsDisabled?: boolean;
  scaleBarAlign?: H.ui.LayoutAlignment;
  scaleBarVisible?: boolean;
  scaleBarDisabled?: boolean;
  node: HTMLElement | null;
}

export const useCreateMap = ({
  apiKey,
  layerOptions,
  mapOptions,
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
  node,
}: UseCreateMapProps) => {
  const [map, setMap] = useState<H.Map | undefined>(undefined);
  const [platform, setPlatform] = useState<H.service.Platform | undefined>(
    undefined
  );

  const createMap = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      const platform = new H.service.Platform({
        apikey: apiKey || "",
      });

      setPlatform(platform);

      // @ts-ignore
      const defaultLayer: DefaultLayer = platform.createDefaultLayers({
        ...layerOptions,
      });

      const map = new H.Map(
        node,
        getMapStyles({
          style: layerOptions?.style,
          defaultLayer,
        }),
        getMapOptions({ mapOptions })
      );
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      const ui = H.ui.UI.createDefault(map, defaultLayer, localization);

      const zoom = ui.getControl("zoom");
      const mapSettings = ui.getControl("mapsettings");
      const scaleBar = ui.getControl("scalebar");

      zoom?.setAlignment(zoomAlign || H.ui.LayoutAlignment.BOTTOM_RIGHT);
      zoom?.setVisibility(zoomVisible ? true : false);
      zoom?.setDisabled(zoomDisabled ? true : false);
      mapSettings?.setAlignment(
        mapSettingsAlign || H.ui.LayoutAlignment.BOTTOM_RIGHT
      );
      mapSettings?.setVisibility(mapSettingsVisible ? true : false);
      mapSettings?.setDisabled(mapSettingsDisabled ? true : false);
      scaleBar?.setAlignment(
        scaleBarAlign || H.ui.LayoutAlignment.BOTTOM_RIGHT
      );
      scaleBar?.setVisibility(scaleBarVisible ? true : false);
      scaleBar?.setDisabled(scaleBarDisabled ? true : false);

      setMap(map);
    }
  }, []);

  useEffect(() => {
    createMap(node);
    return () => map?.dispose();
  }, [node]);

  return { map, platform };
};
