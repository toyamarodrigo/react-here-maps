import { useState } from "react";
import type { CalculateRouteProps } from "../models/routing-service.type";
import { ROUTING_SERVICE } from "../utils/constants";
import { useHereMaps } from "./useHereMaps";

interface RoutingServiceProps {
  apiKey?: string;
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
  const [route, setRoute] = useState<H.service.ServiceResult | undefined>(undefined);
  const url = `${ROUTING_SERVICE}?apiKey=${apiKey}`;

  const calculateRoute = async ({
    transportMode = "car",
    origin,
    originOptions,
    destination,
    destinationOptions,
    vias = [],
    viaOptions = [],
    returns = ["polyline"],
  }: CalculateRouteProps) => {
    const originCourse = originOptions?.course ? `&course=${originOptions.course}` : "";
    const originSideOfStreetHint = originOptions?.sideOfStreetHint
      ? `&sideOfStreetHint=${originOptions.sideOfStreetHint.lat},${originOptions.sideOfStreetHint.lng}`
      : "";
    const originMatchSideOfStreet = originOptions?.matchSideOfStreet
      ? `&matchSideOfStreet=${originOptions.matchSideOfStreet}`
      : "";
    const originPlaceOptions = [originCourse, originSideOfStreetHint, originMatchSideOfStreet]
      .filter(Boolean)
      .join(";")
      ? ";" +
        [originCourse, originSideOfStreetHint, originMatchSideOfStreet].filter(Boolean).join(";")
      : "";

    const destinationCourse = destinationOptions?.course
      ? `&course=${destinationOptions.course}`
      : "";
    const destinationSideOfStreetHint = destinationOptions?.sideOfStreetHint
      ? `&sideOfStreetHint=${destinationOptions.sideOfStreetHint.lat},${destinationOptions.sideOfStreetHint.lng}`
      : "";
    const destinationMatchSideOfStreet = destinationOptions?.matchSideOfStreet
      ? `&matchSideOfStreet=${destinationOptions.matchSideOfStreet}`
      : "";
    const destinationPlaceOptions = [
      destinationCourse,
      destinationSideOfStreetHint,
      destinationMatchSideOfStreet,
    ]
      .filter(Boolean)
      .join(";")
      ? ";" +
        [destinationCourse, destinationSideOfStreetHint, destinationMatchSideOfStreet]
          .filter(Boolean)
          .join(";")
      : "";

    let viaPlaceOptions;

    if (vias.length > 0) {
      if (viaOptions.length > 0) {
        return (viaPlaceOptions = viaOptions
          .map((viaOption, index) => {
            const viaCourse = viaOption?.course ? `&course=${viaOption.course}` : "";
            const viaSideOfStreetHint = viaOption?.sideOfStreetHint
              ? `&sideOfStreetHint=${viaOption.sideOfStreetHint.lat},${viaOption.sideOfStreetHint.lng}`
              : "";
            const viaMatchSideOfStreet = viaOption?.matchSideOfStreet
              ? `&matchSideOfStreet=${viaOption.matchSideOfStreet}`
              : "";
            const viaStopDuration = viaOption?.stopDuration
              ? `&stopDuration=${viaOption.stopDuration}`
              : "";
            const viaPassThrough = viaOption?.passThrough
              ? `&passThrough=${viaOption.passThrough}`
              : "";
            const viaPlaceOption = [
              viaCourse,
              viaSideOfStreetHint,
              viaMatchSideOfStreet,
              viaStopDuration,
              viaPassThrough,
            ]
              .filter(Boolean)
              .join(";");

            return viaPlaceOption
              ? `&via=${vias[index].lat},${vias[index].lng};${viaPlaceOption}`
              : `&via=${vias[index].lat},${vias[index].lng}`;
          })
          .filter(Boolean)
          .join(""));
      }

      viaPlaceOptions = vias.map((via) => `&via=${via.lat},${via.lng}`).join("");
    }

    const returnParams = returns?.join(",");
    const urlWithParams = `${url}&transportMode=${transportMode}&origin=${origin.lat},${
      origin.lng
    }${originPlaceOptions}&destination=${destination.lat},${
      destination.lng
    }${destinationPlaceOptions}${viaPlaceOptions ? viaPlaceOptions : ""}&return=${returnParams}`;

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
  };

  return { route, clearRoute, isFetching, calculateRoute };
};
