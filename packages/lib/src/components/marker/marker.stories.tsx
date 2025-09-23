import type { Meta, StoryObj } from "@storybook/react-vite";
import { withHereMap } from "../../../.storybook/decorators";
import { Marker } from "./marker";

const meta: Meta<typeof Marker> = {
  title: "Components/Marker",
  component: Marker,
  decorators: [withHereMap],
};

export default meta;
type Story = StoryObj<typeof Marker>;

export const Default: Story = {
  args: {
    apikey: "YOUR_API_KEY_HERE",
    position: { lat: 52.52, lng: 13.405 },
    label: "Default Marker",
  },
};

export const WithIcon: Story = {
  args: {
    apikey: "YOUR_API_KEY_HERE",
    position: { lat: 48.8566, lng: 2.3522 },
    label: "Custom Icon Marker",
    icon: "https://static.vecteezy.com/system/resources/thumbnails/019/897/155/small/location-pin-icon-map-pin-place-marker-png.png",
    iconSize: { w: 32, h: 32 },
    iconAnchor: { x: 16, y: 32 },
  },
};

export const Draggable: Story = {
  args: {
    apikey: "YOUR_API_KEY_HERE",
    position: { lat: 40.7128, lng: -74.006 },
    label: "Draggable Marker",
    draggable: true,
  },
};
