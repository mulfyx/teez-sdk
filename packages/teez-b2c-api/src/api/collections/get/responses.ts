import * as v from "valibot";

export const collectionsGetTypeSchema = v.pipe(
	v.union([v.literal("Collection"), v.literal("ProductShelf")]),
	v.description(
		'Type union for collection responses (observed values: "Collection", "ProductShelf")',
	),
);
export const collectionsGetResponse200Schema = v.pipe(
	v.object({
		type: v.pipe(
			collectionsGetTypeSchema,
			v.description(
				'Type of the collection container (observed values: "Collection", "ProductShelf")',
			),
		),
		id: v.pipe(
			v.number(),
			v.description("Unique identifier of the collection"),
		),
		cover: v.pipe(v.string(), v.description("URL for the cover image")),
		description: v.pipe(
			v.string(),
			v.description("Description of the collection"),
		),
		name: v.pipe(v.string(), v.description("Name of the collection")),
		priority: v.pipe(
			v.number(),
			v.description("Priority for sorting or display order"),
		),
	}),
	v.description(
		"Collection presentation object returned by the collection detail endpoint.",
	),
);
