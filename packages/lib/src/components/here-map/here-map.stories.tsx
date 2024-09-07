import type { Meta, StoryObj } from "@storybook/react";
import { HereMap } from "./here-map";
import "@here/maps-api-for-javascript";

const meta: Meta<typeof HereMap> = {
  title: "Components/HereMap",
  component: HereMap,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof HereMap>;

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
