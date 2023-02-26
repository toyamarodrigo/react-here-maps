import { DefaultLayer } from "../models/default-layer.type";
import { MapStyles } from "../models/map-style";

interface Args {
  style: MapStyles | undefined;
  defaultLayer: DefaultLayer;
}

export const getMapStyles = ({ style, defaultLayer }: Args) => {
  switch (style) {
    case "normal":
      return defaultLayer.vector.normal.map;
    case "traffic":
      return defaultLayer.vector.normal.traffic;
    case "trafficincidents":
      return defaultLayer.vector.normal.trafficincidents;

    default:
      return defaultLayer.vector.normal.map;
  }
};
