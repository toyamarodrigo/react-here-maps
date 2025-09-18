export interface PolygonProps {
  points: H.geo.IPoint[];
  holes?: H.geo.IPoint[][];
  options?: Omit<H.map.Polygon.Options, "data">;
}
