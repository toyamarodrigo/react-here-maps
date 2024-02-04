import { useState, useEffect, useCallback } from "react";
import { useHereMaps } from "../../hooks/useHereMaps";
import type { HereDomMarkerProps } from "./HereDomMarker.types";

/**
 * @name HereDomMarker
 * @description
 * A marker which supports HTML (and SVG) content, which can be dynamic.
 * Markers of this type are best displayed individually or in small sets.
 * @param {string} icon - The URL of the icon.
 * @param {H.map.Icon.Options} iconOptions - The options for the icon.
 * @param {H.geo.IPoint} positions - The position of the marker.
 * @param {H.map.DomMarker.Options} options - The options for the marker.
 * @returns
 */
export const HereDomMarker = ({ icon, iconOptions, positions, ...options }: HereDomMarkerProps) => {
  const { map } = useHereMaps();
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
    if (map.current && marker) map.current.addObject(marker);
  }, [map, marker]);

  return null;
};
