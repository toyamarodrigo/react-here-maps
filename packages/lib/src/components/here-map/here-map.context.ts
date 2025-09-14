import type { RefObject } from "react";
import { createContext } from "react";

export interface MapContextValue {
  map: RefObject<H.Map | null>;
  platform: H.service.Platform | null;
  ui: RefObject<H.ui.UI | null>;
  behavior: RefObject<H.mapevents.Behavior | null>;
}

export const MapContext = createContext<MapContextValue | null>(null);
