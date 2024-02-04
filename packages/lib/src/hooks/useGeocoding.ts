/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
import type { Geocoding } from "../models/geocoding.type";
import { useHereMaps } from "./useHereMaps";

export const useGeocoding = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<Geocoding>();
  const [error, setError] = useState<any>();
  const { platform, map } = useHereMaps();

  const service = platform.current?.getSearchService();

  const geocode = useCallback(
    (address: string) => {
      return new Promise((resolve: (value: Geocoding) => void, reject) => {
        setIsFetching(true);
        if (!service) return reject("Platform is not created");
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
    if (!map.current) throw new Error("Map is not created");
    map.current.removeObjects(map.current.getObjects());
    setData(undefined);
    setError(undefined);
  }, [map]);

  const addMarker = useCallback(
    (geocoding: { label: string; value: { lat: number; lng: number } }) => {
      if (!map.current) throw new Error("Map is not created");
      const { lat, lng } = geocoding.value;
      const marker = new window.H.map.Marker({ lat, lng });

      map.current.addObject(marker);
      map.current.setCenter({ lat, lng });
    },
    [map],
  );

  return { isFetching, data, error, geocode, clearGeocoding, addMarker };
};
