import type z from "zod";
import { ControlPropsSchema } from "../../../models";

export const ZoomControlPropsSchema = ControlPropsSchema;

export type ZoomControlProps = z.infer<typeof ZoomControlPropsSchema>;
