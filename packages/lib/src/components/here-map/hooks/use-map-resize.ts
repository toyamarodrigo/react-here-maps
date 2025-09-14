import { type RefObject, useEffect } from "react";

export function useMapResize(mapRef: RefObject<H.Map | null>) {
  useEffect(() => {
    if (!mapRef.current) return;

    const resizeMap = () => {
      mapRef.current?.getViewPort().resize();
    };

    resizeMap();
    window.addEventListener("resize", resizeMap);

    return () => {
      window.removeEventListener("resize", resizeMap);
    };
  }, [mapRef]);
}
