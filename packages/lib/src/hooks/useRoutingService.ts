import { useHereMaps } from "./useHereMaps";
import { useState } from "react";
import { ROUTING_SERVICE } from "../utils/constant";

interface RoutingServiceProps {
  apiKey?: string;
}

interface CalculateRouteProps {
  transportMode: string;
  origin: string;
  destination: string;
  vias?: string[];
  returns?: string[];
}


/**
 * @name useRoutingService
 * @description
 * This hook is used to create a routing service instance. It returns a function to calculate a route and a function to clear the route.
 * @param {string} apiKey - Your API key
 * @returns {RoutingServiceProps} - Routing service instance
 * @example
 * const { route, clearRoute, isFetching, calculateRoute } = useRoutingService({ apiKey });
 * */
export const useRoutingService = ({ apiKey }: RoutingServiceProps) => {
  const { map } = useHereMaps();
  const [isFetching, setIsFetching] = useState(false);
  const [route, setRoute] = useState<H.service.ServiceResult | undefined>(
    undefined
  );
  const url = `${ROUTING_SERVICE}?apiKey=${apiKey}`;

  const calculateRoute = async ({
    transportMode,
    origin,
    destination,
    vias,
    returns = ["polyline"],
  }: CalculateRouteProps) => {
    const via = vias?.join(",");
    const viaParams = via ? `&via=${via}` : "";
    const returnParams = returns?.join(",");
    const urlWithParams = `${url}&transportMode=${transportMode}&origin=${origin}&destination=${destination}${viaParams}&return=${returnParams}`;

    setIsFetching(true);
    try {
      const response = await fetch(urlWithParams);
      const json = await response.json();
      setRoute(json);
    } catch (error) {
      setRoute(undefined);
      throw error;
    }
    setIsFetching(false);
  };

  const clearRoute = () => {
    if (map) {
      map.getObjects().forEach((object: any) => {
        if (object instanceof H.map.Polyline) {
          map.removeObject(object);
        }
      });

      setRoute(undefined);
    }
  }


  return { route, clearRoute, isFetching, calculateRoute };
};
