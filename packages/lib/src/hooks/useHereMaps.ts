import type H from "@here/maps-api-for-javascript";
import type { MutableRefObject } from "react";
import { useContext } from "react";
import { MapContext } from "../components/here-map/here-map.context";

interface UseHereMapProps {
  map: MutableRefObject<H.Map | null>;
  platform: MutableRefObject<H.service.Platform | null>;
  ui: MutableRefObject<H.ui.UI | null>;
  behavior: MutableRefObject<H.mapevents.Behavior | null>;
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

  return {
    map: context.map,
    platform: { current: context.platform },
    ui: context.ui,
    behavior: context.behavior,
  };
};
