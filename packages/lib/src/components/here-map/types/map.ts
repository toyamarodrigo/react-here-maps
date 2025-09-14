import "@here/maps-api-for-javascript";
import type { EngineType } from "./basic";

export type MapOptions = Omit<H.Map.Options, "target" | "engineType"> & {
  engineType?: EngineType;
};

export interface CreateMapProps {
  apikey: string;
  options?: MapOptions;
}

export const mapLayerStyles = {
  "raster.normal.map": H.map.layer.Layer,
  "raster.normal.mapnight": H.map.layer.Layer,
  "raster.satellite.map": H.map.layer.Layer,
  "raster.terrain.map": H.map.layer.Layer,
  "vector.normal.map": H.map.layer.Layer,
};

export interface HereMapProps extends CreateMapProps {
  children: React.ReactNode;
  mapStyle?: keyof typeof mapLayerStyles;
}

export interface UseCreateMapProps extends CreateMapProps {
  mapStyle?: keyof typeof mapLayerStyles;
  ui?: React.RefObject<H.ui.UI>;
}
