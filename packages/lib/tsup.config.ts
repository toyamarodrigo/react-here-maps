import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "@here/maps-api-for-javascript"],
  minify: true,
  target: "es2018",
  outDir: "dist",
  splitting: false,
  bundle: true,
});
