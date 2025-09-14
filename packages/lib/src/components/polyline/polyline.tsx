import { useEffect, useRef } from "react";
import { useHereMaps } from "../../hooks";

type PolylineProps = {
  points: H.geo.IPoint[];
  options: Omit<H.map.Polyline.Options, "data">;
};

export const Polyline = ({ points, options }: PolylineProps) => {
  const { map } = useHereMaps();
  const polylineRef = useRef<H.map.Polyline | null>(null);

  useEffect(() => {
    const mapInstance = map.current;

    if (!mapInstance) return;

    const lineString = new H.geo.LineString();

    for (const point of points) {
      lineString.pushPoint(point);
    }

    const newPolyline = new H.map.Polyline(lineString, {
      ...options,
      data: {},
    });

    mapInstance.addObject(newPolyline);
    polylineRef.current = newPolyline;

    return () => {
      if (polylineRef.current) {
        mapInstance.removeObject(polylineRef.current);
      }
    };
  }, [map, points, options]);

  return null;
};
