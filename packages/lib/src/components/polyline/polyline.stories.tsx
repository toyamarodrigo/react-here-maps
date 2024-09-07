import type { Meta, StoryObj } from "@storybook/react";
import { HereMap } from "../here-map/here-map";
import { Polyline } from "./polyline";

export default {
  title: "Components/Polyline",
  component: Polyline,
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

type Story = StoryObj<typeof Polyline>;

export const Default: Story = {
  args: {
    points: [
      { lat: 52.52, lng: 13.405 },
      { lat: 52.52, lng: 13.405 },
    ],
  },
};
