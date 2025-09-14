export interface PolylineProps {
  points: H.geo.IPoint[];
  options?: Omit<H.map.Polyline.Options, "data">;
}
