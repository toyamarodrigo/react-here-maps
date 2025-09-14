import { useEffect } from "react";
import { useHereMaps } from "../../hooks";
import type { ScaleBarControlProps } from "../../models";
import { setControlDisable } from "../../utils/set-control-disable";
import { setControlLayoutAlignment } from "../../utils/set-control-layout-alignment";
import { setControlVisibility } from "../../utils/set-control-visibility";

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
