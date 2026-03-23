import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const productsGetSortOptionsSortKeySchema = doc({
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

export const productsGetSortOptionsOptionSchema = doc({
	schema: z.object({
		key: doc({
			schema: productsGetSortOptionsSortKeySchema,
			description:
				'Sort key - "popularity", "highestRated", "new", "price", or "priceDesc"',
		}),
		name: doc({
			schema: z.string(),
			description: "Localized display name of the sort option",
		}),
	}),
	description: "Sort option returned by product listing endpoints.",
});

export const productsGetSortOptionsResponse200Schema = doc({
	schema: z.array(productsGetSortOptionsOptionSchema),
	description: "List of sort options supported by product listing endpoints.",
});
