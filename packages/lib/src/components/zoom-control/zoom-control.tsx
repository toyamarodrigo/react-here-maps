import { memo, useCallback, useEffect } from "react";
import type { ZoomControlProps } from "../../models";
import { setControlDisable } from "../../utils/set-control-disable";
import { setControlLayoutAlignment } from "../../utils/set-control-layout-alignment";
import { setControlVisibility } from "../../utils/set-control-visibility";
import { useMapContext } from "../here-map/hooks/use-map-context";

export const ZoomControl = memo<ZoomControlProps>(
  ({
    alignment = "right-top",
    disabled = false,
    visibility = true,
  }: ZoomControlProps) => {
    const { ui } = useMapContext();

    const configureZoomControl = useCallback(() => {
      const uiInstance = ui.current;
      if (!uiInstance) return;

      const zoomControl = uiInstance.getControl("zoom");
      if (!zoomControl) return;

      setControlLayoutAlignment(zoomControl, alignment);
      setControlDisable(zoomControl, disabled);
      setControlVisibility(zoomControl, visibility);
    }, [alignment, disabled, visibility, ui]);

    useEffect(() => {
      configureZoomControl();
    }, [configureZoomControl]);

    return null;
  },
);

ZoomControl.displayName = "ZoomControl";
