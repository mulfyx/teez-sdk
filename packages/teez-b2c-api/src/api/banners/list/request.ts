import * as v from "valibot";

export const bannersListRequestQuerySchema = v.pipe(
	v.object({
		type: v.pipe(
			v.nullish(v.string()),
			v.description("Type of banners to filter by"),
		),
	}),
	v.description(
		"Optional banner feed filters used by the storefront banners endpoint.",
	),
);
