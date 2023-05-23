import type React from "react";
import { useState, useEffect } from "react";
import { useHereMaps } from "../hooks/useHereMaps";

export interface HereDomMarkerProps extends Omit<H.map.Marker.Options, "icon"> {
  children?: React.ReactNode;
  icon?: string;
  iconOptions?: H.map.Icon.Options;
  positions: H.geo.IPoint;
}

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

  const createDomMarker = () => {
    let iconMarker: H.map.Icon | undefined;

    if (icon) {
      iconMarker = new H.map.Icon(icon, iconOptions);
    }

    const marker = new H.map.DomMarker(positions, {
      icon: iconMarker,
      ...options,
    });

    setMarker(marker);
  };

  useEffect(() => {
    if (map && !marker) createDomMarker();
  }, [map, marker]);

  useEffect(() => {
    if (map && marker) map.addObject(marker);
  }, [map, marker]);

  return null;
};
