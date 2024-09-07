import { useEffect } from "react";
import { setControlLayoutAlignment } from "../../utils/set-control-layout-alignment";
import { setControlDisable } from "../../utils/set-control-disable";
import { setControlVisibility } from "../../utils/set-control-visibility";
import type { ZoomControlProps } from "../../models";
import { useHereMaps } from "../../hooks";

export const ZoomControl = ({
  alignment = "right-top",
  disabled = false,
  visibility = true,
}: ZoomControlProps) => {
  const { ui } = useHereMaps();

  useEffect(() => {
    const uiInstance = ui.current;

    if (!uiInstance) return;
    const zoom = uiInstance.getControl("zoom");

    if (!zoom) return;
    setControlLayoutAlignment(zoom, alignment);
    setControlDisable(zoom, disabled);
    setControlVisibility(zoom, visibility);
  }, [alignment, disabled, visibility, ui]);

  return null;
};
