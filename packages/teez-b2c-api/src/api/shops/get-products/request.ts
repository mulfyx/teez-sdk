import * as v from "valibot";

export const shopsGetProductsRequestPathSchema = v.pipe(
	v.object({
		shopId: v.pipe(v.number(), v.description("Unique identifier of the shop")),
	}),
	v.description("Path parameters for fetching products from a shop."),
);
export const shopsGetProductsRequestQuerySortKeySchema = v.pipe(
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
export const shopsGetProductsRequestQuerySchema = v.pipe(
	v.object({
		pageNumber: v.pipe(
			v.nullish(v.number()),
			v.description("Number of the page to retrieve"),
		),
		pageSize: v.pipe(
			v.nullish(v.number()),
			v.description("Number of items per page"),
		),
		sortBy: v.pipe(
			v.nullish(shopsGetProductsRequestQuerySortKeySchema),
			v.description("Sorting option for the results"),
		),
		categoryId: v.pipe(
			v.nullish(v.number()),
			v.description("Filter by category ID"),
		),
		brandIds: v.pipe(
			v.nullish(v.array(v.number())),
			v.description("Filter by brand IDs"),
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
	v.description("Query parameters for fetching products from a shop."),
);
