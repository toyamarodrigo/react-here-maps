import type z from "zod";
import { ControlPropsSchema } from "../../../models";

export const ScaleBarControlPropsSchema = ControlPropsSchema;

export type ScaleBarControlProps = z.infer<typeof ScaleBarControlPropsSchema>;
