import { z } from "zod";

const PositionSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

const BaseMarkerSchema = z.object({
  position: PositionSchema,
  label: z.string().optional(),
  draggable: z.boolean().optional(),
});

const IconOptionsSchema = z.object({
  icon: z.union([
    z.string(),
    z.instanceof(HTMLImageElement),
    z.instanceof(HTMLCanvasElement),
    z.null(),
  ]),
  stickColor: z.string().optional(),
  stickHeight: z.number().optional(),
  iconSize: z.object({ w: z.number(), h: z.number() }).optional(),
  iconAnchor: z.object({ x: z.number(), y: z.number() }).optional(),
});

const MarkerWithIconSchema = BaseMarkerSchema.merge(IconOptionsSchema);
const MarkerWithoutIconSchema = BaseMarkerSchema;

export const MarkerSchema = z.union([
  MarkerWithIconSchema,
  MarkerWithoutIconSchema,
]);

export type MarkerProps = z.infer<typeof MarkerSchema>;
export type MarkerWithIconProps = z.infer<typeof MarkerWithIconSchema>;
export type MarkerWithoutIconProps = z.infer<typeof MarkerWithoutIconSchema>;
export type MarkerOptions = Omit<MarkerProps, "position">;
