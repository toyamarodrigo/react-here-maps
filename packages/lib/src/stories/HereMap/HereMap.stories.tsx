import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HERE_MAPS_APIKEY } from "../../utils/constants";
import { HereMap } from "../../components";

const meta = {
  title: "Example/HereMap",
  component: HereMap,
  tags: ["HereMap", "autodocs"],
  argTypes: {
    apiKey: {
      description: "Here Maps API Key",
    },
    mapOptions: {
      description: "Map options",
      defaultValue: {
        center: {
          lat: -34.6083,
          lng: -58.3712,
        },
        zoom: 12,
      },
    },
    layerOptions: {
      description: "Layer options",
      defaultValue: {
        style: "normal",
        ppi: 72,
      },
    },
    localization: {
      description: "Localization",
      defaultValue: "en-US",
    },
    zoomAlign: {
      description: "Zoom alignment",
      defaultValue: "BOTTOM_RIGHT",
    },
  },
  decorators: [
    (StoryFn) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <StoryFn />
      </div>
    ),
  ],
} satisfies Meta<typeof HereMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    apiKey: HERE_MAPS_APIKEY,
    mapOptions: {
      center: {
        lat: -34.6083,
        lng: -58.3712,
      },
      zoom: 12,
    },
    layerOptions: {
      style: "normal",
      ppi: 72,
    },
  },
};
