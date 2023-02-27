import { useHereMaps } from "../hooks/useHereMaps";

interface HerePolylineProps {
  route: any;
  style?: H.map.SpatialStyle.Options;
}

/**
 * HerePolyline
 * Polyline component that draws a polyline on the map with H.map.Polyline
 * @param routes
 * @param style
 * @returns
 */
export const HerePolyline = ({
  route,
  style = { lineWidth: 4, strokeColor: "rgba(0, 128, 255, 0.7)" },
}: HerePolylineProps) => {
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
        style: { ...style }
      });
      map.addObject(polyline);
    });
  });

  return null;
};
