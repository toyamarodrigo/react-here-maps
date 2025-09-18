import { memo } from "react";
import { usePolygon } from "./hooks";
import type { PolygonProps } from "./types";

export const Polygon = memo<PolygonProps>(
  ({ points, holes = [], options = {} }: PolygonProps) => {
    usePolygon({ points, holes, options });
    return null;
  },
);

Polygon.displayName = "Polygon";
