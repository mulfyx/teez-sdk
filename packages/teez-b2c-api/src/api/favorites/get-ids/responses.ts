import * as v from "valibot";

export const favoritesGetIdsResponse200Schema = v.pipe(
	v.object({
		skuIds: v.pipe(
			v.array(v.number()),
			v.description("List of favorited SKU IDs"),
		),
	}),
	v.description(
		"Authenticated favorites response containing the user's favorite SKU identifiers.",
	),
);
