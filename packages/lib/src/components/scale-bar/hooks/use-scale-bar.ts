import { useCallback, useEffect } from "react";
import { setControlDisable } from "../../../utils/set-control-disable";
import { setControlLayoutAlignment } from "../../../utils/set-control-layout-alignment";
import { setControlVisibility } from "../../../utils/set-control-visibility";
import { useMapContext } from "../../here-map/hooks/use-map-context";
import type { ScaleBarControlProps } from "../types";

export const useScaleBar = ({
  alignment = "bottom-right",
  disabled = false,
  visibility = true,
}: ScaleBarControlProps) => {
  const { ui } = useMapContext();

  const configureScaleBar = useCallback(() => {
    const uiInstance = ui.current;
    if (!uiInstance) return;

    const scaleBar = uiInstance.getControl("scalebar");
    if (!scaleBar) return;

    setControlLayoutAlignment(scaleBar, alignment);
    setControlDisable(scaleBar, disabled);
    setControlVisibility(scaleBar, visibility);
  }, [alignment, disabled, visibility, ui]);

  useEffect(() => {
    configureScaleBar();
  }, [configureScaleBar]);
};
