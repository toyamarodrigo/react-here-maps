import type { RefObject } from "react";
import { useMapContext } from "../../here-map/hooks/use-map-context";
import type { MarkerProps } from "../types";
import { useMarkerCreation } from "./use-marker-creation";
import { useMarkerDragBehavior } from "./use-marker-drag-behavior";
import { useMarkerLifecycle } from "./use-marker-lifecycle";

/**
 * Comprehensive hook for marker functionality
 * Combines marker creation, drag behavior, and lifecycle management
 */
export const useMarker = (
  props: MarkerProps,
): RefObject<H.map.Marker | null> => {
  const { map, behavior } = useMapContext();
  const { validatedProps, createMarker } = useMarkerCreation(props);
  const dragHandlers = useMarkerDragBehavior(map.current, behavior.current);

  const markerRef = useMarkerLifecycle({
    mapRef: map,
    createMarker,
    isDraggable: Boolean(validatedProps.draggable),
    dragHandlers,
  });

  return markerRef;
};
