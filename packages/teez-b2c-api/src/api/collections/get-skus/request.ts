import * as v from "valibot";

export const collectionsGetSkusSortKeySchema = v.pipe(
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
export const collectionsGetSkusRequestQuerySchema = v.pipe(
	v.object({
		pageNumber: v.pipe(
			v.nullish(v.number()),
			v.description("Number of the page to retrieve"),
		),
		pageSize: v.pipe(
			v.nullish(v.number()),
			v.description("Number of items per page"),
		),
		collectionId: v.pipe(
			v.number(),
			v.description("Unique identifier of the collection"),
		),
		sortBy: v.pipe(
			v.nullish(collectionsGetSkusSortKeySchema),
			v.description("Sorting option for the results"),
		),
	}),
	v.description("Parameters for fetching SKUs from a collection."),
);
