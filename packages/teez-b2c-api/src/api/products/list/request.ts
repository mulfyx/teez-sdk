import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const productsListSortKeySchema = doc({
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

export const productsListRequestQuerySchema = doc({
	schema: z.object({
		seed: doc({
			schema: z.nullish(z.number()),
			description: "Random seed for consistent pagination",
		}),
		pageNumber: doc({
			schema: z.nullish(z.number()),
			description: "Number of the page to retrieve",
		}),
		pageSize: doc({
			schema: z.nullish(z.number()),
			description: "Number of products per page",
		}),
		categoryId: doc({
			schema: z.nullish(z.number()),
			description: "Filter products by category ID",
		}),
		sortBy: doc({
			schema: z.nullish(z.lazy(() => productsListSortKeySchema)),
			description: "Criteria to sort products by",
		}),
		brandIds: doc({
			schema: z.nullish(z.number()),
			description: "Filter products by brand ID",
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
	description: "Parameters for fetching a filtered list of products.",
});
