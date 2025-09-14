import type { RefObject } from "react";
import { useEffect, useRef } from "react";
import type { DragHandlers } from "./use-marker-drag-behavior";

interface UseMarkerLifecycleParams {
  mapRef: RefObject<H.Map | null>;
  createMarker: (mapInstance: H.Map) => H.map.Marker;
  isDraggable: boolean;
  dragHandlers: DragHandlers;
}

export const useMarkerLifecycle = ({
  mapRef,
  createMarker,
  isDraggable,
  dragHandlers,
}: UseMarkerLifecycleParams): RefObject<H.map.Marker | null> => {
  const markerRef = useRef<H.map.Marker | null>(null);

  useEffect(() => {
    const mapInstance = mapRef.current;
    if (!mapInstance) return;

    const marker = createMarker(mapInstance);
    markerRef.current = marker;
    mapInstance.addObject(marker);

    // Add drag listeners if draggable
    if (isDraggable) {
      mapInstance.addEventListener("dragstart", dragHandlers.onDragStart);
      mapInstance.addEventListener("drag", dragHandlers.onDrag);
      mapInstance.addEventListener("dragend", dragHandlers.onDragEnd);
    }

    return () => {
      if (markerRef.current && mapInstance) {
        mapInstance.removeObject(markerRef.current);

        if (isDraggable) {
          mapInstance.removeEventListener(
            "dragstart",
            dragHandlers.onDragStart,
          );
          mapInstance.removeEventListener("drag", dragHandlers.onDrag);
          mapInstance.removeEventListener("dragend", dragHandlers.onDragEnd);
        }

        markerRef.current = null;
      }
    };
  }, [mapRef, createMarker, isDraggable, dragHandlers]);

  return markerRef;
};
