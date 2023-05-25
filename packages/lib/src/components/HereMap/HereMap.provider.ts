import { createContext } from "react";

export const HereMapsContext = createContext<{
  map: H.Map;
  platform: H.service.Platform;
}>(null as never);
