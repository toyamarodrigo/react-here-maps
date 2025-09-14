import { memo, useMemo } from "react";
import { MapContext, type MapContextValue } from "./here-map.context";
import { type HereMapProps, HereMapPropsSchema } from "./types";
import "@here/maps-api-for-javascript";
import { useCreateMap } from "./hooks";
import { useMapResize } from "./hooks/use-map-resize";

export const HereMap = memo<HereMapProps>((props: HereMapProps) => {
  const {
    children,
    apikey,
    options = {},
    mapStyle = "vector.normal.map",
    ...rest
  } = HereMapPropsSchema.parse(props);

  const { map, mapRef, platform, ui, behavior } = useCreateMap({
    apikey,
    options,
    mapStyle,
  });

  useMapResize(map);

  const contextValue = useMemo<MapContextValue>(
    () => ({
      map,
      platform,
      ui,
      behavior,
    }),
    [map, platform, ui, behavior],
  );

  const containerStyle = useMemo(
    () => ({
      width: "100%",
      height: "100%",
    }),
    [],
  );

  return (
    <MapContext.Provider value={contextValue}>
      <div ref={mapRef} style={containerStyle} {...rest}>
        {children}
      </div>
    </MapContext.Provider>
  );
});

HereMap.displayName = "HereMap";
