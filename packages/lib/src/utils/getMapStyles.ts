import { MapStyle } from "./../models/map-style";
import { DefaultLayer } from "../models/default-layer.type";

interface Args {
  map: MapStyle;
  defaultLayer: DefaultLayer;
}

export const getMapStyles = ({ map, defaultLayer }: Args) => {
  switch (map.style) {
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
