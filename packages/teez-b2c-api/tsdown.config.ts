import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["cjs", "esm"],
	sourcemap: true,
	unbundle: true,
	dts: true,
	exports: true,
});
