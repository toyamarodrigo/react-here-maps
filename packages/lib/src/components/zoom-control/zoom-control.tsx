import { useEffect } from "react";
import { useHereMaps } from "../../hooks";
import type { ZoomControlProps } from "../../models";
import { setControlDisable } from "../../utils/set-control-disable";
import { setControlLayoutAlignment } from "../../utils/set-control-layout-alignment";
import { setControlVisibility } from "../../utils/set-control-visibility";

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
