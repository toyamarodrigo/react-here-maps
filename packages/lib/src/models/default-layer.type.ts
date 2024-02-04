import type H from "@here/maps-api-for-javascript";

export interface DefaultLayer {
  raster: Raster;
  vector: Vector;
}

interface Raster {
  normal: RasterNormal;
  satellite: Satellite;
  terrain: Terrain;
}

interface RasterNormal {
  base: H.map.layer.Layer;
  basenight: H.map.layer.Layer;
  labels: H.map.layer.Layer;
  map: H.map.layer.Layer;
  mapnight: H.map.layer.Layer;
  trafficincidents: H.map.layer.Layer;
  transit: H.map.layer.Layer;
  xbase: H.map.layer.Layer;
  xbasenight: H.map.layer.Layer;
}

export interface Satellite {
  base: H.map.layer.Layer;
  labels: H.map.layer.Layer;
  map: H.map.layer.Layer;
  xbase: H.map.layer.Layer;
}

export interface Terrain {
  base: H.map.layer.Layer;
  labels: H.map.layer.Layer;
  map: H.map.layer.Layer;
  xbase: H.map.layer.Layer;
}

export interface Vector {
  normal: VectorNormal;
  traffic: VectorTraffic;
}

export interface VectorNormal {
  map: H.map.layer.Layer;
  mapnight: H.map.layer.Layer;
  lite: H.map.layer.Layer;
  litenight: H.map.layer.Layer;
  roadnetwork: H.map.layer.Layer;
  roadnetworknight: H.map.layer.Layer;
  truck: H.map.layer.Layer;
  traffic: H.map.layer.Layer;
  trafficincidents: H.map.layer.Layer;
}

export interface VectorTraffic {
  map: H.map.layer.Layer;
  mapnight: H.map.layer.Layer;
  lite: H.map.layer.Layer;
  litenight: H.map.layer.Layer;
}
