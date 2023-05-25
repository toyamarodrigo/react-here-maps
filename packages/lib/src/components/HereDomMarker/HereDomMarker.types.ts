export interface HereDomMarkerProps extends Omit<H.map.Marker.Options, "icon"> {
  children?: React.ReactNode;
  icon?: string;
  iconOptions?: H.map.Icon.Options;
  positions: H.geo.IPoint;
}
