interface Args {
  mapOptions?: H.Map.Options | undefined;
}

export const getMapOptions = ({ mapOptions }: Args) => {
  return {
    autoColor: mapOptions?.autoColor || true,
    bounds: mapOptions?.bounds || undefined,
    center: mapOptions?.center || { lat: 52.5, lng: 13.4 },
    engineType: mapOptions?.engineType || H.Map.EngineType.WEBGL,
    imprint: mapOptions?.imprint || undefined,
    layers: mapOptions?.layers || undefined,
    margin: mapOptions?.margin || undefined,
    padding: mapOptions?.padding || undefined,
    pixelRatio: mapOptions?.pixelRatio || window.devicePixelRatio || 1,
    renderBaseBackground: mapOptions?.renderBaseBackground,
    zoom: mapOptions?.zoom || 10,
  };
};
