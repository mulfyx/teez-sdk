import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "node",
		include: ["tests/**/*.test.ts"],
		coverage: {
			include: [
				"src/language.ts",
				"src/registry.ts",
				"src/config/{defaults,headers,resolve}.ts",
				"src/contracts/**/*.ts",
				"src/errors/*.ts",
				"src/http-operation/{api-error,define,flattenability,response-helpers,status,validation}.ts",
				"src/schema/{metadata,object-schema}.ts",
				"src/sdk/{create-client,flat-request,operation-entry,runtime}.ts",
				"src/transport/{headers,http-client,parsing,path,query,response-body}.ts",
			],
			exclude: ["tests/**/*.test.ts"],
			reporter: ["text", "json-summary"],
			thresholds: {
				branches: 100,
				functions: 100,
				lines: 100,
				statements: 100,
			},
		},
	},
});
