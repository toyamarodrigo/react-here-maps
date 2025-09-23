import type { Meta, StoryObj } from "@storybook/react-vite";
import { withHereMap } from "../../../.storybook/decorators";
import { MapSettings } from "./map-settings";
import type { MapSettingsControlProps } from "./types";

type MapSettingsStoryArgs = MapSettingsControlProps & { apikey: string };

const meta: Meta<MapSettingsStoryArgs> = {
  title: "Components/MapSettings",
  component: MapSettings,
  decorators: [withHereMap],
};

export default meta;
type Story = StoryObj<MapSettingsStoryArgs>;

export const Default: Story = {
  args: {
    apikey: "YOUR_API_KEY_HERE",
  },
};
