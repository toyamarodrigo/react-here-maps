import { useCallback, useMemo } from "react";
import type { MarkerProps, MarkerWithIconProps } from "../types";
import { MarkerSchema } from "../types";

export const useMarkerCreation = (props: MarkerProps) => {
  const validatedProps = useMemo(() => {
    try {
      return MarkerSchema.parse(props);
    } catch (_error) {
      throw new Error("Invalid marker props");
    }
  }, [props]);

  const createMarkerOptions = useCallback((): H.map.Marker.Options => {
    const options: H.map.Marker.Options = {
      data: validatedProps.label,
    };

    if ("icon" in validatedProps) {
      const iconProps = validatedProps as MarkerWithIconProps;
      const iconOptions: H.map.Icon.Options = {
        size: iconProps.iconSize ?? { w: 32, h: 32 },
        anchor: iconProps.iconAnchor ?? { x: 16, y: 16 },
      };

      if (iconProps.stickHeight !== undefined) {
        iconOptions.stickHeight = iconProps.stickHeight;
      }
      if (iconProps.stickColor !== undefined) {
        iconOptions.stickColor = iconProps.stickColor;
      }

      if (iconProps.icon) {
        options.icon = new H.map.Icon(iconProps.icon, iconOptions);
      }
    }

    return options;
  }, [validatedProps]);

  const createMarker = useCallback(
    (_mapInstance: H.Map): H.map.Marker => {
      const markerOptions = createMarkerOptions();
      const marker = new H.map.Marker(validatedProps.position, {
        ...markerOptions,
        volatility: true,
      });

      if (validatedProps.draggable) {
        marker.draggable = true;
      }

      return marker;
    },
    [validatedProps, createMarkerOptions],
  );

  return {
    validatedProps,
    createMarker,
  };
};
