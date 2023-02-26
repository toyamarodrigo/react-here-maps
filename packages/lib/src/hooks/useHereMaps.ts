import H from "@here/maps-api-for-javascript";
import { useContext } from "react";
import { HereMapsContext } from "../HereMapsProvider";

interface UseHereMapsProps {
  map: H.Map | undefined;
  platform: H.service.Platform | undefined;
}

export const useHereMaps = (): UseHereMapsProps => {
  const context = useContext(HereMapsContext);

  if (context === undefined) {
    throw new Error("useHereMaps must be used within a HereMapsProvider");
  }

  return context;
};
