import { memo, useCallback, useEffect, useRef } from "react";
import { useMapContext } from "../here-map/hooks/use-map-context";

export interface PolylineProps {
  points: H.geo.IPoint[];
  options?: Omit<H.map.Polyline.Options, "data">;
}

export const Polyline = memo<PolylineProps>(
  ({ points, options = {} }: PolylineProps) => {
    const { map } = useMapContext();
    const polylineRef = useRef<H.map.Polyline | null>(null);

    const createPolyline = useCallback(() => {
      if (!points.length) return null;

      const lineString = new H.geo.LineString();
      for (const point of points) {
        lineString.pushPoint(point);
      }

      return new H.map.Polyline(lineString, {
        ...options,
        data: {},
      });
    }, [points, options]);

    useEffect(() => {
      const mapInstance = map.current;
      if (!mapInstance) return;

      const polyline = createPolyline();
      if (!polyline) return;

      mapInstance.addObject(polyline);
      polylineRef.current = polyline;

      return () => {
        if (polylineRef.current) {
          mapInstance.removeObject(polylineRef.current);
        }
      };
    }, [map, createPolyline]);

    return null;
  },
);

Polyline.displayName = "Polyline";
