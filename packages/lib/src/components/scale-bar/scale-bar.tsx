import { useEffect } from "react";
import { setControlLayoutAlignment } from "../../utils/set-control-layout-alignment";
import { setControlDisable } from "../../utils/set-control-disable";
import { setControlVisibility } from "../../utils/set-control-visibility";
import type { ScaleBarControlProps } from "../../models";
import { useHereMaps } from "../../hooks";

export const ScaleBar = ({
  alignment = "bottom-right",
  disabled = false,
  visibility = true,
}: ScaleBarControlProps) => {
  const { ui } = useHereMaps();

  useEffect(() => {
    const uiInstance = ui.current;

    if (!uiInstance) return;
    const zoom = uiInstance.getControl("scalebar");

    if (!zoom) return;
    setControlLayoutAlignment(zoom, alignment);
    setControlDisable(zoom, disabled);
    setControlVisibility(zoom, visibility);
  }, [alignment, disabled, visibility, ui]);

  return null;
};
