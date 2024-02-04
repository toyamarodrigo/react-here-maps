import type { Meta, StoryObj } from "@storybook/react";
import { HereMap } from "./HereMap";

const meta: Meta<typeof HereMap> = {
  title: "Components/HereMap",
  component: HereMap,
  argTypes: {},
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HereMap>;

export const Primary: Story = {
  args: {
    apiKey: import.meta.env.STORYBOOK_HERE_API_KEY,
    mapOptions: {
      center: { lat: -34.603722, lng: -58.401592 },
      zoom: 12,
    },
  },
};
