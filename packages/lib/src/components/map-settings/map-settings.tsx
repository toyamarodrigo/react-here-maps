import { useEffect } from "react";
import { setControlLayoutAlignment } from "../../utils/set-control-layout-alignment";
import { setControlDisable } from "../../utils/set-control-disable";
import { setControlVisibility } from "../../utils/set-control-visibility";
import type { MapSettingsControlProps } from "../../models";
import { useHereMaps } from "../../hooks";

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
