export const getDefaultEngineType = (
  engineType: "webgl" | "p2d" | "harp" | undefined,
) => {
  if (!engineType) return H.Map.EngineType.WEBGL;

  const engineTypeMap: {
    [key in "webgl" | "p2d" | "harp"]: H.Map.EngineType;
  } = {
    webgl: H.Map.EngineType.WEBGL,
    p2d: H.Map.EngineType.P2D,
    harp: H.Map.EngineType.HARP,
  };

  return engineTypeMap[engineType];
};
