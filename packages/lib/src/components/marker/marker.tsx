import { memo } from "react";
import { useMarker } from "./hooks";
import type { MarkerProps } from "./types";

export const Marker = memo<MarkerProps>((props: MarkerProps) => {
  useMarker(props);
  return null;
});

Marker.displayName = "Marker";
