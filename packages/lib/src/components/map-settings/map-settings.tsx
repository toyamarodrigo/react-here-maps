import { useEffect } from "react";
import { useHereMaps } from "../../hooks";
import type { MapSettingsControlProps } from "../../models";
import { setControlDisable } from "../../utils/set-control-disable";
import { setControlLayoutAlignment } from "../../utils/set-control-layout-alignment";
import { setControlVisibility } from "../../utils/set-control-visibility";

export const MapSettings = ({
  alignment = "right-top",
  disabled = false,
  visibility = true,
}: MapSettingsControlProps) => {
  const { ui } = useHereMaps();

  useEffect(() => {
    const uiInstance = ui.current;

    if (!uiInstance) return;
    const mapSettings = uiInstance.getControl("mapsettings");

    if (!mapSettings) return;
    setControlLayoutAlignment(mapSettings, alignment);
    setControlDisable(mapSettings, disabled);
    setControlVisibility(mapSettings, visibility);
  }, [alignment, disabled, visibility, ui]);

  return null;
};
