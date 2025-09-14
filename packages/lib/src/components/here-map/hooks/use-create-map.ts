import { useCallback, useEffect, useMemo, useRef } from "react";
import type { DefaultLayers, UseCreateMapProps } from "../types";
import { getDefaultCenter } from "../utils/get-default-center";
import { getDefaultEngineType } from "../utils/get-default-engine-type";
import { getDefaultZoom } from "../utils/get-default-zoom";
import { getMapStyle } from "../utils/get-map-style";

export const useCreateMap = ({
  apikey,
  options = {},
  mapStyle = "vector.normal.map",
}: UseCreateMapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<H.Map | null>(null);
  const uiRef = useRef<H.ui.UI | null>(null);
  const behaviorRef = useRef<H.mapevents.Behavior | null>(null);

  const platform = useMemo(() => {
    if (!apikey) throw new Error("apikey is required");
    return new H.service.Platform({ apikey });
  }, [apikey]);

  const initializeMap = useCallback(() => {
    if (!mapRef.current || mapInstance.current) return;

    const defaultLayers = platform.createDefaultLayers({
      pois: true,
    }) as DefaultLayers;

    const newMap = new H.Map(
      mapRef.current,
      getMapStyle(defaultLayers, mapStyle),
      {
        ...options,
        pixelRatio: window.devicePixelRatio,
        center: getDefaultCenter(options.center),
        zoom: getDefaultZoom(options.zoom),
        engineType: getDefaultEngineType(options.engineType),
      },
    );

    const behavior = new H.mapevents.Behavior(
      new H.mapevents.MapEvents(newMap),
    );
    const ui = H.ui.UI.createDefault(newMap, defaultLayers);

    uiRef.current = ui;
    behaviorRef.current = behavior;
    mapInstance.current = newMap;
  }, [platform, options, mapStyle]);

  useEffect(() => {
    initializeMap();
  }, [initializeMap]);

  return {
    map: mapInstance,
    mapRef,
    behavior: behaviorRef,
    ui: uiRef,
    platform,
  };
};
