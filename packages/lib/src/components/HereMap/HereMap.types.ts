export interface HereMapProps {
  apiKey: string;
  mapOptions?: H.Map.Options;
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
