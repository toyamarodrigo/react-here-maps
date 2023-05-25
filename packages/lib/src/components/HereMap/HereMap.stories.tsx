import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HereMap } from "./HereMap";

const meta = {
  title: "Components/HereMap",
  component: HereMap,
  argTypes: {},
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HereMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    apiKey: "n1nKN-IRXE0oQUMkkfD_47KZzXRDKS0C51lt1BtRo-k",
    mapOptions: {
      center: {
        lat: -34.603722,
        lng: -58.381592,
      },
      zoom: 12,
    },
    layerOptions: {
      style: "normal",
      ppi: 72,
    },
  },
};
