import type { Meta, StoryObj } from "@storybook/react";
import { HereMap } from "../here-map/here-map";
import { ZoomControl } from "./zoom-control";

const meta: Meta<typeof ZoomControl> = {
  title: "Components/ZoomControl",
  component: ZoomControl,
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
type Story = StoryObj<typeof ZoomControl>;

export const Default: Story = {
  args: {},
};
