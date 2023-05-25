export interface Route {
  routes: RouteElement[];
}

export interface RouteElement {
  id: string;
  sections: Section[];
}

export interface Section {
  id: string;
  type: string;
  actions: Action[];
  departure: Arrival;
  arrival: Arrival;
  summary: Summary;
  polyline: string;
  spans: Span[];
  transport: Transport;
}

export interface Action {
  action: string;
  duration: number;
  instruction: string;
  offset: number;
}

export interface Arrival {
  time: Date;
  place: Place;
}

export interface Place {
  type: string;
  location: Location;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Span {
  offset: number;
  names: Name[];
  length: number;
}

export interface Name {
  value: string;
  language: string;
}

export interface Summary {
  duration: number;
  length: number;
}

export interface Transport {
  mode: string;
}
