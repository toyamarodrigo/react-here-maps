export interface CalculateRouteProps {
  transportMode: "car" | "pedestrian" | "truck" | "scooter";
  origin: Origin;
  destination: Destination;
  returns: string[];
  originOptions?: OriginOptions;
  destinationOptions?: DestinationOptions;
  vias?: Via[];
  viaOptions?: ViaOptions[];
  radius?: number;
}

interface Origin {
  lat: number;
  lng: number;
}

interface Destination {
  lat: number;
  lng: number;
}

interface Via {
  lat: number;
  lng: number;
}

interface ViaOptions {
  course?: number;
  sideOfStreetHint: Via;
  matchSideOfStreet: "always" | "onlyIfDivided";
  stopDuration?: number;
  passThrough?: boolean;
}

interface OriginOptions {
  course?: number;
  sideOfStreetHint: Origin;
  matchSideOfStreet: "always" | "onlyIfDivided";
}

interface DestinationOptions {
  course?: number;
  stopDuration?: number;
  sideOfStreetHint: Origin;
  matchSideOfStreet: "always" | "onlyIfDivided";
}

