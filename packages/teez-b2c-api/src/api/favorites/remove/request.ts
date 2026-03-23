import * as v from "valibot";

export const favoritesRemoveRequestBodySchema = v.pipe(
	v.array(v.number()),
	v.description(
		"Request body containing SKU identifiers to remove from the authenticated user's favorites list.",
	),
);
