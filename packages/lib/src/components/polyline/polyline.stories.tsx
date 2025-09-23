import type { Meta, StoryObj } from "@storybook/react-vite";
import { withHereMap } from "../../../.storybook/decorators";
import { Polyline } from "./polyline";
import type { PolylineProps } from "./types";

type PolylineStoryArgs = PolylineProps & { apikey: string };

const meta: Meta<PolylineStoryArgs> = {
  title: "Components/Polyline",
  component: Polyline,
  decorators: [withHereMap],
};

export default meta;
type Story = StoryObj<PolylineStoryArgs>;

export const Default: Story = {
  args: {
    apikey: "YOUR_API_KEY_HERE",
    points: [
      { lat: 52.52, lng: 13.405 },
      { lat: 52.52, lng: 13.405 },
    ],
  },
};
