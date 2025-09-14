import { useCallback, useRef } from "react";

export interface DragHandlers {
  onDragStart: (event: H.mapevents.Event) => void;
  onDrag: (event: H.mapevents.Event) => void;
  onDragEnd: (event: H.mapevents.Event) => void;
}

export const useMarkerDragBehavior = (
  mapInstance: H.Map | null,
  behavior: H.mapevents.Behavior | null,
): DragHandlers => {
  const isDragging = useRef(false);

  const onDragStart = useCallback(
    (event: H.mapevents.Event) => {
      if (!(event.target instanceof H.map.Marker) || !mapInstance) return;

      isDragging.current = true;
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
    },
    [mapInstance, behavior],
  );

  const onDrag = useCallback(
    (event: H.mapevents.Event) => {
      if (
        !(event.target instanceof H.map.Marker) ||
        !mapInstance ||
        !isDragging.current
      )
        return;

      const target = event.target;
      const offset = target.getData().offset as H.math.Point;
      const newPosition = mapInstance.screenToGeo(
        event.currentPointer.viewportX - offset.x,
        event.currentPointer.viewportY - offset.y,
      );

      if (newPosition) {
        target.setGeometry(newPosition);
      }
    },
    [mapInstance],
  );

  const onDragEnd = useCallback(
    (event: H.mapevents.Event) => {
      if (!(event.target instanceof H.map.Marker) || !mapInstance) return;

      isDragging.current = false;
      behavior?.enable();
      mapInstance.getViewPort().element.style.cursor = "grab";
    },
    [mapInstance, behavior],
  );

  return {
    onDragStart,
    onDrag,
    onDragEnd,
  };
};
