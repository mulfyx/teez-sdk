import * as v from "valibot";

export const productsGetSortOptionsRequestQuerySchema = v.pipe(
	v.object({
		IsSearch: v.pipe(
			v.nullish(v.boolean()),
			v.description("Indicates if the context is a search result"),
		),
		IsPromo: v.pipe(
			v.nullish(v.boolean()),
			v.description("Indicates if the context is a promotional listing"),
		),
	}),
	v.description("Parameters for fetching product sort options."),
);
