import type React from "react";
import { useState } from "react";
import { HereMapsProvider } from "../HereMapsProvider";

export interface HereMapProps {
  apiKey: string;
  mapOptions: H.Map.Options;
  layerOptions?: H.service.Platform.DefaultLayersOptions;
  children?: React.ReactNode;
  localization?: string | H.ui.i18n.Localization;
  zoomAlign?: H.ui.LayoutAlignment.BOTTOM_RIGHT;
  zoomVisible?: boolean;
  zoomDisabled?: boolean;
  mapSettingsAlign?: H.ui.LayoutAlignment.BOTTOM_RIGHT;
  mapSettingsVisible?: boolean;
  mapSettingsDisabled?: boolean;
  scaleBarAlign?: H.ui.LayoutAlignment.BOTTOM_RIGHT;
  scaleBarVisible?: boolean;
  scaleBarDisabled?: boolean;
}

export const HereMap = ({
  apiKey,
  mapOptions,
  layerOptions = {
    ppi: 72,
    style: "normal",
  },
  children,
  localization = "en-US",
  zoomAlign = H.ui.LayoutAlignment.BOTTOM_RIGHT,
  zoomVisible = true,
  zoomDisabled = false,
  mapSettingsAlign = H.ui.LayoutAlignment.BOTTOM_RIGHT,
  mapSettingsVisible = true,
  mapSettingsDisabled = false,
  scaleBarAlign = H.ui.LayoutAlignment.BOTTOM_RIGHT,
  scaleBarVisible = true,
  scaleBarDisabled = false,
}: HereMapProps) => {
  const [mapContainer, setMapContainer] = useState<HTMLDivElement | null>(null);

  return (
    <>
      <div ref={(node) => setMapContainer(node)} style={{ width: "100%", height: "100%" }}>
        {mapContainer && (
          <HereMapsProvider
            apiKey={apiKey}
            layerOptions={layerOptions}
            localization={localization}
            mapContainer={mapContainer}
            mapOptions={mapOptions}
            mapSettingsAlign={mapSettingsAlign}
            mapSettingsDisabled={mapSettingsDisabled}
            mapSettingsVisible={mapSettingsVisible}
            scaleBarAlign={scaleBarAlign}
            scaleBarDisabled={scaleBarDisabled}
            scaleBarVisible={scaleBarVisible}
            zoomAlign={zoomAlign}
            zoomDisabled={zoomDisabled}
            zoomVisible={zoomVisible}
          >
            {children}
          </HereMapsProvider>
        )}
      </div>
    </>
  );
};
