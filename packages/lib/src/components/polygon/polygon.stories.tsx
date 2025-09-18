import type { Meta, StoryObj } from "@storybook/react";
import { HereMap } from "../here-map/here-map";
import { Polygon } from "./polygon";

export default {
  title: "Components/Polygon",
  component: Polygon,
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <HereMap
          apikey={import.meta.env.STORYBOOK_HERE_API_KEY}
          options={{
            center: { lat: 52.52, lng: 13.405 },
            zoom: 10,
          }}
        >
          <Story />
        </HereMap>
      </div>
    ),
  ],
} as Meta;

type Story = StoryObj<typeof Polygon>;

export const Default: Story = {
  args: {
    points: [
      { lat: 52.52, lng: 13.405 },
      { lat: 52.53, lng: 13.405 },
      { lat: 52.53, lng: 13.415 },
      { lat: 52.52, lng: 13.415 },
    ],
  },
};

export const WithStyling: Story = {
  args: {
    points: [
      { lat: 52.51, lng: 13.395 },
      { lat: 52.52, lng: 13.395 },
      { lat: 52.52, lng: 13.405 },
      { lat: 52.51, lng: 13.405 },
    ],
    options: {
      style: {
        fillColor: "rgba(0, 255, 0, 0.6)",
        strokeColor: "#0000FF",
        lineWidth: 3,
      },
    },
  },
};

export const WithHole: Story = {
  args: {
    points: [
      { lat: 52.5, lng: 13.39 },
      { lat: 52.54, lng: 13.39 },
      { lat: 52.54, lng: 13.42 },
      { lat: 52.5, lng: 13.42 },
    ],
    holes: [
      [
        { lat: 52.515, lng: 13.4 },
        { lat: 52.525, lng: 13.4 },
        { lat: 52.525, lng: 13.41 },
        { lat: 52.515, lng: 13.41 },
      ],
    ],
    options: {
      style: {
        fillColor: "rgba(255, 0, 0, 0.4)",
        strokeColor: "#FF0000",
        lineWidth: 2,
      },
    },
  },
};
