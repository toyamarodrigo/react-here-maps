export const getDefaultZoom = (zoom: number | undefined) => {
  if (!zoom) return 12;

  return zoom;
};
