import { useHereMaps } from "../hooks/useHereMaps";

interface HerePolylineProps {
  route: any;
}

/**
 * Polyline component that draws a polyline on the map with H.map.Polyline
 * @param routes
 * @returns 
 */
export const HerePolyline = ({ route }: HerePolylineProps) => {
  const { map } = useHereMaps();
  if (!map) return null;

  route.routes.map((route: any) => {
    route.sections.forEach((section: any) => {
      if (section.polyline === undefined) return;

      const lineString = H.geo.LineString.fromFlexiblePolyline(
        section.polyline
      );
      const polyline = new H.map.Polyline(lineString, {
        data: undefined,
        style: {
          lineWidth: 4,
          strokeColor: "rgba(0, 128, 255, 0.7)",
        },
      });
      map.addObject(polyline);
    });
  });

  return null;
};
