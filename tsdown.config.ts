import { defineConfig, type UserConfig } from "tsdown";

export default defineConfig({
  deps: {
    onlyBundle: [],
  },
  dts: true,
  entry: ["src/core/*.ts"],
  exports: true,
  format: ["cjs", "esm"],
  minify: true,
  outputOptions: {
    exports: "named",
  },
  sourcemap: "hidden",
}) as UserConfig;
