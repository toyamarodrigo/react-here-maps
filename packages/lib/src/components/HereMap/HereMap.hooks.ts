import { useCallback, useEffect, useRef } from "react";
import type { DefaultLayer } from "../../models";
import type { MapProps } from "./HereMap.types";
import "@here/maps-api-for-javascript";

export const useCreateMap = ({
  apiKey,
  mapOptions,
  zoomAlign = H.ui.LayoutAlignment.BOTTOM_RIGHT,
  zoomVisible = true,
  zoomDisabled = false,
  mapSettingsAlign = H.ui.LayoutAlignment.BOTTOM_RIGHT,
  mapSettingsVisible = true,
  mapSettingsDisabled = false,
  scaleBarAlign = H.ui.LayoutAlignment.BOTTOM_RIGHT,
  scaleBarVisible = true,
  scaleBarDisabled = false,
}: MapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useRef<H.Map | null>(null);
  const platform = useRef<H.service.Platform | null>(null);

  const createPlatform = useCallback(() => {
    if (!apiKey) throw new Error("API Key is required");

    return new H.service.Platform({ apikey: apiKey });
  }, [apiKey]);

  const getDefaultLayers = useCallback(() => {
    if (!platform?.current) throw new Error("Platform is not created");

    return platform.current.createDefaultLayers() as DefaultLayer;
  }, [platform]);

  const getCenter = useCallback(() => {
    if (!mapOptions?.center) throw new Error("Center is required");

    return mapOptions.center;
  }, [mapOptions]);

  const getZoom = useCallback(() => {
    if (!mapOptions.zoom) return 12;

    return mapOptions.zoom;
  }, [mapOptions]);

  const setZoomSettings = useCallback(
    (zoom: H.ui.Control) => {
      zoom.setAlignment(zoomAlign);
      zoom.setVisibility(zoomVisible);
      zoom.setDisabled(zoomDisabled);
    },
    [zoomAlign, zoomVisible, zoomDisabled],
  );

  const setMapSettings = useCallback(
    (mapSettings: H.ui.Control) => {
      mapSettings.setAlignment(mapSettingsAlign);
      mapSettings.setVisibility(mapSettingsVisible);
      mapSettings.setDisabled(mapSettingsDisabled);
    },
    [mapSettingsAlign, mapSettingsVisible, mapSettingsDisabled],
  );

  const setScaleBar = useCallback(
    (scaleBar: H.ui.Control) => {
      scaleBar.setAlignment(scaleBarAlign);
      scaleBar.setVisibility(scaleBarVisible);
      scaleBar.setDisabled(scaleBarDisabled);
    },
    [scaleBarAlign, scaleBarVisible, scaleBarDisabled],
  );

  const getMapStyle = useCallback(
    (defaultLayers: DefaultLayer) => {
      if (!mapOptions?.style) return defaultLayers.vector.normal.map;

      return defaultLayers.vector.normal[mapOptions.style];
    },
    [mapOptions],
  );

  useEffect(() => {
    if (!map.current) {
      platform.current = createPlatform();
      const defaultLayers = getDefaultLayers();

      if (!mapRef.current) return;
      const newMap = new H.Map(mapRef.current, getMapStyle(defaultLayers), {
        pixelRatio: window.devicePixelRatio,
        center: getCenter(),
        zoom: getZoom(),
      });

      new H.mapevents.Behavior(new H.mapevents.MapEvents(newMap));
      const ui = H.ui.UI.createDefault(newMap, defaultLayers);

      const zoom = ui.getControl("zoom");
      const mapSettings = ui.getControl("mapsettings");
      const scaleBar = ui.getControl("scalebar");

      if (zoom) setZoomSettings(zoom);
      if (mapSettings) setMapSettings(mapSettings);
      if (scaleBar) setScaleBar(scaleBar);

      map.current = newMap;
    }
  }, [
    apiKey,
    createPlatform,
    getDefaultLayers,
    getCenter,
    getZoom,
    setZoomSettings,
    setMapSettings,
    setScaleBar,
    getMapStyle,
  ]);

  return { map, platform, mapRef };
};
