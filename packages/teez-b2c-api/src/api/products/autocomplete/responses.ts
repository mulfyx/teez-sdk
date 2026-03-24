import * as v from "valibot";

export const productsAutocompleteItemSchema = v.pipe(
	v.object({
		id: v.pipe(
			v.number(),
			v.description("Identifier associated with the suggestion"),
		),
		name: v.pipe(
			v.string(),
			v.description("Suggestion text shown to the user"),
		),
	}),
	v.description("Product search suggestion returned by autocomplete."),
);
export const productsAutocompleteResponse200Schema = v.pipe(
	v.array(productsAutocompleteItemSchema),
	v.description(
		"Search suggestions returned while the user types in the storefront search box.",
	),
);
