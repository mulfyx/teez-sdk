import * as v from "valibot";

export const shopsGetMonobrandRequestQuerySchema = v.pipe(
	v.object({
		seed: v.pipe(
			v.nullish(v.number()),
			v.description("Random seed for consistent pagination"),
		),
		pageNumber: v.pipe(
			v.nullish(v.number()),
			v.description("Number of the page to retrieve"),
		),
		pageSize: v.pipe(
			v.nullish(v.number()),
			v.description("Number of items per page"),
		),
	}),
	v.description("Parameters for fetching monobrand shops."),
);
