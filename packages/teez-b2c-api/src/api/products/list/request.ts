import * as v from "valibot";

export const productsListSortKeySchema = v.pipe(
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

export const productsListRequestQuerySchema = v.pipe(
	v.object({
		seed: v.pipe(
			v.nullish(v.number()),
			v.description("Random seed for consistent pagination"),
		),
		pageNumber: v.pipe(
			v.nullish(v.number()),
			v.description("Number of the page to retrieve"),
		),
		pageSize: v.pipe(
			v.nullish(v.number()),
			v.description("Number of products per page"),
		),
		categoryId: v.pipe(
			v.nullish(v.number()),
			v.description("Filter products by category ID"),
		),
		sortBy: v.pipe(
			v.nullish(productsListSortKeySchema),
			v.description("Criteria to sort products by"),
		),
		brandIds: v.pipe(
			v.nullish(v.number()),
			v.description("Filter products by brand ID"),
		),
		minPrice: v.pipe(
			v.nullish(v.number()),
			v.description("Minimum price filter"),
		),
		maxPrice: v.pipe(
			v.nullish(v.number()),
			v.description("Maximum price filter"),
		),
	}),
	v.description("Parameters for fetching a filtered list of products."),
);
