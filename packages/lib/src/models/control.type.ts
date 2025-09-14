import { z } from "zod";
import { AlignmentsSchema } from "../components";

export const ControlPropsSchema = z.object({
  alignment: AlignmentsSchema.optional(),
  disabled: z.boolean().optional(),
  visibility: z.boolean().optional(),
});

export type ControlProps = z.infer<typeof ControlPropsSchema>;
