import { useEffect } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { MapContext } from "./HereMap.provider";
import type { MapProps } from "./HereMap.types";
import { useCreateMap } from "./HereMap.hooks";

export const HereMap = (props: MapProps & { children: React.ReactNode }) => {
  const { map, platform, mapRef } = useCreateMap({ ...props });
  const size = useWindowSize();

  const value = {
    map,
    platform,
  };

  useEffect(() => {
    if (!map.current) return;
    map.current.getViewPort().resize();
  }, [size, map]);

  return (
    <MapContext.Provider value={value}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }}>
        {props.children}
      </div>
    </MapContext.Provider>
  );
};
