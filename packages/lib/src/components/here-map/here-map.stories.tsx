import type { Meta, StoryObj } from "@storybook/react-vite";
import { MapSettings } from "../map-settings/map-settings";
import { Marker } from "../marker/marker";
import { Polyline } from "../polyline/polyline";
import { ScaleBar } from "../scale-bar/scale-bar";
import { ZoomControl } from "../zoom-control/zoom-control";
import { HereMap } from "./here-map";
import "@here/maps-api-for-javascript";
import type { HereMapProps } from "./types";

type HereMapStoryArgs = HereMapProps & { apikey: string };

const meta: Meta<HereMapStoryArgs> = {
  title: "Components/HereMap",
  component: HereMap,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<HereMapStoryArgs>;

export const Default: Story = {
  args: {
    apikey: "YOUR_API_KEY_HERE",
    options: {
      center: { lat: 52.52, lng: 13.405 },
      zoom: 10,
    },
    mapStyle: "vector.normal.map",
  },
};

export const WithChildComponents: Story = {
  render: (args) => (
    <HereMap {...args}>
      <Marker position={{ lat: 52.52, lng: 13.405 }} label="Berlin" />
      <ZoomControl alignment="right-top" />
      <ScaleBar alignment="bottom-right" />
      <MapSettings alignment="right-bottom" />
      <Polyline
        points={[
          { lat: 52.52, lng: 13.405 },
          { lat: 52.53, lng: 13.415 },
          { lat: 52.54, lng: 13.425 },
        ]}
        options={{ style: { strokeColor: "blue", lineWidth: 4 } }}
      />
    </HereMap>
  ),
  args: {
    apikey: "YOUR_API_KEY_HERE",
    options: {
      center: { lat: 52.52, lng: 13.405 },
      zoom: 10,
    },
    mapStyle: "vector.normal.map",
  },
};

export const SatelliteView: Story = {
  args: {
    ...Default.args,
    mapStyle: "raster.satellite.map",
  },
};

export const TerrainView: Story = {
  args: {
    ...Default.args,
    mapStyle: "raster.terrain.map",
  },
};

export const NightMode: Story = {
  args: {
    ...Default.args,
    mapStyle: "raster.normal.mapnight",
  },
};
