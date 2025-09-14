import { useEffect, useRef } from "react";
import { useHereMaps } from "../../hooks/useHereMaps";
import type { MarkerWithIconProps } from "./marker.type";
import { type MarkerProps, MarkerSchema } from "./marker.type";

export const Marker = (props: MarkerProps) => {
  const { map, behavior } = useHereMaps();
  const markerRef = useRef<H.map.Marker | null>(null);

  useEffect(() => {
    const mapInstance = map.current;

    if (!mapInstance) return;

    try {
      const validatedProps = MarkerSchema.parse(props);
      const markerOptions = createMarkerOptions(validatedProps);
      const marker = new H.map.Marker(validatedProps.position, {
        ...markerOptions,
        volatility: true,
      });

      if (validatedProps.draggable) {
        marker.draggable = true;
        addDragListeners(mapInstance, behavior.current);
      }

      mapInstance.addObject(marker);
      markerRef.current = marker;

      return () => {
        if (markerRef.current && mapInstance) {
          mapInstance.removeObject(markerRef.current);
        }
      };
    } catch (_error) {
      throw new Error("Invalid marker props");
    }
  }, [map, props, behavior]);

  return null;
};

function addDragListeners(
  mapInstance: H.Map,
  behavior: H.mapevents.Behavior | null,
) {
  mapInstance.addEventListener("dragstart", onDragStart);
  mapInstance.addEventListener("drag", onDrag);
  mapInstance.addEventListener("dragend", onDragEnd);

  function onDragStart(event: H.mapevents.Event) {
    if (event.target instanceof H.map.Marker) {
      behavior?.disable();
      const targetPosition = mapInstance.geoToScreen(
        event.target.getGeometry() as H.geo.IPoint,
      );

      if (targetPosition) {
        event.target.setData({
          offset: new H.math.Point(
            event.currentPointer.viewportX - targetPosition.x,
            event.currentPointer.viewportY - targetPosition.y,
          ),
        });
        mapInstance.getViewPort().element.style.cursor = "grabbing";
      }
    }
  }

  function onDrag(event: H.mapevents.Event) {
    if (event.target instanceof H.map.Marker) {
      const target = event.target;
      const offset = target.getData().offset as H.math.Point;
      const newPosition = mapInstance.screenToGeo(
        event.currentPointer.viewportX - offset.x,
        event.currentPointer.viewportY - offset.y,
      );

      if (newPosition) {
        target.setGeometry(newPosition);
      }
    }
  }

  function onDragEnd(event: H.mapevents.Event) {
    if (event.target instanceof H.map.Marker) {
      behavior?.enable();
      mapInstance.getViewPort().element.style.cursor = "grab";
    }
  }
}

function createMarkerOptions(props: MarkerProps): H.map.Marker.Options {
  const options: H.map.Marker.Options = { data: props.label };

  if ("icon" in props) {
    const iconProps = props as MarkerWithIconProps;
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
}
