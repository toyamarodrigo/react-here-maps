import { useCallback, useEffect } from "react";
import { setControlDisable } from "../../../utils/set-control-disable";
import { setControlLayoutAlignment } from "../../../utils/set-control-layout-alignment";
import { setControlVisibility } from "../../../utils/set-control-visibility";
import { useMapContext } from "../../here-map/hooks/use-map-context";
import type { MapSettingsControlProps } from "../types";

export const useMapSettings = ({
  alignment = "right-top",
  disabled = false,
  visibility = true,
}: MapSettingsControlProps) => {
  const { ui } = useMapContext();

  const configureMapSettings = useCallback(() => {
    const uiInstance = ui.current;
    if (!uiInstance) return;

    const mapSettings = uiInstance.getControl("mapsettings");
    if (!mapSettings) return;

    setControlLayoutAlignment(mapSettings, alignment);
    setControlDisable(mapSettings, disabled);
    setControlVisibility(mapSettings, visibility);
  }, [alignment, disabled, visibility, ui]);

  useEffect(() => {
    configureMapSettings();
  }, [configureMapSettings]);
};
