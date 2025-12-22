import js from "@eslint/js";
import * as tsParser from "@typescript-eslint/parser";
import gitignore from "eslint-config-flat-gitignore";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import { createNodeResolver, importX } from "eslint-plugin-import-x";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import { defineConfig } from "eslint/config";
import * as tseslint from "typescript-eslint";

export default defineConfig([
	gitignore(),
	{
		extends: [
			js.configs.recommended,
			tseslint.configs.strict,
			tseslint.configs.stylistic,
			importX.flatConfigs.recommended,
			importX.flatConfigs.typescript,
		],
		languageOptions: {
			parser: tsParser,
			ecmaVersion: "latest",
			sourceType: "module",
			parserOptions: {
				projectService: {
					allowDefaultProject: ["*.config.{js,cjs,mjs,ts,cts,mts}"],
				},
				tsconfigRootDir: import.meta.dirname,
			},
		},
		settings: {
			"import-x/resolver-next": [
				createTypeScriptImportResolver(),
				createNodeResolver(),
			],
		},
	},
	eslintPluginUnicorn.configs.all,
	{
		rules: {
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{
					fixStyle: "inline-type-imports",
				},
			],
			"@typescript-eslint/explicit-member-accessibility": "error",
			"@typescript-eslint/no-dynamic-delete": "off",
			"@typescript-eslint/return-await": ["error", "always"],
			curly: "error",
			"no-empty": [
				"error",
				{
					allowEmptyCatch: true,
				},
			],
			"no-plusplus": "error",
			"no-return-await": "off",
			"unicorn/custom-error-definition": "off",
			"unicorn/import-style": [
				"error",
				{
					styles: {
						"node:path": {
							default: false,
							named: true,
							namespace: true,
							unassigned: false,
						},
					},
				},
			],
			"unicorn/no-keyword-prefix": "off",
			"unicorn/no-negated-condition": "off",
			"unicorn/no-useless-undefined": "off",
			"unicorn/prefer-native-coercion-functions": "off",
			"unicorn/prefer-switch": "off",
			"unicorn/prefer-ternary": "off",
			"unicorn/prevent-abbreviations": "off",
			"unicorn/text-encoding-identifier-case": [
				"error",
				{
					withDash: true,
				},
			],
		},
	},
]);
