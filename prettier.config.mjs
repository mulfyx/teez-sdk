/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
	semi: true,
	useTabs: true,
	plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-pkg"],
	importOrder: [
		"<BUILTIN_MODULES>",
		"",
		"<THIRD_PARTY_MODULES>",
		"",
		"^[./]",
	],
};

export default config;
