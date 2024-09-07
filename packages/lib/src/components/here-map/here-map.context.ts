import type { MutableRefObject } from "react";
import { createContext } from "react";

export const MapContext = createContext<{
  map: MutableRefObject<H.Map | null>;
  platform: H.service.Platform | null;
  ui: MutableRefObject<H.ui.UI | null>;
  behavior: MutableRefObject<H.mapevents.Behavior | null>;
}>(null as never);
