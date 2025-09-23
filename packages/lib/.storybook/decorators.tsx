import type { Decorator } from '@storybook/react-vite';
import { HereMap } from '../src/components/here-map/here-map';

export const withHereMap: Decorator = (Story, { args }) => {
  const apikey = args.apikey || 'YOUR_API_KEY_HERE';

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <HereMap
        key={apikey}
        apikey={apikey}
        options={{
          center: { lat: 52.52, lng: 13.405 },
          zoom: 10,
        }}
      >
        <Story />
      </HereMap>
    </div>
  );
};