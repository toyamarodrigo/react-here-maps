import type { Meta, StoryObj } from "@storybook/react";
import { HereMap } from "../here-map/here-map";
import { Marker } from "./marker";

const meta: Meta<typeof Marker> = {
  title: "Components/Marker",
  component: Marker,
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
type Story = StoryObj<typeof Marker>;

export const Default: Story = {
  args: {
    position: { lat: 52.52, lng: 13.405 },
    label: "Default Marker",
  },
};

export const WithIcon: Story = {
  args: {
    position: { lat: 48.8566, lng: 2.3522 },
    label: "Custom Icon Marker",
    icon: "https://static.vecteezy.com/system/resources/thumbnails/019/897/155/small/location-pin-icon-map-pin-place-marker-png.png",
    iconSize: { w: 32, h: 32 },
    iconAnchor: { x: 16, y: 32 },
  },
};

export const Draggable: Story = {
  args: {
    position: { lat: 40.7128, lng: -74.006 },
    label: "Draggable Marker",
    draggable: true,
  },
};
