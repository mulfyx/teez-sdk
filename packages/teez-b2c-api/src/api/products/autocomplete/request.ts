import * as v from "valibot";

export const productsAutocompleteRequestQuerySchema = v.pipe(
	v.object({
		search: v.pipe(
			v.string(),
			v.description("Partial query text used to retrieve search suggestions"),
		),
	}),
	v.description("Query parameters for retrieving product autocomplete data."),
);
