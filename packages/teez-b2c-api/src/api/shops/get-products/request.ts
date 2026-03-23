import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const shopsGetProductsRequestPathSchema = doc({
	schema: z.object({
		shopId: doc({
			schema: z.number(),
			description: "Unique identifier of the shop",
		}),
	}),
	description: "Path parameters for fetching products from a shop.",
});

export const shopsGetProductsRequestQuerySortKeySchema = doc({
	schema: z.union([
		z.literal("byRelevance"),
		z.literal("popularity"),
		z.literal("highestRated"),
		z.literal("new"),
		z.literal("price"),
		z.literal("priceDesc"),
	]),
	description: "Type union for product sort keys",
});

export const shopsGetProductsRequestQuerySchema = doc({
	schema: z.object({
		pageNumber: doc({
			schema: z.nullish(z.number()),
			description: "Number of the page to retrieve",
		}),
		pageSize: doc({
			schema: z.nullish(z.number()),
			description: "Number of items per page",
		}),
		sortBy: doc({
			schema: z.nullish(shopsGetProductsRequestQuerySortKeySchema),
			description: "Sorting option for the results",
		}),
		categoryId: doc({
			schema: z.nullish(z.number()),
			description: "Filter by category ID",
		}),
		brandIds: doc({
			schema: z.nullish(z.array(z.number())),
			description: "Filter by brand IDs",
		}),
		minPrice: doc({
			schema: z.nullish(z.number()),
			description: "Minimum price filter",
		}),
		maxPrice: doc({
			schema: z.nullish(z.number()),
			description: "Maximum price filter",
		}),
	}),
	description: "Query parameters for fetching products from a shop.",
});
