import * as v from "valibot";

export const collectionsGetRequestPathSchema = v.pipe(
	v.object({
		collectionId: v.pipe(
			v.number(),
			v.description("Unique identifier of the collection"),
		),
	}),
	v.description("Parameters for fetching a specific collection."),
);
