import type { Meta, StoryObj } from "@storybook/react-vite";
import { withHereMap } from "../../../.storybook/decorators";
import { ScaleBar } from "./scale-bar";
import type { ScaleBarControlProps } from "./types";

type ScaleBarStoryArgs = ScaleBarControlProps & { apikey: string };

const meta: Meta<ScaleBarStoryArgs> = {
  title: "Components/ScaleBar",
  component: ScaleBar,
  decorators: [withHereMap],
  argTypes: {
    apikey: {
      control: "text",
      description: "HERE Maps API Key",
    },
  },
};

export default meta;
type Story = StoryObj<ScaleBarStoryArgs>;

export const Default: Story = {
  args: {
    apikey: "YOUR_API_KEY_HERE",
  },
};
