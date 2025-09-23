import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "@here/maps-api-for-javascript"],
  minify: true,
  target: "es2018",
  outDir: "dist",
  treeshake: true,
  report: true,
  platform: "browser", // Target browser environment to avoid Node.js-specific code
  unbundle: true, // Enable unbundle mode for better tree-shaking
});
