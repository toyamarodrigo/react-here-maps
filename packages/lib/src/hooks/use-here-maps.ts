import { useMapContext } from "../components/here-map/hooks/use-map-context";

/**
 * @deprecated Use useMapContext instead
 * @name useHereMaps
 * @description
 * This hook is used to get the map instance.
 * @returns {MapContextValue} - Map instance
 * @example
 * const { map, platform } = useHereMaps();
 */
export const useHereMaps = () => {
  return useMapContext();
};
