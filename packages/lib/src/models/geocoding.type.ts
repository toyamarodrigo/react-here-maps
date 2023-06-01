export interface Geocoding {
  items: Item[];
}

export interface Item {
  title: ID;
  id: ID;
  politicalView: ID;
  resultType: string;
  houseNumberType: string;
  addressBlockType: string;
  localityType: string;
  administrativeAreaType: string;
  address: Address;
  position: Position;
  access: Position[];
  distance: number;
  mapView: MapView;
  categories: Category[];
  foodTypes: Category[];
  houseNumberFallback: boolean;
  timeZone: TimeZone;
  scoring: Scoring;
  parsing: { [key: string]: Parsing[] };
  streetInfo: StreetInfo[];
  countryInfo: CountryInfo;
}

export interface Position {
  lat: number;
  lng: number;
}

export interface Address {
  label: ID;
  countryCode: ID;
  countryName: ID;
  stateCode: ID;
  state: ID;
  countyCode: ID;
  county: ID;
  city: ID;
  district: ID;
  subdistrict: ID;
  street: ID;
  streets: ID[];
  block: ID;
  subblock: ID;
  postalCode: ID;
  houseNumber: ID;
  building: ID;
}

export enum ID {
  String = "string",
}

export interface Category {
  id: ID;
  name: ID;
  primary: boolean;
}

export interface CountryInfo {
  alpha2: ID;
  alpha3: ID;
}

export interface MapView {
  west: number;
  south: number;
  east: number;
  north: number;
}

export interface Parsing {
  start: number;
  end: number;
  value: ID;
  qq: Qq;
}

export enum Qq {
  Country = "country",
}

export interface Scoring {
  queryScore: number;
  fieldScore: FieldScore;
}

export interface FieldScore {
  country: number;
  countryCode: number;
  state: number;
  stateCode: number;
  county: number;
  countyCode: number;
  city: number;
  district: number;
  subdistrict: number;
  streets: number[];
  block: number;
  subblock: number;
  houseNumber: number;
  postalCode: number;
  building: number;
  unit: number;
  placeName: number;
  ontologyName: number;
}

export interface StreetInfo {
  baseName: ID;
  streetType: ID;
  streetTypePrecedes: boolean;
  streetTypeAttached: boolean;
  prefix: ID;
  suffix: ID;
  direction: ID;
  language: ID;
}

export interface TimeZone {
  name: ID;
  utcOffset: ID;
}
