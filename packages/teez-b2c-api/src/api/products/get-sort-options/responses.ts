import * as v from "valibot";

export const productsGetSortOptionsSortKeySchema = v.pipe(
	v.union([
		v.literal("byRelevance"),
		v.literal("popularity"),
		v.literal("highestRated"),
		v.literal("new"),
		v.literal("price"),
		v.literal("priceDesc"),
	]),
	v.description("Type union for product sort keys"),
);
export const productsGetSortOptionsOptionSchema = v.pipe(
	v.object({
		key: v.pipe(
			productsGetSortOptionsSortKeySchema,
			v.description(
				'Sort key - "popularity", "highestRated", "new", "price", or "priceDesc"',
			),
		),
		name: v.pipe(
			v.string(),
			v.description("Localized display name of the sort option"),
		),
	}),
	v.description("Sort option returned by product listing endpoints."),
);
export const productsGetSortOptionsResponse200Schema = v.pipe(
	v.array(productsGetSortOptionsOptionSchema),
	v.description("List of sort options supported by product listing endpoints."),
);
