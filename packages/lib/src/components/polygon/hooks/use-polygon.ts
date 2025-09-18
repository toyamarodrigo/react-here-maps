import { useCallback, useEffect, useRef } from "react";
import { useMapContext } from "../../here-map/hooks/use-map-context";
import type { PolygonProps } from "../types";

export const usePolygon = ({
  points,
  holes = [],
  options = {},
}: PolygonProps) => {
  const { map } = useMapContext();
  const polygonRef = useRef<H.map.Polygon | null>(null);

  const createPolygon = useCallback(() => {
    if (!points.length) return null;

    // Create exterior ring using LineString and ensure closure
    const exterior = new H.geo.LineString();
    for (const point of points) {
      exterior.pushPoint(point);
    }
    // Ensure polygon is closed by adding first point at end if needed
    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];
    if (firstPoint.lat !== lastPoint.lat || firstPoint.lng !== lastPoint.lng) {
      exterior.pushPoint(firstPoint);
    }

    // Create interior rings (holes)
    const interiors: H.geo.LineString[] = [];
    for (const hole of holes) {
      if (hole.length > 0) {
        const interior = new H.geo.LineString();
        for (const point of hole) {
          interior.pushPoint(point);
        }
        // Ensure hole is closed
        const holeFirstPoint = hole[0];
        const holeLastPoint = hole[hole.length - 1];
        if (
          holeFirstPoint.lat !== holeLastPoint.lat ||
          holeFirstPoint.lng !== holeLastPoint.lng
        ) {
          interior.pushPoint(holeFirstPoint);
        }
        interiors.push(interior);
      }
    }

    // Create polygon geometry
    const polygon = new H.geo.Polygon(exterior, interiors);

    return new H.map.Polygon(polygon, {
      ...options,
      data: {},
    });
  }, [points, holes, options]);

  useEffect(() => {
    const mapInstance = map.current;
    if (!mapInstance) return;

    const polygon = createPolygon();
    if (!polygon) return;

    mapInstance.addObject(polygon);
    polygonRef.current = polygon;

    return () => {
      if (polygonRef.current) {
        mapInstance.removeObject(polygonRef.current);
      }
    };
  }, [map, createPolygon]);

  return { polygonRef };
};
