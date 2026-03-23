import * as v from "valibot";

export const collectionsListRequestQuerySchema = v.pipe(
	v.object({
		type: v.pipe(
			v.nullish(v.string()),
			v.description("Type of collections to filter by"),
		),
		shopId: v.pipe(
			v.nullish(v.number()),
			v.description("Filter collections by shop ID"),
		),
	}),
	v.description("Parameters for fetching the list of collections."),
);
