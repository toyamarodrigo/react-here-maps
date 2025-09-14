import type z from "zod";
import { ControlPropsSchema } from "../../../models";

export const MapSettingsControlPropsSchema = ControlPropsSchema;

export type MapSettingsControlProps = z.infer<
  typeof MapSettingsControlPropsSchema
>;
