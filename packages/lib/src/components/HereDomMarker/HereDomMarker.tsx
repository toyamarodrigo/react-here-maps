import { useState, useEffect, useCallback } from "react";
import { useHereMaps } from "../../hooks/useHereMaps";
import type { HereDomMarkerProps } from "./HereDomMarker.types";

/**
 * A marker which supports HTML (and SVG) content, which can be dynamic.
 * Markers of this type are best displayed individually or in small sets.
 * @param props
 * @returns
 */
export const HereDomMarker = (props: HereDomMarkerProps) => {
  const { map } = useHereMaps();
  const { positions, icon, iconOptions, ...options } = props;
  const [marker, setMarker] = useState<H.map.Marker | null>(null);

  const createDomMarker = useCallback(() => {
    let iconMarker: H.map.Icon | undefined;

    if (icon) {
      iconMarker = new H.map.Icon(icon, iconOptions);
    }

    const marker = new H.map.DomMarker(positions, {
      icon: iconMarker,
      ...options,
    });

    setMarker(marker);
  }, [positions, icon, iconOptions, options]);

  useEffect(() => {
    if (map && !marker) createDomMarker();
  }, [map, marker, createDomMarker]);

  useEffect(() => {
    if (map && marker) map.addObject(marker);
  }, [map, marker]);

  return null;
};
