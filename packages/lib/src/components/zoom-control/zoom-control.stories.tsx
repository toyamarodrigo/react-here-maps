import type { Meta, StoryObj } from "@storybook/react-vite";
import { withHereMap } from "../../../.storybook/decorators";
import type { ZoomControlProps } from "./types";
import { ZoomControl } from "./zoom-control";

type ZoomControlStoryArgs = ZoomControlProps & { apikey: string };

const meta: Meta<ZoomControlStoryArgs> = {
  title: "Components/ZoomControl",
  component: ZoomControl,
  decorators: [withHereMap],
  argTypes: {
    apikey: {
      control: "text",
      description: "HERE Maps API Key",
    },
  },
};

export default meta;
type Story = StoryObj<ZoomControlStoryArgs>;

export const Default: Story = {
  args: {
    apikey: "YOUR_API_KEY_HERE",
  },
};
