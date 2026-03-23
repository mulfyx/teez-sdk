import * as v from "valibot";

export const categoriesGetRequestPathSchema = v.pipe(
	v.object({
		categoryId: v.pipe(
			v.number(),
			v.description("Unique identifier of the category"),
		),
	}),
	v.description("Parameters for fetching a specific category."),
);
