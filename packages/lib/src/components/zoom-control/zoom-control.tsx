import { memo } from "react";
import { useZoomControl } from "./hooks";
import type { ZoomControlProps } from "./types";

export const ZoomControl = memo<ZoomControlProps>(
  ({
    alignment = "right-top",
    disabled = false,
    visibility = true,
  }: ZoomControlProps) => {
    useZoomControl({ alignment, disabled, visibility });
    return null;
  },
);

ZoomControl.displayName = "ZoomControl";
