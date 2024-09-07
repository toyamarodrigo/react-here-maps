import type { DefaultLayers, mapLayerStyles } from "../components/here-map/here-map.type";

export const getMapStyle = (defaultLayer: DefaultLayers, style: keyof typeof mapLayerStyles) => {
  if (!defaultLayer || !style) return defaultLayer.vector.normal.map;

  const layer =
    {
      "raster.normal.base": defaultLayer.raster.normal.base,
      "raster.normal.basenight": defaultLayer.raster.normal.basenight,
      "raster.normal.labels": defaultLayer.raster.normal.labels,
      "raster.normal.map": defaultLayer.raster.normal.map,
      "raster.normal.mapnight": defaultLayer.raster.normal.mapnight,
      "raster.normal.trafficincidents": defaultLayer.raster.normal.trafficincidents,
      "raster.normal.transit": defaultLayer.raster.normal.transit,
      "raster.normal.xbase": defaultLayer.raster.normal.xbase,
      "raster.normal.xbasenight": defaultLayer.raster.normal.xbasenight,
      "raster.satellite.base": defaultLayer.raster.satellite.base,
      "raster.satellite.labels": defaultLayer.raster.satellite.labels,
      "raster.satellite.map": defaultLayer.raster.satellite.map,
      "raster.satellite.xbase": defaultLayer.raster.satellite.xbase,
      "raster.terrain.base": defaultLayer.raster.terrain.base,
      "raster.terrain.labels": defaultLayer.raster.terrain.labels,
      "raster.terrain.map": defaultLayer.raster.terrain.map,
      "raster.terrain.xbase": defaultLayer.raster.terrain.xbase,
      "vector.normal.map": defaultLayer.vector.normal.map,
      "vector.normal.traffic": defaultLayer.vector.normal.traffic,
      "vector.normal.trafficincidents": defaultLayer.vector.normal.trafficincidents,
    }[style] || defaultLayer.vector.normal.map;

  return layer;
};
