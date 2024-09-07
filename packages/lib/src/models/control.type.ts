import { z } from "zod";
import { AlignmentsSchema } from "../components";

const ControlPropsSchema = z.object({
  alignment: AlignmentsSchema.optional(),
  disabled: z.boolean().optional(),
  visibility: z.boolean().optional(),
});

export const ZoomControlPropsSchema = ControlPropsSchema;
export const ScaleBarControlPropsSchema = ControlPropsSchema;
export const MapSettingsControlPropsSchema = ControlPropsSchema;

export type ControlProps = z.infer<typeof ControlPropsSchema>;
export type ZoomControlProps = z.infer<typeof ZoomControlPropsSchema>;
export type ScaleBarControlProps = z.infer<typeof ScaleBarControlPropsSchema>;
export type MapSettingsControlProps = z.infer<typeof MapSettingsControlPropsSchema>;
