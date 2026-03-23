import * as v from "valibot";

export const categoriesGetParentsRequestQuerySchema = v.pipe(
	v.object({
		categoryId: v.pipe(
			v.array(v.number()),
			v.description("List of category IDs to find parents for"),
		),
		level: v.pipe(
			v.nullish(v.number()),
			v.description("Hierarchy level to filter by"),
		),
	}),
	v.description("Parameters for fetching parent categories."),
);
