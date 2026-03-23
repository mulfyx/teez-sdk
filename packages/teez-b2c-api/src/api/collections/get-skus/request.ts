import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const collectionsGetSkusSortKeySchema = doc({
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

export const collectionsGetSkusRequestQuerySchema = doc({
	schema: z.object({
		pageNumber: doc({
			schema: z.nullish(z.number()),
			description: "Number of the page to retrieve",
		}),
		pageSize: doc({
			schema: z.nullish(z.number()),
			description: "Number of items per page",
		}),
		collectionId: doc({
			schema: z.number(),
			description: "Unique identifier of the collection",
		}),
		sortBy: doc({
			schema: z.nullish(collectionsGetSkusSortKeySchema),
			description: "Sorting option for the results",
		}),
	}),
	description: "Parameters for fetching SKUs from a collection.",
});
