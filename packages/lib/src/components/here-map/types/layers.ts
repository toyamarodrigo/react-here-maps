import "@here/maps-api-for-javascript";

export type DefaultLayers = {
  raster: {
    normal: {
      base: H.map.layer.Layer;
      basenight: H.map.layer.Layer;
      labels: H.map.layer.Layer;
      map: H.map.layer.Layer;
      mapnight: H.map.layer.Layer;
      trafficincidents: H.map.layer.Layer;
      transit: H.map.layer.Layer;
      xbase: H.map.layer.Layer;
      xbasenight: H.map.layer.Layer;
    };
    satellite: {
      base: H.map.layer.Layer;
      labels: H.map.layer.Layer;
      map: H.map.layer.Layer;
      xbase: H.map.layer.Layer;
    };
    terrain: {
      base: H.map.layer.Layer;
      labels: H.map.layer.Layer;
      map: H.map.layer.Layer;
      xbase: H.map.layer.Layer;
    };
  };
  vector: {
    normal: {
      map: H.map.layer.Layer;
      traffic: H.map.layer.Layer;
      trafficincidents: H.map.layer.Layer;
    };
  };
};

export type RasterLayers = DefaultLayers["raster"];
export type VectorLayers = DefaultLayers["vector"];
export type RenderingType = "raster" | "vector";

export interface LayerGroup {
  raster: RasterLayers;
  vector: VectorLayers;
}

export interface RenderingOptions {
  type: RenderingType;
  layers: LayerGroup;
}
