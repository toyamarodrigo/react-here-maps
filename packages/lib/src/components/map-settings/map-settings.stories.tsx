import type { Meta, StoryObj } from "@storybook/react";
import { HereMap } from "../here-map/here-map";
import { MapSettings } from "./map-settings";

const meta: Meta<typeof MapSettings> = {
  title: "Components/MapSettings",
  component: MapSettings,
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
};

export default meta;
type Story = StoryObj<typeof MapSettings>;

export const Default: Story = {
  args: {},
};
