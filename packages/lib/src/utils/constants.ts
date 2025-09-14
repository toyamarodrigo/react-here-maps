export const ROUTING_SERVICE = "https://router.hereapi.com/v8/routes";

// This will be undefined in build but available in development with Vite
let HERE_MAPS_APIKEY: string | undefined;

try {
  HERE_MAPS_APIKEY = (import.meta as any)?.env?.VITE_HERE_MAPS_APIKEY;
} catch {
  HERE_MAPS_APIKEY = undefined;
}

export { HERE_MAPS_APIKEY };
