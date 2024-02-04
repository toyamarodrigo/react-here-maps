import type H from "@here/maps-api-for-javascript";
import type { MutableRefObject } from "react";
import { useContext } from "react";
import { MapContext } from "../components/HereMap/HereMap.provider";

interface UseHereMapProps {
  map: MutableRefObject<H.Map | null>;
  platform: MutableRefObject<H.service.Platform | null>;
}

/**
 * @name useHereMaps
 * @description
 * This hook is used to get the map instance.
 * @returns {UseHereMapProps} - Map instance
 * @example
 * const { map, platform } = useHereMaps();
 */

export const useHereMaps = (): UseHereMapProps => {
  const context = useContext(MapContext);

  if (!context) {
    throw new Error("useHereMaps must be used within a MapProvider");
  }

  return context;
};
