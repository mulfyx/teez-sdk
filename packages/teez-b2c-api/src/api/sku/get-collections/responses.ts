import * as v from "valibot";

export const skuGetCollectionsItemSchema = v.pipe(
	v.object({
		id: v.pipe(
			v.number(),
			v.description("Unique identifier of the collection"),
		),
		cover: v.pipe(
			v.string(),
			v.description("URL for the collection's cover image"),
		),
		icon: v.pipe(v.string(), v.description("URL to the collection's icon")),
		name: v.pipe(v.string(), v.description("Name of the collection")),
		quantity: v.pipe(
			v.number(),
			v.description("Number of items in the collection"),
		),
		priority: v.pipe(
			v.number(),
			v.description("Priority for sorting or display order"),
		),
	}),
	v.description("Collection card associated with a specific SKU."),
);
export const skuGetCollectionsResponse200Schema = v.pipe(
	v.array(skuGetCollectionsItemSchema),
	v.description("List of collection cards associated with the requested SKU."),
);
