export const setMapViewBounds = (map: H.Map, bbox: H.geo.Rect) => {
  map.getViewModel().setLookAtData({
    bounds: bbox
  });
}