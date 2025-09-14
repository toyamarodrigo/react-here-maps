import { memo } from "react";
import { useMapSettings } from "./hooks";
import type { MapSettingsControlProps } from "./types";

export const MapSettings = memo<MapSettingsControlProps>(
  ({
    alignment = "right-top",
    disabled = false,
    visibility = true,
  }: MapSettingsControlProps) => {
    useMapSettings({ alignment, disabled, visibility });
    return null;
  },
);

MapSettings.displayName = "MapSettings";
