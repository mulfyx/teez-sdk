import js from "@eslint/js";
import * as tsParser from "@typescript-eslint/parser";
import gitignore from "eslint-config-flat-gitignore";
import { importX } from "eslint-plugin-import-x";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import { defineConfig } from "eslint/config";
import * as tseslint from "typescript-eslint";

export default defineConfig([
	gitignore(),
	js.configs.recommended,
	eslintPluginUnicorn.configs.all,
	tseslint.configs.strictTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	importX.flatConfigs.recommended,
	importX.flatConfigs.typescript,
	{
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
	},
	{
		rules: {
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{
					fixStyle: "inline-type-imports",
				},
			],
			"@typescript-eslint/explicit-function-return-type": [
				"error",
				{
					allowDirectConstAssertionInArrowFunctions: true,
					allowExpressions: true,
					allowHigherOrderFunctions: true,
					allowTypedFunctionExpressions: true,
				},
			],
			"@typescript-eslint/explicit-member-accessibility": "error",
			"@typescript-eslint/no-dynamic-delete": "off",
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{
					allowNumber: true,
				},
			],
			"@typescript-eslint/return-await": ["error", "always"],
			"@typescript-eslint/strict-boolean-expressions": [
				"error",
				{
					allowAny: false,
					allowNullableBoolean: false,
					allowNullableNumber: false,
					allowNullableObject: false,
					allowNullableString: false,
					allowNumber: false,
					allowString: false,
				},
			],
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
			"unicorn/no-immediate-mutation": "off",
			"unicorn/no-keyword-prefix": "off",
			"unicorn/no-negated-condition": "off",
			"unicorn/no-useless-undefined": "off",
			"unicorn/prefer-json-parse-buffer": "off",
			"unicorn/prefer-native-coercion-functions": "off",
			"unicorn/prefer-single-call": "off",
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
