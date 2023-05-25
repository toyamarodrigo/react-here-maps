import { useState, useEffect, useCallback } from "react";
import { useHereMaps } from "../../hooks/useHereMaps";
import type { HereMarkerProps } from "./HereMarker.types";

/**
 * A "normal" marker that uses a static image as an icon.
 * Large numbers of markers of this types can be added
 * to the map very quickly and efficiently.
 * @param props
 * @returns
 */
export const HereMarker = (props: HereMarkerProps) => {
  const { map } = useHereMaps();
  const { positions, icon, iconOptions, ...options } = props;
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
