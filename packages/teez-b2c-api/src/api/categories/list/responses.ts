import * as v from "valibot";

export const categoriesListItemSchema = v.pipe(
	v.object({
		id: v.pipe(v.number(), v.description("Unique identifier of the category")),
		name: v.pipe(
			v.string(),
			v.description("Localized display name of the category"),
		),
		level: v.pipe(
			v.number(),
			v.description("Depth level in the category tree"),
		),
		parentId: v.pipe(
			v.number(),
			v.description("Identifier of the parent category"),
		),
		hasSubcategories: v.pipe(
			v.boolean(),
			v.description("Indicates if there are nested subcategories"),
		),
		isAdult: v.pipe(
			v.boolean(),
			v.description("Indicates if the category contains adult content"),
		),
	}),
	v.description("Category node returned by the category tree endpoint."),
);
export const categoriesListResponse200Schema = v.pipe(
	v.array(categoriesListItemSchema),
	v.description("Top-level category tree returned for storefront navigation."),
);
