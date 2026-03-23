import * as v from "valibot";

import { nullishToUndefined } from "../../../schema/nullish";

export const collectionsListItemSchema = v.pipe(
	v.object({
		id: v.pipe(
			v.number(),
			v.description("Unique identifier of the collection"),
		),
		icon: v.pipe(
			nullishToUndefined(v.string()),
			v.description("URL or path to the collection's icon"),
		),
		name: v.pipe(v.string(), v.description("Name of the collection")),
		priority: v.pipe(
			v.number(),
			v.description("Priority for sorting or display order"),
		),
	}),
	v.description("Collection card returned by collection listing endpoints."),
);
export const collectionsListResponse200Schema = v.pipe(
	v.array(collectionsListItemSchema),
	v.description("List of collection cards available in the storefront."),
);
