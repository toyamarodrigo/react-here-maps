import { useContext } from "react";
import { MapContext, type MapContextValue } from "../here-map.context";

export const useMapContext = (): MapContextValue => {
  const context = useContext(MapContext);

  if (!context) {
    throw new Error("useMapContext must be used within a HereMap component");
  }

  return context;
};
