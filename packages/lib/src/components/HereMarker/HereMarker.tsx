import { useState, useEffect, useCallback } from "react";
import { useHereMaps } from "../../hooks/useHereMaps";
import type { HereMarkerProps } from "./HereMarker.types";

/**
 * @name HereMarker
 * @description
 * A "normal" marker that uses a static image as an icon.
 * Large numbers of markers of this types can be added
 * to the map very quickly and efficiently.
 * @param {string} icon - The URL of the icon.
 * @param {H.map.Icon.Options} iconOptions - The options for the icon.
 * @param {H.geo.IPoint} positions - The position of the marker.
 * @param {H.map.Marker.Options} options - The options for the marker.
 * @returns The rendered marker.
 */
export const HereMarker = ({ icon, iconOptions, positions, ...options }: HereMarkerProps) => {
  const { map } = useHereMaps();
  const [marker, setMarker] = useState<H.map.Marker | null>(null);

  const createMarker = useCallback(() => {
    let iconMarker: H.map.Icon | undefined;

    if (icon) {
      iconMarker = new H.map.Icon(icon, iconOptions);
    }

    const marker = new H.map.Marker(positions, {
      ...options,
      icon: iconMarker,
    });

    setMarker(marker);
  }, [positions, icon, iconOptions, options]);

  useEffect(() => {
    if (map && !marker) createMarker();
  }, [map, marker, createMarker]);

  useEffect(() => {
    if (map && marker) map.addObject(marker);
  }, [map, marker]);

  return null;
};
