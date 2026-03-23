import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const skuGetCollectionsItemSchema = doc({
	schema: z.object({
		id: doc({
			schema: z.number(),
			description: "Unique identifier of the collection",
		}),
		cover: doc({
			schema: z.string(),
			description: "URL for the collection's cover image",
		}),
		icon: doc({
			schema: z.string(),
			description: "URL to the collection's icon",
		}),
		name: doc({
			schema: z.string(),
			description: "Name of the collection",
		}),
		quantity: doc({
			schema: z.number(),
			description: "Number of items in the collection",
		}),
		priority: doc({
			schema: z.number(),
			description: "Priority for sorting or display order",
		}),
	}),
	description: "Collection card associated with a specific SKU.",
});

export const skuGetCollectionsResponse200Schema = doc({
	schema: z.array(skuGetCollectionsItemSchema),
	description: "List of collection cards associated with the requested SKU.",
});
