/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
import type { Geocoding } from "../models/geocoding.type";
import { useHereMaps } from "./useHereMaps";

export const useGeocoding = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<Geocoding>();
  const [error, setError] = useState<any>();
  const { platform, map } = useHereMaps();

  const service = platform.getSearchService();

  const geocode = useCallback(
    (address: string) => {
      return new Promise((resolve: (value: Geocoding) => void, reject) => {
        setIsFetching(true);
        service.geocode(
          { q: address },
          (result) => {
            setData(result as Geocoding);

            return resolve(result as Geocoding);
          },
          (error) => {
            setError(error);

            return reject(error);
          },
        );
      }).finally(() => setIsFetching(false));
    },
    [service],
  );

  const clearGeocoding = useCallback(() => {
    map.removeObjects(map.getObjects());
    setData(undefined);
    setError(undefined);
  }, [map]);

  const addMarker = useCallback(
    (geocoding: { label: string; value: { lat: number; lng: number } }) => {
      const { lat, lng } = geocoding.value;
      const marker = new window.H.map.Marker({ lat, lng });

      map.addObject(marker);
      map.setCenter({ lat, lng });
    },
    [map],
  );

  return { isFetching, data, error, geocode, clearGeocoding, addMarker };
};
