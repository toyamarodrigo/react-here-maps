import type { Meta, StoryObj } from "@storybook/react-vite";
import { withHereMap } from "../../../.storybook/decorators";
import { MapSettings } from "./map-settings";

const meta: Meta<typeof MapSettings> = {
  title: "Components/MapSettings",
  component: MapSettings,
  decorators: [withHereMap],
};

export default meta;
type Story = StoryObj<typeof MapSettings>;

export const Default: Story = {
  args: {
    apikey: "YOUR_API_KEY_HERE",
  },
};
