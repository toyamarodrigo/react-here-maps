import type React from "react";
import { useState, useEffect } from "react";
import { useHereMaps } from "../hooks/useHereMaps";

interface HereMarkerProps extends Omit<H.map.Marker.Options, "icon"> {
  children?: React.ReactNode;
  icon?: string;
  iconOptions?: H.map.Icon.Options;
  positions: H.geo.IPoint;
}

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

  const createMarker = () => {
    let iconMarker: H.map.Icon | undefined;

    if (icon) {
      iconMarker = new H.map.Icon(icon, iconOptions);
    }

    const marker = new H.map.Marker(positions, {
      ...options,
      icon: iconMarker,
    });

    setMarker(marker);
  };

  useEffect(() => {
    if (map && !marker) createMarker();
  }, [map, marker]);

  useEffect(() => {
    if (map && marker) map.addObject(marker);
  }, [map, marker]);

  return null;
};
