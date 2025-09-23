import type { Meta, StoryObj } from "@storybook/react-vite";
import { withHereMap } from "../../../.storybook/decorators";
import { Polygon } from "./polygon";
import type { PolygonProps } from "./types";

type PolygonStoryArgs = PolygonProps & { apikey: string };

const meta: Meta<PolygonStoryArgs> = {
  title: "Components/Polygon",
  component: Polygon,
  decorators: [withHereMap],
};

export default meta;
type Story = StoryObj<PolygonStoryArgs>;

export const Default: Story = {
  args: {
    apikey: "YOUR_API_KEY_HERE",
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
    apikey: "YOUR_API_KEY_HERE",
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
    apikey: "YOUR_API_KEY_HERE",
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
