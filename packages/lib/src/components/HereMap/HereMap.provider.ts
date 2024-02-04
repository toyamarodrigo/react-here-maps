import type { MutableRefObject } from "react";
import { createContext } from "react";

export const MapContext = createContext<{
  map: MutableRefObject<H.Map | null>;
  platform: MutableRefObject<H.service.Platform | null>;
}>(null as never);
