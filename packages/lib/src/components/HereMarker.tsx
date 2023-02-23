import React, { useState, useEffect } from "react";
import { useHereMaps } from "../hooks/useHereMaps";

interface HereMarkerProps extends H.map.Marker.Options {
  children?: React.ReactNode;
  positions: H.geo.IPoint;
}

export const HereMarker = (props: HereMarkerProps) => {
  const map = useHereMaps();
  const { positions, ...options } = props;
  const [marker, setMarker] = useState<H.map.Marker | null>(null);

  const createMarker = () => {
    const marker = new H.map.Marker(positions, options);
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
