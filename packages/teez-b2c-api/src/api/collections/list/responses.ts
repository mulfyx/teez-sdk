import * as z from "zod/mini";

import { nullishToUndefined } from "../../../schema/codecs";
import { doc } from "../../../schema/metadata";

export const collectionsListItemSchema = doc({
	schema: z.object({
		id: doc({
			schema: z.number(),
			description: "Unique identifier of the collection",
		}),
		icon: doc({
			schema: nullishToUndefined(z.string()),
			description: "URL or path to the collection's icon",
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
	description: "Collection card returned by collection listing endpoints.",
});

export const collectionsListResponse200Schema = doc({
	schema: z.array(collectionsListItemSchema),
	description: "List of collection cards available in the storefront.",
});
