import type { Alignments } from "../components/here-map/here-map.type";

export const setControlLayoutAlignment = (
  control: H.ui.Control,
  alignment: Alignments,
) => {
  const layoutAlignment = {
    "bottom-center": H.ui.LayoutAlignment.BOTTOM_CENTER,
    "bottom-left": H.ui.LayoutAlignment.BOTTOM_LEFT,
    "bottom-right": H.ui.LayoutAlignment.BOTTOM_RIGHT,
    "left-bottom": H.ui.LayoutAlignment.LEFT_BOTTOM,
    "left-middle": H.ui.LayoutAlignment.LEFT_MIDDLE,
    "left-top": H.ui.LayoutAlignment.LEFT_TOP,
    "right-bottom": H.ui.LayoutAlignment.RIGHT_BOTTOM,
    "right-middle": H.ui.LayoutAlignment.RIGHT_MIDDLE,
    "right-top": H.ui.LayoutAlignment.RIGHT_TOP,
    "top-center": H.ui.LayoutAlignment.TOP_CENTER,
    "top-left": H.ui.LayoutAlignment.TOP_LEFT,
    "top-right": H.ui.LayoutAlignment.TOP_RIGHT,
  }[alignment];

  return control.setAlignment(layoutAlignment);
};
