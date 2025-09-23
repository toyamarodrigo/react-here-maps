import type { Meta, StoryObj } from "@storybook/react-vite";
import { withHereMap } from "../../../.storybook/decorators";
import { ZoomControl } from "./zoom-control";

const meta: Meta<typeof ZoomControl> = {
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
type Story = StoryObj<typeof ZoomControl>;

export const Default: Story = {
  args: {
    apikey: "YOUR_API_KEY_HERE",
  },
};
