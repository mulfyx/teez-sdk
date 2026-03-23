import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const collectionsGetTypeSchema = doc({
	schema: z.union([z.literal("Collection"), z.literal("ProductShelf")]),
	description:
		'Type union for collection responses (observed values: "Collection", "ProductShelf")',
});

export const collectionsGetResponse200Schema = doc({
	schema: z.object({
		type: doc({
			schema: collectionsGetTypeSchema,
			description:
				'Type of the collection container (observed values: "Collection", "ProductShelf")',
		}),
		id: doc({
			schema: z.number(),
			description: "Unique identifier of the collection",
		}),
		cover: doc({
			schema: z.string(),
			description: "URL for the cover image",
		}),
		description: doc({
			schema: z.string(),
			description: "Description of the collection",
		}),
		name: doc({
			schema: z.string(),
			description: "Name of the collection",
		}),
		priority: doc({
			schema: z.number(),
			description: "Priority for sorting or display order",
		}),
	}),
	description:
		"Collection presentation object returned by the collection detail endpoint.",
});
