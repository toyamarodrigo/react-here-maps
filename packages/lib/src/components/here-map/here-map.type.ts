import { z } from "zod";
import "@here/maps-api-for-javascript";

// Basic types
type EngineType = "webgl" | "p2d" | "harp" | undefined;

export type Alignments =
  | "bottom-center"
  | "bottom-left"
  | "bottom-right"
  | "left-bottom"
  | "left-middle"
  | "left-top"
  | "right-bottom"
  | "right-middle"
  | "right-top"
  | "top-center"
  | "top-left"
  | "top-right";

// Map options and props
type Options = Omit<H.Map.Options, "target" | "engineType"> & {
  engineType?: EngineType;
};

type Props = {
  apikey: string;
  options: Options;
};

// HereMap specific types
export const mapLayerStyles = {
  "raster.normal.map": H.map.layer.Layer,
  "raster.normal.mapnight": H.map.layer.Layer,
  "raster.satellite.map": H.map.layer.Layer,
  "raster.terrain.map": H.map.layer.Layer,
  "vector.normal.map": H.map.layer.Layer,
};

export type HereMapProps = Props & {
  children: React.ReactNode;
  mapStyle?: keyof typeof mapLayerStyles;
};

export type UseCreateMapProps = Props & {
  mapStyle: keyof typeof mapLayerStyles;
  ui?: React.RefObject<H.ui.UI>;
};

// Layer types
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

// Zod schemas
export const EngineTypeSchema = z.enum(["webgl", "p2d", "harp"]).optional();

export const CenterSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const OptionsSchema = z.object({
  engineType: EngineTypeSchema.optional(),
  center: CenterSchema,
  zoom: z.number().optional(),
});

export const PropsSchema = z.object({
  apikey: z.string(),
  options: OptionsSchema,
});

export const AlignmentsSchema = z.enum([
  "bottom-center",
  "bottom-left",
  "bottom-right",
  "left-bottom",
  "left-middle",
  "left-top",
  "right-bottom",
  "right-middle",
  "right-top",
  "top-center",
  "top-left",
  "top-right",
]);

export const UIControlSchema = z.object({
  alignment: AlignmentsSchema.optional(),
  disabled: z.boolean().optional(),
  visibility: z.boolean().optional(),
});

export const ControlConfigSchema = z.object({
  mapSettings: UIControlSchema.optional(),
  scaleBar: UIControlSchema.optional(),
});

export const HereMapPropsSchema = PropsSchema.extend({
  children: z.custom<React.ReactNode>(),
  mapStyle: z.string().optional(),
});

export const UseCreateMapPropsSchema = PropsSchema.extend({
  mapStyle: z.string().optional(),
  ui: z.custom<React.RefObject<H.ui.UI>>().optional(),
});
