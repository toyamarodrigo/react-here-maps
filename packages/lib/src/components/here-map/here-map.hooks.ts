import type { RefObject } from "react";
import { useEffect, useMemo, useRef } from "react";
import {
  getDefaultCenter,
  getDefaultEngineType,
  getDefaultZoom,
  getMapStyle,
} from "../../utils";
import type { DefaultLayers, UseCreateMapProps } from "./here-map.type";

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

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    const defaultLayers = platform.createDefaultLayers({
      pois: true,
    }) as DefaultLayers;

    if (!mapRef.current) return;

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

  return {
    map: mapInstance,
    mapRef,
    behavior: behaviorRef,
    ui: uiRef,
    platform,
  };
};

export function useMapResize(mapRef: RefObject<H.Map | null>) {
  useEffect(() => {
    if (!mapRef.current) return;

    const resizeMap = () => {
      mapRef.current?.getViewPort().resize();
    };

    resizeMap();
    window.addEventListener("resize", resizeMap);

    return () => {
      window.removeEventListener("resize", resizeMap);
    };
  }, [mapRef]);
}
