import H from "@here/maps-api-for-javascript";
import { useState, useCallback, useEffect } from "react";
import { getMapOptions, getMapStyles } from "../utils/map-helpers";
import type { DefaultLayer } from "../models";

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

/**
 * @name useCreateMap
 * @description
 * This hook is used to create a map instance.
 * @param {string} apiKey - Your API key
 * @param {H.Map.Options} mapOptions - Map options
 * @param {H.service.Platform.DefaultLayersOptions} layerOptions - Layer options
 * @param {string | H.ui.i18n.Localization} localization - Localization
 * @param {H.ui.LayoutAlignment} zoomAlign - Zoom control alignment
 * @param {boolean} zoomVisible - Zoom control visibility
 * @param {boolean} zoomDisabled - Zoom control disabled
 * @param {H.ui.LayoutAlignment} mapSettingsAlign - Map settings control alignment
 * @param {boolean} mapSettingsVisible - Map settings control visibility
 * @param {boolean} mapSettingsDisabled - Map settings control disabled
 * @param {H.ui.LayoutAlignment} scaleBarAlign - Scale bar control alignment
 * @param {boolean} scaleBarVisible - Scale bar control visibility
 * @param {boolean} scaleBarDisabled - Scale bar control disabled
 * @param {HTMLElement | null} node - HTML element
 * @returns {UseCreateMapProps} - Map instance
 */

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
  const [platform, setPlatform] = useState<H.service.Platform | undefined>(undefined);

  const createMap = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      const platform = new H.service.Platform({
        apikey: apiKey || "",
      });

      setPlatform(platform);

      const defaultLayer = platform.createDefaultLayers({
        ...layerOptions,
      }) as DefaultLayer;

      const map = new H.Map(
        node,
        getMapStyles({
          style: layerOptions?.style,
          defaultLayer,
        }),
        getMapOptions({ mapOptions }),
      );

      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      const ui = H.ui.UI.createDefault(map, defaultLayer, localization);

      const zoom = ui.getControl("zoom");
      const mapSettings = ui.getControl("mapsettings");
      const scaleBar = ui.getControl("scalebar");

      zoom?.setAlignment(zoomAlign || H.ui.LayoutAlignment.BOTTOM_RIGHT);
      zoom?.setVisibility(zoomVisible ? true : false);
      zoom?.setDisabled(zoomDisabled ? true : false);
      mapSettings?.setAlignment(mapSettingsAlign || H.ui.LayoutAlignment.BOTTOM_RIGHT);
      mapSettings?.setVisibility(mapSettingsVisible ? true : false);
      mapSettings?.setDisabled(mapSettingsDisabled ? true : false);
      scaleBar?.setAlignment(scaleBarAlign || H.ui.LayoutAlignment.BOTTOM_RIGHT);
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
