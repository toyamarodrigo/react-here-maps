import type H from "@here/maps-api-for-javascript";
import { useContext } from "react";
import { HereMapsContext } from "../components/HereMap";

interface UseHereMapsProps {
  map: H.Map | undefined;
  platform: H.service.Platform | undefined;
}

/**
 * @name useHereMaps
 * @description
 * This hook is used to get the map instance.
 * @returns {UseHereMapsProps} - Map instance
 * @example
 * const { map } = useHereMaps();
 */

export const useHereMaps = (): UseHereMapsProps => {
  const context = useContext(HereMapsContext);

  if (context === undefined) {
    throw new Error("useHereMaps must be used within a HereMapsProvider");
  }

  return context;
};
