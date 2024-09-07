export const getDefaultCenter = (positions: H.geo.IPoint | undefined) => {
  if (!positions) throw new Error("center is required");

  return {
    lat: positions.lat,
    lng: positions.lng,
  };
};
