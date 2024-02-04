import { z } from "zod";

export const MapPropsSchema = z.object({
  apiKey: z
    .string()
    .min(1)
    .regex(/^[A-Za-z0-9_-]+$/, "The API key must be a valid Here.com API key"),
  mapOptions: z.object({
    center: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    zoom: z.number().min(1).max(20).optional(),
    style: z
      .enum([
        "map",
        "mapnight",
        "lite",
        "litenight",
        "roadnetwork",
        "roadnetworknight",
        "truck",
        "traffic",
        "trafficincidents",
      ])
      .optional(),
  }),
});

export type MapProps = z.infer<typeof MapPropsSchema> & {
  zoomAlign?: H.ui.LayoutAlignment;
  zoomVisible?: boolean;
  zoomDisabled?: boolean;
  mapSettingsAlign?: H.ui.LayoutAlignment;
  mapSettingsVisible?: boolean;
  mapSettingsDisabled?: boolean;
  scaleBarAlign?: H.ui.LayoutAlignment;
  scaleBarVisible?: boolean;
  scaleBarDisabled?: boolean;
};
