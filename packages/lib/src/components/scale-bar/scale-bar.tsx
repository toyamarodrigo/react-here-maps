import { memo } from "react";
import { useScaleBar } from "./hooks";
import type { ScaleBarControlProps } from "./types";

export const ScaleBar = memo<ScaleBarControlProps>(
  ({
    alignment = "bottom-right",
    disabled = false,
    visibility = true,
  }: ScaleBarControlProps) => {
    useScaleBar({ alignment, disabled, visibility });
    return null;
  },
);

ScaleBar.displayName = "ScaleBar";
