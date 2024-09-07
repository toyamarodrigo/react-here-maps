import { HereMapPropsSchema, type HereMapProps } from "./here-map.type";
import { MapContext } from "./here-map.context";
import { useCreateMap, useMapResize } from "./here-map.hooks";
import "@here/maps-api-for-javascript";

export const HereMap = (props: HereMapProps) => {
  const { children, apikey, options, mapStyle, ...rest } = HereMapPropsSchema.parse(props);
  const { map, mapRef, platform, ui, behavior } = useCreateMap({
    apikey,
    options,
    mapStyle: mapStyle as
      | "raster.normal.map"
      | "raster.normal.mapnight"
      | "raster.satellite.map"
      | "raster.terrain.map"
      | "vector.normal.map",
  });

  useMapResize(map);

  const value = {
    map,
    platform,
    ui,
    behavior,
  };

  return (
    <MapContext.Provider value={value}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} {...rest}>
        {children}
      </div>
    </MapContext.Provider>
  );
};
