/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
import type { Route } from "../models";
import { useHereMaps } from "./useHereMaps";

export const useRoutingService = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<Route>();
  const [error, setError] = useState<any>();
  const { map, platform } = useHereMaps();

  const router = platform.current?.getRoutingService(undefined, 8);

  const calculateRoute = useCallback(
    ({
      origin,
      destination,
      vias = [],
      transportMode = "car",
    }: {
      origin: H.geo.IPoint;
      destination: H.geo.IPoint;
      vias?: H.geo.IPoint[];
      transportMode?: "car" | "truck" | "pedestrian" | "bicycle";
    }) => {
      return new Promise((resolve: (value: Route) => void, reject) => {
        const viasArray = vias.map((via) => via.lat + "," + via.lng);

        setIsFetching(true);

        if (!router) return reject(new Error("Router not found"));

        router.calculateRoute(
          {
            origin: origin.lat + "," + origin.lng,
            destination: destination.lat + "," + destination.lng,
            via:
              vias.length > 0 ? new H.service.Url.MultiValueQueryParameter(viasArray) : undefined,
            return: "polyline",
            transportMode,
          },
          (result) => {
            setData(result as Route);

            return resolve(result as Route);
          },
          (error) => {
            setError(error);

            return reject(error);
          },
        );
      }).finally(() => setIsFetching(false));
    },
    [router],
  );

  const clearRoute = () => {
    if (!map.current) return;

    map.current.getObjects().forEach((object: any) => {
      if (object instanceof H.map.Polyline) {
        if (map.current) map.current.removeObject(object);
      }
    });
  };

  return { data, error, isFetching, router, calculateRoute, clearRoute };
};
