import { z } from "zod";
import "@here/maps-api-for-javascript";
import { mapLayerStyles } from "./map";

export const EngineTypeSchema = z.enum(["webgl", "p2d", "harp"]).optional();

export const CenterSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const MapOptionsSchema = z.object({
  engineType: EngineTypeSchema,
  center: CenterSchema.optional(),
  zoom: z.number().optional(),
});

export const CreateMapPropsSchema = z.object({
  apikey: z.string(),
  options: MapOptionsSchema.optional(),
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

export const HereMapPropsSchema = CreateMapPropsSchema.extend({
  children: z.custom<React.ReactNode>(),
  mapStyle: z.enum(Object.keys(mapLayerStyles)).optional() as z.ZodType<
    keyof typeof mapLayerStyles
  >,
});

export const UseCreateMapPropsSchema = CreateMapPropsSchema.extend({
  mapStyle: z.string().optional(),
  ui: z.custom<React.RefObject<H.ui.UI>>().optional(),
});
