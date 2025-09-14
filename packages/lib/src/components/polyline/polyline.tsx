import { memo } from "react";
import { usePolyline } from "./hooks";
import type { PolylineProps } from "./types";

export const Polyline = memo<PolylineProps>(
  ({ points, options = {} }: PolylineProps) => {
    usePolyline({ points, options });
    return null;
  },
);

Polyline.displayName = "Polyline";
