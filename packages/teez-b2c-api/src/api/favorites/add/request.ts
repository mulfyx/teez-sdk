import * as v from "valibot";

export const favoritesAddRequestBodySchema = v.pipe(
	v.array(v.number()),
	v.description(
		"Request body containing SKU identifiers to add to the authenticated user's favorites list.",
	),
);
