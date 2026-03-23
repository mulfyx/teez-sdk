import * as z from "zod/mini";

import { doc } from "../../../schema/metadata";

export const categoriesListItemSchema = doc({
	schema: z.object({
		id: doc({
			schema: z.number(),
			description: "Unique identifier of the category",
		}),
		name: doc({
			schema: z.string(),
			description: "Localized display name of the category",
		}),
		level: doc({
			schema: z.number(),
			description: "Depth level in the category tree",
		}),
		parentId: doc({
			schema: z.number(),
			description: "Identifier of the parent category",
		}),
		hasSubcategories: doc({
			schema: z.boolean(),
			description: "Indicates if there are nested subcategories",
		}),
		isAdult: doc({
			schema: z.boolean(),
			description: "Indicates if the category contains adult content",
		}),
	}),
	description: "Category node returned by the category tree endpoint.",
});

export const categoriesListResponse200Schema = doc({
	schema: z.array(categoriesListItemSchema),
	description: "Top-level category tree returned for storefront navigation.",
});
