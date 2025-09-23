import type { Meta, StoryObj } from "@storybook/react-vite";
import { withHereMap } from "../../../.storybook/decorators";
import { ScaleBar } from "./scale-bar";

const meta: Meta<typeof ScaleBar> = {
  title: "Components/ScaleBar",
  component: ScaleBar,
  decorators: [withHereMap],
};

export default meta;
type Story = StoryObj<typeof ScaleBar>;

export const Default: Story = {
  args: {
    apikey: "YOUR_API_KEY_HERE",
  },
};
