import type { Meta, StoryObj } from "@storybook/react-vite";
import { withHereMap } from "../../../.storybook/decorators";
import { Polyline } from "./polyline";

export default {
  title: "Components/Polyline",
  component: Polyline,
  decorators: [withHereMap],
} as Meta;

type Story = StoryObj<typeof Polyline>;

export const Default: Story = {
  args: {
    apikey: "YOUR_API_KEY_HERE",
    points: [
      { lat: 52.52, lng: 13.405 },
      { lat: 52.52, lng: 13.405 },
    ],
  },
};
