import type { DefaultLayer, MapStyles } from "../models";

interface GetMapStylesArgs {
  style: MapStyles | undefined;
  defaultLayer: DefaultLayer;
}

interface GetMapOptionsArgs {
  mapOptions?: H.Map.Options | undefined;
}

interface MapViewBoundsArgs {
  map: H.Map;
  bbox: H.geo.Rect;
}

export const getMapStyles = ({ style, defaultLayer }: GetMapStylesArgs) => {
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

export const setMapViewBounds = ({ map, bbox }: MapViewBoundsArgs) => {
  map.getViewModel().setLookAtData({
    bounds: bbox,
  });
};

export const getMapOptions = ({ mapOptions }: GetMapOptionsArgs) => {
  return {
    autoColor: mapOptions?.autoColor || true,
    bounds: mapOptions?.bounds || undefined,
    center: mapOptions?.center || { lat: 52.5, lng: 13.4 },
    engineType: mapOptions?.engineType || H.Map.EngineType.WEBGL,
    imprint: mapOptions?.imprint || undefined,
    layers: mapOptions?.layers || undefined,
    margin: mapOptions?.margin || undefined,
    padding: mapOptions?.padding || undefined,
    pixelRatio: mapOptions?.pixelRatio || window.devicePixelRatio || 1,
    renderBaseBackground: mapOptions?.renderBaseBackground,
    zoom: mapOptions?.zoom || 10,
  };
};
